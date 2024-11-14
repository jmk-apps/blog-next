'use client';

import paths from "@/paths";
import {Popover, PopoverTrigger, PopoverContent, Button, Link, useDisclosure} from "@nextui-org/react";
import { HiDotsVertical } from "react-icons/hi";
import NewsletterDeleteButtonTable from "./newsletter-delete-button-table";


interface NewsletterActionsButtonProps {
    newsletterId: string;
}

export default function NewsletterActionsButton({newsletterId}: NewsletterActionsButtonProps) {

    const deleteNewsletterModal = useDisclosure();

    return (
        <>
            <Popover placement="bottom" showArrow={true}>
                <PopoverTrigger>
                    <Button isIconOnly><HiDotsVertical /></Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Button
                        href={paths.newsletterShow(newsletterId)}
                        as={Link}
                        color="primary"
                        variant="solid"
                    >
                        View
                    </Button>
                    <Button
                        color="danger"
                        onPress={() => deleteNewsletterModal.onOpen()}
                    >
                        Delete
                    </Button>
                </PopoverContent>
            </Popover>
            <NewsletterDeleteButtonTable newsletterId={newsletterId} disclosure={deleteNewsletterModal} />
        </>
        
        
    )
}