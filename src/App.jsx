import { useState, useCallback, useEffect } from "react";

function App() {
  const [len, setLen] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [pass, setPass] = useState("");

  const passGen = useCallback(() => {
    let p = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str = str + "!#$%&'()*+,-./:;<=>?@[]^_`{|}~" + '"';
    for (let i = 1; i <= len; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      p += str.charAt(char);
    }
    setPass(p);
  }, [len, numAllowed, charAllowed, setPass]);
  useEffect(() => {
    passGen();
  }, [len, numAllowed, charAllowed, passGen]);
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-red-600 bg-gray-800">
        <h1 className="text-4xl text-white text-center my-3">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={pass}
            className="outline-none w-full py-1 px-3 bg-gray-300"
            placeholder="password"
            readOnly
          />
          <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={len}
              className="cursor-pointer"
              id="length"
              onChange={(e) => {
                setLen(e.target.value);
              }}
            />
            <label htmlFor="length">Length: {len}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="num"
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="num">Number</label>
          </div>
          <div>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="ch"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="ch">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
