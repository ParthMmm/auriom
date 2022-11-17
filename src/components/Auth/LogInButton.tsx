import { useRouter } from "next/router";

function LogInButton({}) {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.push("/sign-in")}>log in</button>
    </div>
  );
}

export default LogInButton;
