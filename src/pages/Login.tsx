const Login = () => {
  return (
    <div className="container">
      <div className="row m-b-none">
        <h2 className="center-align black-text darken-4">
          Don Raul’s Hardware store
        </h2>
        <form method="post">
          <div className="input-field">
            <input className="validate" type="email" name="email" id="email" />
            <label htmlFor="email">Enter your email</label>
          </div>
          <div className="input-field ">
            <input
              className="validate"
              type="password"
              name="password"
              id="password"
            />
            <label htmlFor="password">Enter your password</label>
          </div>
          <button className="col s12 btn btn-large m-md indigo">Login</button>
          <button style={{marginBottom: "30px"}} type="button" className="col s12 m-md btn btn-large login-with-google-btn">
            Sign in with Google
          </button>

          <div ><p> Hint: you can use ... as user </p></div>
        </form>
      </div>
    </div>
  );
};

export default Login;
