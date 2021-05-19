import React, { Component ,useEffect } from 'react';

import { list, countTotalPosts} from './apiPost';
import { Link } from 'react-router-dom';
import Loading from '../loading/Loading';
import DefaultProfile from '../images/avatar.jpg'
import { timeDifference } from './timeDifference';
import InfiniteScroll from 'react-infinite-scroll-component';




function Posts()
{
    const [posts,setPosts] = React.useState([]);
   



    useEffect(
    () => 
    {
        fetch(`${process.env.REACT_APP_API_URL}/rn/allposts`, {
              method: "GET"
          })
          .then(response => {
          return response.json();      }  )
          .then(data =>{
          setPosts([...data]);
      
            })}
          
       ,[]);
var pp=[];

 
   
    console.log(pp);
    
 



   
   
    
  
    
   
    



   function r(p) {
       
       
        return (
   



            <div className="row" style={{borderColor : "black"}}>
                
                    { p.map((post, i) => {
                        const posterId = post.postedBy ? post.postedBy._id : "";
                        const posterName = post.postedBy ? post.postedBy.name : " Unknown";
                        return (
                            <div key={post._id} className="card col-md-12 mb-5" style={{ padding: "0" }} >
                                <div className="card-header">
                                    <img
                                        className="mb-1 mr-2"
                                        style={{ height: "40px", width: "40px", borderRadius: "50%" }}
                                        src={`${process.env.REACT_APP_API_URL}/user/photo/${posterId}`}
                                        onError={i => (i.target.src = DefaultProfile)}
                                        alt={posterName}
                                    />
                                    <Link to={`/user/${posterId}`} style={{ fontSize: "24px" }}>
                                        {posterName}
                                    </Link>
                                    <p
                                        style={{ marginBottom: "0" }}
                                        className="pull-right mt-2"
                                    >
                                        <span className="ml-2">
                                            <i className="far fa-clock"></i>{" " + timeDifference(new Date(), new Date(post.created))}
                                        </span>
                                    </p>
                                </div>
                                <Link to={`/post/${post._id}`}>
                                    <img
                                        className="card-img-top"
                                        src={`${process.env.REACT_APP_API_URL}/post/photo/${post._id}`}
                                        alt={post.title}
                                        style={{
                                            maxHeight: "700px",
                                            backgroundSize: "cover",
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: "50% 50%"
                                        }}
                                    />
                                </Link>
                                
                
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.body}</p>
                                    <Link
                                        style={{
                                            background: "#56ccf2",
                                            background: "-webkit-linear-gradient(to left, #56ccf2, #2f80ed)",
                                            background: "linear-gradient(to left, #56ccf2, #2f80ed)",
                                            borderRadius: "20px",
                                            padding: "10px"
                                        }}
                                        to={`/post/${post._id}`}
                                        className="btn btn-raised btn-sm btn-primary">
                                        Read More
                                </Link>
                                </div>

                            </div>

                        );
                    })}
                
            </div>
        );
    }

    


        return(
                <div className="container">
               
                    {  
                        
                        
                        
                        posts.length==0?<Loading />:
                            r(posts)
                        }
                </div>
        );
    }


export default Posts;