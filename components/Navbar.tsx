"use client"
import { useRouter } from "next/navigation";

import { motion, useScroll, useSpring, useTransform } from "motion/react"

const Navbar = () => {
    const router = useRouter();
    const { scrollY } = useScroll()

    const borderRadius = useTransform(scrollY, [0, 300], ["9999px", "9999px"])
    const width = useTransform(scrollY, [0, 100], ["100vw", "70vw"])
    const height = useTransform(scrollY, [0, 300], ["7vh", "5vh"])
    const overshoot = useTransform(scrollY, [0, 300], [0, 20])
    const marginTopSpring = useSpring(overshoot, {
        stiffness: 120,
        damping: 12,
        mass: 0.25,
    })

    return (
        <div className="fixed z-50 flex justify-center left-4 right-4 top-4 rounded-xl ">
            <motion.nav
                className="flex items-center justify-between backdrop-blur-sm bg-white/10 shadow-lg ring-1 ring-black/5 text-white px-8"
                style={{
                    borderRadius,
                    width,
                    height,
                    marginTop: marginTopSpring,
                }}
            >

                <div className="p-2">
                    {/* <p className="font-extrabold text-xl font-monomanic">FLISS</p> */}
                </div>

                <ul className="flex space-x-12 items-center capitalize font-tajawal">
                    <li>
                        <a href="#" className="text-md font-bold">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="dashboard" className="text-md font-bold">
                            Dashboard
                        </a>
                    </li>


                    <li>
                      <button
                        onClick={() => router.push("/login")}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-full shadow-md transition-all duration-200 ease-in-out hover:shadow-lg active:scale-95"
                      >
                        Sign In
                      </button>
                    </li>
                </ul>
            </motion.nav>
        </div>
    )
}

export default Navbar
