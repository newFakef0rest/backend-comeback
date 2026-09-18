const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 });

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const phoneSchema = new mongoose.Schema({
  name: String,
  phone: Number,
});

const Note = mongoose.model("Note", noteSchema);

const Phone = mongoose.model("Phone", phoneSchema);

if (process.argv.length < 4) {
  Phone.find({}).then((result) => {
    result.forEach((note) => {
      console.log(note);
    });
    mongoose.connection.close();
  });
} else {
  const phone = new Phone({
    name: process.argv[2],
    phone: process.argv[3],
  });
  phone.save().then((result) => {
    console.log(result);
    mongoose.connection.close();
  });
}
