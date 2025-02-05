import Image from "next/image";

export default function Home() {
  return (
    <div
      className={"flex bg-gray-900 min-h-screen items-center justify-center"}
    >
      <div>
        <h1 className={"text-white text-3xl"}>
          Welcome to my NextJs boilerplate.
        </h1>
        <p className={"text-white text-center"}>
          From this boilerplate I design create all my websites
        </p>
      </div>
    </div>
  );
}
