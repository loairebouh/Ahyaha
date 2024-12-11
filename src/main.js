const { app, BrowserWindow } = require("electron");

let mainWindow;

app.on("ready", () => {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	mainWindow.loadURL("http://localhost:3000");

	mainWindow.on("closed", () => {
		mainWindow = null;
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (mainWindow === null) {
		createWindow();
	}
});
