import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

function ProfilePage({}) {
  const router = useRouter();

  console.log(router.query.username);

  return <div>hi, {router.query.username}</div>;
}

export default ProfilePage;
