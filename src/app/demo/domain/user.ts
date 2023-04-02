import { AppRole } from "./appRole";

export class User {
    id?: string;
    username?: string;
    email?: string;
    password?: string;
    appRoles?: Array<AppRole>;
   
    
}
