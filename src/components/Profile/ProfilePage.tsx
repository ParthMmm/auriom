import { useUser } from '@clerk/nextjs';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Spinner from '@components/Spinner';

import { api } from '@utils/trpc';

const EditProfileButton = dynamic(() => import('./EditProfileButton'), {
  ssr: false,
});

const ExternalAccounts = dynamic(() => import('./ExternalAccounts'), {
  ssr: false,
});

const UserActionsActivity = dynamic(() => import('./UserActionsActivity'), {
  ssr: false,
});

const FollowButton = dynamic(() => import('./FollowButton'), {
  ssr: false,
});

function ProfilePage({}) {
  const router = useRouter();

  const { isSignedIn, user } = useUser();

  if (!router.query.username) {
    return <div>no username</div>;
  }

  const username = router?.query?.username[0] as string;

  const userInfo = api.users.getUser.useQuery(
    { username },
    {
      enabled: !!username,
    }
  );

  if (userInfo.isLoading) {
    return <Spinner />;
  }

  if (userInfo.isError) {
    return <div>error</div>;
  }

  //button to edit profile if user is signed in and is on their own profile

  return (
    <div className="container mx-auto flex items-center justify-center px-[4.5rem] pb-12">
      <div className=" mt-12 flex w-full flex-col">
        <div className="flex justify-between">
          <div className="flex flex-row">
            <div className="flex flex-col pl-2">
              <div className="flex flex-col gap-4">
                <Image
                  src={userInfo.data?.profileImage ?? ''}
                  alt={`${userInfo.data?.username}'s profile image`}
                  height={150}
                  width={150}
                  className="rounded-full"
                />
                <h1 className="py-4 text-center font-bold text-3xl text-white">
                  {username}
                </h1>
                <FollowButton username={username} />
                {userInfo.data && <ExternalAccounts userInfo={userInfo.data} />}
              </div>
            </div>
            <div className="m-12 flex items-start justify-start align-middle">
              <p className="text-white">{userInfo.data?.bio ?? ''}</p>
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
