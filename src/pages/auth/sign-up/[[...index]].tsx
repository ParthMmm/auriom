import { SignUp } from '@clerk/nextjs';

function SignUpPage({}) {
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <SignUp
        path="/auth/sign-up"
        routing="path"
        signInUrl="/auth/sign-in"
      
      
      />
    </div>
  );
}

export default SignUpPage;
