package com.privado.invitaciones.services;

import java.util.List;

import com.privado.invitaciones.models.Person;

public interface PersonService {
	
	List<Person> getPeopleList();

	Person newPerson(Person person);

	Person editPerson(Person person);

	Person deletePerson(int personId);
	
	Person addPersonToParty(Person person);
	
	Person removePersonParty(Person person);

}
