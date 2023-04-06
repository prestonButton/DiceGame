import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./tailwind.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="flex gap-4 mb-8">
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo h-16 w-auto" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img
            src={reactLogo}
            className="logo h-16 w-auto react"
            alt="React logo"
          />
        </a>
      </div>
      <h1 className="text-4xl font-bold mb-8">Vite + React</h1>
      <div className="card p-6 bg-white shadow-lg rounded">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          count is {count}
        </button>
        <p className="text-gray-700">
          Edit <code className="font-mono text-sm">src/App.jsx</code> and save
          to test HMR
        </p>
      </div>
      <p className="text-blue-900 mt-4">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
