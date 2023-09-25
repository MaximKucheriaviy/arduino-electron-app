import { useState, useEffect } from "react";

function App() {
  const [ports, setPorts] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const ports = await window.appAPI.serialList();
      console.log(ports);
      setPorts(ports);
    })();
    window.appAPI.getPortData((event, data) => {
      setData((prev) => {
        return [...prev, data];
      });
    });
  }, []);
  return (
    <div className="App">
      {ports.length !== 0 && (
        <ul>
          {ports.map((item, index) => (
            <li key={index}>{item.friendlyName}</li>
          ))}
        </ul>
      )}
      {data.length !== 0 &&
        data.map((item, index) => <p key={index}>{item}</p>)}
    </div>
  );
}

export default App;
