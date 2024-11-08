export class User{
    id: number;
    name: string;
    cpf: string;
    email: string;

    constructor(user : IUser){
        this.cpf = user.cpf;
        this.email = user.email;
        this.name = user.name;
        this.id = user.id;
    }

}

interface IUser{
    id: number;
    name: string;
    cpf: string;
    email: string;
}