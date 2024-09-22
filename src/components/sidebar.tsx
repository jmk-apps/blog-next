import {Button, Link} from "@nextui-org/react";
import paths from "@/paths";


export default function Sidebar() {
    return (
        <>
            <div>
                <h1 className="font-bold">About</h1>
                <p>
                    He@d$p@ce was started in 2024 by John Doe. He@d$p@ce is more than just a blog but a place that
                    readers can receive tools that can help anyone willing to learn to get to the right headspace.
                </p>
            </div>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
            <div>
                <h1 className="font-bold">Tags</h1>
                <div className="flex flex-wrap gap-1">
                    <Button
                        radius="none"
                        as={Link}
                        href={paths.searchCategory('Technology')}
                    >
                        TECHNOLOGY
                    </Button>
                    <Button
                        radius="none"
                        as={Link}
                        href={paths.searchCategory('Work')}
                    >
                        WORK
                    </Button>
                    <Button
                        radius="none"
                        as={Link}
                        href={paths.searchCategory('Travel')}
                    >
                        TRAVEL
                    </Button>
                    <Button
                        radius="none"
                        as={Link}
                        href={paths.searchCategory('Books')}
                    >
                        BOOKS
                    </Button>
                    <Button
                        radius="none"
                        as={Link}
                        href={paths.searchCategory('Activities')}
                    >
                        ACTIVITIES
                    </Button>
                </div>
            </div>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
            <div>
                <h1 className="font-bold">Archives</h1>
                <div className="flex flex-col gap-1">
                    <Button
                        radius="none"
                        as={Link}
                        href={paths.searchDate('2024')}
                    >
                        2024
                    </Button>
                    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <Button
                        radius="none"
                        as={Link}
                        href={paths.searchDate('2023')}
                    >
                        2023
                    </Button>
                    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <Button
                        radius="none"
                        as={Link}
                        href={paths.searchDate('2022')}
                    >
                        2022
                    </Button>
                    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <Button
                        radius="none"
                        as={Link}
                        href={paths.searchDate('2021')}
                    >
                        2021
                    </Button>
                    <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <Button
                        radius="none"
                        as={Link}
                        href={paths.searchDate('2020')}
                    >
                        2020
                    </Button>
                </div>
            </div>
        </>
    )
}

