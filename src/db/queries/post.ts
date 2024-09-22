import type {Post} from "@prisma/client";
import {db} from "@/db";

export const ITEMS_PER_PAGE = 2;

export type PostWithData = (
    Post & {
       user: {name: string | null, id: string | null};
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
            user: {select: {name: true, id: true}},
        },
        skip: skip_results,
        take: ITEMS_PER_PAGE,
    })
}

export function fetchPostsBySearchTerm(term: string, page?: string ): Promise<PostWithData[]> {
    let skip_results: number;
    if (!page) {
        page = '1'
    }

    skip_results = ITEMS_PER_PAGE * (parseInt(page) - 1);

    return db.post.findMany({
        where: {
            OR: [
                {title: {contains: term}},
                {subtitle: {contains: term}},
                {category: {contains: term}},
                {content: {contains: term}},
            ]
        },
        orderBy: [
            {
                createdAt: "desc"
            }
        ],
        include: {
            user: {select: {name: true, id: true}},
        },
        skip: skip_results,
        take: ITEMS_PER_PAGE,
    })
}

// Category
export function fetchPostsBySearchCategory(category: string, page?: string ): Promise<PostWithData[]> {
    let skip_results: number;
    if (!page) {
        page = '1'
    }

    skip_results = ITEMS_PER_PAGE * (parseInt(page) - 1);

    return db.post.findMany({
        where: {
            category: category
        },
        orderBy: [
            {
                createdAt: "desc"
            }
        ],
        include: {
            user: {select: {name: true, id: true}},
        },
        skip: skip_results,
        take: ITEMS_PER_PAGE,
    })
}


export function fetchPostsBySearchDate(date: string, page?: string): Promise<PostWithData[]> {
    let skip_results: number;
    if (!page) {
        page = '1'
    }

    skip_results = ITEMS_PER_PAGE * (parseInt(page) - 1);

    return db.post.findMany({
        where: {
            createdAt: {
                gte: new Date(`${date}-01-01`),
                lte: new Date(`${date}-12-31`),
            }
        },
        orderBy: [
            {
                createdAt: "desc"
            }
        ],
        include: {
            user: {select: {name: true, id: true}},
        },
        skip: skip_results,
        take: ITEMS_PER_PAGE,
    })
}


