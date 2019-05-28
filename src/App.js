import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Link } from 'react-router-dom';
import Authorization from './containers/authorization';
import Profile from './containers/profile';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Helmet>
            <meta charSet="utf-8" />
            <title>Фортуна - коробка с предсказаниями</title>
        </Helmet>
        <div className="main main-chrom">
          <div className="dashboard">
            <header className="header">
              <h1>Фортуна</h1> 
            </header>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Authorization} />
            <PrivateRoute path="/profile" authed={this.props.user.auth} component={Profile} />
          </div>
        </div>
      </Router>
    );
  }
}

function Home() {
  return (
    <div className="home-authoriz">
      <p>Авторизуйтесь или зарегестрируйтесь, что бы управлять коробкой с предсказаниями</p>
      <ul className="home-authoriz__list">
        <li className="home-authoriz__list-item">
          <Link className="home-authoriz__link home-authoriz__link_login" to="/login">Авторизация</Link>
        </li>
        <li>
          <span className="home-authoriz__link_txt">или</span>
        </li>
        <li className="home-authoriz__list-item">
          <Link className="home-authoriz__link home-authoriz__link_reg" to="/reg">Регистрация</Link>
        </li>
      </ul>
    </div>
  );
}

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render = { props =>
        authed ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

const mapStateToProps = function(store) {
  return {
    user: store.user
  };
}

export default connect(mapStateToProps)(App);
