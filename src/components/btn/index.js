import React, { Component } from 'react';
import { useClientRect } from '../../hooks';
import classNames from 'classnames/bind';
import PropTypes from "prop-types";
import styled from './button.module.scss';

export class Button extends Component {
  static propTypes = {
    title: PropTypes.string,
    click: PropTypes.func,
    className: PropTypes.string,
  };

  render() {
    return (
      <ButtonTemp {...this.props} />
    );
  }
}

const ButtonTemp = ({ title = 'Название кнопки!', classes = {}, click }) => {
  const _onClickButton = () => {
    click();
  }

  const [rect, ref] = useClientRect();

  return (
    <div className={classNames(styled.container, classes.container)}>
      <button ref={ref} className={classNames(styled.default, classes.button)} type="submit" onClick={_onClickButton}>{title}</button>
    </div>
  )
};
