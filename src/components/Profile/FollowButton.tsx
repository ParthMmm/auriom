import { useUser } from '@clerk/nextjs';
import { api } from '@utils/trpc';

type Props = {
  username: string;
};

function FollowButton({ username }: Props) {
  const { isSignedIn, user } = useUser();

  const isOwnProfile = isSignedIn && user?.username === username;

  const followInfo = api.users.getFollowInfo.useQuery(
    { username },
    {
      enabled: !!username && !!isSignedIn,
    }
  );

  const followMutation = api.users.followUser.useMutation({
    onSettled: async () => {
      await followInfo.refetch();
      await followCounts.refetch();
    },
  });
  const unfollowMutation = api.users.unfollowUser.useMutation({
    onSettled: async () => {
      await followInfo.refetch();
      await followCounts.refetch();
    },
  });

  const unfollow = async () => {
    await unfollowMutation.mutateAsync({ username });
  };

  const follow = async () => {
    await followMutation.mutateAsync({ username });
  };

  const followCounts = api.users.getFollowCounts.useQuery({ username });

  const Button = () => {
    if (isOwnProfile) {
      return null;
    }

    if (followInfo.isLoading) {
      return null;
    }

    if (followInfo.isError) {
      return null;
    }
    if (followInfo.data?.followerId) {
      return (
        <button
          className="mt-2 w-full rounded-full border-2 border-harlequin-500 px-3 py-2 font-bold text-white transition-colors hover:bg-harlequin-500"
          onClick={unfollow}
        >
          unfollow
        </button>
      );
    }
    if (!followInfo.data?.followerId) {
      return (
        <button
          className="mt-2 w-full rounded-full border-2 border-harlequin-500 px-3 py-2 font-bold text-white transition-colors hover:bg-harlequin-500"
          onClick={follow}
        >
          follow
        </button>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col items-start justify-start space-y-4 ">
      <Button />
      {followCounts.data && (
        <div className="flex flex-row justify-between gap-2 ">
          <div className="flex flex-row-reverse gap-1">
            <p className="font-bold text-gray-400 text-sm">followers</p>
            <p className="w-2.5 font-bold text-harlequin-500 text-sm tabular-nums">
              {followCounts.data?.followers}
            </p>
          </div>
          <div className="flex flex-row-reverse gap-1">
            <p className="font-bold text-gray-400 text-sm">following</p>
            <p className="w-2.5 font-bold text-harlequin-500 text-sm tabular-nums">
              {followCounts.data?.following}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default FollowButton;
