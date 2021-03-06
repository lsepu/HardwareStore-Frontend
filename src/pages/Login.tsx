import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "../firebase";
import { stateType } from "../state/store";

interface ICredentials {
  email: string;
  password: string;
}

const Login = () => {
  const user = useSelector((state: stateType) => state.user.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user.email !== "") {
      navigate("/stock");
    } else {
      navigate("/login");
    }
  }, [user]);

  const [loginInput, setLoginInput] = useState<ICredentials>({
    email: "",
    password: "",
  });

  const loginUser = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginInput.email.toString(),
        loginInput.password.toString()
      );
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      reportError({ message });
    }
  };

  const loginWithGoogle = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const googleUser = await signInWithGoogle();
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      reportError({ message });
    }
  };

  const setLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInput({
      ...loginInput,
      [e.target.name]: [e.target.value],
    });
  };

  return (
    <div className="container">
      <div className="row m-b-none">
        <h2
          className="center-align red-text darken-4"
          style={{ fontWeight: "600" }}
        >
          Don Raul’s Hardware store
        </h2>

        <form>
          <div className="input-field">
            <input
              className="validate"
              type="email"
              name="email"
              id="email"
              value={loginInput.email}
              onChange={setLogin}
            />
            <label htmlFor="email">Enter your email</label>
          </div>

          <div className="input-field ">
            <input
              className="validate"
              type="password"
              name="password"
              value={loginInput.password}
              onChange={setLogin}
            />
            <label htmlFor="password">Enter your password</label>
          </div>
          <button
            onClick={loginUser}
            className="col s12 btn btn-large m-md red accent-2"
          >
            Login
          </button>

          <button
            style={{ marginBottom: "30px" }}
            type="button"
            className="col s12 m-md btn btn-large login-with-google-btn"
            onClick={loginWithGoogle}
          >
            Sign in with Google
          </button>

          <div>
            <p>
              {" "}
              For testing purposes: you can use email - donraul@mail.com and
              password - 123456
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
