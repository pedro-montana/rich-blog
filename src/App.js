import React, { useEffect, useState } from "react";
import "./App.css";
import RichTextEditor from "./components/Editor";

function App() {
  const [isEditor, setEditor] = useState(false);
  const [isFirst, setFirst] = useState(false);
  
  useEffect(() => {
    if (localStorage.getItem("savedDraft") == null || localStorage.getItem("savedDraft") == "") {
      setFirst(true);
    } else {
      setFirst(false);
    }
  }, []);
  return (
    <div className="App">
      {isEditor ? (
        <div dangerouslySetInnerHTML={{ __html: RichTextEditor.html }}></div>
      ) : null}
      <h1>Editor</h1>
      <button
        className="edit-paragraph-button"
        style={isEditor ? { display: "none" } : null}
        onClick={() => (!isEditor ? setEditor(true) : setEditor(false))}
      >
        {isEditor ? "CANCEL" : isFirst ? "CREATE PARAGRAPH" : "EDIT PARAGRAPH"}
      </button>

      {!isEditor ? (
        <div
          id="para"
          className={isFirst ? null : "show-para"}
          dangerouslySetInnerHTML={{
            __html: localStorage.getItem("savedDraft"),
          }}
        ></div>
      ) : null}

      {isEditor ? <RichTextEditor clickCancel={() => setEditor(false)} /> : null}
      {!isFirst ?
      <button onClick={() => {(localStorage.setItem("savedDraft", ""));(localStorage.setItem("unsavedDraft", ""));window.location.reload()}}>DELETE PARAGRAPH</button>
      : null
    }
    </div>
  );
}

export default App;
