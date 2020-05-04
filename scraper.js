const url = 'http://www.pathofexile.com/api/trade/data/static';
const cheerio = require('cheerio');
const axios = require('axios');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const cron = require('node-cron')
let divinationCards = [];

const getCards = ({data}) => {
	let i = 0;
	const cards = data.result.filter((card) => card.id === 'Cards')[0].entries;
	cards.forEach((card) => {
		const formattedName = card.text.replace(/\s/g, '-').toLowerCase().replace(/'/g, '');
		divinationCards.push({
			id: i++,
			name: card.text,
			formattedName: formattedName,
			item: '',
			flavour: '',
			amount: '',
			url: ''
		});
	});
}

const getData = (pageNo = 0) => {
	if (pageNo > divinationCards.length - 1) return;
	axios
		.get(
			`https://www.poe-vault.com/items/${divinationCards[pageNo].formattedName}`
		)
		.then((res) => {
			const html = res.data;
			const $ = cheerio.load(html);
			if (res) {
				divinationCards[pageNo].item = $('section.item-specification').text();
				divinationCards[pageNo].flavour = $('p.item-poem').text();
				divinationCards[pageNo].amount = $('p.item-amount > span').text();
				divinationCards[pageNo].url = $('p.item-image > img').attr('src');
				getData(++pageNo);
			}
		})
		.catch(() => {
			getData(++pageNo);
		});
};


cron.schedule('0 0 1 * *', () => {
	axios.get(url)
		.then(getCards)
		.then(getData)
		.then(() => {
			const newPlaylist = db.get('Cards')
				.assign(divinationCards)
				.write();
			db.set('Cards', newPlaylist).write();
		})
});


