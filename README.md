# aPulse
A one-file NodeJS server status monitoring/notification tool.<br>
Changed by [MarcUs7i](https://github.com/MarcUs7i)<br>
Original repo without customizations: https://github.com/ybouane/aPulse

# Demo
Visit https://apulse.ybouane.com for a demo!
<br>Or visit the customized live version on: https://status.marcus7i.net

[<img src="screenshot.png" alt="aPulse — Server Status Open Source NodeJS Tool" />](https://apulse.ybouane.com)

# Features
- Changed it to update automatically on 00:00 (12:00 AM)
- Onion site checks with local IPs (public IPs will also work, but not recommended)
- Highly and easily configurable, edit the config.js file to add test endpoints and configure the watcher
- Supports sending outage notifications by: Telegram, Discord, Slack, SMS (Twilio API), Email (SendGrid API)
- Uses the Fetch API to test server-responses, you can configure GET, POST, PUT... requests and have full control over the fetch options.
- Check content for validity, HTTP status...
- Measures latency
- Minimal and easy to use dashboard
- Easy to setup. Run the watcher.js script and open the static/index.html page to view the dashboard.
- Auto-reload of the config file (no need to restart the watcher)
- No dependencies


# How does it work
aPulse can be configured through the "config.js" file and it looks like this
```javascript
export default {
	interval			: 15, // Interval in minutes between each pulse
	nDataPoints			: 90, // Number of datapoints to display on the dashboard
	responseTimeGood	: 300, // In milliseconds, this and below will be green
	responseTimeWarning	: 600, // In milliseconds, above this will be red
	timeout				: 5000, // In milliseconds, requests will be aborted above this
	verbose				: true, // Whether or not to output pulse messages in the console
	readableStatusJson	: true, // Format status.json to be human readable
	logsMaxDatapoints	: 200, // Maximum datapoints history to keep (per endpoint)
	telegram			: {}, // optional, tokens to send notifications through telegram
	slack				: {}, // optional, tokens to send notifications through slack
	discord				: {}, // optional, tokens to send notifications through discord
	twilio				: {}, // optional, tokens to send notifications through twilio (SMS)
	sendgrid			: {}, // optional, tokens to send notifications through sendgrid (Email)
	consecutiveErrorsNotify			: 1, // After how many consecutive Errors events should we send a notification
	consecutiveHighLatencyNotify	: 3, // After how many consecutive High latency events should we send a notification
	sites				: [ // List of sites to monitor
		{
			id				: 'google', // optional
			name			: 'Google',
			endpoints		: [ // Each site is a bunch of endpoints that can be tested
				{
					id				: 'homepage', // optional
					name			: 'Homepage', // optional
					link			: 'https://www.google.com', // optional, for notifications and dashboard only, [defaults to endpoint.url], can be disabled by setting it to false
					url				: 'https://www.google.com', // required
					request			: { // optional, fetch options
						method: 'GET',
					},
					mustFind		: 'Feeling Lucky', // optional, String | Array | Regex | Function | AsyncFunction
					mustNotFind		: /Page not found/i, // optional, String | Array | Regex | Function | AsyncFunction
					customCheck		: async (content, response)=>{return true;}, // optional, Function | AsyncFunction -> Run your own custom checks return false in case of errors
					validStatus		: [200], // optional, Which http status should be considered non errors [defaults to 200-299]
				},
				{
					id				: 'onion-service', // optional
					name			: 'Onion Service', // optional
					link			: 'exampleonionaddress.onion:8333', // optional, displayed in dashboard and notifications
					url				: 'exampleonionaddress.onion:8333', // required, used for connection check
					onionIP         : '192.168.0.105', // optional, local IP to use for onion service check
					customCheck		: async (content, response)=>{return true;}, // optional
					validStatus		: ['SOCKET'], // required for onion services, specifies this is a socket connection check
				}
			]
		}
	],
};
```

## Onion Service Monitoring
For checking the status of Tor onion services, we use a local IP approach. This is way more secure and prevents exposing your onion services to unnecessary public checks:

1. Set the `url` field to your onion address with port (e.g. `exampleonionaddress.onion:8333`)
2. Add an `onionIP` parameter with the local IP where the service is running (you can use public IPs aswell, but it's not recommended)
3. Set `validStatus` to `['SOCKET']` to indicate this is a socket connection check
4. The checker will try to connect to the specified IP:port to verify the service is running

# Installation
Clone the repo:
```shell
git clone https://github.com/MarcUs7i/statusPage.git
```

Change the config file, since I am sure, you don't want to get the status of my services :)

Either run the watcher.js script directly (you need to keep it running in the background)
```shell
cd aPulse
```
```shell
node watcher.js
```

### Serving the status page
The `watcher.js` script only takes care of running the status checks and updates the `status.json` file in the `static/` folder. If you want to view the final result, you simply need to serve the files in the `static/` folder. You can use Nginx with a config like:
```nginx
# Pulse
server {
	root /var/www/apulse/static/;
	index index.html;
	server_name apulse.ybouane.com;
	location /favicon.ico {
		return 301 "/favicon.png";
	}
	listen 80;
}
```

Or use any other tool to serve those files like the npm http-server package:
```shell
cd static
npx http-server -o ./
```

Original repository from: https://github.com/ybouane/aPulse.git