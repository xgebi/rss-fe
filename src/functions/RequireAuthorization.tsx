import {useRecoilState} from "recoil";
import {UserState} from "../atoms/user";
import {Navigate} from "react-router-dom";
import UserService from "../services/UserService";
import {useState} from "react";

export const RequireAuthorization = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useRecoilState(UserState);
  const [loading, setLoading] = useState(true);

  if (sessionStorage.getItem('token')) {
    if (user.id.length === 0) {
      return <Navigate to={'/login'} replace={false}/>;
    }
  } else {
    return <Navigate to={'/login'} replace={false}/>;
  }

  if (user.id.length === 0) {
    setLoading(true);
    UserService.fetchUserData()
      .then((data) => {
        setUser(data);
        setLoading(false)
      })

  }
  if (loading) {
    return children;
  } else {
    return <p>Please, wait, loading user data</p>
  }
}
