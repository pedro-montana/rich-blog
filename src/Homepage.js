import React from "react";
import ArticleThumbnails from "./ArticleThumbnails";

function Homepage() {
  document.title = "Welcome | Richtext Blog";

  return (<>
  <ArticleThumbnails />
  <div style={{textAlign:"center"}}>© 2020 Petr Horáček</div>
  </>
  );
}

export default Homepage;
