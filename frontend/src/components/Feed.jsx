import axios from 'axios'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { BACKEND_BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed, removeFeed } from '../store/slices/feed'
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
  },[]);

  const onClickHandler = async(status,userId)=>{
    try {
      const response = await axios.post(BACKEND_BASE_URL+"/request/send/"+status+"/"+userId,{},{withCredentials:true});
      dispatch(removeFeed(userId));
      toast.success(response?.data?.message);
    } catch (error) {
      toast.error("BACKEND ERROR");
      console.log(error);
    }
  }
  return (
    <div>
      {
        feed.length===0 &&<h1 className='text-center pt-6 text-2xl font-bold text-purple-600'>No Feed Found</h1>
      }
      {feed.length>0&&<UserCard onClickHandler={onClickHandler} user={feed[0]}/>}
    </div>
  )
}

export default Feed
