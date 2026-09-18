const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.static("dist"));
app.use(express.json());
app.use(cors());

let notes = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello, World!</h1>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
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

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  notes = notes.filter((note) => note.id !== id);

  res.status(204).end();
});

app.post("/api/notes", (req, res) => {
  const note = req.body;
  res.json(note);
});

app.get("/info", (req, res) => {
  res.set("Content-Type", "text/plain");
  res.send(`Phonebook has info for ${notes.length} people\n${new Date()}`);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
