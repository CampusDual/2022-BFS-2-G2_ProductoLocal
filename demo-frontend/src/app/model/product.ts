import { User } from "./user";

export class Product{
    id:number;
    name:string;
    quantity:number;
    description:string;
    type_prod:string;
    price:number;
    user:User;
}