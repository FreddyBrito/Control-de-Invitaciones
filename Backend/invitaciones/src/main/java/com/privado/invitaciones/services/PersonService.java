package com.privado.invitaciones.services;

import java.util.List;

import com.privado.invitaciones.models.Person;

public interface PersonService {
	
	List<Person> getPeopleList();

	Person newPerson(Person person);

	Person editPerson(Person person);

	String deletePerson(Person persona);
	
	Person addPersonToParty(Person person);
	
	Person removePersonParty(Person person);

}
