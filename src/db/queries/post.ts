import type {Post} from "@prisma/client";
import {db} from "@/db";


export type PostWithData = (
    Post & {
       user: {name: string | null};
    }
)


export function fetchTopPosts(): Promise<PostWithData[]> {
    return db.post.findMany({
        orderBy: [
            {
                createdAt: "desc"
            }
        ],
        include: {
            user: {select: {name: true}},
        },
        take: 5,
    })
}

