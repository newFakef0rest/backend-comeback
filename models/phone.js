const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

mongoose
  .connect(url, { family: 4 })

  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const validator = (val) => {
  if (
    val.includes("-") &&
    val.indexOf("-") !== 0 &&
    val.indexOf("-") !== 1 &&
    val.indexOf("-") !== val.length - 1 &&
    val.indexOf("-") !== val.length - 2 &&
    val.indexOf("-") === val.lastIndexOf("-")
  ) {
    return true;
  } else {
    return false;
  }
};

const custom = [validator, `Your number is incorrect`];

const PhoneSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: custom,
  },
});

PhoneSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Phone", PhoneSchema);
