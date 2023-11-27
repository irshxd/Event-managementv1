// import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context, server } from '../main'
import axios from 'axios';
import toast from 'react-hot-toast';


export default function Header() {

    const logoutHandler = async () => {
        try {
          const { data } = await axios.get(
            `${server}/users/logout`,
            {
              withCredentials: true,
            }
          );
    
          toast.success("Logged out successfully");
          setIsAuthenticated(false);    
        } catch (error) {
          toast.error("Invalid credentials or server timeout");
          console.error(error);
          setIsAuthenticated(true);
        }
          
      };


const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(Context)

  return (
    <nav className="header">
        <div>
            <h2>Todo App</h2>
        </div>
        <article>
            <Link to={'/'}>HOME</Link>
            <Link to={'/profile'}>PROFILE</Link>
            {
                isAuthenticated ? <button onClick={logoutHandler} disabled={loading} className='btn'>LOGOUT</button> 
                : <Link to={'/login'}>LOGIN</Link>
            }
            
        </article>
    </nav>
  )
}
