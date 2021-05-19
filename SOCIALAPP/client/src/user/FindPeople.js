import React, { Component, useEffect } from 'react';

import { findPeople, follow } from './apiUser';
import DefaultProfile from '../images/avatar.jpg';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/Index';

import Loading from '../loading/Loading';
var allusers = [];
function FindPeople() {

    const [users, setusers] = React.useState([]);

    useEffect(
        () => {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;
            findPeople(userId, token)
                .then(data => {
                    if (data.error) {
                        console.log(data.error)
                    } else {
                        allusers = [...data];
                        console.log(allusers);
                        setusers([...data]);
                    }
                });
        }
        , []);
    console.log(allusers);
    function changes(e) {
        var c = e.target.value;
        console.log(c);
        var th = allusers.filter(function (ele) {

            console.log(ele);
            if (ele.name.indexOf(c) == 0)
                return true;
            else
                return false;






        });
        console.log(th);
        setusers([...th])





    }

    function clickFollow(user, i) {

        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        follow(userId, token, user._id)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    let toFollow = users;
                    toFollow.splice(i, 1);
                    setusers([...toFollow]);
                }
            });
    }


    function renderUsers(us) {
        return (<div className="row">
            {us.map((user, i) => (
                <div key={i} className="card col-md-3" style={{ padding: "0", margin: "15px" }} >
                    <img
                        style={{}}
                        height="250"
                        width="250"
                        className="card-img-top"
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}`}
                        onError={i => (i.target.src = DefaultProfile)}
                        alt={user.name}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                    </div>
                    <div className="card-body">
                        <Link
                            to={`/user/${user._id}`}
                            className="card-link btn btn-raised btn-primary">
                            View Profile
                        </Link>
                        <button style={{
                            background: "#56ccf2",
                            background: "-webkit-linear-gradient(to left, #56ccf2, #2f80ed)",
                            background: "linear-gradient(to left, #56ccf2, #2f80ed)",
                            padding: "10px"
                        }} onClick={() => clickFollow(user, i)} className="btn btn-raised btn-success pull-right">
                            Follow
                        </button>
                    </div>
                </div>
            ))}
        </div>
        );
    }



    return (
        <div className="container">
            <h2 className="mt-5 mb-5">Find People</h2>
            <input type="text" onChange={changes} name="bleh"></input>
            {
                renderUsers(users)
            }
        </div>
    );

}

export default FindPeople;