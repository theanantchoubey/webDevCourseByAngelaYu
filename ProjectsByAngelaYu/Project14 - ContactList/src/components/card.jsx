import React from "react";
import Avatar from "./Avatar";
import Details from "./Details";

function Card(props) {
  return (
    <div className="card">
      <div className="top">
        <p>{props.num}</p>
        <h2 className="name">{props.name}</h2>
        {/* <img className="circle-img" src={props.imgURL} alt="avatar_img" /> */}
        <Avatar img={props.imgURL} />
      </div>

      <div className="bottom">
        <Details detailInfo={props.phone} 
        />
        <Details detailInfo={props.email} 
        />
      </div>
    </div>
  );
}

export default Card;
