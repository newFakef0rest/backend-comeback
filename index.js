require("dotenv").config();
const express = require("express");
const Note = require("./models/note");
const Phone = require("./models/phone");
const app = express();
app.use(express.static("dist"));
app.use(express.json());

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
  {
    content: "something",
    important: false,
    id: "9yU5z-nSkPQ",
  },
  {
    content: "new text",
    important: false,
    id: "iuMaD45m9ak",
  },
  {
    content: "new note",
    important: false,
    id: "n_8ug_Uxz-s",
  },
];

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: "1",
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323524",
    id: "2",
  },
  {
    name: "Sobaka sobaka",
    number: "22222222",
    id: "mSMzAD79qrE",
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello, World!</h1>");
});

app.get("/api/notes", (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});

app.get("/api/persons", (req, res) => {
  Phone.find({}).then((phones) => {
    res.json(phones);
  });
});

app.get("/api/notes/:id", (request, response) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((err) => next(err));
});

app.get("/api/persons/:id", (req, res) => {
  Phone.findById(req.params.id)
    .then((phone) => {
      if (phone) {
        res.json(phone);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

app.delete("/api/notes/:id", (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Phone.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// const generateId = (items) => {
//   const maxId =
//     items.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
//   return String(maxId + 1);
// };

app.post("/api/notes", (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({ error: "content missing" });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note.save().then((savedNote) => {
    res.json(savedNote);
  });
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "name or number missing" });
  }

  const person = new Phone({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedNote) => {
    res.json(savedNote);
  });
});

app.put("/api/notes/:id", (request, response, next) => {
  const { content, important } = request.body;

  Note.findById(request.params.id)
    .then((note) => {
      if (!note) {
        return response.status(404).end();
      }

      note.content = content;
      note.important = important;

      return note.save().then((updatedNote) => {
        response.json(updatedNote);
      });
    })
    .catch((error) => next(error));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
