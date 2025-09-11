"use client"

import { motion, useScroll, useSpring, useTransform } from "motion/react"

const Navbar = () => {
    const { scrollY } = useScroll()

    // Transform scroll values
    const borderRadius = useTransform(scrollY, [0, 300], ["9999px", "9999px"])
    const width = useTransform(scrollY, [0, 300], ["100vw", "85vw"])
    const height = useTransform(scrollY, [0, 300], ["6vh", "5vh"])
    const overshoot = useTransform(scrollY, [0, 300], [0, 20])
    const marginTopSpring = useSpring(overshoot, {
        stiffness: 120,
        damping: 12,
        mass: 0.25,
    })

    return (
        <div className="fixed z-50 flex justify-center left-4 right-4 top-4 rounded-xl ">
            <motion.nav
                className="flex items-center justify-between backdrop-blur-2xl bg-white/20 shadow-lg ring-1 ring-black/5 text-white px-8"
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
                        <a href="login" className={"bg-red-500 rounded-full p-2"}>inloggen</a>
                    </li>
                </ul>
            </motion.nav>
        </div>
    )
}

export default Navbar
