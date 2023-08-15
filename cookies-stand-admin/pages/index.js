import Head from 'next/head';
import React, { useState } from 'react';

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


  const handleFormSubmit = (event) => {
    event.preventDefault();
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

        <div className="mb-4">
          <div className="mb-2 flex">
            <label htmlFor="location" className="block w-1/4 pr-2 text-center">
              <span className="inline-block align-middle pt-2">Location</span>
            </label>
            <input
              type="text"
              id="location"
              className="flex-grow px-2 py-2 rounded"
              style={{ marginLeft: '0' }}
              onChange={(event) => setFormData({ ...formData, location: event.target.value })}
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
                onChange={(event) => setFormData({ ...formData, minCustomers: event.target.value })}
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
                onChange={(event) => setFormData({ ...formData, maxCustomers: event.target.value })}
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
                onChange={(event) => setFormData({ ...formData, avgCookies: event.target.value })}
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
          <div>

            <h2 className="text-xl font-semibold mb-2">Cookie:</h2>
            <p><strong>Location:</strong> {formData.location}</p>
            <p><strong>Minimum customers per hour:</strong> {formData.minCustomers}</p>
            <p><strong>Maximum customers per hour:</strong> {formData.maxCustomers}</p>
            <p><strong>Average cookies per sale:</strong> {formData.avgCookies}</p>
          </div>
        ) : (
          <p className="text-center text-xl">Report table coming soon ...</p>
        )}
      </div>
    </main>
  );
}


function renderPlaceholder(lastCreatedCookieStand) {
  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
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
