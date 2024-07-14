const express = require('express')
const router = express.Router()
let { people } = require('../data');

const getPeople = (req, res) => {
    res.json(people);
}

const findPersonById = (req, res) => {

    // req.params is for capture route parameters from the URL path. It is defined in the route path using colon (:) followed by a parameter name (:parameter).
    // req.body is to receive data from post put patch

    // const { name } = req.params //a string
    const personId = req.params.id

    const person = people.find((person) => person.id === Number(personId))

    if(!person) {
        return res.status(404).json({ success: false, message: `no person with id ${personId}`})
    }
    res.status(200).json({ success: true, data: person})
}

const addPerson = (req, res) => {
    const {name} = req.body;
    if(!name) {
        return res.status(400).json({ success: false, message: "Please provide a name" });
    }
    people.push({ id: people.length + 1, name: req.body.name})
    res.status(201).json({ success: true, name: req.body.name})
    // The HTTP status code 201 means that an object was created on the server side.
}


const updatePerson = (req, res) => {
    const { id } = req.params
    const { name } = req.body //a string

    const person = people.find((person) => person.id === Number(id))

    if(!person) {
        return req.status(404).json({ success: false, message: `no person with id ${id}`})
    }
    const newPeople = people.map((person) => {
        if(person.id === Number(id)) {
            person.name = name
        } 
        return person
    })

    res.status(200).json({ success: true, data: newPeople})
}

const deletePerson = (req, res) => {
    const person = people.find((person) => person.id === Number(req.params.id))
    if (!person) {
      return res
        .status(404)
        .json({ success: false, msg: `no person with id ${req.params.id}` })
    }
    const newPeople = people.filter(
      (person) => person.id !== Number(req.params.id)
    )
    return res.status(200).json({ success: true, data: newPeople })
  }

module.exports = {
    addPerson, 
    findPersonById, 
    getPeople, 
    updatePerson,
    deletePerson
};
