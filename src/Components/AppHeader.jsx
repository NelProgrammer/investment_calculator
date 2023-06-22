import React from 'react';
import Style from './AppHeader.module.css';

const AppHeader = (props) => {
  return (
    <header className={Style['header']}>
      <img src={props.appLogo} alt="logo" className={Style['header img']} />
      <h1 className={Style['header h1']}>Investment Calculator</h1>
    </header>
  );
};

export default AppHeader;
