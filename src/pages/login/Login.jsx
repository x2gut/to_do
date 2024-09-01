import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./login.css";
import loginUser from "../../utils/requests/loginUser";
import DisplayErrors from "../../components/displayErrors/DisplayErrors";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  const changeUsernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const changePasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loginData = await loginUser(username, password);
    if (loginData) {
      setErrors([loginData]);
      setIsLogged(false);
    } else {
      setErrors([]);
      setIsLogged(true);
    }
  };

  useEffect(() => {
    if (isLogged) {
      navigate("/tasks");
    }
  }, [isLogged, navigate]);

  return (
    <div className="login">
      <div className="login-container">
        <a href="/tasks" className="login-back">
          <svg
            viewBox="-17.76 -17.76 83.52 83.52"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <title>arrow-back-solid</title>{" "}
              <g id="Layer_2" data-name="Layer 2">
                {" "}
                <g id="invisible_box" data-name="invisible box">
                  {" "}
                  <rect width="48" height="48" fill="none"></rect>{" "}
                </g>{" "}
                <g id="Q3_icons" data-name="Q3 icons">
                  {" "}
                  <path d="M19.7,6a.9.9,0,0,0-.8.4L2.4,23.1a1.5,1.5,0,0,0,0,2L18.9,41.6a.9.9,0,0,0,.8.4,1.2,1.2,0,0,0,1.1-1.3V31c15.7.7,21.1,3.8,23.5,9.2.4.8.8,1.1,1.1,1.1s.6-.4.6-1c-.2-10.5-10-20.9-25.2-22.4V7.3A1.2,1.2,0,0,0,19.7,6Z"></path>{" "}
                </g>{" "}
              </g>{" "}
            </g>
          </svg>
        </a>
        <form
          action=""
          className="login-form"
          method="post"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            id="name"
            name="username"
            placeholder="User name"
            onChange={changeUsernameHandler}
          />

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={changePasswordHandler}
          />
          <DisplayErrors errors={errors} />
          <button className="login-submit">Log in</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
