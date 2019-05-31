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

  _outLogin = ()=> {
    this.props.ResetUser();
  }

  render(){
      return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Личный кабинет</title>
            </Helmet>
            <BtnLogin title="Выйти" clickButton={()=> this._outLogin()}/>
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
    }
  });

export default connect(mapStateToProps, mapDispatchToProps)(Profile);