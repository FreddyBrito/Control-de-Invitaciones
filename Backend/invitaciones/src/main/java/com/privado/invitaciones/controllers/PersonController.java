package com.privado.invitaciones.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.privado.invitaciones.models.Person;
import com.privado.invitaciones.services.PersonService;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping({"/v1"})
public class PersonController {

	@Autowired
	PersonService personService;
	
	@GetMapping("/people")
	@ResponseBody
	public List<Person> getPeopleList(){
		return personService.getPeopleList();
	}
	
	@PostMapping("/newPerson")
	@ResponseBody
	public Person newPerson(@RequestBody Person person){
		person = personService.newPerson(person);
		return person;
	}
	
	@PatchMapping("/editPerson")
	@ResponseBody
	public Person editPerson(@RequestBody Person person){
		person = personService.editPerson(person);
		return person;
	}
	
	@PatchMapping("/addPersonToParty")
	@ResponseBody
	public Person addPersonToParty(@RequestBody Person person){
		person = personService.addPersonToParty(person);
		return person;
	}
	
	@PatchMapping("/removePersonParty")
	@ResponseBody
	public Person removePersonParty(@RequestBody Person person){
		person = personService.removePersonParty(person);
		return person;
	}
	
	@DeleteMapping(path= {"/deletePerson/{id}"})
	@ResponseBody
	public Person deletePerson(@PathVariable("id") int id){
		return personService.deletePerson(id);
	}

}
