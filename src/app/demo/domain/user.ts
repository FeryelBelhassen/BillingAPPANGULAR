
import { ERole } from "./Erole";
import { Role } from "./Role";

export class User {
    id?: number;
    username?: string;
    email?: string;
    password?: string;
    roles: Role[] = []     
    //roles?: Set <Role>; 
    constructor(id: number, username: string, email: string, password: string, roles: Role[]){
        this.email = email;
        this.id = id
        this.password = password
        this.roles = roles
        this.username = username
    }
}
