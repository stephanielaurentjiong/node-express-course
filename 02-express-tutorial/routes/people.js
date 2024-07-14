const express = require('express')
const router = express.Router()
let { people } = require('../data');
// Below line is for so that the route calls the controller function you create. 
const { getPeople,  addPerson, findPersonById, updatePerson, deletePerson } = require("../controllers/people.js");

router.get('/', getPeople) //works

router.get('/:id', findPersonById) //works

router.post('/', addPerson) //works

router.put('/:id', updatePerson) //works

router.delete('/:id', deletePerson) //works

module.exports = router