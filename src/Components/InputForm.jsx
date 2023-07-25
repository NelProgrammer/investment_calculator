/* eslint-disable eqeqeq */
import React, { useState } from 'react';
import AmortisationSchedule from './AmortisationSchedule';
import Style from './InputForm.module.css';

const InputForm = (props) => {
  const [yearlyData, setYearlyData] = useState([]);
  //const [userInput, setUserInput] = useState();
  const [enteredCurrentSavings, setEnteredCurrentSavings] = useState();
  const [enteredYearlySavings, setEnteredYearlySavings] = useState();
  const [enteredReturn, setEnteredReturn] = useState();
  const [enteredDuration, setEnteredDuration] = useState();
  const [isError, setIsError] = useState(false);
  const [errorLocation, setErrorLocation] = useState({
    enteredCurrentSavings: false,
    enteredYearlySavings: false,
    enteredReturn: false,
    enteredDuration: false,
  });

  const handleChangeCurrentSavings = (event) => {
    const input = event.target.value;
    setEnteredCurrentSavings(input);
    setIsError(false);
    setErrorLocation((prevErrorLocation) => ({
      ...prevErrorLocation,
      enteredCurrentSavings: false,
    }));
  };
  const handleChangeYearlySavings = (event) => {
    const input = event.target.value;
    setEnteredYearlySavings(input);
    setIsError(false);
    setErrorLocation((prevErrorLocation) => ({
      ...prevErrorLocation,
      enteredYearlySavings: false,
    }));
  };
  const handleChangeReturn = (event) => {
    const input = event.target.value;
    setEnteredReturn(input);
    setIsError(false);
    setErrorLocation((prevErrorLocation) => ({
      ...prevErrorLocation,
      enteredReturn: false,
    }));
  };

  const handleChangeDuration = (event) => {
    const input = event.target.value;
    setEnteredDuration(input);
    setIsError(false);
    setErrorLocation((prevErrorLocation) => ({
      ...prevErrorLocation,
      enteredDuration: false,
    }));
  };

  const getYearlyData = (userInput) => {
    let yearlyData = [];
    if (userInput != undefined) {
      let currentSavings = +userInput.currentSavings;
      const yearlyContribution = +userInput.yearlyContribution;
      let totalCumulative = +userInput.currentSavings;
      const expectedReturn = +userInput.expectedReturn / 100;
      const duration = +userInput.duration;
      let totalInterest = 0;

      for (let i = 0; i < duration; i++) {
        const yearlyInterest = currentSavings * expectedReturn;
        currentSavings += yearlyInterest + yearlyContribution;
        totalCumulative += yearlyContribution;
        totalInterest += yearlyInterest;
        let calcData = {
          year: i + 1,
          yearlyInterest: yearlyInterest,
          savingsEndOfYear: currentSavings,
          totalCumulative: totalCumulative,
          totalInterest: totalInterest,
        };
        yearlyData.push(calcData);
      }
    }
    return yearlyData;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    let isV = isValidData();
    if (isV) {
      setErrorLocation({
        enteredCurrentSavings: false,
        enteredYearlySavings: false,
        enteredReturn: false,
        enteredDuration: false,
      });
      const userFormInput = {
        currentSavings: enteredCurrentSavings,
        yearlyContribution: enteredYearlySavings,
        expectedReturn: enteredReturn,
        duration: enteredDuration,
      };
      setYearlyData(getYearlyData(userFormInput));
    } else {
      setErrorLocation({
        enteredCurrentSavings: isErrorInput(+enteredCurrentSavings),
        enteredYearlySavings: isErrorInput(+enteredYearlySavings),
        enteredReturn: isErrorInput(+enteredReturn),
        enteredDuration: isErrorInput(+enteredDuration),
      });
    }
  };

  const isValidData = () => {
    if (
      isErrorInput(enteredCurrentSavings) ||
      isErrorInput(enteredYearlySavings) ||
      isErrorInput(enteredReturn) ||
      isErrorInput(enteredDuration)
    ) {
      setIsError(true);
      return false;
    } else {
      setIsError(false);
      return true;
    }
  };

  const isErrorInput = (inPutToCheck) => {
    if (
      (inPutToCheck === undefined) |
      (inPutToCheck == '') |
      isNaN(+inPutToCheck)
    ) {
      setIsError(true);
      return true;
    } else {
      return false;
    }
  };

  const handleReset = (event) => {
    setIsError(false);
    setErrorLocation({
      enteredCurrentSavings: false,
      enteredYearlySavings: false,
      enteredReturn: false,
      enteredDuration: false,
    });
    setYearlyData([]);

    setEnteredCurrentSavings('');
    setEnteredYearlySavings('');
    setEnteredReturn('');
    setEnteredDuration('');
  };

  return (
    <div className={Style['container']}>
      <form className={Style['form']} onSubmit={handleFormSubmit}>
        <div className="input-div">
          <p
            className={`${Style['input-group']} ${
              errorLocation.enteredCurrentSavings == true && Style.invalid
            }`}
          >
            <label htmlFor="current-savings">Current Savings ($)</label>
            <input
              type="number"
              id="current-savings"
              onChange={handleChangeCurrentSavings}
            />
          </p>
          <p
            className={`${Style['input-group']} ${
              errorLocation.enteredYearlySavings == true && Style.invalid
            }`}
          >
            <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
            <input
              type="number"
              id="yearly-contribution"
              onChange={handleChangeYearlySavings}
            />
          </p>
        </div>
        <div className="input-div">
          <p
            className={`${Style['input-group']} ${
              errorLocation.enteredReturn == true && Style.invalid
            }`}
          >
            <label htmlFor="expected-return">
              Expected Interest (%, per year)
            </label>
            <input
              type="number"
              id="expected-return"
              onChange={handleChangeReturn}
            />
          </p>
          <p
            className={`${Style['input-group']} ${
              errorLocation.enteredDuration == true && Style.invalid
            }`}
          >
            <label htmlFor="duration">Investment Duration (years)</label>
            <input
              type="number"
              id="duration"
              onChange={handleChangeDuration}
            />
          </p>
          {/* className={`${Style['input-group']} ${isError && Style.invalid}`}> */}
          {/* className={`${Style['input-group']} ${isError && Style.invalid}`}> */}
        </div>
        <p className={Style['actions']}>
          <button
            type="reset"
            onClick={handleReset}
            className={Style['buttonAlt']}
          >
            Reset
          </button>
          <button type="submit" className={Style['button']}>
            Calculate
          </button>
        </p>
      </form>
      <div>
        {yearlyData.length <= 0 && (
          <h3 className={Style['no-data']}>No Amortisation Data Available</h3>
        )}
        {yearlyData.length > 0 && (
          <AmortisationSchedule yearlyData={yearlyData}></AmortisationSchedule>
        )}
      </div>
    </div>
  );
};

export default InputForm;
