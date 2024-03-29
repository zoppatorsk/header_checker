const checkReferer = (req, res, next) => {
	// Get the host from the request headers
	const host = req.hostname;

	// Get the referer from the request headers
	const referer = req.headers?.referer;
	let ref = '';
	if (referer)
		ref = referer
			.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '')
			.split('/')[0]
			.split(':')[0];

	// Check if ref matches the host
	if (ref == host) {
		// If ref matches host, proceed to the next middleware
		next();
	} else {
		// If referer doesn't match host, return a 403 Forbidden response
		res.status(403).send('Forbidden');
	}
};

module.exports = checkReferer;
