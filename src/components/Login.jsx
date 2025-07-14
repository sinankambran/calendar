import React from 'react';

const Login = ({ email, password, setEmail, setPassword, handleLogin }) => (
  <form onSubmit={handleLogin} className="space-y-4">
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full p-2 border rounded"
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full p-2 border rounded"
    />
    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
      Login
    </button>
  </form>
);

export default Login;
