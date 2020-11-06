import React, { useEffect, useState } from "react";
import "./App.css";
import RichTextEditor from "./components/Editor";
import UpButton from "./components/UpButton";

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

  function DeleteParagraph() {
    if(window.confirm("Are you sure about deleting?")) {
    (localStorage.setItem("savedDraft", ""));(localStorage.setItem("unsavedDraft", ""));window.location.reload();
    } 
  }
  return (
    <>
    <div className="App">
      {isEditor ? (<>
      <h6>Editor</h6>
        <div dangerouslySetInnerHTML={{ __html: RichTextEditor.html }}></div>
      </>) : <h6>My Blog</h6>}
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
      <button className="delete-paragraph" onClick={DeleteParagraph}>DELETE PARAGRAPH</button>
      : null
    }
    </div>
    <div style={{textAlign:"center"}}>© 2020 Petr Horáček</div>
    <UpButton />
    </>
  );
}

export default App;
