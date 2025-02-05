"use client";
import Link from "next/link";
import Image from "next/image";

const Nav = () => {
  return (
    <nav className={"flex justify-between w-full mb-16 pt-3"}>
      <div>
        {/*  logo*/}

        <Image
          src={
            "/Users/lucasvissers/Documents/Websites/nextjs-tempalte/assets/images/Logo.svg"
          }
          alt={"logo"}
          width={100}
          height={100}
        />
      </div>
      <div>{/* extra buttons*/}</div>
    </nav>
  );
};

export default Nav;
