const express = require('express');
const checkReferer = require('./checkReferer');
const app = express();
const path = require('path');
app.use('/', express.static(path.join(__dirname, 'public')));
const PORT = 9009;

// GET route for API
app.get('/api', checkReferer, (req, res) => {
	let refUrl = req.headers.referer;
	let url = '';
	let url2 = '';
	if (refUrl) {
		url = refUrl
			.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
			.split('/')[0]
			.split(':')[0];
	}
	let hostname = req.hostname;
	let obj = {
		refUrl,
		url,
		hostname,
	};
	// Handle API logic here
	return res.json(obj);
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
