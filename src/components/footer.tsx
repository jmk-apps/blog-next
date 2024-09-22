import {Link} from "@nextui-org/react";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import paths from "@/paths";


export default function Footer() {
    const date = new Date();
    return (
        <>
            <div className="bg-gray-700 mt-2 pb-3">
                <div className="grid grid-cols-3 gap-4 p-4">
                    <div className="flex flex-col gap-1">
                        <h1>Navigation</h1>
                        <ul>
                            <li>
                                <Link href={paths.home()}>Home</Link>
                            </li>
                            <li>
                                <Link href={paths.about()}>About</Link>
                            </li>
                            <li>
                                <Link href={paths.signin()}>Login</Link>
                            </li>
                            <li>
                                <Link href={paths.contact()}>Contact</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1>Categories</h1>
                        <ul>
                            <li>
                                <Link href={paths.searchCategory("Technology")}>Technology</Link>
                            </li>
                            <li>
                                <Link href={paths.searchCategory("Work")}>Work</Link>
                            </li>
                            <li>
                                <Link href={paths.searchCategory("Travel")}>Travel</Link>
                            </li>
                            <li>
                                <Link href={paths.searchCategory("Books")}>Books</Link>
                            </li>
                            <li>
                                <Link href={paths.searchCategory("Activities")}>Activities</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1>Follow us</h1>
                        <div className="flex gap-1">
                            <Link href="https://www.facebook.com/"><FaFacebookF /></Link>
                            <Link href="https://x.com/?lang=en"><FaXTwitter /></Link>
                            <Link href="https://www.youtube.com/"><FaYoutube /></Link>
                            <Link href="https://www.instagram.com/"><FaInstagram /></Link>
                        </div>
                    </div>
                </div>
                <div className='text-white text-center'>
                    <p>&copy;HE@D$P@CE {date.getFullYear()}</p>
                    <p>All rights reserved.</p>
                </div>
            </div>
        </>
    )
}

