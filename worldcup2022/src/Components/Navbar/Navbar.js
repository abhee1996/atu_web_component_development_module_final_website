import { Link } from "react-router-dom";
import logo from "../../logos/logo.png";
import { Redirect } from "react-router-dom";

import React, { Component } from "react";
let authCredentials = localStorage.getItem("authCredentials");

class Navbar extends Component {
  logout = async () => {
    await localStorage.removeItem("authCredentials");
    window.location.reload(false);
    this.props.history.push("/");
  };

  render() {
    return (
      <>
        <nav style={styles.navbar}>
          <div>
            <div style={{ marginBottom: 15, marginTop: 5 }}>
              <img src={logo} style={styles.logo} />
            </div>
            <div style={styles.navlinks}>
              <div style={{ margin: 3, marginBottom: 6 }}>
                <Link style={styles.links} to="/">
                  Routes
                </Link>
                {" | "}
                <Link style={styles.links} to="/teams">
                  Teams
                </Link>
                {" | "}
                <Link style={styles.links} to="/players">
                  Players
                </Link>
                {" | "}
                <Link style={styles.links} to="/todays-matches/">
                  Todays
                </Link>
                {" | "}
                <Link style={styles.links} to="/fixture">
                  Fixture
                </Link>
                {" | "}
                <Link style={styles.links} to="/match-result">
                  Result
                </Link>
                {" | "}
                <Link style={styles.links} to="/standing">
                  Standings
                </Link>
                {" | "}
                {authCredentials !== null ? (
                  <>
                    <Link style={styles.links} to="/admin">
                      Admin
                    </Link>
                    {" | "}
                    <button onClick={this.logout}>logout</button>
                  </>
                ) : (
                  <>
                    <Link style={styles.links} to="/login">
                      Logins
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
        <hr style={styles.hr} />
      </>
    );
  }
}

const styles = {
  logo: {
    display: "flex",
    width: 150,
    height: 70,
  },
  navbar: {
    display: "flex",
    justifyContent: "start",
  },
  links: {
    color: "inherit",
    textDecoration: "inherit",
  },
  hr: { marginLeft: 4, marginRight: 3 },

  navlinks: {
    display: "flex",
  },
};
export default Navbar;
