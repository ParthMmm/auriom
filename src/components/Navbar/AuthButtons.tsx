import LogInButton from "../Auth/LogInButton";
import SignUpButton from "../Auth/SignUpButton";
import { useUser, useClerk } from "@clerk/nextjs";

function AuthButtons({}) {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  return (
    <div className="flex flex-row items-center space-x-2">
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
