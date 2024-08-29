import type {Post} from "@prisma/client";
import {db} from "@/db";

export const ITEMS_PER_PAGE = 2;

export type PostWithData = (
    Post & {
       user: {name: string | null};
    }
)


export function fetchTopPosts(page?: string): Promise<PostWithData[]> {
    let skip_results: number;
    if (!page) {
        page = '1'
    }

    skip_results = ITEMS_PER_PAGE * (parseInt(page) - 1);


    return db.post.findMany({
        orderBy: [
            {
                createdAt: "desc"
            }
        ],
        include: {
            user: {select: {name: true}},
        },
        skip: skip_results,
        take: ITEMS_PER_PAGE,
    })
}

