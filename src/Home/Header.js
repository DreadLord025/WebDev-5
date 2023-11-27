import React from "react";
import logo from "../logo.svg";
import { Link } from "react-router-dom";
import Login from "../LogOut/Login";
import Logout from "../LogOut/Logout";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
  }

  handleLoginClick = () => {
    this.setState({ isLoggedIn: true });
  };

  handleLogoutClick = () => {
    this.setState({ isLoggedIn: false });
  };

  render() {
    const { isLoggedIn } = this.state;
    return (
      <header className="App-header">
        <div className="logoPosition">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="menu">
          <Link to="/debug">Debug</Link>
          <Link to="/">Головна</Link>
          <Link to="/about">Про нас</Link>
          <Link to="/contact" style={{ marginBottom: "10px" }}>
            Контакти
          </Link>
          {isLoggedIn ? (
            <Logout onLogoutClick={this.handleLogoutClick} />
          ) : (
            <Login onLoginClick={this.handleLoginClick} />
          )}
        </div>
      </header>
    );
  }
}

export default Header;
