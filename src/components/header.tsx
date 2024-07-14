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


export default function Header() {
  return (
    <Navbar isBordered>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <p className="hidden sm:block font-bold text-inherit">ACME</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-3">
          <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page" color="secondary">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent justify='end'>
          <HeaderAuth/>
      </NavbarContent>
    </Navbar>
  );
}
