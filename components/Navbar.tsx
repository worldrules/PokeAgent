"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-white text-2xl font-bold">
                    Pokémon App
                </Link>
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-white focus:outline-none"
                    >
                        {isOpen ? (
                            <span className="text-2xl">&times;</span>
                        ) : (
                            <span className="text-2xl">&#9776;</span>
                        )}
                    </button>
                </div>
                <div className={`md:flex md:items-center ${isOpen ? "block" : "hidden"} w-full md:w-auto`}>
                    <ul className="flex flex-col md:flex-row md:space-x-4 mt-4 md:mt-0 text-white">
                        <li>
                            <Link href="/pages/profile" className="hover:text-gray-300">
                                Meu Perfil
                            </Link>
                        </li>
                        <li>
                            <Link href="/pages/stars" className="hover:text-gray-300">
                                Favoritos
                            </Link>
                        </li>
                        <li>
                            <Link href="/chat" className="hover:text-gray-300">
                                Chat
                            </Link>
                        </li>
                        {session ? (
                            <li>
                                <button
                                    onClick={() => signOut({ callbackUrl: "/" })}
                                    className="hover:text-gray-300"
                                >
                                    Sair
                                </button>
                            </li>
                        ) : (
                            <li>
                                <Link href="/api/auth/login" className="hover:text-gray-300">
                                    Entrar
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
