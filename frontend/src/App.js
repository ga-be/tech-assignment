import { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import History from "./components/History";
import PopUp from "./components/PopUp";

function App() {
  const [history, setHistory] = useState([]);

  const [popUp, setPopUp] = useState(false);
  const [popUpImg, setPopUpImg] = useState(null);

  useEffect(() => {
    let url = "http://localhost:8080/getFiveLatestRecords";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setHistory(json);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Technical task implementation</h1>
      </header>
      <Form history={history} setHistory={setHistory} />
      <History
        history={history}
        setPopUpImg={setPopUpImg}
        setPopUp={setPopUp}
      />

      {popUp && (
        <PopUp
          popUpImg={popUpImg}
          setPopUp={setPopUp}
          setPopUpImg={setPopUpImg}
        />
      )}
    </div>
  );
}

export default App;
