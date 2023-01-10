import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Spinner from '@components/Spinner';

import { trpc } from '@utils/trpc';

import EditProfileButton from './EditProfileButton';
import UserActionsActivity from './UserActionsActivity';

function ProfilePage({}) {
  const router = useRouter();

  const { isSignedIn, user } = useUser();

  if (!router.query.username) {
    return <div>no username</div>;
  }

  const username = router?.query?.username[0] as string;

  const userInfo = trpc.user.getUser.useQuery(
    { username },
    {
      enabled: !!username,
    },
  );

  if (userInfo.isLoading) {
    return <Spinner />;
  }

  if (userInfo.isError) {
    return <div>error</div>;
  }

  //button to edit profile if user is signed in and is on their own profile

  return (
    <div className="container mx-auto flex justify-center items-center pb-12">
      <div className=" mt-12 flex flex-col w-full">
        <div className="flex justify-between">
          <div className="flex justify-start flex-col items-start pl-2">
            <div className="flex flex-col items-center justify-center gap-4">
              <Image
                src={userInfo.data.profileImage}
                alt={`${userInfo.data.username}'s profile image`}
                height={150}
                width={150}
                className="rounded-full"
              />
              <h1 className="text-3xl font-bold text-white">{username}</h1>
            </div>
          </div>
          <EditProfileButton username={username} />
        </div>
        <UserActionsActivity username={username} />
      </div>
    </div>
  );
}

export default ProfilePage;
