const PhonesRouter = require('express').Router()
const Phone = require('../models/phone')

PhonesRouter.get('/', (request, response) => {
  Phone.find({}).then((Phones) => {
    response.json(Phones)
  })
})

PhonesRouter.get('/:id', (request, response, next) => {
  Phone.findById(request.params.id)
    .then((Phone) => {
      if (Phone) {
        response.json(Phone)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

PhonesRouter.post('/', (req, res, next) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number missing' })
  }

  const person = new Phone({
    name: body.name,
    number: body.number,
  })

  person
    .save()
    .then((savedNote) => {
      res.json(savedNote)
    })
    .catch((err) => next(err))
})

PhonesRouter.delete('/:id', (request, response, next) => {
  Phone.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

PhonesRouter.put('/:id', (request, response, next) => {
  const { name, number } = request.body

  Phone.findById(request.params.id)
    .then((Phone) => {
      if (!Phone) {
        return response.status(404).end()
      }

      Phone.name = name
      Phone.number = number

      return Phone.save().then((updatedPhone) => {
        response.json(updatedPhone)
      })
    })
    .catch((error) => next(error))
})

module.exports = PhonesRouter
