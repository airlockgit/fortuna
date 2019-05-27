import React, { Component } from 'react';
import PropTypes from "prop-types";

export class BtnLogin extends Component {
  static propTypes = {
       title: PropTypes.string,
       clickButton: PropTypes.func,
       className: PropTypes.string,
   };

  _onClickButton = () => {
    if(typeof this.props.clickButton === 'function') {
      this.props.clickButton();
    }
  }

  render() {
    let title = this.props.title != null ? this.props.title : 'title=';
    let className = this.props.className != null ? this.props.className : '';

    return (
      <span className="btn-white">
        <button className={className + ' default_button'} type="submit" onClick={this._onClickButton}>{title}</button>
      </span>
    );
  }
}
