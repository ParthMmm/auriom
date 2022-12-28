import { useUser } from "@clerk/nextjs";
import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";

function ProfilePage({}) {
  const router = useRouter();

  if (!router.query.username) {
    return <div>no username</div>;
  }

  const username = router?.query?.username[0] as string;

  const data = trpc.albumAction.getAllActions.useQuery(
    {
      username,
    },
    {
      enabled: !!username,
    }
  );

  console.log(data);

  const listening = data.data?.listening;
  const listened = data.data?.listened;
  const wantToListen = data.data?.wantToListen;

  return (
    <div>
      <div className="mt-24 flex flex-row justify-center">
        hi, {router.query.username}
      </div>
      <div className="mt-24 flex flex-col gap-11 ">
        <div className="px-4">
          <h2 className=" text-2xl font-black">currently listening</h2>
          <div className=" flex flex-row gap-8  border-2 border-gray-700 p-4">
            {listening?.map((album) => (
              <div key={album.album}>
                <div className="">
                  <span className="group-hover:shadow-highlight-blurple text-md font-bold transition-all md:text-2xl">
                    {album.album}
                  </span>
                </div>
                <div className="">
                  <span className="text-sm md:text-lg">{album.artist}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-4">
          <h2 className=" text-2xl font-black"> listened</h2>
          <div className="flex flex-row gap-8 border-2 border-gray-700 p-4">
            {listened?.map((album) => (
              <div key={album.album}>
                <div className="">
                  <span className="group-hover:shadow-highlight-blurple text-md font-bold transition-all md:text-2xl">
                    {album.album}
                  </span>
                </div>
                <div className="">
                  <span className="text-sm md:text-lg">{album.artist}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-4">
          <h2 className=" text-2xl font-black">want to listen</h2>
          <div className="flex flex-row gap-8 border-2 border-gray-700 p-4">
            {wantToListen?.map((album) => (
              <div key={album.album}>
                <div className="">
                  <span className="group-hover:shadow-highlight-blurple text-md font-bold transition-all md:text-2xl">
                    {album.album}
                  </span>
                </div>
                <div className="">
                  <span className="text-sm md:text-lg">{album.artist}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
