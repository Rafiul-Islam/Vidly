import React, {Component} from 'react';
import PropTypes from "prop-types";

const Like = (props) => {

    const {liked, onClick: onLiked} = props
    
    let cls = 'fa fa-heart'
    if (!liked)
        cls += '-o'
    return (
        <i onClick={onLiked} style={{cursor: "pointer"}} className={cls} aria-hidden="true"></i>
    );
}

export default Like;


