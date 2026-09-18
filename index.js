const express = require("express");
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
  res.json(notes);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
  console.log(persons);
});

app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const note = notes.find((note) => note.id === id);

  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((note) => note.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  notes = notes.filter((note) => note.id !== id);

  res.status(204).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

const generateId = (items) => {
  const maxId =
    items.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

app.post("/api/notes", (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({ error: "content missing" });
  }

  const note = {
    id: generateId(notes),
    content: body.content,
    important: body.important || false,
  };

  notes = notes.concat(note);
  res.json(note);
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({ error: "name or number missing" });
  }

  const person = {
    id: generateId(persons),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  res.json(person);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
