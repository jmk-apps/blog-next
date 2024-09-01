'use client';

import {Input} from "@nextui-org/react";
import {useSearchParams} from "next/navigation";
import * as actions from "@/actions";
import { FaMagnifyingGlass } from "react-icons/fa6";


export default function SearchInput() {
    const searchParams = useSearchParams();

    return (
        <form action={actions.search}>
            <Input
                startContent={<FaMagnifyingGlass />}
                name='term'
                placeholder="Search..."
                defaultValue={searchParams.get('term') || "" }
            />
        </form>
    )
}