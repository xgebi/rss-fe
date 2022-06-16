import {useRecoilState} from "recoil";
import {UserState} from "../atoms/user";
import {Navigate} from "react-router-dom";
import UserService from "../services/UserService";

export const RequireAuthorization = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useRecoilState(UserState);
  async function setUserFn() {
    setUser(await UserService.fetchUserData())
  }
  if (sessionStorage.getItem('token')) {
    if (user.id.length === 0) {
      return <Navigate to={'/login'} replace={true}/>;
    } else {
      setUserFn();
    }
  } else {
    return <Navigate to={'/login'} replace={true}/>;
  }
  return children;
}
