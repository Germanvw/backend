const Event = require("../models/Event");

const createEvent = async (req, res) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;

    const eventDB = await event.save();

    return res.status(201).json({
      ok: true,
      event: eventDB,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Ocurrio un error",
    });
  }
};

const deleteEvent = async (req, res) => {
  const eventId = req.params.id;

  try {
    const event = await Event.findById(eventId);

    if (event) {
      // Validar que el evento pertenezca al usuario
      if (event.user._id.toString() !== req.uid) {
        return res.status(400).json({
          ok: false,
          msg: "El evento no pertenece al usuario",
        });
      }

      await Event.findByIdAndDelete(eventId);
      return res.status(200).json({
        ok: true,
        msg: "Evento borrado",
        id: event,
      });
    } else {
      return res.status(404).json({
        ok: true,
        msg: "El evento no existe",
      });
    }
  } catch (err) {
    return res.status(500).json({
      ok: true,
      msg: "Ocurrio un error",
    });
  }
};

const editEvent = async (req, res) => {
  const eventId = req.params.id;
  const newEvent = req.body;

  try {
    const event = await Event.findById(eventId);

    if (event) {
      // Validar que el evento pertenezca al usuario
      if (event.user._id.toString() !== req.uid) {
        return res.status(400).json({
          ok: false,
          msg: "El evento no pertenece al usuario",
        });
      }

      await Event.findByIdAndUpdate(eventId, newEvent);
      return res.status(200).json({
        ok: true,
        msg: "Evento editado",
        id: newEvent,
      });
    } else {
      return res.status(404).json({
        ok: true,
        msg: "El evento no existe",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      ok: true,
      msg: "Ocurrio un error",
    });
  }
};

const getEvents = async (req, res) => {
  const { uid } = req;

  try {
    const events = await Event.find({ user: uid }).populate("user", "name");

    if (events.length === 0) {
      return res.status(400).json({
        ok: false,
        msg: "No se han encontrado eventos",
      });
    }
    return res.status(200).json({
      ok: true,
      events,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Ocurrio un error",
    });
  }
};

const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("user", "name");

    if (!event) {
      return res.status(400).json({
        ok: false,
        msg: "No se han encontrado el evento",
      });
    }

    // Validar que el evento pertenezca al usuario
    if (event.user._id.toString() !== req.uid) {
      return res.status(400).json({
        ok: false,
        msg: "El evento no pertenece al usuario",
      });
    }

    return res.status(200).json({
      ok: true,
      event,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Ocurrio un error",
    });
  }
};

module.exports = {
  createEvent,
  deleteEvent,
  editEvent,
  getEvents,
  getEvent,
};
