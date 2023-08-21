import Head from 'next/head';
import React, { useState } from 'react';
import data from '../data.json';

export default function Home() {


  return (
    <div className="min-h-screen flex flex-col">
      {renderHead()}
      {renderHeader()}
      {renderMainForm()}

      {renderFooter()}
    </div>
  );
}

function renderHead() {
  return (
    <Head>
      <title>Cookie Stand Admin</title>
    </Head>
  );
}

function renderHeader() {
  return (
    <header className="bg-green-500 p-8 text-4xl text-black">
      <h1>Cookie Stand Admin</h1>
    </header>
  );
}

function renderMainForm() {
  const [formFilled, setFormFilled] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    minCustomers: '',
    maxCustomers: '',
    avgCookies: '',
  });
  const [submittedData, setSubmittedData] = useState([]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newFormData = {
      location: event.target.location.value,
      minCustomers: event.target.minCustomers.value,
      maxCustomers: event.target.maxCustomers.value,
      avgCookies: event.target.avgCookies.value,
    };

    setFormData(newFormData);
    setSubmittedData([...submittedData, newFormData]); // Add new entry to submittedData
    setFormFilled(true);
  };
  return (
    <main className="flex-grow container mx-auto p-4">
      <form
        className="bg-green-300 rounded-lg p-8 mx-auto"
        style={{ maxWidth: '1000px' }}
        onSubmit={handleFormSubmit}
      >
        <p className="mb-4 text-2xl font-bold text-center">Create a Cookie Stand</p>
        
        {/* ... Form fields ... */}

        <div className="mb-4">
<div className="mb-2 flex">
  <label htmlFor="location" className="block w-1/4 pr-2 text-center">
    <span className="inline-block align-middle pt-2">Location</span>
  </label>
  <input
    type="text"
    id="location"
    className="flex-grow px-2 py-2 rounded"
  />
</div>
<div className="flex mb-4">
  <div className="flex-grow mr-2">
    <label htmlFor="minCustomers" className="block mb-2">
      Minimum customers per hour
    </label>
    <input
      type="number"
      id="minCustomers"
      className="w-full px-4 py-2 rounded"
    />
  </div>
  <div className="flex-grow mr-2">
    <label htmlFor="maxCustomers" className="block mb-2">
      Maximum customers per hour
    </label>
    <input
      type="number"
      id="maxCustomers"
      className="w-full px-4 py-2 rounded"
    />
  </div>
  <div className="flex-grow">
    <label htmlFor="avgCookies" className="block mb-2">
      Average cookies per sale
    </label>
    <input
      type="number"
      id="avgCookies"
      className="w-full px-4 py-2 rounded"
    />
  </div>
</div>
</div>
        
        <button className="bg-green-500 text-2xl text-black py-2 px-20 rounded-lg p-2">
          Create
        </button>
      </form>
      
      <div className="mt-4">
        {formFilled ? (
          <ReportTable formData={formData} submittedData={submittedData} />
        ) : (
          <p className="text-center text-xl">No Cookie Stand Available</p>
        )}
      </div>

    </main>
  );
}



function renderPlaceholder(lastCreatedCookieStand) {
  return (
    <div className="bg-black-100 p-4 rounded-md shadow-md">
      <pre>{JSON.stringify(lastCreatedCookieStand, null, 2)}</pre>
    </div>
  );
}

function renderFooter() {
  return (
    <footer className="bg-green-500 p-4 text-2xl text-black">
      <h1>@2023</h1>
    </footer>
  );
}
function ReportTable({ formData, submittedData }) {
  const hourlySalesData = data;
  const hourlySales = hourlySalesData;
  const totalSales = hourlySales.reduce((sum, value) => sum + value, 0);
  const hours = Array.from({ length: 14 }, (_, index) => {
    const hour = (index + 6) % 12 || 12;
    const period = index < 6 ? 'AM' : 'PM';
    return `${hour} ${period}`;
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Cookie Stand Report</h2>
      <table className="w-full border-collapse border border-black-300">
        <thead className="bg-green-500 text-black">
          <tr>
            <th className="border border-black-300 p-2">Location</th>
            {hours.map((hour, index) => (
              <th key={index} className="border border-black-300 p-2">
                {hour}
              </th>
            ))}
            <th className="border border-black-300 p-2">Totals</th>
          </tr>
        </thead>
        <tbody>
          {submittedData.map((data, dataIndex) => (
            <tr
              key={dataIndex}
              className={dataIndex % 2 === 0 ? 'bg-green-300' : 'bg-green-200'}
            >
              <td className="border border-black-300 p-2">{data.location}</td>
              {hourlySales.map((sales, index) => (
                <td key={index} className="border border-black-300 p-2">
                  {sales}
                </td>
              ))}
              <td className="border border-black-300 p-2">
                {/* ... Calculate total for this row ... */}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-green-500 text-black">
          <tr>
            <td className="border border-black-300 p-2 font-semibold">Totals</td>
            {hours.map((_, index) => (
              <td key={index} className="border border-black-300 p-2 font-semibold">
                {hourlySales.reduce((sum, value) => sum + value, 0)}
              </td>
            ))}
            <td className="border border-black-300 p-2 font-semibold">{totalSales}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}





