import React, { useState } from 'react';
import { RxCaretDown } from "react-icons/rx";
import { IoIosSearch } from "react-icons/io";
import { CiDiscount1 } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { TbHelpOctagon } from "react-icons/tb";
import { FaCartShopping } from "react-icons/fa6";

// Static links array to prevent re-render
const links = [
    {
        icon: <IoIosSearch />,
        name: "Search"
    },
    {
        icon: <CiDiscount1 />,
        name: "Offers",
        sup: "New"
    },
    {
        icon: <TbHelpOctagon />,
        name: "Help"
    },
    {
        icon: <MdOutlineAssignmentInd />,
        name: "Sign In"
    },
    {
        icon: <FaCartShopping />,
        name: "Cart",
        sup: "(2)"
    }
];

export const Header = () => {
    const [toggle, setToggle] = useState(false);

    const showSideMenu = () => setToggle(true);
    const hideSideMenu = () => setToggle(false);

    return (
        <>
            {/* Side Menu Overlay */}
            <div
                className='black-overlay w-full h-full fixed duration-500'
                onClick={hideSideMenu}
                style={{
                    opacity: toggle ? 1 : 0,
                    visibility: toggle ? "visible" : "hidden",
                    zIndex: 9999,
                    backgroundColor: "rgba(0,0,0,0.5)"
                }}
            >
                <div
                    onClick={(e) => e.stopPropagation()}
                    className='w-[300px] bg-white h-full absolute transition-all duration-500 shadow-lg p-4'
                    style={{
                        left: toggle ? '0%' : '-100%'
                    }}
                >
                    <button
                        onClick={hideSideMenu}
                        className='absolute top-4 right-4 text-[20px]'
                        aria-label="Close Menu"
                    >
                        <AiOutlineClose />
                    </button>
                    <nav role="menu">
                        <ul className='list-none text-[18px] font-semibold'>
                            {
                                links.map((link, index) => (
                                    <li key={index} className='cursor-pointer flex items-center gap-2 hover:text-[#fc8019] py-2'>
                                        {link.icon}
                                        {link.name}
                                        {link.sup && <sup className='text-red-500 font-bold'>{link.sup}</sup>}
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Header */}
            <header className='p-[15px] shadow-xl text-[#686b78] sticky top-0 bg-white z-[9999]'>
                <div className='max-w-[1200px] mx-auto flex items-center'>
                    {/* Logo */}
                    <div className='w-[100px]'>
                        <img src="images/logo.png.webp" className='w-full' alt="Website Logo" />
                    </div>
                    {/* Location */}
                    <div className='ml-4'>
                        <span className='font-bold border-b-[3px] border-[black]'>Ratanada</span> Jodhpur, Rajasthan, Lucknow, India
                        <RxCaretDown fontSize={25} className='inline text-[#fc8019] cursor-pointer' onClick={showSideMenu} />
                    </div>
                    {/* Desktop Navigation Links */}
                    <nav className='hidden md:flex list-none gap-10 ml-auto text-[18px] font-semibold'>
                        {
                            links.map((link, index) => (
                                <li key={index} className='cursor-pointer flex hover:text-[#fc8019] items-center gap-2'>
                                    {link.icon}
                                    {link.name}
                                    {link.sup && <sup className='text-red-500 font-bold'>{link.sup}</sup>}
                                </li>
                            ))
                        }
                    </nav>
                    {/* Mobile Menu Button */}
                    <div className='ml-auto md:hidden'>
                        <RxCaretDown
                            fontSize={30}
                            className='text-[#fc8019] cursor-pointer'
                            onClick={showSideMenu}
                            aria-label="Open Menu"
                            aria-haspopup="true"
                        />
                    </div>
                </div>
            </header>
        </>
    );
}
