import React, {useState} from 'react';

import './login.css';
import {Button} from "../components/shared/Button";
import {Input} from "../components/shared/Input";
import {Error} from "../components/shared/Error";
import UserService from "../services/UserService";
import {useRecoilState} from "recoil";
import {UserState} from "../atoms/user";
import {useNavigate} from "react-router-dom";
import ErrorTypes from "../types/ErrorTypes";


export const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [user, setUser] = useRecoilState(UserState);
  let navigate = useNavigate();

  async function login() {
    const result = await UserService.authenticate({username, password});
    if (result.id.length === 0) {
      setError(true);
    }
    setUser(result);
    navigate("/", { replace: true })
  }

  return (
    <form>
      <Error type={ErrorTypes.ERROR} message={"Couldn't log in"} />
      <Input type={"text"} label={"Email"} value={username} onChange={setUsername} />
      <Input type={"password"} label={"Password"} value={password} onChange={setPassword} />
      <Button label={"Login"} onClick={login}/>
    </form>
  )
}
