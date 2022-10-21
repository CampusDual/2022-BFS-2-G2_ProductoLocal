import { Contact } from '../contact';
import { Product } from '../product';
import { Profile } from '../profile';
import { User } from '../user';

export class QuerySortPaginationRequest {
  query: string;
  pageIndex: number;
  pageSize: number;
  sortDirection: string;
  sortColumn: string;

  constructor(query: string, pageIndex: number, pageSize: number, sortDirection: string, sortColumn: string) {
    this.query = query;
    this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.sortDirection = sortDirection;
    this.sortColumn = sortColumn;
  }
}

export class CreateContactRequest {
  name: string;
  surname1: string;
  surname2: string;
  phone: number;
  email: string;

  constructor(contact: Contact) {
    this.name = contact.name;
    this.surname1 = contact.surname1;
    this.surname2 = contact.surname2;
    this.phone = contact.phone;
    this.email = contact.email;
  }
}

export class CreateUserRequest {
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

  constructor(user: User) {
    this.email = user.email;
    this.login = user.login;
    this.password = user.password;
    this.profiles = user.profiles;
  
  }
}
export class EditUserRequest {
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

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.surname = user.surname;
    this.address = user.address;
    this.city = user.city;
    this.email = user.email;
    this.phone = user.phone;
    this.nif = user.nif;
    this.login = user.login;
    this.zip = user.zip;    
  }
}

export class EditContactRequest extends CreateContactRequest {
  id: number;

  constructor(contact: Contact) {
    super(contact);
    this.id = contact.id;
  }
}

export class CreateProductRequest {
  id: number;
  name: string;
  quantity: number;
  description: string;
  typeProd: string;
  price: number;
  user: User;

  constructor(product: Product) {
    this.name = product.name;
    this.quantity = product.quantity;
    this.description = product.description;
    this.price = product.price;
    this.typeProd = product.typeProd;
    this.user = product.user;
  
  }
}
