const express = require('express')
const app = express()
const streamerRoutes = require('./routes/streamerRoutes')
const { prismaConnect, prismaDisconnect } = require('./prisma/PrismaClient')


app.use(express.json({}));

app.use(prismaConnect)
app.use('/streamers', streamerRoutes)
app.use(prismaDisconnect)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`))