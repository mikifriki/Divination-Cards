import React from "react";
import "./filter.css";

const Filter = ({onChange, onClick}) => {
	return (
		<div className="filter">
			<h2>Card Search</h2>
			<input onChange={onChange}/>
			<button className="get-all" onClick={onClick}>Get all cards</button>
		</div>
	)
};

export default Filter;
