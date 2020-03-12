import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Redirect, Route, Link } from 'react-router-dom';
import Authorization from './containers/authorization';
import { Dashbord } from './components/dashboard';
import { Header } from './components/header';
import Profile from './containers/profile';
import Forecast from './containers/forecast';
import ForecastView from './containers/forecast-view-page';
import ForecastLastMessage from './containers/forecast-message-page';
import './App.css';

class App extends Component {
  render() {
    const { auth } = this.props.user;

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/widget/forecast/lastcast" component={ForecastLastMessage} />
          <Route path="/widget/forecast/:token?" component={ForecastView} />
          <>
            <Header title='Фортуна' />
            <Dashbord profile={this.props.profile}>
              <Route exact path="/" component={Home} />
              <Route path="/profile" component={Profile} />
              <Route path="/login" component={Authorization} />
              <PrivateRoute path="/forecast" authed={auth} component={Forecast} />
            </Dashbord>
          </>
        </Switch>
      </BrowserRouter>
    );
  }
}

function Home() {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Фортуна - коробка с предсказаниями</title>
      </Helmet>
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
    </div>
  );
}

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
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

const mapStateToProps = function (store) {
  return {
    user: store.user,
    profile: store.profile
  };
}

export default connect(mapStateToProps)(App);
