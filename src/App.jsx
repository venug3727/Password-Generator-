import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllow, setNumAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordHistory, setPasswordHistory] = useState([]);
  const passwordRef = useRef();
  const copyToClip = () => {
    passwordRef.current.select(password);
    window.navigator.clipboard.writeText(password);
    alert("Password Copied to ClipBoard")
  };
  const passwordGenerater = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllow) str += "1234567890";
    if (charAllow) str += "!@#$%^&*()|?/.,[]{}_+-=";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
    setPasswordHistory((prevHistory) => [pass, ...prevHistory]);
  }, [length, numAllow, charAllow, setPassword]);

  const flipChar = () => {
  if (charAllow == true) {
      setCharAllow(false);
    } else {
      setCharAllow(true);
    }
  };
  console.log(charAllow, numAllow, password);
  useEffect(() => {
    passwordGenerater();
  }, [length, numAllow, charAllow, passwordGenerater]);

  return (
    <>
      <div className="bg-black h-screen">
        <div className="flex items-center justify-between"> 
          <h1 className="text-white text-3xl">Password Generator</h1>
        <h1 className="text-white p-4 text-3xl">By Venugopal</h1>
        </div>
        
        <div className="bg-black text-orange-500  px-4 p-[30px] overflow-auto h-screen  rounded-lg   w-full  ">
          <h1 className="text-center text-5xl font-extrabold py-[30px]">Password Generater</h1>
          <div className="flex shadow  rounded-lg pb-6  justify-center overflow-hidden mb-4 ">
            <input
              type="text"
              placeholder="Password"
              value={password}
              readOnly
              ref={passwordRef}
              className="outline-none w-[500px]  rounded-l-lg  py-2 px-6"
            />
            <button
              onClick={copyToClip}
              className="bg-blue-500 text-2xl p-3 font-bold rounded-r-lg"
            >
              copy
            </button>
          </div>
          <div className="flex justify-center">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer "
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="text-lg font-semibold">Length:{length}</label>
            <input
              type="checkbox"
              onChange={() => {
                setNumAllow((prev) => !prev);
              }}
              className="ml-5"
            />
            <label className="text-lg font-semibold">Number</label>
            <input
              type="checkbox"
              onChange={() => {
                flipChar();
              }}
              className="ml-5"
            />
            <label className="text-lg font-semibold">Character</label>
          </div>
          <h2 className="mt-4 text-2xl ml-40 font-bold text-white">Password History:</h2>
          <div className="overflow-x-auto">
            <ul className="text-green-400 ml-40 text-lg font-semibold">
              {passwordHistory.map((pass, index) => (
                <li key={index}>
                  {" "}
                  {index + 1}. {pass}
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </>
  );
}

export default App;
