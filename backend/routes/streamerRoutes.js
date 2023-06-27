const express = require('express');
const router = express.Router();

const {
    addStreamer,
    getAllStreamers,
    getStreamerByID,
    updateVoteStreamerByID
} = require('../controller/streamerController')

router.get('/', getAllStreamers)

router.get('/:id', getStreamerByID)

router.post('/', addStreamer)


router.put('/:id/vote', updateVoteStreamerByID)

module.exports = router