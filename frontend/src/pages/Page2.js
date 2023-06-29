import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchStreams } from '../redux/streamSlice';
import { useParams } from 'react-router-dom';

const Page2 = () => {
  const dispatch = useDispatch()
  const { streamID } = useParams()

  const streamer = useSelector(state => state.stream.streamList).find(streamer => streamer.id === streamID)

  useEffect(() => {
    dispatch(fetchStreams())
  }, [dispatch]);

  if (!streamer) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <img src={streamer.image} alt={streamer.name} />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{streamer.name}</h2>
          <p className="text-gray-700 text-base mb-2">{streamer.description}</p>
          <p className="text-gray-500 text-sm">Platform: {streamer.platform}</p>
        </div>
      </div>
    </div>
  )
}

export default Page2