import React from "react";
import { FaApple, FaGooglePlay } from "react-icons/fa";

const Footer = () => {
    const footerNavs = [
        {
            href: "javascript:void(0)",
            name: "Terms",
        },
        {
            href: "javascript:void(0)",
            name: "License",
        },
        {
            href: "javascript:void(0)",
            name: "Privacy",
        },
        {
            href: "javascript:void(0)",
            name: "About Us",
        },
    ];

    return (
        <footer className="pt-10">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className="justify-between sm:flex">
                    <div className="space-y-6">
                        <img src="/logo.png" alt="log" className="w-32" />
                        <p className="max-w-md">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatibus modi dicta,
                            quod voluptate voluptatem, nobis
                        </p>
                        <ul className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
                            {footerNavs.map((item, idx) => (
                                <li className="text-gray-800 hover:text-gray-500 duration-150">
                                    <a key={idx} href={item.href}>
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-6">
                        <p className="text-gray-700 font semibold">Get the app</p>
                        <div className="flex items-center gap-3 mt-3 sm:block">
                            <a href="javascript:void()">
                                <FaApple className="w-6 h-6 text-gray-700 hover:text-gray-900" />
                            </a>
                            <a href="javascript:void()" className="mt-0 block sm:mt-3">
                                <FaGooglePlay className="w-6 h-6 text-gray-700 hover:text-gray-900" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-10 py-10 border-t md:text-center">
                    <p>© 2023 Shubham Chaudhary. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
