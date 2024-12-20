"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../context/authContext";
import Image from "next/image";

const Navbar = () => {
    const [userName, setUserName] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { user, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname(); // Get the current path

    useEffect(() => {
        const fetchUserName = async () => {
            if (user) setUserName(user.name);
        };
        fetchUserName();
    }, [user]);

    const handleLogout = async () => {
        try {
            await logout();
            router.push("/login");
        } catch (error) {
            console.error("Error during sign-out: ", error);
        }
    };

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const NAV_LINKS = [
        { href: "/", key: "home", label: "Home" },
        { href: "/basic-info", key: "basic_info", label: "Basic Information" },
        { href: "/families", key: "families", label: "Families" },
        { href: "/registry", key: "registry", label: "Registry" },
        { href: "/research", key: "research", label: "Research" },
        { href: "/inquire-now", key: "inquire_now", label: "Inquire Now" },
        { href: "/new-user", key: "register_now", label: "Register Now" },
        user?.userType === "Admin" ? { href: "/admin/catch-basin", key: "Admin", label: "Admin" } : null,
        !user ? { href: "/login", key: "login", label: "Login" } : null,
    ].filter(Boolean);

    return (
        <nav className={styles.navbar}>
            {/* <div className={styles.logo}>Ocular Genetic Registry</div> */}
            <div className={styles.logo}>
                <Link href={"/"}>
                <Image
                    src="/logo_transparent.png"
                    alt="Logo"
                    height={130}
                    width={130}
                    className='mx-8'
                    
                />
                </Link>
            </div>
            <ul className={styles.navLinks}>
                {NAV_LINKS.map((link) => (
                    <Link
                        href={link.href}
                        key={link.key}
                        className={`${styles.link} ${
                            // pathname === link.href ? styles.active : ""
                            pathname === link.href ? "bg-gradient-to-r from-bluegreen-70 via-bluegreen-1 to-lightbluegreen-5" : ""
                            }`} // Add active class if the current path matches the link's href
                    >
                        {link.label}
                    </Link>
                ))}
            </ul>
            {user && (
                // When logged in
                <div className={styles.userSection} onClick={toggleDropdown}><span
                    className={styles.userName}
                    data-fullname={userName} // For tooltip
                >
                    Hi, {userName || 'User'}!
                </span>

                    {dropdownOpen && (
                        <div className={styles.dropdownMenu}>
                            <button className={styles.dropdownItem} onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    )}
                    {/* End of when logged in */}
                </div>
            )}
        </nav>
    );
};

export default Navbar;

