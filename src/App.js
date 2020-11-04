import React, { useEffect, useState } from "react";
import './App.css';
import RichTextEditor from "./components/Editor";

function App() {
  const [isEditor, setEditor] = useState(false);
  const [isFirst, setFirst] = useState(false);
  var firstOpen;
  useEffect(() => {
  if(localStorage.getItem("savedDraft") == null) {
    setFirst(true);
  }
  else {
    setFirst(false);
  }
  }
  )
  return (
    <div className="App">
      <div dangerouslySetInnerHTML={{ __html: RichTextEditor.html }}></div>
      <h1>My App</h1>
      <br/><br/>
      <button className="edit-paragraph-button" style={isEditor ? {color:"red"} : null} onClick={() => !isEditor ? setEditor(true) : setEditor(false)}>{isEditor ? "CANCEL" : isFirst ? "CREATE PARAGRAPH" : "EDIT PARAGRAPH"}</button>
      
      {!isEditor ? 
      <div id="para" dangerouslySetInnerHTML={{ __html: localStorage.getItem("savedDraft") }}></div>
      : null}
      
      {isEditor ? 
      <RichTextEditor />
    : null}
    </div>
  );
}

export default App;