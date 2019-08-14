import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import { connect } from 'react-redux';
import { Button } from '../../components/btn';
import * as createActions from '../../actions';
import * as profileActions from '../../actions/profile';
import Preloader from '../../components/preloader';
import '../../containers/profile/style.css';


class Profile extends Component {
  constructor(props){
    super(props);

  }

  _outLogin = () => {
    this.props.ResetUser();
  }

  _switchWidget = () => {
    let widgetType = this.props.profile.widget ? false : true;

    this.props.setWidget(widgetType);
  }

  render(){
      return (
        <div className="profile">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Личный кабинет</title>
            </Helmet>
            <div className="profile__switch-widget-button" title="Переключить в полноэкранный режим" onClick={this._switchWidget}></div>
            <div className="profile__bord">
            </div>
            <Button title="Выйти" clickButton={this._outLogin}/>
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