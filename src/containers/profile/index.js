import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import { connect } from 'react-redux';
import { BtnLogin } from '../../components/btn';
import * as createActions from '../../actions';
import Preloader from '../../components/preloader';


class Profile extends Component {
  constructor(props){
    super(props);

  }

  render(){
      return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Личный кабинет</title>
            </Helmet>
        </div>
      );
  }
}

const mapStateToProps = store => ({
    user: store.user
  });
  
  const mapDispatchToProps = dispatch => ({
    setUserAsnc(user) {
          dispatch(createActions.setUserAsnc(user));
    },
    setUserData(name, password){
      dispatch(createActions.setUserData(name, password));
    },
    Loading(load, time) {
          dispatch(createActions.Loading(load, time));
      }
  });

export default connect(mapStateToProps, mapDispatchToProps)(Profile);