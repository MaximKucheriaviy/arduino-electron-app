const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("appAPI", {
  serialList: () => {
    return new Promise((resolve, reject) => {
      ipcRenderer.send("getSerialList");
      console.log("Sending");
      ipcRenderer.once("getSerialList", (event, data) => {
        resolve(data);
      });
    });
  },
  getPortData: (callback) => ipcRenderer.on("port-data", callback),
});
