import React from 'react';
import logo from '../assets/investment-calculator-logo.png';
import Style from './InputForm.module.css';

const AppHeader = () => {
  return (
    <header className={Style['header']}>
      <img src={logo} alt="logo" className={Style['header img']} />
      <h1 className={Style['header img']}>Investment Calculator</h1>
    </header>
  );
};

export default AppHeader;
