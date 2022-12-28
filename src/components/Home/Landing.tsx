import { useRouter } from "next/router";

function Landing({}) {
  const router = useRouter();

  return (
    <div className="mt-48 flex min-h-screen flex-col items-center justify-start gap-4">
      <div>
        <h1 className="text-3xl">Discover, organize, and review albums</h1>
      </div>
      <button
        onClick={() => router.push("/auth/sign-up")}
        className="rounded-md border-2 border-harlequin-500 px-4 py-2 transition-colors hover:border-harlequin-700 hover:text-harlequin-500"
      >
        join today for free
      </button>
    </div>
  );
}

export default Landing;
