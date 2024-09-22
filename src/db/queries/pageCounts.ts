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


// Category
export function countPostsBySearchCategory(category: string) {
    return db.post.count({
        where: {
            category: category
        }
    })
}

// Date
export function countPostsBySearchDate(date: string) {
    return db.post.count({
        where: {
            createdAt: {
                gte: new Date(`${date}-01-01`),
                lte: new Date(`${date}-12-31`),
            }
        }
    })
}
