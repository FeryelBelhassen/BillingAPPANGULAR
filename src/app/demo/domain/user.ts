import { Role } from "./Role";
import { Roles } from "./roles";

export class User {
    id?: string;
    username?: string;
    email?: string;
    password?: string;
    appRoles?: Array<Role>

      
}
