import React from 'react';
import styled from './header.module.scss';

export const Header = ({ title = '' }) => {

    return (
        <header className={styled.container}>
            <h1>{title}</h1>
        </header>
    )
}