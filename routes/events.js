const { Router } = require("express");
const { check } = require("express-validator");
const { validDate } = require("../helpers/validDate");
const router = Router();

const {
  createEvent,
  deleteEvent,
  editEvent,
  getEvents,
  getEvent,
} = require("../controllers/events");
const { validateErrors } = require("../middlewares/validateErrors");
const { validateJWT } = require("../middlewares/validateJWT");
validateJWT;

// Todas las rutas validan JWT
router.use(validateJWT);

router.post(
  "/create",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(validDate),
    check("finish", "Fecha de finalizacion es obligatoria").custom(validDate),
    validateErrors,
  ],
  createEvent
);
router.delete("/delete/:id", deleteEvent);
router.put("/edit/:id", editEvent);
router.get("/", getEvents);
router.get("/:id", getEvent);

module.exports = router;
