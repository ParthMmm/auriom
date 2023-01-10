import { useUser } from '@clerk/nextjs';
import React, { useState } from 'react';

import SettingsModal from '@components/Profile/SettingsModal';

type Props = {
  username: string;
};

function EditProfileButton({ username }: Props) {
  const { isSignedIn, user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const isOwnProfile = isSignedIn && user?.username === username;

  if (isOwnProfile) {
    return (
      <div className="relative top-0 right-12">
        <button onClick={() => setIsOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            // fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            // stroke="white"
            className="w-6 h-6 stroke-gray-600 hover:stroke-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </button>
        <SettingsModal isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    );
  }

  return null;
}

export default EditProfileButton;
