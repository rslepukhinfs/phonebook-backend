const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// Homepage
app.get("/", (req, res) => res.send("<h1>Phonebook</h1>"));

// Get all persons
app.get("/api/persons", (req, res) => res.json(persons));

// Get single person
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);

  if (person) {
    res.send(person);
  } else {
    res.status(404).end();
  }
});

// Add person
app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name) {
    return res.status(400).json({
      error: "Name is missing",
    });
  }

  if (!body.number) {
    return res.status(400).json({
      error: "Number is missing",
    });
  }

  if (persons.find((p) => p.name.toLowerCase() === body.name.toLowerCase())) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 100),
  };

  persons = persons.concat(newPerson);
  res.json(persons);
});

// Delete person
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log(id);
  persons = persons.filter((p) => p.id !== id);

  res.status(204).end();
});

// Info page
app.get("/info", (req, res) => {
  const time = new Date().toString();
  res.send(`
    <p>Phonebook has info about ${persons.length} peolpe.</p>
    <p>${time}</p>
  `);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
