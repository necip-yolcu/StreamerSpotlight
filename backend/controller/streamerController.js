const addStreamer = async (req, res) => {
    try {
        const isExist = await req.prisma.Streamer.findFirst({
            where: { name: req.body?.name }
        })

        if (isExist)
            return res.status(404).send("The streamer name is already taken")

        const addedData = await req.prisma.Streamer.create({
            data: req.body
        })
        res.status(200).send(addedData)
    } catch (error) {
        res.status(500).send(error.name)
    }
}

const getAllStreamers = async (req, res) => {
    try {
        const getAllStreamers = await req.prisma.Streamer.findMany()
        res.status(200).send(getAllStreamers)
    } catch (error) {
        res.status(500).send(error.name)
    }
}

const getStreamerByID = async (req, res) => {
    try {
        const getStreamerByID = await req.prisma.Streamer.findFirst({
            where: {
                id: req.params.id
            }
        })
        res.status(200).send(getStreamerByID)
    } catch (error) {
        res.status(500).send(error.name)
    }
}

const updateVoteStreamerByID = async (req, res) => {
    try {
        const updatedData = await req.prisma.Streamer.update({
            where: { id: req.params.id },
            data: {
                upvote: req.body.action === 'upvote' ? { increment: 1 } : undefined,
                downvote: req.body.action === 'downvote' ? { decrement: 1 } : undefined,
            }
        })
        res.status(200).send(updatedData)
    } catch (error) {
        res.status(500).send(error.name)
    }
}

module.exports = {
    addStreamer,
    getAllStreamers,
    getStreamerByID,
    updateVoteStreamerByID
}