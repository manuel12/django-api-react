import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { API } from '../api-service';
import "../css/Detailpage.css"
import CommentList from './CommentList';
import { useCookies } from 'react-cookie';

function DetailPage() {
  const { id } = useParams()
  let [resource, setResource] = useState([]);

  const [token] = useCookies(['mr-token']);

  useEffect(() => {
    API.fetchResource({
      resource: null, 
      setResourceFunc: setResource, 
      id: id,
      token: token})
    },[id, token])
  
  return (
    <div className="container">
      <h1 className="heading">
        {resource.title}
      </h1>
      <div className="author-container">
        By <strong>{resource.author}</strong>
      </div>
      <img 
        src={resource.imageURL}
        className="image"
        alt=""></img>
      <div className="value-container">
        <h3>What value does it bring you?</h3>
        <ul>
          <li>{resource.value_one}</li>
          <li>{resource.value_two}</li>
          <li>{resource.value_three}</li>
        </ul>
      </div>
      <h3>Description</h3>
      <p className="paragraph-container">{resource.description}</p>
      <CommentList comments={resource.get_comments}/>
    </div>
  )
}

export default DetailPage;