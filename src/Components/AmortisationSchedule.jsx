import React, { useState } from 'react';
import Style from './AmortisationSchedule.module.css';

const AmortisationSchedule = (props) => {
  return (
    <div>
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
        <tbody className={Style['result tbody']}>
          {props.yearlyData.map((periodData) => (
            <tr key={periodData.year}>
              <td>{periodData.year}</td>
              <td>{periodData.savingsEndOfYear}</td>
              <td>{periodData.yearlyInterest}</td>
              <td>{periodData.yearlyContribution}</td>
              <td>{periodData.savingsEndOfYear - periodData.yearlyInterest}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AmortisationSchedule;
