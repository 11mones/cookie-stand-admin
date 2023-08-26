import { hourly_sales } from "@/data"

export default function Output({cookieStands,deletData}) {
  const hours = Array.from({ length: 14 }, (_, index) => {
    const hour = (index + 6) % 12 || 12;
    const period = index < 6 ? 'AM' : 'PM';
    return `${hour} ${period}`;
  });
  return (
    <div className="flex flex-col p-2 space-y-2 bg-green-100 text-center max-w-[200vh]">
      {cookieStands.length === 0 ? (
        <p className="mt-4 text-center text-gray-600">
          Report Table Coming Soon...
        </p>
      ) : (
        <>
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
            {/* table body */}
            <tbody>
              {cookieStands.map((obj, index) => (
                <tr key={obj.id}>
                  <td className='border border-black '>
                    <span style={{ marginRight: '5px' }}>{obj.location}</span>
                    <svg onClick={() => deletData(obj.id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={{ verticalAlign: 'middle', cursor: 'pointer' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                  </td>
                  {hourly_sales.map((sales, index) => (
                    <td key={index} className='border border-black '>{sales}</td>
                  ))}

                </tr>
              ))}
              <tr>
                <td className='border border-black '>{'Total'}</td>
                {hourly_sales.map((sales, index) => (
                  <td key={index} className='border border-black '>{sales * cookieStands.length}</td>
                ))}

              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}
