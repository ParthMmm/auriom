import LogInButton from "../Auth/LogInButton";
import SignUpButton from "../Auth/SignUpButton";

function AuthButtons({}) {
  return (
    <div className="flex flex-row items-center space-x-2">
      <LogInButton />
      <SignUpButton />
    </div>
  );
}

export default AuthButtons;
