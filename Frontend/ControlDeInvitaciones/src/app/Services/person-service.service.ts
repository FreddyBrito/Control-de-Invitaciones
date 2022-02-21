import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../Models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonServiceService {
  
  URL = 'http://localhost:8080/invitaciones/v1/'

  constructor(private http : HttpClient) { }
  

  getPeopleList(){
    let completeUrl = this.URL + "people"
    return this.http.get<Person[]>(completeUrl)
  }

  newPerson(person : Person){
    let completeUrl = this.URL + "newPerson"
    return this.http.post<Person>(completeUrl, person)
  }
  
  editPerson(person : Person){
    let completeUrl = this.URL + "editPerson"
    return this.http.patch<Person>(completeUrl, person)
  }

  addPersonToParty(person : Person){
    let completeUrl = this.URL + "addPersonToParty"
    return this.http.patch<Person>(completeUrl, person)
  }

  removePersonParty(person : Person){
    let completeUrl = this.URL + "removePersonParty"
    return this.http.patch<Person>(completeUrl, person)
  }

  deletePerson(person : Person){
    let completeUrl = this.URL + "deletePerson/" + person.id
    console.log(completeUrl)
    return this.http.delete<Person>(completeUrl)
  }


}