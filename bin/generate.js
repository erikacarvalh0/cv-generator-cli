const { exec } = require("child_process");

const { header, data, metadata } = require('./vars')

exports.callGenerate = () => {
	setTimeout(() => {
		const fullData = JSON.stringify({ header, data, metadata })
			.replaceAll("\"", "U+0022")
			.replaceAll(";", "\\u003b")
			.replaceAll(":", "U+003A")

		exec(`npm run generate DATA="${fullData}" && npm run serve`, (error, stdout, stderr) => {
			if (error) {
					console.log(`error: ${error.message}`);
					return;
			}
			if (stderr) {
					console.log(`stderr: ${stderr}`);
					return;
			}
			console.log(`stdout: ${stdout}`);
	})
	}, 1000)
}