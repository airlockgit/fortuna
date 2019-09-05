import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import { Button } from '../../components/btn';
import { Link } from 'react-router-dom';
import * as createActions from '../../actions';
import * as profileActions from '../../actions/profile';
import Preloader from '../../components/preloader';
import '../../containers/profile/style.css';
import axios from 'axios';


class Profile extends Component {
  constructor(props) {
    super(props);
  }


  _outLogin = () => {
    console.log('sdsd');
    this.props.ResetUser();
  }

  render() {
    return (
      <div className="profile">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Личный кабинет</title>
        </Helmet>
        <div className="profile__bord">
          Добро пожаловать {this.props.user.name.value}
        </div>
        <ul>
          <li>Доступные игры:</li>
          <li><Link to="/forecast">Предсказания</Link></li>
        </ul>
        <Button title="Выйти" click={this._outLogin} />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  user: store.user,
  profile: store.profile
});

const mapDispatchToProps = dispatch => ({
  ResetUser() {
    dispatch(createActions.ResetUser());
  },
  setWidget(widget) {
    dispatch(profileActions.setWidget(widget));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);