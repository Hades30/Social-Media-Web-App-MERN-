import React  from 'react';

import Posts from '../post/Posts';
import { isAuthenticated } from "../auth/Index";
import logo from './bg.jpg'; // with import
console.log(isAuthenticated)
const Home = () => (
    <>
        <div className="container"  style={{paddingBottom : "300px"}}>
       
       
        { 
            
            isAuthenticated() ?
            <Posts /> : null}

            

            { 
            
            !isAuthenticated() ?
            <div className ="container">

            
            <h1 style={{textAlign :"right" , fontFamily : "lobster" ,fontSize : "70px",paddingTop : "0px" , position : "absolute" , right: "20px" , top : "90px" }}>
           Welcome<br /><span style={{msAlignSelf :"middle", position: "absolute" , right : "110px"}}>
               to
           </span><br /> <span style= {{fontSize : "70px"}}>
           Social App
           </span>
        </h1> 
        </div> : null}
            


        </div>
        {isAuthenticated() && <footer className="page-footer font-small" style={{ background: "#3E4551" }}>
            <div className="container">
                <p className="text-center" style={{ color: "#fff", fontSize: "large", margin: "0", padding: "20px" }}>
                    Made with <i className="fas fa-heart" style={{ color: "red", fontSize: "24px" }}></i> by ANT
                        
                </p>
            </div>
        </footer>}
    </>
);

export default Home;