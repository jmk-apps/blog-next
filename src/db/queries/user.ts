import type {User} from "@prisma/client";
import {db} from "@/db";
import exp from "constants";

export const ITEMS_PER_PAGE = 8;

interface UserListProps {
    page?: string;
    name?: string;
    email?: string;
    roleAdmin?: string;
    roleBlogger?: string;
    roleUser?: string;
    dateCreatedTo?: string;
    dateCreatedFrom?: string;
}


export function fetchUsers(pageP?: string, nameP?: string, emailP?: string, roleAdmin?: string, roleBlogger?: string, roleUser?: string, dateCreatedFromP?: string, dateCreatedToP?: string): Promise<User[]> {
    let skip_results: number;
    if (!pageP) {
        pageP = '1'
    }

    skip_results = 8 * (parseInt(pageP) - 1);

    const dbQuery = {where: {}}
    if (nameP) {
        dbQuery.where.name =  {contains: nameP}
    }
    if (emailP) {
        dbQuery.where.email =  {contains: emailP}
    }

    if ((roleAdmin === 'true') || (roleBlogger === 'true') || (roleUser === 'true')) {
        dbQuery.where.OR = []

        if (roleAdmin) {
            dbQuery.where.OR.push({role: "Admin"})
        }
        if (roleBlogger) {
            dbQuery.where.OR.push({role: "Blogger"})
        }
        if (roleUser) {
            dbQuery.where.OR.push({role: "User"})
        }
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

    return db.user.findMany(dbQuery)
}


export function fetchUserCount(nameP?: string, emailP?: string, roleAdmin?: string, roleBlogger?: string, roleUser?: string, dateCreatedFromP?: string, dateCreatedToP?: string): Promise<number> {
    
    const dbQuery = {where: {}}
    if (nameP) {
        dbQuery.where.name =  {contains: nameP}
    }
    if (emailP) {
        dbQuery.where.email =  {contains: emailP}
    }
    if ((roleAdmin === 'true') || (roleBlogger === 'true') || (roleUser === 'true')) {
        dbQuery.where.OR = []

        if (roleAdmin) {
            dbQuery.where.OR.push({role: "Admin"})
        }
        if (roleBlogger) {
            dbQuery.where.OR.push({role: "Blogger"})
        }
        if (roleUser) {
            dbQuery.where.OR.push({role: "User"})
        }
    }
    if (dateCreatedFromP && dateCreatedToP) {
        const fromArray = dateCreatedFromP.split('-');
        const toArray = dateCreatedToP.split('-');
        dbQuery.where.createdAt = {gte: new Date(parseInt(fromArray[0]), parseInt(fromArray[1])-1, parseInt(fromArray[2])) , lte: new Date(parseInt(toArray[0]), parseInt(toArray[1])-1, parseInt(toArray[2])+1) }
    }
    return db.user.count(dbQuery)
}

