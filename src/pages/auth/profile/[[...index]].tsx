import { useUser } from '@clerk/nextjs';

const UserProfilePage = () => {
  const { user, isSignedIn } = useUser();

  return (
    <div>
      <h1>{user?.username} profile settings</h1>
    </div>
  );
};

export default UserProfilePage;
