import {LoginDetails} from "../types/LoginDetails";
import {User} from "../types/User";


class UserRepository {
  static async authenticate(userDetails: LoginDetails): Promise<User> {

    const tempResponse = await fetch(`/api/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userDetails),
    });
    const response: User = await tempResponse.json();
    sessionStorage.setItem('token', response.token);
    return response;
  }

  static async fetchUserData() {
    const tempResponse = await fetch(`/api/current-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${sessionStorage.getItem('token')}`
      },
    });
    const response = await tempResponse.json();
    return response;
  }
}

export default UserRepository;