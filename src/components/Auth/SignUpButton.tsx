import { useRouter } from 'next/router';

function SignUpButton({}) {
  const router = useRouter();

  return (
    <div>
      <button
        onClick={() => router.push('/auth/sign-up')}
        className="rounded-md  bg-harlequin-500 px-4 py-2 transition-colors hover:text-black"
      >
        join
      </button>
    </div>
  );
}

export default SignUpButton;
