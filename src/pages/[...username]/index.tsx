import dynamic from 'next/dynamic';

const ProfilePage = dynamic(() => import('@components/Profile/ProfilePage'), {
  ssr: false,
});

export default ProfilePage;
