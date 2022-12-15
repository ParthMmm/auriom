import LogInButton from "../Auth/LogInButton";
import SignUpButton from "../Auth/SignUpButton";
import { useUser, useClerk } from "@clerk/nextjs";

function AuthButtons({}) {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  console.log(user);

  return (
    <div className="flex flex-row items-center gap-4">
      {isLoaded && isSignedIn && user ? (
        <button onClick={() => signOut()}>{user.username}, sign out</button>
      ) : (
        <>
          <LogInButton />
          <SignUpButton />
        </>
      )}
    </div>
  );
}

export default AuthButtons;
