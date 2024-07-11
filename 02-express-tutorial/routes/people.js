const express = require('express')
const router = express.Router()
let { people } = require('../data');
// Below line is for so that the route calls the controller function you create. 
const { getPeople,  addPerson, findPersonById, updatePerson, deletePerson } = require("../controllers/people.js");

router.get('/', getPeople)

router.get('/:id', findPersonById)

router.post('/', addPerson)

router.put('/:id', updatePerson)

router.delete('/:id', deletePerson)

module.exports = router