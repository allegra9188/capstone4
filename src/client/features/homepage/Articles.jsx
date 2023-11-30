import React, { useState, useEffect } from "react";
import ArticlesList from "./articlesList";

export default function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Commenting out the API call for testing purposes
    // fetch(
    //   "https://api.marketaux.com/v1/news/all?countries=us&filter_entities=true&limit=10&published_after=2023-11-27T17:04&api_token=lVsq6J81NrdSum7Ba0fdlihd1rxpFzA1lRk5YwLT",
    //   "/api",
    //   { method: "GET" }
    // )
    //   .then((response) => response.text())
    //   .then((result) => setArticles(JSON.parse(result).data))
    //   .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>Latest Articles</h1>
      <ArticlesList articles={articles} />
    </div>
  );
}
