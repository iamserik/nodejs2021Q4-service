import { v4 as uuidv4 } from 'uuid';
import { User } from "../../interfaces/User";

/** @implements {User} */
export class UserModel implements User {
  /** @type {string} */
  id: string;

  /** @type {string} */
  name: string;

  /** @type {string} */
  login: string;

  /** @type {string} */
  password: string;

  /**
   * User model class
   *
   * @param user - object
   */
  constructor(user: User) {
    this.id = user.id ? user.id : uuidv4();
    this.name = user.name;
    this.login = user.login;
    this.password = user.password;
  }
}
