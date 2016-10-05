import {User} from "./User";

export interface UserDistance extends User {
    dis: number;
    obj: User;
}
