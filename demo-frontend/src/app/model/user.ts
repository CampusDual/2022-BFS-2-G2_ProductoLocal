import { Profile } from "./profile";

export class User {
    id: number;
    name: string;
    surname: string;
    address: string;
    city: string;
    email: string;
    phone: number;
    nif: string;
    login: string;
    password: string;
    zip: number;
    profiles: Array<Profile>;
}
