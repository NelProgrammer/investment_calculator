/* eslint-disable eqeqeq */
import React, { useState } from 'react';
import Style from './InputForm.module.css';

const InputForm = (props) => {
  const [enteredCurrentSavings, setEnteredCurrentSavings] = useState();
  const [enteredYearlySavings, setEnteredYearlySavings] = useState();
  const [enteredReturn, setEnteredReturn] = useState();
  const [enteredDuration, setEnteredDuration] = useState();

  const handleChangeCurrentSavings = (event) => {
    setEnteredCurrentSavings(event.target.value);
  };
  const handleChangeYearlySavings = (event) => {
    setEnteredYearlySavings(event.target.value);
  };
  const handleChangeReturn = (event) => {
    setEnteredReturn(event.target.value);
  };
  const handleChangeDuration = (event) => {
    setEnteredDuration(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (
      (enteredCurrentSavings != '') |
      (enteredYearlySavings != '') |
      (enteredReturn != '') |
      (enteredDuration != '')
    ) {
      const userFormInput = {
        currentSavings: enteredCurrentSavings,
        yearlyContribution: enteredYearlySavings,
        expectedReturn: enteredReturn,
        duration: enteredDuration,
      };
      props.onCalculate(userFormInput);
    }
  };

  const handleReset = (event) => {
    props.onReset();
  };

  return (
    <form className={Style['form']} onSubmit={handleFormSubmit}>
      <div className="input-group">
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
      <div className="input-group">
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
          <input type="number" id="duration" onChange={handleChangeDuration} />
        </p>
      </div>
      <p className="actions">
        <button type="reset" className="buttonAlt" onClick={handleReset}>
          Reset
        </button>
        <button type="submit" className="button">
          Calculate
        </button>
      </p>
    </form>
  );
};

export default InputForm;
