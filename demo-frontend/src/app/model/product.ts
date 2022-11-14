import { User } from "./user";

export class Product{
    id:number;
    name:string;
    quantity:number;
    description:string;
    typeProd:string;
    price:number;
    imageUrl: string;
    image: string;
    user:User;
}