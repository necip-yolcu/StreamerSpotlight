import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchStreams, updateVoteStream } from '../redux/streamSlice'
import { Link, useNavigate } from 'react-router-dom'
import StreamerServices from '../services/StreamerServices';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

const StreamerList = () => {
    const dispatch = useDispatch()
    const streamers = useSelector(state => state.stream.streamList)
    const loading = useSelector(state => state.stream.loading)
    const error = useSelector(state => state.stream.error)

    useEffect(() => {
        dispatch(fetchStreams())
    }, [dispatch])

    const navigate = useNavigate()

    const handleItemClick = id => navigate(`/record/${id}`)

    const handleVote = async (streamerId, vote) => {
        dispatch(updateVoteStream({streamerId, vote}))
    }

    /* if (loading)
        return <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div> */

    if (error)
        return <div className="bg-red-500 text-white p-4">
            Error: {error}
        </div>


    return (
        <div className="flex justify-center my-4">
            <div className="overflow-x-auto">
                <table className="border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Streamer Name</th>
                            <th className="border border-gray-300 px-4 py-2">Image</th>
                            <th className="border border-gray-300 px-4 py-2">Description</th>
                            <th className="border border-gray-300 px-4 py-2">Upvotes</th>
                            <th className="border border-gray-300 px-4 py-2">Downvotes</th>
                            <th className="border border-gray-300 px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {streamers?.slice().reverse().map((streamer) => (
                            <tr key={streamer.id} className="text-center h-full">
                                <td className="border border-gray-300 px-4 py-2">
                                    <Link to={`/record/${streamer.id}`}>
                                        {streamer.name}
                                    </Link>
                                </td>

                                <td className="border border-gray-300 px-4 py-2">
                                    <img src={streamer.image} alt={streamer.name} className="w-20 h-20" />
                                </td>

                                <td className="border border-gray-300 px-4 py-2">{streamer.description}</td>

                                <td className="border border-gray-300 px-4 py-2">
                                    <div className='flex items-center justify-center'>
                                        <FaAngleUp
                                            className="mr-2 cursor-pointer text-xl text-green-500 transition duration-300 ease-in-out transform hover:scale-150"
                                            onClick={() => handleVote(streamer.id, "upvote")}
                                        />
                                        {streamer.upvote}
                                    </div>
                                </td>

                                <td className="border border-gray-300 px-4 py-2">
                                    <div className='flex items-center justify-center'>
                                        <FaAngleDown
                                            className="mr-2 cursor-pointer text-xl text-red-500 transition duration-300 ease-in-out transform hover:scale-150"
                                            onClick={() => handleVote(streamer.id, "downvote")}
                                        />
                                        {streamer.downvote}
                                    </div>
                                </td>

                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                                        onClick={() => handleItemClick(streamer.id)}>
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default StreamerList