'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { users } from '@/utils/users'; // Assuming you have a users.js file with user data

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const user = users.find(
        (u) => u.username === username && u.password === password
      );
    if (user) {
        localStorage.setItem('auth', 'true');
        localStorage.setItem('username', user.username);
        localStorage.setItem('role', user.role);
        router.push('/dashboard'); // protected route
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="w-1/2 hidden md:block">
        <img
          src="/food_serving.png" // replace with your local image path or public URL
          alt="Food Serving"
          className="object-cover rounded-r-3xl"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <img src="/logo.png" alt="Call Cuisine Logo" className="mx-auto w-100" />

          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 mb-4 rounded bg-[#e6c5c0] focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-2 rounded bg-[#e6c5c0] focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-sm text-right text-gray-500 mb-4 cursor-pointer hover:underline">Forgot Password ?</p>

          {error && <p className="text-red-600 text-center mb-2">{error}</p>}

          <button
            onClick={handleLogin}
            className="w-full bg-[#912d19] hover:bg-[#7a2313] text-white font-semibold py-2 px-4 rounded"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
