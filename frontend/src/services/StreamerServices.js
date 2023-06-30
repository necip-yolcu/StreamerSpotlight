import requests from "./httpService";

const StreamerServices = {
    addStreamer(body) {
        return requests.post('/streamers', body)
    },
    
    getAllStreamers() {
        return requests.get('/streamers')
    },

    getStreamerByID(id) {
        return requests.get(`/streamers/${id}`)
    },

    updateVoteByID(id, body) {
        return requests.put(`/streamers/${id}/vote`, body)
    }

}

export default StreamerServices;