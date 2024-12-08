'use client';

import type {Subscriber} from '@prisma/client';
import type {Newsletter} from '@prisma/client';
import { formatDate } from "@/lib/help-functions";
import * as actions from "@/actions";
import {useFormState} from "react-dom";
import { CiFilter } from "react-icons/ci";
import {Popover, 
    PopoverTrigger, 
    PopoverContent, 
    Button, 
    Input, 
    Table, 
    TableHeader, 
    TableColumn, 
    TableBody, 
    TableRow, 
    TableCell,
    Checkbox
} from "@nextui-org/react";
import FormButton from "../common/form-button";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter, redirect } from 'next/navigation'
import {Chip} from "@nextui-org/react";
import SubscriberDeleteButton from './subscriber-delete-button';



interface SubscriberTableProps {
    subscribers: Subscriber[];
}

export default function SubscriberTable({subscribers}: SubscriberTableProps) {

    const searchParams = useSearchParams()
    const pathname = usePathname();
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);

    const [formState, action]= useFormState(
        actions.getSubscribers, {}
    );

    useEffect(() => {
        if (formState.success && formState.route_path) {
           setIsOpen(false)
           redirect(formState.route_path)
        }
    }, [formState]);

    function chipCloseText(query_param: string) {
        let url_queries = ""
        searchParams.forEach((value, key) => {
            if ((key !== query_param) && (key !== 'page')) {
                url_queries += `&${key}=${value}`
            }
        })

    
        router.push(`${pathname}?page=1${url_queries}`)
        router.refresh()

    }

    function chipCloseDate(query_param1: string, query_param2: string) {

        let url_queries = ""
        searchParams.forEach((value, key) => {
            if ((key !== query_param1) && (key !== query_param2) && (key !== 'page')) {
                url_queries += `&${key}=${value}`
            }
        })

        
        router.push(`${pathname}?page=1${url_queries}`)
        router.refresh()

    }

    const renderedSubscribers = subscribers.map((subscriber) => {
        return (
            <TableRow key={subscriber.id} >
                <TableCell>{subscriber.email}</TableCell>
                <TableCell>{formatDate(subscriber.createdAt)}</TableCell>
                <TableCell><SubscriberDeleteButton subscriberId={subscriber.id} email={subscriber.email}/></TableCell>
            </TableRow>
        )
    })


    return (

        <>
            <Popover placement="bottom" showArrow={true} isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
                <PopoverTrigger>
                    <Button><CiFilter />Table Filter</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <form action={action} >
                        <div className=" flex px-1 py-2">
                            {searchParams.get('email') ? (
                                <Input type="text" label="Email" name="email" defaultValue={searchParams.get("email")} />
                            ): (
                                <Input type="text" label="Email" name="email" />
                            )}

                            {searchParams.get('dateCreatedFrom') ? (
                                <Input type="date" label="Date Created From:" name="dateCreatedFrom" defaultValue={searchParams.get("dateCreatedFrom")} />
                            ): (
                                <Input type="date" label="Date Created From:" name="dateCreatedFrom" />
                            )}

                            {searchParams.get('dateCreatedTo') ? (
                                <Input type="date" label="Date Created To:" name="dateCreatedTo" defaultValue={searchParams.get("dateCreatedTo")} />
                            ): (
                                <Input type="date" label="Date Created To:" name="dateCreatedTo" />
                            )}

                            
                            <FormButton color="primary">Apply</FormButton>
                        </div>
                    </form>
                </PopoverContent>
            </Popover>

            <Table aria-label="Example static collection table">
                <TableHeader>
                        <TableColumn>
                            <div className="flex flex-col gap-2">
                                EMAIL
                                {searchParams.get('email') && (
                                    <Chip 
                                        size="sm"
                                        color="primary"
                                        onClose={() => chipCloseText('email')}
                                    >
                                        {searchParams.get('email')}
                                    </Chip>
                                )} 
                            </div>
                        </TableColumn>
                        <TableColumn>
                            <div className="flex flex-col gap-2">
                                DATE CREATED
                                {searchParams.get('dateCreatedFrom') && searchParams.get('dateCreatedTo') && (
                                    <Chip 
                                        size="sm"
                                        color="primary"
                                        onClose={() => chipCloseDate('dateCreatedFrom', 'dateCreatedTo')}
                                    >
                                        {`${searchParams.get('dateCreatedFrom')}-${searchParams.get('dateCreatedTo')}`}
                                    </Chip>
                                )} 
                            </div>
                        </TableColumn>
                        <TableColumn>ACTIONS</TableColumn>
                    
                </TableHeader>
                <TableBody emptyContent={"No subscribers to display."}>
                    {renderedSubscribers}
                </TableBody>
            </Table>
        </>
        
        
    )
}