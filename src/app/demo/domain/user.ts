
import { ERole } from "./Erole";
import { Role } from "./Role";

export class User {
    id?: number;
    username?: string;
    email?: string;
    password?: string;
    roles: Role[] = []     
    //roles?: Set <Role>; 
}
