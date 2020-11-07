import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RichTextEditor from "./Editor";

function Article() {
  const [isEditor, setEditor] = useState(false);
  const [isFirst, setFirst] = useState(false);
  const [isAdmin, setAdmin] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem("savedDraft") == null ||
      localStorage.getItem("savedDraft") === ""
    ) {
      setFirst(true);
    } else {
      setFirst(false);
    }
    let arr = document.getElementsByTagName("A");
    for (var i = 0; i < arr.length; i++) {
      arr[i].target = "_blank";
      arr[i].rel = "noopener noreferrer";
    }
      document.title = "Article | Richtext Blog";
  }, []);

  // function ShowThumbnail() {
  //   var draft = localStorage.getItem("savedDraft");
  //   var link = draft.substring(draft.indexOf("<a"), draft.indexOf("</a>")+4);
  //   var linkInnerText = link.substring(link.indexOf('>', 4)+1, link.indexOf("</a>"));
  //   // draft = draft.replace("<a", "<p");
  //   draft = draft.replace(link, linkInnerText);
  //   var thumbnail = draft.substring(0, draft.indexOf(" ", 250));
  //   if (thumbnail[thumbnail.length-1] !== ".") {
  //   var finalThumbnail = thumbnail.concat("...");
  //   } else {
  //   var finalThumbnail = thumbnail.concat("..");

  //   }
  //   return {__html: finalThumbnail};
  // }

  function ShowArticle() {
    var draft = localStorage.getItem("savedDraft");
    return { __html: draft };
  }

  function DeleteParagraph() {
    if (window.confirm("Are you sure about deleting?")) {
      localStorage.setItem("savedDraft", "");
      localStorage.setItem("unsavedDraft", "");
      window.location.assign("https://rich-text-blog.netlify.app");
    }
  }

  return (
    <>
      {isEditor ? (
        <h6>Richtext Blog | Editor</h6>
      ) : (
        <Link className="thumbnail" to="/">
          <h6>Richtext Blog</h6>
        </Link>
      )}
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
          dangerouslySetInnerHTML={ShowArticle()}
        ></div>
      ) : null}

      {isEditor ? (
        <RichTextEditor clickCancel={() => setEditor(false)} />
      ) : null}
      {!isFirst ? (
        <button className="delete-paragraph" onClick={DeleteParagraph}>
          DELETE PARAGRAPH
        </button>
      ) : null}
      <div style={{ textAlign: "center" }}>
        <br /><a href="https://github.com/pedro-montana/rich-blog" target="_blank" rel="noopener noreferrer">© 2020 Petr Horáček</a>
      </div>
    </>
  );
}

export default Article;
