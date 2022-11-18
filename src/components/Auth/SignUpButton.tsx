import { useRouter } from "next/router";

function SignUpButton({}) {
  const router = useRouter();

  return (
    <div>
      <button
        onClick={() => router.push("/auth/sign-up")}
        className="rounded-full border-2 border-harlequin-500 px-4 py-2 transition-colors hover:border-harlequin-700 hover:text-harlequin-500"
      >
        sign up
      </button>
    </div>
  );
}

export default SignUpButton;
