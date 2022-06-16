import {LoginDetails} from "../types/LoginDetails";
import UserRepository from "../repositories/UserRepository";
import {User} from "../types/User";

class UserService {
  static async authenticate(userDetails: LoginDetails): Promise<User>  {
    return UserRepository.authenticate(userDetails);
  }

  static async fetchUserData(): Promise<User>  {
    return UserRepository.fetchUserData();
  }
}

export default UserService;