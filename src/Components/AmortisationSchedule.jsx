import React, { useState } from 'react';
import Style from './AmortisationSchedule.module.css';

const AmortisationSchedule = (props) => {
  const [tableRowsData, setTableRowsData] = useState(props.yearlyData);

  const updateTableBody = () => {
    setTableRowsData(tableRowsData);
  };

  return (
    <div>
      {tableRowsData.length <= 0 && (
        <h3 className={Style['no-data']}>No Amortisation Data Available</h3>
      )}
      {tableRowsData.length > 0 && (
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
            {tableRowsData.map((periodData) => (
              <tr key={periodData.year}>
                <td>{periodData.year}</td>
                <td>
                  {periodData.savingsEndOfYear.toLocaleString('en-za', {
                    style: 'currency',
                    currency: 'ZAR',
                  })}
                </td>
                <td>
                  {periodData.yearlyInterest.toLocaleString('en-za', {
                    style: 'currency',
                    currency: 'ZAR',
                  })}
                </td>
                <td>
                  {periodData.totalInterest.toLocaleString('en-za', {
                    style: 'currency',
                    currency: 'ZAR',
                  })}
                </td>
                <td>
                  {periodData.totalCumulative.toLocaleString('en-za', {
                    style: 'currency',
                    currency: 'ZAR',
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AmortisationSchedule;
