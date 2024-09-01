import {
    NavbarItem,
    Button,
    Avatar,
    Popover,
    PopoverTrigger,
    PopoverContent,
    Skeleton
} from "@nextui-org/react";
import * as actions from '@/actions'
import Link from "next/link";
import paths from "@/paths";
import {auth} from "@/auth";


export default async function HeaderAuth() {
    const session = await auth()


    let authContent: React.ReactNode;
     if (session?.user) {
        authContent = (
            <Popover placement='left'>
                <PopoverTrigger>
                    <Avatar showFallback src={session.user.image || ''} fallback={
                        <Skeleton className="rounded-full w-12 h-12"/>
                    } />
                </PopoverTrigger>
                <PopoverContent>
                    <div className='p-4'>
                        <form action={actions.signOut}>
                            <Button type='submit'>Sign Out</Button>
                        </form>
                        <Link href={paths.postCreate()}>New Post</Link>
                    </div>
                </PopoverContent>
            </Popover>
        )
     } else {
        authContent = (
            <>
                <NavbarItem>
                    <Link href={paths.signin()}>
                        <Button type='submit' color='secondary' variant='bordered'>
                            Sign In
                        </Button>
                    </Link>
                </NavbarItem>

                <NavbarItem>
                    <Link href={paths.signup()}>
                        <Button color='primary' variant='flat'>
                            Sign Up
                        </Button>
                    </Link>
                </NavbarItem>
            </>
        )
    }

    return (
        authContent
    )
}

