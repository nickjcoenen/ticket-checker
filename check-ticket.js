import fetch from 'node-fetch'; // Importing fetch from node-fetch
import { load } from 'cheerio';
import cron from 'node-cron';
import notifier from 'node-notifier';

const url = 'YOUR_LINK_HERE';

// Function to check the webpage for the specified text
const checkTickets = async () => {
	console.log('Checking tickets availability...');

	try {
		const response = await fetch(url);
		const data = await response.text();
		const $ = load(data);

		if (!$.text().includes('Geen tickets beschikbaar.')) {
			sendNotification();
			console.log(`GOGOGO ${url}`);
		} else {
			console.log('No tickets 🥲 ');
		}
	} catch (error) {
		console.error(`Error fetching the URL: ${error}`);
	}
};

// Function to send a desktop notification with sound
const sendNotification = () => {
	notifier.notify({
		title: 'Tickets Available',
		message: 'GOGOGOGO',
		sound: true
	});
};

// Schedule the check every 5 minutes
cron.schedule('*/5 * * * *', () => {
	checkTickets();
});

// Initial check on launch
checkTickets();
