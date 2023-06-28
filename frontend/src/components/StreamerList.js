import React, { useEffect, useState } from 'react'
import StreamerServices from '../services/StreamerServices';

const StreamerList = () => {
    const [streamers, setStreamers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await StreamerServices.getAllStreamers()
                    .then(response => {
                        setStreamers(response);
                    })
                    .catch(error => {
                        console.error('Error fetching streamers:', error)
                    })
            } catch (error) {
                console.error('Error fetching streamers:', error)
            }
        }

        fetchData()
    }, []);

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