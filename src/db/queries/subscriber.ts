import type {Subscriber} from "@prisma/client";
import {db} from "@/db";


export const ITEMS_PER_PAGE = 3;

interface SubscriberListProps {
    page?: string;
    email?: string;
    dateCreatedFrom?: string;
    dateCreatedTo?: string;
}

export function fetchSubscribers(pageP?: string, emailP?: string, dateCreatedFromP?: string, dateCreatedToP?: string): Promise<Subscriber[]> {
    let skip_results: number;
    if (!pageP) {
        pageP = '1'
    }

    skip_results = 3 * (parseInt(pageP) - 1);

    const dbQuery = {where: {}}
    if (emailP) {
        dbQuery.where.email =  {contains: emailP}
    }
    if (dateCreatedFromP && dateCreatedToP) {
        const fromArray = dateCreatedFromP.split('-');
        const toArray = dateCreatedToP.split('-');
        dbQuery.where.createdAt = {gte: new Date(parseInt(fromArray[0]), parseInt(fromArray[1])-1, parseInt(fromArray[2])) , lte: new Date(parseInt(toArray[0]), parseInt(toArray[1])-1, parseInt(toArray[2])+1) }
    }
    
    dbQuery.orderBy = [
        {
            createdAt: "desc"
        }
    ]
    dbQuery.skip = skip_results;
    dbQuery.take = ITEMS_PER_PAGE;

    return db.subscriber.findMany(dbQuery)
}


export function countSubscribers(emailP?: string, dateCreatedFromP?: string, dateCreatedToP?: string): Promise<number> {
    const dbQuery = {where: {}}
    if (emailP) {
        dbQuery.where.email =  {contains: emailP}
    }
    if (dateCreatedFromP && dateCreatedToP) {
        const fromArray = dateCreatedFromP.split('-');
        const toArray = dateCreatedToP.split('-');
        dbQuery.where.createdAt = {gte: new Date(parseInt(fromArray[0]), parseInt(fromArray[1])-1, parseInt(fromArray[2])) , lte: new Date(parseInt(toArray[0]), parseInt(toArray[1])-1, parseInt(toArray[2])+1) }
    }
    return db.subscriber.count(dbQuery)
}

