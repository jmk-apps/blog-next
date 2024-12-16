import {auth} from "@/auth";
import paths from "@/paths";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    Button,
    Link
} from "@nextui-org/react";


export default async function HeaderAdmin() {
    
    const session = await auth()
    
    let adminContent: React.ReactNode;
    if (session?.user.role === 'Admin') {
        adminContent = (
            <Popover placement='bottom'>
                <PopoverTrigger>
                    <Button
                        color='primary'
                    >
                        Admin
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className='flex flex-col p-2'>
                        <Button
                            as={Link}
                            href={paths.subscribers()}
                            className="mb-1"
                        >
                            Subscribers
                        </Button>
                        <Button
                            as={Link}
                            href={paths.newsletters()}
                            className="mb-1"
                        >
                            Newsletters
                        </Button>
                        <Button
                            as={Link}
                            href={paths.users()}
                        >
                            Users
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
        )
    } else {
        adminContent = (
            <></>
        )
    }

    return (
        adminContent
    )

}


