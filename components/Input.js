export default function Input(props) {
  return (
    <main className="flex-grow container mx-auto p-4">
      <form
        className="bg-green-300 rounded-lg p-8 mx-auto"
        style={{ maxWidth: '1000px' }}
        onSubmit={props.handeler}
      >
        <p className="mb-4 text-2xl font-bold text-center">Create a Cookie Stand</p>
        <div className="mb-4">
          <div className="mb-2 flex">
            <label htmlFor="location" className="block w-1/4 pr-2 text-center">
              <span className="inline-block align-middle pt-2">Location</span>
            </label>
            <input
              placeholder="Cookie Stand Location"
              type="text"
              name="location"
              className="flex-auto pl-1"
              required
            />
          </div>

          <div className="flex mb-4">
            <div className="flex-grow mr-2">
              <label htmlFor="minCustomers" className="block mb-2">
                Minimum customers per hour
              </label>
              <input
                placeholder="0"
                type="number"
                name="minCustomersPerHour"
                className="p-1 border rounded"
                required
              />
            </div>
            <div className="flex-grow mr-2">
              <label htmlFor="maxCustomers" className="block mb-2">
                Maximum customers per hour
              </label>
              <input
                placeholder="0"
                type="number"
                name="maxCustomersPerHour"
                className="p-1 border rounded"
                required
              />
            </div>
            <div className="flex-grow">
              <label htmlFor="avgCookies" className="block mb-2">
                Average cookies per sale
              </label>
              <input
                placeholder="0"
                type="number"
                step="0.1"
                name="avgCookiesPerSale"
                className="p-1 border rounded"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-2xl text-black py-2 px-20 rounded-lg p-2 ml-auto"
        >
          Create
        </button>
      </form>
    </main>
  );
}
