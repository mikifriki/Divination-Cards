import React from 'react'
import Card from "../Card/Card"
import "./Cards.css"

const Cards = ({cards}) => {
	return (
		<div className="flex-container">
			{
				cards.map(card =>
					<Card id={card.id}
						  name={card.name}
						  formattedName={card.formattedName}
						  item={card.item} flavour={card.flavour}
						  amount={card.amount}
						  img={card.url}
					/>
				)
			}
		</div>
	)
}

export default Cards;
