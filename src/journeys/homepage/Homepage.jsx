import React from 'react';
import { BottomNavbar } from '../../components/navigation/BottomNavbar';

export const Homepage = () => {
  return (
    <div className='flex flex-col h-screen'>
      <p className='text-xl text-center text-white'>Homepage</p>
      <BottomNavbar />
    </div>
  );
};
