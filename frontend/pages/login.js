import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password: password }),
      });

      if (res.ok) {
        const { token } = await res.json();
        localStorage.setItem('token', token);
        router.push('/');
      } else {
        const data = await res.json();
        setError(data.message);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="container flex justify-center items-center min-h-screen">
      <div className="card">
        <h1 className="text-3xl font-semibold text-center text-gray-800">Login</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field mb-4"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field mb-4"
            required
          />
          <button type="submit" className="btn-submit w-full">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
