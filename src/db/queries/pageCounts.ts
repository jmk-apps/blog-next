import {db} from "@/db";

export function countTopPosts() {
    return db.post.count()
}


export function countPostsBySearchTerm(term: string) {
    return db.post.count({
        where: {
            OR: [
                {title: {contains: term}},
                {subtitle: {contains: term}},
                {category: {contains: term}},
                {content: {contains: term}},
            ]
        }
    })
}
