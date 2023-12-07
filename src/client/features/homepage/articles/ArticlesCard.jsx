import React from "react";

export default function ArticlesCard({ article }) {
  console.log(article)
  return (
    <div className="article-item">
      <h3>{article.title}</h3>
      <p>{article.snippet}</p>
      <p>
        <a href={article.url}>Read More</a>
      </p>
    </div>
  );
}
