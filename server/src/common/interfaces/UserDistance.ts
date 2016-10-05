import {User} from "../../models/User";

export interface UserDistance extends User {
    dis: number;
    obj: User;
}