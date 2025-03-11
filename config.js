export default {
	interval			: 1440, // Interval in minutes between each pulse; 1 day (24 * 60)
	nDataPoints			: 90, // Number of datapoints to display on the dashboard
	responseTimeGood	: 500, // In milliseconds, this and below will be green
	responseTimeWarning	: 1000, // In milliseconds, above this will be red
	timeout				: 5000, // In milliseconds, requests will be aborted above this
	verbose				: true, // Whether or not to output pulse messages in the console
	readableStatusJson	: true, // Format status.json to be human readable
	logsMaxDatapoints	: 200, // Maximum datapoints history to keep (per endpoint)
	telegram			: { // optional, tokens to send notifications through telegram
		botToken	: '', // Contact @BotFather on telegram to create a bot
		chatId		: '',// Send a message to the bot, then visit https://api.telegram.org/bot<token>/getUpdates to get the chatId
	},
	slack				: { // optional, tokens to send notifications through slack
		botToken	 : '',
		channelId	: '',
	},
	discord				: { // optional, tokens to send notifications through discord
		webhookUrl	: '',
	},
	twilio				: { // optional, tokens to send notifications through twilio (SMS)
		accountSid		: '',
		accountToken	: '',
		toNumber		: '',
		twilioNumber	: '',
	},
	sendgrid				: { // optional, tokens to send notifications through sendgrid (Email)
		apiKey			: '',
		toEmail			: '',
		toFromEmail		: '',
	},
	consecutiveErrorsNotify			: 1, // After how many consecutive Errors events should we send a notification
	consecutiveHighLatencyNotify	: 3, // After how many consecutive High latency events should we send a notification
	sites				: [ // List of sites to monitor
		{
			id				: 'marcus7i', // optional
			name			: 'MarcUs7i.Net',
			endpoints		: [ // Each site is a bunch of endpoints that can be tested
				{
					id				: 'homepage', // optional
					name			: 'Homepage', // optional
					link			: 'https://marcus7i.net', // optional, for notifications and dashboard only, [defaults to endpoint.url], can be disabled by setting it to false
					url				: 'https://marcus7i.net', // required
					request			: { // optional, fetch options
						method: 'GET',
					},
					mustFind		: 'MarcUs7i.Net', // optional, String | Array | Regex | Function | AsyncFunction
					mustNotFind		: ["Page not found", "Error", "cloudflare"], // optional, String | Array | Regex | Function | AsyncFunction
					customCheck		: async (content, response)=>{return true;}, // optional, Function | AsyncFunction -> Run your own custom checks return false in case of errors
					validStatus		: [200], // optional, Which http status should be considered non errors [defaults to 200-299]
				},
				{
					id				: 'btcnd-onion', // optional
					name			: 'Bitcoin Node (Onion)', // optional
					link			: 'http://erkuzp5gzrcjqtrcuiku5whcjnioalwskgo3hjg5oq2mmailml7k7jad.onion:8333', // optional, for notifications and dashboard only, [defaults to endpoint.url], can be disabled by setting it to false
					url				: 'http://erkuzp5gzrcjqtrcuiku5whcjnioalwskgo3hjg5oq2mmailml7k7jad.onion:8333', // required
					onionIP         : '192.168.0.105', // optional, IP to use for onion service check
					customCheck		: async (content, response)=>{return true;},
					validStatus		: ['SOCKET'], // optional, Which http status should be considered non errors [defaults to 200-299]
				},
				{
					id				: 'fs', // optional
					name			: 'File Sharing', // optional
					link			: 'https://fs.marcus7i.net', // optional, for notifications and dashboard only, [defaults to endpoint.url], can be disabled by setting it to false
					url				: 'https://fs.marcus7i.net', // required
					request			: { // optional, fetch options
						method: 'GET',
					},
					mustFind		: 'nginx', // optional, String | Array | Regex | Function | AsyncFunction
					mustNotFind		: ["Page not found", "cloudflare"], // optional, String | Array | Regex | Function | AsyncFunction
					customCheck		: async (content, response)=>{return true;}, // optional, Function | AsyncFunction -> Run your own custom checks return false in case of errors
					validStatus		: [200, 403], // optional, Which http status should be considered non errors [defaults to 200-299]
				},
				{
					id				: 'git', // optional
					name			: 'MarcUs7i Git', // optional
					link			: 'https://git.marcus7i.net', // optional, for notifications and dashboard only, [defaults to endpoint.url], can be disabled by setting it to false
					url				: 'https://git.marcus7i.net', // required
					request			: { // optional, fetch options
						method: 'GET',
					},
					mustFind		: '', // optional, String | Array | Regex | Function | AsyncFunction
					mustNotFind		: ["Page not found", "cloudflare"], // optional, String | Array | Regex | Function | AsyncFunction
					customCheck		: async (content, response)=>{return true;}, // optional, Function | AsyncFunction -> Run your own custom checks return false in case of errors
					validStatus		: [200], // optional, Which http status should be considered non errors [defaults to 200-299]
				},
				{
					id				: 'ollama', // optional
					name			: 'Ollama Webui', // optional
					link			: 'https://ollama.marcus7i.net', // optional, for notifications and dashboard only, [defaults to endpoint.url], can be disabled by setting it to false
					url				: 'https://ollama.marcus7i.net', // required
					request			: { // optional, fetch options
						method: 'GET',
					},
					mustFind		: '', // optional, String | Array | Regex | Function | AsyncFunction
					mustNotFind		: ["Page not found", "cloudflare"], // optional, String | Array | Regex | Function | AsyncFunction
					customCheck		: async (content, response)=>{return true;}, // optional, Function | AsyncFunction -> Run your own custom checks return false in case of errors
					validStatus		: [200], // optional, Which http status should be considered non errors [defaults to 200-299]
				},
				{
					id				: 'ollama-api', // optional
					name			: 'Ollama API', // optional
					link			: 'https://ollama.marcus7i.net/api/chat/completions', // optional, for notifications and dashboard only, [defaults to endpoint.url], can be disabled by setting it to false
					url				: 'https://ollama.marcus7i.net/api/chat/completions', // required
					request			: { // optional, fetch options
						method: 'POST',
					},
					mustFind		: '{\"detail\":\"Not authenticated\"}', // optional, String | Array | Regex | Function | AsyncFunction
					mustNotFind		: ["Page not found", "cloudflare"], // optional, String | Array | Regex | Function | AsyncFunction
					customCheck		: async (content, response)=>{return true;}, // optional, Function | AsyncFunction -> Run your own custom checks return false in case of errors
					validStatus		: [200, 401, 403], // optional, Which http status should be considered non errors [defaults to 200-299]
				},
				{
					id				: 'sd', // optional
					name			: 'Stable Diffusion API', // optional
					link			: 'https://sd.marcus7i.net', // optional, for notifications and dashboard only, [defaults to endpoint.url], can be disabled by setting it to false
					url				: 'https://sd.marcus7i.net', // required
					request			: { // optional, fetch options
						method: 'GET',
					},
					mustFind		: '', // optional, String | Array | Regex | Function | AsyncFunction
					mustNotFind		: ["Page not found"], // optional, String | Array | Regex | Function | AsyncFunction
					customCheck		: async (content, response)=>{return true;}, // optional, Function | AsyncFunction -> Run your own custom checks return false in case of errors
					validStatus		: [200], // optional, Which http status should be considered non errors [defaults to 200-299]
				},
				{
					id				: 'u', // optional
					name			: 'Link shortener', // optional
					link			: 'https://u.marcus7i.net', // optional, for notifications and dashboard only, [defaults to endpoint.url], can be disabled by setting it to false
					url				: 'https://u.marcus7i.net', // required
					request			: { // optional, fetch options
						method: 'GET',
					},
					mustFind		: '', // optional, String | Array | Regex | Function | AsyncFunction
					mustNotFind		: ["Page not found", "cloudflare"], // optional, String | Array | Regex | Function | AsyncFunction
					customCheck		: async (content, response)=>{return true;}, // optional, Function | AsyncFunction -> Run your own custom checks return false in case of errors
					validStatus		: [200], // optional, Which http status should be considered non errors [defaults to 200-299]
				},
				{
					id				: 'xmrnd-onion', // optional
					name			: 'Monero Node (Onion)', // optional
					link			: 'bto4zcx3tbss5f6mhbc4guumv66og2udpg3n26254f2sbkdvhnr2bwyd.onion:18081', // optional, for notifications and dashboard only, [defaults to endpoint.url], can be disabled by setting it to false
					url				: 'bto4zcx3tbss5f6mhbc4guumv66og2udpg3n26254f2sbkdvhnr2bwyd.onion:18081', // required
					onionIP		    : '192.168.0.105', // optional, IP to use for onion service check
					request			: null,
					customCheck		: async (content, response)=>{return true;},
					validStatus		: ['SOCKET'], // optional, Which http status should be considered non errors [defaults to 200-299]
				}
			]
		}
	],
};