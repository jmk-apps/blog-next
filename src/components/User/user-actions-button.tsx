'use client';

import paths from "@/paths";
import {Popover, PopoverTrigger, PopoverContent, Button, Link, useDisclosure} from "@nextui-org/react";
import { HiDotsVertical } from "react-icons/hi";
import UserDeleteButtonTable from "./user-delete-button-table";


interface UserActionsButtonProps {
    userId: string;
    username: string;
}

export default function UserActionsButton({userId, username}: UserActionsButtonProps) {

    const deleteUserModal = useDisclosure();

    return (
        <>
            <Popover placement="bottom" showArrow={true}>
                <PopoverTrigger>
                    <Button isIconOnly><HiDotsVertical /></Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Button
                        href={paths.userAccount(userId)}
                        as={Link}
                        color="primary"
                        variant="solid"
                    >
                        View
                    </Button>
                    <Button
                        color="danger"
                        onPress={() => deleteUserModal.onOpen()}
                    >
                        Delete
                    </Button>
                </PopoverContent>
            </Popover>
            <UserDeleteButtonTable userId={userId} username={username} disclosure={deleteUserModal} />
        </>
        
        
    )

}


