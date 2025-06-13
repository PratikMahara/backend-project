import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Eye, EyeOff } from 'lucide-react';
import { toast } from "@/components/ui/sonner"; // Import Sonner toast
import Navbar from '@/components/Navbar';
function Login() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (!(email || username) || !password) {
      setError("Please fill all credentials");
      setSuccess(false);
      return;
    }
    try {
      const response = await fetch('https://backend-project-1-jt64.onrender.com/api/users/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        
  credentials: "include",
        body: JSON.stringify({ email, username, password })
      });
      if (response.ok) {
        setSuccess(true);
        toast.success("Login successful!", {
          description: "Welcome back!",
          duration: 3000,
        }); // Show Sonner toast
        // No navigation
         const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken);
      } else {
        setError("Login Failed");
      }
    } catch (error) {
      setError("Login Explicitly Terminated");
    }
  };

  return (
    <>
    <Navbar/>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
                <span
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>
            </div>
            {error && (
              <div className="text-red-600 font-medium text-sm">{error}</div>
            )}
            <Button type="submit" className="w-full flex items-center gap-2">
              <Play size={16} /> Login
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
    </>
  );
}

export default Login;
