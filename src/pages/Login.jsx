// import React from 'react'
import { Link, Navigate } from "react-router-dom"
import { Context, server } from "../main";
import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// ... (imports)

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setIsAuthenticated(true);
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Invalid credentials or server timeout'
      );
      console.error("Login error:", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
          <button disabled={loading} type="submit" className={loading ? 'disabled' : ''}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <h4>OR</h4>
          <Link to='/register'>SIGN UP</Link>
        </form>
      </section>
    </div>
  );
}

export default Login;
