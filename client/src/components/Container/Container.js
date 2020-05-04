import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import Filter from "../Filter/Filter";
import Cards from "../Cards/Cards";
import "./container.css";

let n = 2;
const Container = () => {
	const [cards, setCards] = useState({allCards: [], total: 0});
	const [filter, setFilter] = useState('');

	useEffect(() => {
		axios.get('/api/cards?page=1&size=12')
			.then(res => {
				console.log(res.data.total, "res")
				const newCards = {
					...cards,
					allCards: res.data.Cards,
					total: res.data.total
				}
				setCards(newCards);
			})

	}, [])


	const handleScroll = useCallback(() => {
		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
			if (cards.allCards.length < cards.total) {
				axios.get(`/api/cards?page=${n}&size=12`)
					.then(res => {
						console.log(res.data.Cards)
						let addedCards = {
							...cards,
							allCards: cards.allCards.concat(res.data.Cards)
						}
						setCards(addedCards)

					})
				n++
				console.log(n)
			}
		}
	}, [cards]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	const onFilterChange = (e) => {
		setFilter(e.target.value)
	};

	const getAllCards = () => {
		axios.get(`/api/cards/all`)
			.then(res => {
				const allCards = {
					...cards,
					allCards: res.data.Cards
				}
				setCards(allCards)
			})
	}
	const cardsToShow = filter ? cards.allCards.filter(card => card.name.toLowerCase().search(filter.toLowerCase()) !== -1) : cards.allCards;
	return (
		<div className="cards">
			<Filter onClick={getAllCards} onChange={onFilterChange}/>
			<Cards cards={cardsToShow}/>
		</div>
	);
}

export default Container;
