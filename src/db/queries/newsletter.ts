import type {Newsletter} from "@prisma/client";
import {db} from "@/db";



export const ITEMS_PER_PAGE = 8;

interface fetchNewslettersProps {
    page?: string;
    subject?: string;
    author?: string;
    newsletter?: string;
    dateCreatedTo?: string;
    dateCreatedFrom?: string;
    dateEmailedTo?: string;
    dateEmailedFrom?: string;

}


// Get Newsletters from the database
export function fetchNewsletters(pageP?: string, subjectP?: string, authorP?: string, newsletterP?: string
    , dateCreatedFromP?: string, dateCreatedToP?: string, dateEmailedFromP?: string, dateEmailedToP?: string ): Promise<Newsletter[]> {
    let skip_results: number;
    if (!pageP) {
        pageP = '1'
    }

    skip_results = ITEMS_PER_PAGE * (parseInt(pageP) - 1);

    const dbQuery = {where: {}}
    if (subjectP) {
        dbQuery.where.subject =  {contains: subjectP}
    }
    if (authorP) {
        dbQuery.where.author =  {contains: authorP}
    }
    if (newsletterP) {
        dbQuery.where.newsletterFile = {contains: newsletterP}
    }
    if (dateCreatedFromP && dateCreatedToP) {
        const fromArray = dateCreatedFromP.split('-');
        const toArray = dateCreatedToP.split('-');
        dbQuery.where.createdAt = {gte: new Date(parseInt(fromArray[0]), parseInt(fromArray[1])-1, parseInt(fromArray[2])) , lte: new Date(parseInt(toArray[0]), parseInt(toArray[1])-1, parseInt(toArray[2])+1) }
    }
    if (dateEmailedFromP && dateEmailedToP) {
        const emailedFrom = dateEmailedFromP.split('-');
        const emailedTo = dateEmailedToP.split('-');
        dbQuery.where.dateEmailed = {gte: new Date(parseInt(emailedFrom[0]), parseInt(emailedFrom[1])-1, parseInt(emailedFrom[2])) , lte: new Date(parseInt(emailedTo[0]), parseInt(emailedTo[1])-1, parseInt(emailedTo[2])+1) }
    }
    
    dbQuery.orderBy = [
        {
            createdAt: "desc"
        }
    ]
    dbQuery.skip = skip_results;
    dbQuery.take = ITEMS_PER_PAGE;

    return db.newsletter.findMany(dbQuery)
}


// Get the count of Newsletters from the database
export function countNewsletters(subjectP?: string, authorP?: string, newsletterP?: string
    , dateCreatedToP?: string, dateCreatedFromP?: string, dateEmailedToP?: string, dateEmailedFromP?: string ): Promise<number> {
    
    const dbQuery = {where: {}}
    if (subjectP) {
        dbQuery.where.subject = {contains: subjectP}
    }
    if (authorP) {
        dbQuery.where.author = {contains: authorP}
    }
    if (newsletterP) {
        dbQuery.where.newsletterFile = {contains: newsletterP}
    }
    if (dateCreatedFromP && dateCreatedToP) {
        const fromArray = dateCreatedFromP.split('-');
        const toArray = dateCreatedToP.split('-');
        dbQuery.where.createdAt = {gte: new Date(parseInt(fromArray[0]), parseInt(fromArray[1])-1, parseInt(fromArray[2])) , lte: new Date(parseInt(toArray[0]), parseInt(toArray[1])-1, parseInt(toArray[2])+1) }
    }
    if (dateEmailedFromP && dateEmailedToP) {
        const emailedFrom = dateEmailedFromP.split('-');
        const emailedTo = dateEmailedToP.split('-');
        dbQuery.where.dateEmailed = {gte: new Date(parseInt(emailedFrom[0]), parseInt(emailedFrom[1])-1, parseInt(emailedFrom[2])) , lte: new Date(parseInt(emailedTo[0]), parseInt(emailedTo[1])-1, parseInt(emailedTo[2])+1)}
    }
    
    return db.newsletter.count(dbQuery)
}

