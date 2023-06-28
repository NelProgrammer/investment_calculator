/* eslint-disable eqeqeq */
import React, { useState } from 'react';
import AmortisationSchedule from './AmortisationSchedule';
import Style from './InputForm.module.css';

const InputForm = (props) => {
  //const [yearlyData, setYearlyData] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [enteredCurrentSavings, setEnteredCurrentSavings] = useState();
  const [enteredYearlySavings, setEnteredYearlySavings] = useState();
  const [enteredReturn, setEnteredReturn] = useState();
  const [enteredDuration, setEnteredDuration] = useState();
  const [isError, setIsError] = useState(false);

  const handleChangeCurrentSavings = (event) => {
    setEnteredCurrentSavings(event.target.value);
    setIsError(false);
  };
  const handleChangeYearlySavings = (event) => {
    setEnteredYearlySavings(event.target.value);
    setIsError(false);
  };
  const handleChangeReturn = (event) => {
    setEnteredReturn(event.target.value);
    setIsError(false);
  };
  const handleChangeDuration = (event) => {
    setEnteredDuration(event.target.value);
    setIsError(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    let isV = isValidData();
    if (isV) {
      const userFormInput = {
        currentSavings: enteredCurrentSavings,
        yearlyContribution: enteredYearlySavings,
        expectedReturn: enteredReturn,
        duration: enteredDuration,
      };
      setUserInput({ ...userFormInput });
    }
  };

  const isValidData = () => {
    if (
      (enteredCurrentSavings !== undefined) &
      (enteredCurrentSavings !== '') &
      !isNaN(+enteredCurrentSavings) &
      (enteredYearlySavings !== undefined) &
      (enteredYearlySavings !== '') &
      !isNaN(+enteredYearlySavings) &
      (enteredReturn !== undefined) &
      (enteredReturn !== '') &
      !isNaN(+enteredReturn) &
      (enteredDuration !== undefined) &
      (enteredDuration !== '') &
      !isNaN(+enteredDuration)
    ) {
      setIsError(false);
      return true;
    } else {
      setIsError(true);
      return false;
    }
  };

  const handleReset = (event) => {
    props.onReset();
    setIsError(false);
  };

  return (
    <div className={Style['container']}>
      <form className={Style['form']} onSubmit={handleFormSubmit}>
        <div className={`${Style['input-group']} ${isError && Style.invalid}`}>
          <p>
            <label htmlFor="current-savings">Current Savings ($)</label>
            <input
              type="number"
              id="current-savings"
              onChange={handleChangeCurrentSavings}
            />
          </p>
          <p>
            <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
            <input
              type="number"
              id="yearly-contribution"
              onChange={handleChangeYearlySavings}
            />
          </p>
        </div>
        <div className={`${Style['input-group']} ${isError && Style.invalid}`}>
          <p>
            <label htmlFor="expected-return">
              Expected Interest (%, per year)
            </label>
            <input
              type="number"
              id="expected-return"
              onChange={handleChangeReturn}
            />
          </p>
          <p>
            <label htmlFor="duration">Investment Duration (years)</label>
            <input
              type="number"
              id="duration"
              onChange={handleChangeDuration}
            />
          </p>
        </div>
        <p className={Style['actions']}>
          <button type="reset" className={Style['buttonAlt']}>
            Reset
          </button>
          <button type="submit" className={Style['button']}>
            Calculate
          </button>
        </p>
      </form>
      <AmortisationSchedule userInput={userInput}></AmortisationSchedule>
    </div>
  );
};

export default InputForm;
