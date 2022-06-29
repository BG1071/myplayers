import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <nav>
          <Link to="/" className="navlink">Players</Link>
          <Link to="/addPlayer" className="navlink"> add new Player</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Players/>}/>
          <Route path="/addPlayer" element={<AddPlayer/>}/>
        </Routes>
      </BrowserRouter>
  )
}

function Players() {
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/player")
        .then((response) => response.json())
        .then((data) => setPlayers(data))
  }, [])

  return (
      <>
        <div>Spieler</div>
        <ul className="thumbnails">
          {players.map(players =>
              <li className="span4">
                <div className="thumbnail">
                  <img src={players.url}/>
                  <h3>{players.name + " " + players.vorname}</h3>
                  <p>{"Nummer:" + " " + players.number}</p>
                </div>
              </li>
          )}
        </ul>
      </>
  );
}

function AddPlayer() {
  const [player, setPlayer] = useState({});
  const [number, setNumber] = useState(0);
  const [name, setName] = useState("");
  const [vorname, setVorname] = useState("");
  const [url, setUrl] = useState("");
  const [nationality, setNationality] = useState("");
  const [height, setHeight] = useState(0);
  const [birthdate, setBirthdate] = useState(Date);
  const [worth, setWorth] = useState(0);
  const [club, setClub] = useState("");
  const addPlayer = ()=> {
    fetch("http://localhost:5000/player", {
      method:"POST", body: player
    })
        .then((response) => response.json())
        .then((data) => console.log())
  }
  return (
      <>
        <h1>add player</h1>
          <p>Nummer:</p>
          <input type={"number"} onChange={(e)=> setNumber(e.target.value)}/>
          <p>Name:</p>
          <input type={"text"} onChange={(e)=> setName(e.target.value)}/>
          <p>Vorname:</p>
          <input type={"text"} onChange={(e)=> setVorname(e.target.value)}/>
          <p>Bildadresse:</p>
          <input type={"text"} onChange={(e)=> setUrl(e.target.value)}/>
          <p>Nationalität:</p>
          <input type={"text"} onChange={(e)=> setNationality(e.target.value)}/>
          <p>Grösse:</p>
          <input type={"number"} onChange={(e)=> setHeight(e.target.value)}/>
          <p>Geburtsdatum:</p>
          <input type={"date"} onChange={(e)=> setBirthdate(e.target.value)}/>
          <p>Wert:</p>
          <input type={"number"} onChange={(e)=> setWorth(e.target.value)}/>
          <p>Club:</p>
          <input type={"text"} onChange={(e)=> setClub(e.target.value)}/>
          <button onClick={setPlayer}></button>
      </>
  );
}

export default App;