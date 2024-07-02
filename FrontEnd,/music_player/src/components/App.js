import React from "react";
import Login from "./login";
import Dashboard from "./dashboard";

const code = new URLSearchParams(window.location.search).get("code");
// const codes= JSON.stringify(code);
// console.log(codes);

function App() {

  return ( 
    <div className="App">{code ? <Dashboard code={code}/>: <Login/>}</div>
  );
}

export default App;
