/* eslint-disable eqeqeq */
import AppHeader from './Components/AppHeader';
import InputForm from './Components/InputForm';

//import './index.css';
import Style from './App.module.css';
import logo from './assets/investment-calculator-logo.png';

function App() {
  return (
    <div className={Style['container']}>
      <AppHeader appLogo={logo}></AppHeader>
      <InputForm
      //onReset={handleClear}
      ></InputForm>
    </div>
  );
}

export default App;
