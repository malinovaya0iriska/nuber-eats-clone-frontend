import { FC } from 'react';

import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import { useMe } from 'hooks';
import nuberLogo from 'images/logo.svg';
import { BASE_URL, EDIT_PROFILE } from 'routes/constants';
import { ReturnComponentType } from 'types';

export const Header: FC = (): ReturnComponentType => {
  const { data } = useMe();

  return (
    <>
      {!data?.me.verified && (
        <div className="bg-red-500 p-3 text-center text-base text-white w-full">
          <span>Please verify your email.</span>
        </div>
      )}

      <header className="py-4 w-full">
        <div className="px-5 xl:px-0 max-w-screen-xl mx-auto flex justify-between items-center">
          <Link to={BASE_URL}>
            <img src={nuberLogo} className="w-24" alt="Nuber Eats" />
          </Link>
          <span className="text-xs">
            <Link to={EDIT_PROFILE}>
              <FontAwesomeIcon icon={faUser} className="text-xl" />
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};
