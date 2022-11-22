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
    this.name = user.name;
    this.surname = user.surname;
    this.address = user.address;
    this.city = user.city;
    this.phone = user.phone;
    this.nif = user.nif;
    this.zip = user.zip;
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

export class CreateProductRequest {
  id: number;
  name: string;
  quantity: number;
  description: string;
  typeProd: string;
  price: number;
  imageUrl: string;
  image: string;
  user: User;

  constructor(product: Product) {
    this.name = product.name;
    this.quantity = product.quantity;
    this.description = product.description;
    this.price = product.price;
    this.imageUrl = product.imageUrl;
    this.image = product.image;
    this.typeProd = product.typeProd;
    this.user = product.user;
  }
}

export class EditProductRequest extends CreateProductRequest {
  constructor(product: Product) {
    super(product);
    this.id = product.id;
  }
}
