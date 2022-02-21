package com.privado.invitaciones.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.privado.invitaciones.models.Person;
import com.privado.invitaciones.repository.PersonRepository;

@Service
public class PersonServiceImp implements PersonService {

	@Autowired
	PersonRepository personRepository;

	@Override
	public List<Person> getPeopleList() {
		return personRepository.findAll();
	}

	@Override
	public Person newPerson(Person person) {

		Person personToList = new Person();

		personToList.setDni(person.getDni() == null ? 0 : person.getDni());
		personToList.setName(person.getName() == null ? "" : person.getName());
		personToList.setLastName(person.getLastName() == null ? "" : person.getLastName());
		personToList.setBirthday(person.getBirthday() == null ? "" : person.getBirthday());
		personToList.setPhone(person.getPhone() == null ? "" : person.getPhone());
		personToList.setAddress(person.getAddress() == null ? "" : person.getAddress());
		personToList.setInvited(false);

		personToList = personRepository.save(personToList);

		return personToList;
	}

	@Override
	public Person editPerson(Person person) {
		person = personRepository.save(person);
		return person;
	}

	@Override
	public Person deletePerson(int personId) {
		Person personToDelete = null;
		try {			
			personToDelete = personRepository.findById(personId).get();
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		if(personToDelete != null) {			
			personRepository.delete(personToDelete);
		}
		return personToDelete;
	}

	@Override
	public Person addPersonToParty(Person person) {
		person.setInvited(true);
		person = personRepository.save(person);
		return person;
	}

	@Override
	public Person removePersonParty(Person person) {
		person.setInvited(false);
		person = personRepository.save(person);
		return person;
	}

}
