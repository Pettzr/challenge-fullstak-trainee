import prisma from "../configs/prisma";

export async function getUsersAdminService (userId: string ) {
    const admin = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if(admin?.username !== "admin") {
        throw new Error('Usuário não é admin');
    } else {
        const users = await prisma.user.findMany()
    
        return users
    }

}

export async function editUserAdminService (userId: string, username: string, newUsername: string ) {
    const admin = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if(admin?.username !== "admin") {
        throw new Error('Usuário não é admin');
    } else {
        const user = await prisma.user.update({
            where: {
                username: username
            }, data :{
                username: newUsername
            }
        }) 
    
        return user
    }

}


export async function deleteUserAdminService (userId: string, username: string) {
    const admin = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if(admin?.username !== "admin") {
        throw new Error('Usuário não é admin');
    } else {
       const user = await prisma.user.delete({
        where: {
            username: username
        }
       })
    
        return user
    }
}