"use client";
import { useEffect, useState } from "react";
import Cell from "./components/cell";

const winsCompos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export default function Home() {
  const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""]);
  const [go, setGo] = useState("circle");
  const [winMessage, setWinMessage] = useState("");
  let [bgColor, setBgColor] = useState("#eee");

  useEffect(() => {
    winsCompos.forEach((win) => {
      const circleWin = win.every((ele) => cells[ele] == "circle");
      const crossWin = win.every((ele) => cells[ele] == "cross");
      if (circleWin) {
        setBgColor("#96adf2");
        setWinMessage("Circle Won !!");
      } else if (crossWin) {
        setBgColor("#e0b6b6");
        setWinMessage("Cross Won !!");
      }
    });
  }, [go]);

  useEffect(() => {
    if (cells.every((cell) => cell !== "") && !winMessage) {
      setWinMessage("Draw !!");
    }
  }, [cells, winMessage]);

  function handleReset() {
    setCells(["", "", "", "", "", "", "", "", ""]);
    setGo("circle");
    setWinMessage("");
    setBgColor("#eee");
  }

  return (
    <main className="container" style={{ backgroundColor: bgColor }}>
      <div className="gameboard">
        {cells.map((cell, index) => (
          <Cell
            id={index}
            go={go}
            setGo={setGo}
            key={index}
            cells={cells}
            setCells={setCells}
            cell={cell}
            winMessage={winMessage}
          />
        ))}
      </div>
      {winMessage && (
        <div className="message">
          {winMessage}{" "}
          <button onClick={handleReset} className="btn">
            Play again!
          </button>
        </div>
      )}
      {!winMessage && <div className="message">{`it's now ${go} turn!`}</div>}
    </main>
  );
}
