import React from 'react';
import {
  AcademicCapIcon,
  HomeIcon,
  ViewGridIcon,
} from '@heroicons/react/outline';
import { Link, useLocation } from 'react-router-dom';

const NavItems = [
  {
    label: 'Tutor',
    Icon: AcademicCapIcon,
    to: '/tutor',
  },
  {
    label: 'Home',
    Icon: HomeIcon,
    to: '/',
  },
  {
    label: 'Library',
    Icon: ViewGridIcon,
    to: '/library',
  },
];

export const BottomNavbar = () => {
  const location = useLocation();

  return (
    <div className='btm-nav'>
      {NavItems.map(({ label, Icon, to }, i) => (
        <div
          key={`${label}-${i}`}
          className={`${location.pathname === to ? 'text-info active' : ''}`}
        >
          <Link to={to}>
            <Icon className='h-6 w-6' />
          </Link>
        </div>
      ))}
    </div>
  );
};