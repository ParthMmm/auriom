import { SignIn } from "@clerk/nextjs";

function SignInPage({}) {
  return (
    <SignIn
      path="/sign-in"
      routing="path"
      signUpUrl="/sign-up"
      redirectUrl="/"
    />
  );
}

export default SignInPage;
