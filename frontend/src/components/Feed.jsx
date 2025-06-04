import axios from 'axios'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { BACKEND_BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../store/slices/feed'
import UserCard from './UserCard'

function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector((store)=>store.feed);
  const getFeed = async()=>{
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/user/feed`,{withCredentials:true});
      dispatch(addFeed(response?.data?.data));
    } catch (error) {
      toast.error(error?.response?.data?.message||"Something went wrong")
    }
  }
  useEffect(()=>{
    getFeed();
  },[])
  return (
    <div>
      {feed&&<UserCard user={feed[0]}/>}
    </div>
  )
}

export default Feed
