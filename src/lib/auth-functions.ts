import {auth} from "@/auth";


export async function checkAdmin() {
    const session = await auth()
    return session?.user.role === 'Admin'
}

export async function checkUser() {
    const session = await auth()
    return session?.user.role === 'User'
}

export async function checkBlogger() {
    const session = await auth()
    return session?.user.role === 'Blogger'
}


