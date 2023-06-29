import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchStreams } from '../redux/streamSlice';

const StreamerList = () => {
    const dispatch = useDispatch()
    const streamers = useSelector(state => state.stream.streamList)
    const loading = useSelector(state => state.stream.loading)
    const error = useSelector(state => state.stream.error);

    useEffect(() => {
        dispatch(fetchStreams())
    }, [dispatch]);


    if (loading) {
        return <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
    }

    if (error) {
        return <div className="bg-red-500 text-white p-4">
            Error: {error}
        </div>
    }


    return (
        <div className="flex justify-center my-4">
            <table className="border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Streamer Name</th>
                        <th className="border border-gray-300 px-4 py-2">Image</th>
                        <th className="border border-gray-300 px-4 py-2">Description</th>
                        <th className="border border-gray-300 px-4 py-2">Upvotes</th>
                        <th className="border border-gray-300 px-4 py-2">Downvotes</th>
                    </tr>
                </thead>
                <tbody>
                    {streamers?.map((streamer) => (
                        <tr key={streamer.id} className="text-center">
                            <td className="border border-gray-300 px-4 py-2">{streamer.name}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <img src={streamer.image} alt={streamer.name} className="w-20 h-20" />
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{streamer.description}</td>
                            <td className="border border-gray-300 px-4 py-2">{streamer.upvote}</td>
                            <td className="border border-gray-300 px-4 py-2">{streamer.downvote}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default StreamerList