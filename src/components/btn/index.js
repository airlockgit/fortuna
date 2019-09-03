import React, { Component } from 'react';
import classNames from 'classnames/bind';
import PropTypes from "prop-types";
import styled from './button.module.scss';

export class Button extends Component {
  static propTypes = {
    title: PropTypes.string,
    clickButton: PropTypes.func,
    className: PropTypes.string,
  };

  _onClickButton = () => {
    if (typeof this.props.clickButton === 'function') {
      this.props.click();
    }
  }

  render() {
    let { title = 'Название кнопки!', classes = {} } = this.props;

    return (
      <span className={classNames(styled.container, classes.container)}>
        <button className={classNames(styled.default, classes.button)} type="submit" onClick={this._onClickButton}>{title}</button>
      </span>
    );
  }
}
