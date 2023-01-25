import { useUser } from '@clerk/nextjs';
import { trpc } from '@utils/trpc';
import { useState } from 'react';

type Props = {
  username: string;
};

function FollowButton({ username }: Props) {
  const { isSignedIn, user } = useUser();
  const [followStatus, setFollowStatus] = useState(false);

  const isOwnProfile = isSignedIn && user?.username === username;

  const utils = trpc.useContext();

  // console.log(utils.ctx);

  // console.log(utils.user.getFollowInfo.invalidate({ username }));

  const followInfo = trpc.users.getFollowInfo.useQuery({ username });

  const followMutation = trpc.users.followUser.useMutation({
    onSuccess: async () => await utils.users.invalidate(),
  });
  const unfollowMutation = trpc.users.unfollowUser.useMutation({
    onSuccess: async () => await utils.users.invalidate(),
  });

  const unfollow = async () => {
    const x = await unfollowMutation.mutateAsync({ username });
    if (x) {
      utils.users.getFollowInfo.invalidate({ username });
      setFollowStatus(false);
    }
  };

  const follow = async () => {
    const x = await followMutation.mutateAsync({ username });

    if (x) {
      utils.users.getFollowInfo.invalidate({ username });
      setFollowStatus(true);
    }
  };

  if (isOwnProfile) {
    return null;
  }

  if (followInfo.isLoading) {
    return <div>loading</div>;
  }

  if (followInfo.isError) {
    return <div>error</div>;
  }

  if (followStatus || followInfo.data?.followerId) {
    return (
      <div>
        <button
          className="mt-2 w-full rounded-full border-2 border-harlequin-500 py-2 px-3 font-bold text-white transition-colors hover:bg-harlequin-500"
          onClick={unfollow}
        >
          unfollow
        </button>
      </div>
    );
  }

  if (!followStatus || !followInfo.data?.followerId) {
    return (
      <div>
        <button
          className="mt-2 w-full rounded-full border-2 border-harlequin-500 py-2 px-3 font-bold text-white transition-colors hover:bg-harlequin-500"
          onClick={follow}
        >
          follow
        </button>
      </div>
    );
  }

  return null;
}

export default FollowButton;
