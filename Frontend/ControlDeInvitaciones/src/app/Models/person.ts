export class Person {

    id       : number;
    dni      : number;
    name     : string;
    lastName : string;
    birthday : string;
    address  : string;
    phone    : string;
    invited  : boolean;
    

    constructor(id       : number,
                dni      : number,
                name     : string,
                lastName : string,
                birthday : string,
                address  : string,
                phone    : string,
                invited  : boolean){
            this.id = id,
            this.dni = dni
            this.name = name;
            this.lastName = lastName;
            this.birthday = birthday;
            this.address = address;
            this.phone = phone;
            this.invited = invited;
        }
}
