import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RichTextEditor from "./components/Editor";

function ArticleThumbnails() {
  const [isEditor, setEditor] = useState(false);
  const [isFirst, setFirst] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem("savedDraft") == null ||
      localStorage.getItem("savedDraft") === ""
    ) {
      setFirst(true);
    } else {
      setFirst(false);
    }
  }, []);

  function ShowThumbnail() {
    if (localStorage.getItem("savedDraft") != null) {
      var draft = localStorage.getItem("savedDraft");
      //   var link = draft.substring(draft.indexOf("<a"), draft.indexOf("</a>")+4);
      //   var linkInnerText = link.substring(link.indexOf('>', 4)+1, link.indexOf("</a>"));
      //   // draft = draft.replace("<a", "<p");
      //   draft = draft.replace(link, linkInnerText);
      if (draft.length > 260) {
        var thumbnail = draft.substring(0, draft.indexOf(" ", 250));
      } else {
        var thumbnail = draft;
      }
      if (thumbnail[thumbnail.length - 1] !== ".") {
        var finalThumbnail = thumbnail.concat("...");
      } else {
        var finalThumbnail = thumbnail.concat("..");
      }
      return { __html: finalThumbnail };
    }
  }

  return (
    <>
      {isEditor ? <h6>Editor</h6> : <h6>Richtext Blog</h6>}

      {!isEditor ? (
        <Link className="thumbnail" to="/article">
          <div
            id="para"
            className={isFirst ? null : "show-para"}
            dangerouslySetInnerHTML={ShowThumbnail()}
          ></div>{" "}
          {isFirst ? (
            <div>
              Looks like no article was created yet.
              <br />
              <i>
                <b>CREATE ARTICLE</b>
              </i>
            </div>
          ) : null}
        </Link>
      ) : null}
    </>
  );
}

export default ArticleThumbnails;
