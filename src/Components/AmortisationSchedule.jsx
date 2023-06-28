import React, { useState } from 'react';
import Style from './AmortisationSchedule.module.css';

const AmortisationSchedule = (props) => {
  const [yearlyData, setYearlyData] = useState([]);

  const getYearlyData = () => {
    let yearlyData = [];
    const userInput = props.userInput;
    let currentSavings = +userInput.currentSavings;
    const yearlyContribution = +userInput.yearlyContribution;
    const expectedReturn = +userInput.expectedReturn / 100;
    const duration = +userInput.duration;

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      let calcData = {
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      };
      yearlyData.push(calcData);
      //setYearlyData((prevData) => [...prevData, calcData]);
    }
    return yearlyData;
  };

  //setYearlyData(getYearlyData);
  const tBody = getYearlyData().map((periodData) => (
    <tr key={periodData.year}>
      <td>{periodData.year}</td>
      <td>{periodData.savingsEndOfYear}</td>
      <td>{periodData.yearlyInterest}</td>
      <td>{periodData.savingsEndOfYear + periodData.yearlyInterest}</td>
      <td>{periodData.yearlyContribution}</td>
    </tr>
  ));
  return (
    <div>
      {tBody === undefined && (
        <h3 className={Style['no-data']}>No Amortisation Data Available</h3>
      )}
      {tBody.length > 0 && (
        <table className={Style['result']}>
          <thead className={Style['result thead']}>
            <tr>
              <th>Year</th>
              <th>Total Savings</th>
              <th>Interest (Year)</th>
              <th>Total Interest</th>
              <th>Invested Capital</th>
            </tr>
          </thead>
          <tbody className={Style['result tbody']}>{tBody}</tbody>
        </table>
      )}
    </div>
  );
};

export default AmortisationSchedule;
