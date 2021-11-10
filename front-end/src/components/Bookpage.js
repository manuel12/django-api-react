import React, { useState, useEffect } from 'react';
import PostList from './PostList';
import { API  } from '../api-service';
import { useCookies } from 'react-cookie';

function BookPage() {
  let [resources, setResources] = useState([]);
  const [token] = useCookies(['mr-token']);

  useEffect(() => {
    API.fetchResource({
      resource: 'books', 
      setResourceFunc: setResources,
      token: token})
  }, [token])
  
  return (
    <div>
      <PostList resources={resources}/>
    </div>
  )
}

export default BookPage;