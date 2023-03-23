var exec = require("child_process").exec;
var fsPromises = require("node:fs/promises");
var fs = require("fs");

class Main {
	exceptDir = [];

	run() {
		const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));
		if (config.exceptDir) this.exceptDir = config.exceptDir;
		this.dive(config.rootPath);
	}

	async dive(path) {
		let files = await fsPromises.readdir(path);
		for (const file of files) {
			if (this.exceptDir.includes(file)) continue;
			let newPath = path + file;
			let state = fs.lstatSync(newPath);
			if (state.isDirectory()) {
				this.dive(newPath + "/");
			} else {
				if (!file.includes(".png")) continue;
				let cmd = `pngquant ${newPath} --skip-if-larger -f --ext .png`;
				exec(cmd, function (error, stdout, stderr) {
					if (error) {
						console.log(error);
					} else {
						console.log(newPath + "压缩成功");
					}
				});
			}
		}
	}
}

let main = new Main();
main.run();
