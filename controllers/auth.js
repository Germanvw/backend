const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateJWT } = require("../helpers/jwt");

const registerUser = async (req, res = express.response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "El email ya fue utilizado",
      });
    }

    user = new User(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // SAVE DB
    await user.save();

    return res.status(201).json({ ok: true, _id: user._id, name: user.name });
  } catch (err) {
    console.log(err);
    res.status(500).json({ ok: false, msg: "Error encontrado" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "Información invalida",
      });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password invalida",
      });
    }

    // JWT
    const token = await generateJWT(user._id, user.name);

    return res.json({
      ok: true,
      uid: user._id,
      name: user.name,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      msg: "Error encontrado",
    });
  }

  return res.status(201).json({ ok: true, msg: "login", email, password });
};

const renewToken = async (req, res) => {
  const { uid, name } = req;

  const token = await generateJWT(uid, name);

  return res.json({ ok: true, token });
};

module.exports = {
  registerUser,
  loginUser,
  renewToken,
};
