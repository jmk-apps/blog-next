import {
    Navbar,
    NavbarBrand,
    NavbarItem,
    NavbarContent,
    NavbarMenu,
    Input,
    Dropdown,
    DropdownTrigger,
    Avatar,
    DropdownMenu,
    DropdownItem

} from "@nextui-org/react";
import Link from "next/link";
import HeaderAuth from "@/components/header-auth";
import paths from "@/paths";
import SearchInput from "@/components/search-input";


export default function Header() {
  return (
    <Navbar isBordered>

        <NavbarContent justify='center'>
            <NavbarBrand className="mr-4">
                <Link href={paths.home()} className="font-bold text-2xl">he@d$p@ce</Link>
            </NavbarBrand>
        </NavbarContent>

        <NavbarContent justify='start' className=" flex gap-3">
          <NavbarItem>
            <Link color="foreground" href={paths.home()}>
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href={paths.about()} aria-current="page" color="secondary">
              About
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href={paths.contact()}>
              Contact
            </Link>
          </NavbarItem>
        </NavbarContent>


        <NavbarContent justify='end'>
            <SearchInput/>
            <HeaderAuth/>
        </NavbarContent>
    </Navbar>
  );
}
