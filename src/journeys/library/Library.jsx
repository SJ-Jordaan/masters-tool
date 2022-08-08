import React from 'react';
import { Link } from 'react-router-dom';
import { ICONS } from '../../common/constants';
import { BottomNavbar } from '../../components/navigation/BottomNavbar';

const Games = [
  {
    image: ICONS.Colonisers.Banner,
    title: 'Colonisers',
    description: 'A game about colonising planets',
    to: '/colonisers',
    badges: ['Automata', 'Regex'],
    isNew: true,
  },
];

export const Library = () => {
  return (
    <div className='flex flex-col items-center h-screen bg-slate-700'>
      {Games.map(({ image, title, description, isNew, badges, to }, i) => (
        <Link key={`${title}-${i}`} to={to}>
          <div className='card w-fit my-6 mx-2 shadow-xl image-full'>
            <figure>
              <img src={image} alt={title} />
            </figure>
            <div className='card-body'>
              <h2 className='card-title'>
                {title}
                {isNew && <div className='badge badge-secondary'>NEW</div>}
              </h2>
              <p>{description}</p>
              <div className='card-actions justify-end'>
                <div className='badge badge-accent'>
                  {'High Score: ' + Math.floor(Math.random() * 100)}
                </div>
                {badges.map((badge, i) => (
                  <div key={`${badge}-${i}`} className='badge badge-outline'>
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Link>
      ))}
      <BottomNavbar />
    </div>
  );
};
