import React from 'react';
import connectToStores from 'alt/utils/connectToStores';
import LoginStore from 'stores/loginStore';
import LoginActions from 'actions/loginActions';

require('../styles/main.styl');

@connectToStores
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user
    }
  }

  static getStores(props) {
    return [LoginStore];
  }

  static getPropsFromStores(props) {
    return LoginStore.getState();
  }

  render() {
    return (
      <section className="login-box">
        <header className="login-header">
          <h1>Log In</h1>
          <h2>Dont have an account? <a href="#sign" className="login-sign">Sign up</a></h2>
        </header>
        <form className="login-content">
          <input type="mail" value={this.props.user.email} onChange={this.handleEmailChange} placeholder="E-mail Address" className="login-mail"/>
          <input type="password" value={this.props.user.pass} onChange={this.handlePasswordChange} placeholder="Password" className="login-pass"/>
          <a href="#forgot" className="login-forgot">Forgot password?</a>
          <button className="login-enter" onClick={this.handleLogin}>Log in    </button>
        </form>
      </section>
    );
  }

  handleEmailChange = evt => {
    this.setState({user: {email: evt.target.value, pass: this.props.user.pass}});
    LoginActions.updateEmail(evt.target.value);
  }

  handlePasswordChange = evt => {
    this.setState({user: {email: this.props.user.email, pass: evt.target.value}});
    LoginActions.updatePass(evt.target.value);
  }

  handleLogin = evt => {
    evt.preventDefault();
    LoginActions.loginUser(this.state.user);
  }
}

export default Login;