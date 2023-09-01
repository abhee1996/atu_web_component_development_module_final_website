import React, { Component } from "react";
import { fetchURL } from "../../url";
import axios from "axios";

var authURL = `${fetchURL}/login/`;
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" }; 
    this.login = this.login.bind(this);
  }

  login = async () => {
    let authVal = {
      email: this.state.email,
      password: this.state.password,
    };
    await axios.post(authURL, authVal).then((response) => {
      if (response.status == 200) {
        localStorage.setItem("authCredentials", JSON.stringify(authVal));
        this.props.history.push("/admin");
        window.location.reload(false);
      }
    });
  };
  componentDidMount() {
    this.login();
  }
  render() {
    return (
      <>
        <div>
          <div>
            <label>Email</label>
            <input
              onChange={(e) => {
                console.log("email", e.target.value);
                this.setState({ email: e.target.value });
              }}
              type="email"
              name="email"
              placeholder="email"
              id="email"
              required
            />
          </div>
          <div>
            <label>
              password
              <i className="fas fa-lock"></i>
            </label>
            <input
              onChange={(e) => {
                this.setState({ password: e.target.value });
              }}
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <input onClick={this.login} type="submit" value="Login" />
        </div>
      </>
    );
  }
}

export default Login;
