import React from "react";

export default function ArticlesCard({ article }) {
  return (
    <div className="article-item">
      <h3>{article.title}</h3>
      <p>{article.image_url}</p>
      <p>{article.snippet}</p>
      <p>
        <a href={article.url}>Link To Article</a>
      </p>
    </div>
  );
}
