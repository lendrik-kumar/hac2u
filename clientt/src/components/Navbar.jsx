import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import logo from '../assets/Logo.png'; 
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import MetamaskLogo from '../assets/MetaMaskLogo.png';
import { useEffect } from "react";

export default function App() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [walletAddress, setWalletAddress] = useState('');


  const navigate = useNavigate();


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const walletAddress = localStorage.getItem("walletAddress"); 
        if (!walletAddress) {
          console.log("Wallet address not found");
          return;
        }
         const res = await axios.get(`http://localhost:2000/api/user/${walletAddress}`);
        console.log(res.data.username);
        setUsername(res.data.username);
        setEmail(res.data.email);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div>
      <Navbar
        className="sticky top-0 left-0 w-full h-16 bg-white shadow-md px-4 bg-gradient-to-r from-[#374151] via-[#1f2937] to-[#111827]
 z-50 flex"
        style={{ position: 'sticky', top: 0 }}
      >
        
        <NavbarBrand className="pl-10">
          <img src={logo} alt="Logo" className="h-12"/>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-24 flex-grow pl-0 pr-20 justify-center">
          <NavbarItem>
            <NavLink to={'/app/Articles'}>
              <Link color="foreground" className="text-white text-lg">
                Articles
              </Link>
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink to={'/app/Policies'}>
              <Link color="foreground" className="text-white text-lg">
                Policies
              </Link>
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <a href="/app/home">
              <Link aria-current="page" color="secondary" className="text-white text-lg">
                Home
              </Link>
            </a>
          </NavbarItem>
          <NavbarItem>
            <NavLink to={'/app/Contact'}>
              <Link color="foreground" className="text-white text-lg">
                Contact Us
              </Link>
            </NavLink>
          </NavbarItem>
          <NavbarItem>
            <NavLink to={'/app/About'}>
              <Link color="foreground" className="text-white text-lg">
                About
              </Link>
            </NavLink>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent as="div" justify="end" className="flex-grow flex justify-end mr-4">
        <Dropdown placement="bottom-end" className="fixed right-7">
            <DropdownTrigger >
            <div className="hover:cursor-pointer mt-1 fixed right-12 mr-48">
                <img src={MetamaskLogo} className="h-10" />
              </div>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
              className="bg-slate-100 text-gray-500 shadow-lg rounded-lg w-72 py-3 px-5"
            >
              <DropdownItem key="profile" className="h-16 gap-2">
                <p className="font-semibold text-2xl pt-4 mt-9 pb-1">{`Hi , ${username}`} </p>
                <p>Signed in as : </p>
                <p className="font-semibold text-lg text-stone-500 mb-5 pb-5">{`${email}`}  </p>
              </DropdownItem>
              <DropdownItem key="team_settings" className="hover:bg-gray-400 hover:cursor-pointer mt-4 text-black text-lg py-3 px-4">
                Team Settings
              </DropdownItem>
              <DropdownItem key="analytics" className="hover:bg-gray-400 hover:cursor-pointer text-black text-lg py-3 px-4">
                Analytics
              </DropdownItem>
              <DropdownItem key="system" className="hover:bg-gray-400 hover:cursor-pointer text-black text-lg py-3 px-4" 
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Switch Profile
              </DropdownItem>
              <DropdownItem key="help_and_feedback" className="hover:bg-gray-400 hover:cursor-pointer text-black text-lg py-3 px-4" 
                onPress={() => {
                  window.open("https://support.metamask.io/");
                }}
              >
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger" className="hover:bg-red-600 hover:cursor-pointer text-black text-lg py-3 px-4" 
                onClick={() => {
                  navigate('/login');
                  console.log("Logout successful");
                }}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
