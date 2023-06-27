const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const prismaConnect = async(req,res,next) => {
    try {
        req.prisma = prisma
        console.log("prismaConnect yola devam")
        next()
    } catch (error) {
        console.log("errrr",error)
        next(error)        
    }
}

const prismaDisconnect = async(req, res, next) => {
    const prisma = req.prisma
    await prisma.$disconnect()
    next()
}

module.exports = {
    prismaConnect,
    prismaDisconnect
}