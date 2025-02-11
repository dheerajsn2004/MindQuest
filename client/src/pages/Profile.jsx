import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import Button from "../components/Button";
import { FaHome } from "react-icons/fa";

const Profile = () => {
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  // Handle missing user data
  if (!user) {
    return (
      <section className="min-h-screen flex items-center justify-center text-white">
        <p>Loading user data...</p>
      </section>
    );
  }

  return (
    <section className='py-5 px-3 md:p-10 min-h-[calc(100vh-10rem)] bg-slate-900 border-slate-600 border rounded-lg flex flex-col gap-y-5 items-start justify-start'>
      <h1 className='text-2xl md:text-4xl text-white font-semibold'>Profile</h1>

      <div className='w-full bg-slate-800 py-5 px-5 flex flex-wrap gap-5 text-base md:text-xl rounded-lg'>
        <h2>Username : <span className='font-thin'>{user.username || "N/A"}</span></h2>
        <p>Email : <span className='font-thin'>{user.email || "N/A"}</span></p>
        <p>Joined : <span className='font-thin'>
          {user.createdAt ? formatDistanceToNow(new Date(user.createdAt), { addSuffix: true }) : "Unknown"}
        </span></p>
        <p>Role : <span className='font-thin'>{user.role || "User"}</span></p>
      </div>

      <div className='w-full min-h-[50vh] grid place-content-center'>
        <p className="text-center text-gray-400">Manage your profile details here.</p>
        <Button onClick={() => navigate('/')} className='px-10 flex gap-3 items-center py-1'>
          <FaHome /> Return to Home
        </Button>
      </div>
    </section>
  );
};

export default Profile;
