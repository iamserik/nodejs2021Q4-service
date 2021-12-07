const { v4: uuidv4 } = require('uuid');
import { User } from "../../interfaces/User";

export class UserModel implements User{
  id: string;

  name: string;

  login: string;

  password: string;

  constructor(user: User) {
    this.id = user.id ? user.id : uuidv4();
    this.name = user.name;
    this.login = user.login;
    this.password = user.password;
  }
}
