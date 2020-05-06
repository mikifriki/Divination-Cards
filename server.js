const express = require('express');
const app = express();
const path = require('path');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const {calculateLimitAndOffset} = require('paginate-info')


const getPaginatedData = (req, res) => {
	let cards = db.get('Cards').value();
	const {query: {page, size}} = req;
	const {limit, offset} = calculateLimitAndOffset(page, size);
	const paginatedData = cards.slice(offset, offset + limit);

	return res.status(200).json({
		Cards: paginatedData,
		total: cards.length
	});
}

app.use(express.static(path.join(__dirname, 'build')))

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.get('/api/cards/all', function (req, res) {
	res.json(db.read());
})

app.get('/api/cards', (req, res) => {
	getPaginatedData(req, res)
})

app.get('/api/cards/:id', (req, res) => {
	const id = Number(req.params.id);
	const card = db.read().find(card => card.id === id)
	res.json(card);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
	`Server running on port ${port}`
});



