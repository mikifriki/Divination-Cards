import React from 'react';
import frame from '../images/Divination_card_frame.png';
import "./card.css";

const Card = ({id, img, name, item, flavour, amount}) => {
	return (
		<span className="card-wrapper">
			<span className="card-art">
				<img key={id} alt="tere" src={img}/>
			</span>
			<span className="card-frame">
				<img src={frame} alt="logo"/>
			</span>
			<span className="card-header">
				{name}
			</span>
			<span className="card-item">
				<p className="inner-text">
					{item}
				</p>
			</span>
			<span className="card-text">
				<p className="inner-text">
					{flavour}
				</p>
			</span>
			<span className="card-amount">
				{amount}
			</span>
		</span>
	);
}

export default Card;
