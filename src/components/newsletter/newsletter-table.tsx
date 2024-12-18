'use client';

import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import type {Newsletter} from '@prisma/client';
import { formatDate } from "@/lib/help-functions";
import NewsletterActionsButton from "./newsletter-actions-button";
import * as actions from "@/actions";
import {useFormState} from "react-dom";
import { CiFilter } from "react-icons/ci";
import {Popover, PopoverTrigger, PopoverContent, Button, Input} from "@nextui-org/react";
import FormButton from "../common/form-button";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter, redirect } from 'next/navigation'
import {Chip} from "@nextui-org/react";


interface NewsletterTableProps {
    newsletters: Newsletter[];
}

export default function NewsletterTable({newsletters}: NewsletterTableProps) {

    const searchParams = useSearchParams()
    const pathname = usePathname();
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);

    const [formState, action]= useFormState(
        actions.getNewsletters, {}
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


    const renderedNewsletters = newsletters.map((newsletter) => {
        return (
            <TableRow key={newsletter.id} >
                <TableCell>{newsletter.subject}</TableCell>
                <TableCell>{newsletter.author}</TableCell>
                <TableCell>{newsletter.newsletterFile}</TableCell>
                <TableCell>{formatDate(newsletter.createdAt)}</TableCell>
                <TableCell>{newsletter.dateEmailed ? formatDate(newsletter.dateEmailed) : "Not Emailed"}</TableCell>
                <TableCell><NewsletterActionsButton newsletterId={newsletter.id}/></TableCell>
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
                            {searchParams.get('subject') ? (
                                <Input type="text" label="Subject" name="subject" defaultValue={searchParams.get("subject")} />
                            ): (
                                <Input type="text" label="Subject" name="subject" />
                            )}
                            
                            {searchParams.get('author') ? (
                                <Input type="text" label="Author" name="author" defaultValue={searchParams.get("author")} />
                            ): (
                                <Input type="text" label="Author" name="author" />
                            )}

                            {searchParams.get('newsletter') ? (
                                <Input type="text" label="Newsletter" name="newsletter" defaultValue={searchParams.get("newsletter")} />
                            ): (
                                <Input type="text" label="Newsletter" name="newsletter" />
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

                            {searchParams.get('dateEmailedFrom') ? (
                                <Input type="date" label="Date Emailed From:" name="dateEmailedFrom" defaultValue={searchParams.get("dateEmailedFrom")} />
                            ): (
                                <Input type="date" label="Date Emailed From:" name="dateEmailedFrom" />
                            )}

                            {searchParams.get('dateEmailedTo') ? (
                                <Input className="mr-2" type="date" label="Date Emailed To:" name="dateEmailedTo" defaultValue={searchParams.get("dateEmailedTo")} />
                            ): (
                                <Input className="mr-2" type="date" label="Date Emailed To:" name="dateEmailedTo" />
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
                                SUBJECT
                                {searchParams.get('subject') && (
                                    <Chip 
                                        size="sm"
                                        color="primary"
                                        onClose={() => chipCloseText('subject')}
                                    >
                                        {searchParams.get('subject')}
                                    </Chip>
                                )} 
                            </div>
                        </TableColumn>
                        <TableColumn>
                            <div className="flex flex-col gap-2">
                                AUTHOR
                                {searchParams.get('author') && (
                                    <Chip 
                                        size="sm"
                                        color="primary"
                                        onClose={() => chipCloseText('author')}
                                    >
                                        {searchParams.get('author')}
                                    </Chip>
                                )} 
                            </div>
                        </TableColumn>
                        <TableColumn>
                            <div className="flex flex-col gap-2">
                                NEWSLETTER
                                {searchParams.get('newsletter') && (
                                    <Chip 
                                        size="sm"
                                        color="primary"
                                        onClose={() => chipCloseText('newsletter')}
                                    >
                                        {searchParams.get('newsletter')}
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
                                        onClose={() => chipCloseDate('dateCreatedFrom','dateCreatedTo')}
                                    >
                                        {`${searchParams.get('dateCreatedFrom')}-${searchParams.get('dateCreatedTo')}`}
                                    </Chip>
                                )} 
                            </div>
                        </TableColumn>
                        <TableColumn>
                            <div className="flex flex-col gap-2">
                                DATE EMAILED
                                {searchParams.get('dateEmailedFrom') && searchParams.get('dateEmailedTo') && (
                                    <Chip 
                                        size="sm"
                                        color="primary"
                                        onClose={() => chipCloseDate('dateEmailedFrom','dateEmailedTo')}
                                    >
                                        {`${searchParams.get('dateEmailedFrom')}-${searchParams.get('dateEmailedTo')}`}
                                    </Chip>
                                )} 
                            </div>
                        </TableColumn>
                        <TableColumn>ACTIONS</TableColumn>
                    
                </TableHeader>
                <TableBody emptyContent={"No newsletters to display."}>
                    {renderedNewsletters}
                </TableBody>
            </Table>
        </>
        
        
    )

}

