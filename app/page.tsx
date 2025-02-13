import Link from "next/link";
import {auth} from "@clerk/nextjs/server";

export default async function Home() {
    const {userId} = await auth()
    const href = userId ? '/journal' : 'new-user'

    return (
       // ToDo
      <div className={"w-screen h-screen bg-black flex justify-center items-center"} >
        <div className={"text-white w-full max-w-[600px] mx-auto"}>
            <h1 className={"text-6xl mb-4"}>Ai journal</h1>
            <p className={"text-2xl mb-4 text-white/60"}>Ai powered app to check your mood of your thoughts</p>
            <div>
                <Link href={href}>
                <button className={"bg-green-400 px-4 py-2 rounded-lg text-lg"}>let's get started</button>
                </Link>
            </div>
        </div>
      </div>
  );
}
