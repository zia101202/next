
'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });
    console.log(res);
    if (res?.error) {
      setError('Invalid credentials');
      router.replace('/signIn')
    } else {
      router.push('/');
    }
  };
  
  return (
    <div >
      <div >
        <h2 >Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label  htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
           
          >
            Sign In
          </button>
          {error && <p >{error}</p>}
        </form>
      </div>
    </div>
  );
}
