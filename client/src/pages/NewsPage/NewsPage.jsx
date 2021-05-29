import React from "react";
import News from "./News/News";
import SearchNews from "./SearchNews/SearchNews";

function NewsPage() {
  return (
    <div>
      <SearchNews />
      <News />
    </div>
  );
}

export default NewsPage;
