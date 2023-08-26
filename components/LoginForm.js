export default function LoginForm({ loginformhundeler }) {
  return (
    <form onSubmit={loginformhundeler} className="flex flex-col w-3/4 p-8 mx-auto my-4 bg-green-300 rounded-md h-200">
      <label className="px-2 py-1 text-2xl text-center text-black-50">USER NAME</label>
      <input placeholder="User Name" name='username' className="flex-auto h-10 pl-8" />

      <label className="px-2 py-1 text-2xl text-center text-black-50">PASSWORD</label>
      <input placeholder="Password"
        name='password' className="flex-auto h-10 pl-8"  />

      <div className="flex items-center justify-center mt-4"> {/* Add margin-top */}
        <button className="flex-auto px-6 py-3 bg-green-500 rounded text -white h-10text-4xl">SIGN IN</button>
      </div>
    </form>
  );
}
