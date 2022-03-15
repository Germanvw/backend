const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB online");
  } catch (err) {
    console.log(err);
    throw new Error("Error al conectarse con la DB");
  }
};

module.exports = { dbConnection };
