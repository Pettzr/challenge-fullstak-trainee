import prisma from '../configs/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export async function registerUserService(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
        data: {
            username,
            password: hashedPassword,
        },
    });

    return user;
}

export async function loginUserService(username:string, password:string) {
    const user = await prisma.user.findFirst({
        where:{
            username: username
        }
    })

    if (!user) {
        throw new Error('Usuário não encontrado');
    }

    const passwordComparison = await bcrypt.compare(password, user.password);

    if (!passwordComparison) {
        throw new Error('Senha incorreta');
    }

    const token = jwt.sign(
        { userId: user.id, username: user.username },
        process.env.JWT_SECRET as string,
        { expiresIn: '10h' } 
    );

    return {token}
}

export async function checkLoginService (userId: string) {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }, select: {
            username: true
        }
    })

    return user
}

export async function editUserService (userId: string, newUsername: string) {
    const user = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            username: newUsername
        }
    })

    return user
}

export async function deleteUserService (userId: string) {

    const eventsDeleted = await prisma.event.deleteMany({
        where: {
            userId: userId
        }
    })

    const deletedUser = await prisma.user.delete({
        where: {
            id: userId
        }
    })

    return {deletedUser, eventsDeleted}
}

