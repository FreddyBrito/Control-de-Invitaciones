import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Person } from 'src/app/Models/person';
import { PersonServiceService } from 'src/app/Services/person-service.service';

declare var window:any;

@Component({
  selector: 'app-people-management',
  templateUrl: './people-management.component.html',
  styleUrls: ['./people-management.component.css']
})
export class PeopleManagementComponent implements OnInit {

  PEOPLE_LIST : string = 'list-people'
  GUEST_LIST : string = 'list-guest'

  formDni : number = 0
  formName : string = ''
  formLastName : string = ''
  formBirthday : string = ""
  formAddress : string = ''
  formPhone : string = ''

  formModal:any;
  
  people : Person[] = []
  personToUpdate : Person = new Person(0, 0, '', '', '', '', '', false);
  listPosibleGuess : Person[] = []
  guestList : Person[] = []


  constructor(private personServiceService : PersonServiceService) { 

    this.getPeopleList()
    this.getGuestList()
  }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );
  }

  getPeopleList(){
    let newListPossible : Person[] = []
    this.personServiceService.getPeopleList().subscribe(data => {
      data.forEach( p => { if(!p.invited){ newListPossible.push(p) } })
    })
    this.people = newListPossible
  }

 
  getGuestList(){
    let newListGuess : Person[] = []
    this.personServiceService.getPeopleList().subscribe(data => {
      data.forEach( p => { if(p.invited){ newListGuess.push(p) } })
    })
    this.guestList = newListGuess
    }



  drop(event: CdkDragDrop<Person[]>) {
    console.log("El contenedor origen: " + event.previousContainer.id)
    console.log("El contenedor destino: " + event.container.id)
    console.log(event.currentIndex)

    let temporalPerson : Person 
    
    if(event.previousContainer.id === this.PEOPLE_LIST && event.container.id === this.GUEST_LIST){
      temporalPerson =  this.people[event.previousIndex]
      console.log("GUARDAR DATOS a lista de Invitados")
      console.log("NOMBRE:" + temporalPerson.name)
      this.goPartyPerson(temporalPerson)
      this.refresh()
    }
    
    if(event.previousContainer.id === this.GUEST_LIST && event.container.id === this.PEOPLE_LIST){
      temporalPerson = this.guestList[event.previousIndex]
      console.log("BORRAR DATOS de lista de Invitados")
      console.log("NOMBRE:" + temporalPerson.name)
      this.outGuessList(temporalPerson)
      this.refresh()
    } 
  }
  
  openModal(){
    console.log("click abrir modal")
    this.formDni = 0
    this.formName = ''
    this.formLastName = ''
    this.formBirthday = ""
    this.formAddress = ''
    this.formPhone = ''
    this.formModal.show();
  }


  newPerson(person : Person){
    let personToAdd : Person = new Person(0, 0, '', '', '', '', '', false);

    personToAdd.dni = person.dni
    personToAdd.name = person.name
    personToAdd.lastName = person.lastName
    personToAdd.birthday = person.birthday
    personToAdd.address = person.address
    personToAdd.phone = person.phone

    console.log("NUEVA PERSONA")
    this.personServiceService.newPerson(personToAdd)
    .subscribe(data=>{
      personToAdd = data
      console.log("ACTUALIZADA: " + personToAdd.name)})

      this.formModal.hide()
      this.refresh()
  }


  updateDataPerson(person : Person){
    console.log("GUARDAR CAMBIOS")
    console.log(person)
    this.personServiceService.editPerson(person)
    .subscribe(data=>{
      this.personToUpdate = data
      console.log("ACTUALIZADA: " + person.name)})
  }


  saveChages(person : Person){
    let personToModify : Person = person;

    if(personToModify.id === 0) {
       this.newPerson(personToModify)
    } else {
      this.updateDataPerson(personToModify)
    }
      this.formModal.hide()
      this.refresh() 
  }


  editPerson(person : Person){
    console.log("EDITAR: " + person.name)
    this.openModal()
    this.formDni = person.dni
    this.formName = person.name
    this.formLastName = person.lastName
    this.formBirthday = person.birthday
    this.formAddress = person.address
    this.formPhone = person.phone

    this.personToUpdate = person

  }


  deletePerson(person : Person){
    if(confirm('Seguro quieres eliminar esta persona?')){
      console.log("BORRAR: " + person.name)
      this.personServiceService.deletePerson(person)
      .subscribe(data=>{
        this.people = this.people.filter(p => p !== person )
        console.log("BORRADA: " + person.name)})
      }
  }


  goPartyPerson(person : Person){    
    this.personServiceService.addPersonToParty(person)
    .subscribe(data=>{ console.log("Persona Invitada: " + data.name) });
    this.formModal.hide();
  }


  outGuessList(person : Person){
    this.personServiceService.removePersonParty(person)
    .subscribe(data=>{ console.log("Persona retirada de lista: " + data.name) });
    this.formModal.hide();
  }


  refresh(): void {
    window.location.reload();
}
}
