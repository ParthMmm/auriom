import { useRouter } from 'next/router';

import UserActionsActivity from './UserActionsActivity';

function ProfilePage({}) {
  const router = useRouter();

  if (!router.query.username) {
    return <div>no username</div>;
  }

  const username = router?.query?.username[0] as string;

  return (
    <div>
      <div className="mt-24 flex flex-row justify-center">
        hi, {router.query.username}
      </div>
      <UserActionsActivity username={username} />
    </div>
  );
}

export default ProfilePage;
