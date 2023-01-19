import { useRouter } from 'next/router';

function LogInButton({}) {
  const router = useRouter();

  return (
    <div className="hidden md:block">
      <button onClick={() => router.push('/auth/sign-in')}>log in</button>
    </div>
  );
}

export default LogInButton;
