import React from "react";
import ArticleThumbnails from "./ArticleThumbnails";

function Homepage() {
  document.title = "Welcome | Richtext Blog";

  return (<>
  <ArticleThumbnails />
  <div style={{textAlign:"center"}}><a href="https://github.com/pedro-montana/rich-blog" target="_blank" rel="noopener noreferrer">© 2020 Petr Horáček</a></div>
  </>
  );
}

export default Homepage;
