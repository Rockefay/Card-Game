import { BrowserRouter, Route, Routes } from "react-router-dom";
import EndGame from "./Pages/EndGame";
import Game from "./Pages/Game";
import Home from "./Pages/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/game" element={<Game />}></Route>
          <Route path="/endgame" element={<EndGame />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
