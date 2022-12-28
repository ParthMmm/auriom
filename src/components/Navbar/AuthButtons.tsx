import LogInButton from "../Auth/LogInButton";
import SignUpButton from "../Auth/SignUpButton";
import { useUser } from "@clerk/nextjs";

import ProfileButton from "./ProfileButton";

function AuthButtons({}) {
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <div className="flex flex-row items-center gap-4">
      {isLoaded && isSignedIn && user ? (
        <div>
          <ProfileButton />
        </div>
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
