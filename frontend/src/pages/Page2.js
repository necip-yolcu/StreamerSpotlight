import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchStreams } from '../redux/streamSlice';
import { useParams } from 'react-router-dom';
import StreamerRecord from '../components/StreamerRecord';

const Page2 = () => {
  return (
    <StreamerRecord />
  )
}

export default Page2