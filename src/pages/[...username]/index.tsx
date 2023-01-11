import dynamic from 'next/dynamic';

const ProfilePage = dynamic(() => import('@components/Profile/ProfilePage'), {
  suspense: true,
});

export default ProfilePage;
