import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className={"flex bg-white min-h-screen items-center justify-center"}>
      <div className={"w-1/3 mx-auto"}>
        <h1 className={"text-black text-center text-3xl"}>
          Welcome to my Next.js boilerplate.
        </h1>
        <p className={"text-black text-center mt-2 "}>
          I use this boilerplate to design and create all my websites. It is constantly being updated as I discover new ways to improve.
        </p>


        <Link href={"https://github.com/LucusCornelius"} rel="noopener noreferrer" target="_blank">
          <div className={"flex items-center justify-center space-x-2 mt-4"}>
            <Image
              src={"/assets/github-invertocat.svg"}
              width={50}
              height={50}
              alt={"github-invertocat"}
            ></Image>
            <p className={"font-sans text-sm text-black"}>@LucusCornelius</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
