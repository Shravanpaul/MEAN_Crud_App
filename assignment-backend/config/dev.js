let path = require("path");
let pkg = require("../package.json");

let app_conf = {
	port: 3000,
	db: {
		uri: process.env.MONGO_URI || "mongodb://localhost:" + pkg.config.dbPort + "/" + pkg.config.dbName,
		options: {
			// useMongoClient: true,
			user: "",
			pass: "",
			keepAlive: 1
			}
		},

	logging: {
		console: {
			level: "debug"
		},

		file: {
			enabled: false,
			path: path.join(global.rootPath, "logs"),
			level: "info",
			json: false,
			exceptionFile: true
		},

		graylog: {
			enabled: false
			// servers: [ { host: "192.168.0.174", port: 12201 } ]
		},

		papertrail: {
			enabled: false,
			host: null,
			port: null,
			level: "debug",
			program: "vem"
		},

		logentries: {
			enabled: false,
			token: null
		},

		loggly: {
			enabled: false,
			token: null,
			subdomain: null
		},

		logsene: {
			enabled: false,
			token: null
		},

		logzio: {
			enabled: false,
			token: null
		}

	}
}

module.exports = app_conf;
