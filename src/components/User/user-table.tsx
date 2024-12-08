'use client';

import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Checkbox} from "@nextui-org/react";
import type {User} from '@prisma/client';
import { formatDate } from "@/lib/help-functions";
import * as actions from "@/actions";
import {useFormState} from "react-dom";
import { CiFilter } from "react-icons/ci";
import {Popover, PopoverTrigger, PopoverContent, Button, Input} from "@nextui-org/react";
import FormButton from "../common/form-button";
import { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter, redirect } from 'next/navigation'
import {Chip} from "@nextui-org/react";
import UserActionsButton from "./user-actions-button";

interface UserTableProps {
    users: User[];
}


export default function UserTable({users}: UserTableProps) {

    const searchParams = useSearchParams()
    const pathname = usePathname();
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);

    const [formState, action]= useFormState(
        actions.getUsers, {}
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

    const renderedUsers = users.map((user) => {
        return (
            <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{formatDate(user.createdAt)}</TableCell>
                <TableCell><UserActionsButton userId={user.id} username={user.name || "No username"} /></TableCell>
            </TableRow>
        )
    })

    return (
        <>
            <h1>User List</h1>
            <Popover placement="bottom" showArrow={true} isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
                <PopoverTrigger>
                    <Button><CiFilter />Table Filter</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <form action={action} >
                        <div className=" flex px-1 py-2">
                            {searchParams.get('name') ? (
                                <Input type="text" label="Name" name="name" defaultValue={searchParams.get("name")} />
                            ): (
                                <Input type="text" label="Name" name="name" />
                            )}
                            
                            {searchParams.get('email') ? (
                                <Input type="text" label="Email" name="email" defaultValue={searchParams.get("email")} />
                            ): (
                                <Input type="text" label="Email" name="email" />
                            )}

                            <div className="flex flex-col g-1">
                                {(searchParams.get('roleAdmin') === 'true') ? (
                                    <Checkbox name="roleAdmin" size="sm" defaultSelected>Admin</Checkbox>
                                ): (
                                    <Checkbox name="roleAdmin" value="true" size="sm" >Admin </Checkbox>
                                )}

                                {(searchParams.get('roleBlogger') === 'true') ? (
                                    <Checkbox name="roleBlogger" size="sm" defaultSelected>Blogger</Checkbox>
                                ): (
                                    <Checkbox name="roleBlogger" value="true" size="sm" >Blogger</Checkbox>
                                )}

                                {(searchParams.get('roleUser') === 'true') ? (
                                    <Checkbox name="roleUser" size="sm" defaultSelected>User</Checkbox>
                                ): (
                                    <Checkbox name="roleUser" value="true" size="sm" >User</Checkbox>
                                )}

                            </div>
                            
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
                                USERNAME
                                {searchParams.get('name') && (
                                    <Chip 
                                        size="sm"
                                        color="primary"
                                        onClose={() => chipCloseText('name')}
                                    >
                                        {searchParams.get('name')}
                                    </Chip>
                                )} 
                            </div>
                        </TableColumn>
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
                                ROLE
                                {(searchParams.get('roleAdmin') === 'true') && (
                                    <Chip
                                        className="mb-1"
                                        size="sm"
                                        color="primary"
                                        onClose={() => chipCloseText('roleAdmin')}
                                    >
                                        Admin
                                    </Chip>
                                )}

                                {(searchParams.get('roleBlogger') === 'true') && (
                                    <Chip
                                        className="mb-1"
                                        size="sm"
                                        color="primary"
                                        onClose={() => chipCloseText('roleBlogger')}
                                    >
                                        Blogger
                                    </Chip>
                                )}

                                {(searchParams.get('roleUser') === 'true') && (
                                    <Chip
                                        className="mb-1"
                                        size="sm"
                                        color="primary"
                                        onClose={() => chipCloseText('roleUser')}
                                    >
                                        User
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
                <TableBody emptyContent={"No users to display."}>
                    {renderedUsers}
                </TableBody>
            </Table>

        </>
    )
}
