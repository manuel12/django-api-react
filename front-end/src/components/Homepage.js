import React, { useState, useEffect } from 'react';
import PostList from './PostList';
import { API  } from '../api-service';

function HomePage(props) {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    API.fetchResource({
      resource: 'home', 
      setResourceFunc: setResources})
  }, [])

  return (
    <div className="homepage" data-test="homepage">
      <PostList resources={resources}/>
    </div>
  )
}

export default HomePage;