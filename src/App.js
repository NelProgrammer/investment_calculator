/* eslint-disable eqeqeq */
import { useState } from 'react';
import AmortisationSchedule from './Components/AmortisationSchedule';
import AppHeader from './Components/AppHeader';
import InputForm from './Components/InputForm';

import Style from './Components/AmortisationSchedule.module.css';
import logo from './assets/investment-calculator-logo.png';

function App() {
  //const [isUpated, setIsUpated] = useState(false);
  const [yearlyData, setYearlyData] = useState([]);
  //const yearlyData = []; // per-year results
  const calculateHandler = (userInput) => {
    // Should be triggered when form is submitted
    // You might not directly want to bind it to the submit event on the form though...

    let currentSavings = +userInput.currentSavings; // feel free to change the shape of this input object!
    const yearlyContribution = +userInput.yearlyContribution; // as mentioned: feel free to change the shape...
    const expectedReturn = +userInput.expectedReturn / 100;
    const duration = +userInput.duration;

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      setYearlyData((prevData) => [
        ...prevData,
        {
          year: i + 1,
          yearlyInterest: yearlyInterest,
          savingsEndOfYear: currentSavings,
          yearlyContribution: yearlyContribution,
        },
      ]);
    }
  };

  const handleClear = () => {
    setYearlyData([]);
  };

  return (
    <div className="container">
      <AppHeader appLogo={logo}></AppHeader>
      <InputForm
        onCalculate={calculateHandler}
        onReset={handleClear}
      ></InputForm>
      {yearlyData.length <= 0 && (
        <h3 className={Style['noResult']}>No Amortisation Data Available</h3>
      )}
      {yearlyData && yearlyData.length > 0 && (
        <AmortisationSchedule
          yearlyData={yearlyData}
          //isUpated={isUpated}
          calculateHandler={calculateHandler}
        ></AmortisationSchedule>
      )}
      ;
    </div>
  );
}

export default App;
