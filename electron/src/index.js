const { BrowserWindow, app, ipcMain } = require("electron");
const path = require("path");
const { SerialPort } = require("serialport");

const port = new SerialPort({
  path: "COM11",
  baudRate: 9600,
});

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      devTools: true,
    },
  });
  win.loadURL("http://localhost:3000");
  port.on("data", (data) => {
    win.webContents.send("port-data", data.toString("utf-8"));
  });
};

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  app.exit();
});

ipcMain.on("getSerialList", async (event) => {
  const ports = await SerialPort.list();
  event.sender.send("getSerialList", ports);
});
