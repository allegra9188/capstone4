import React from "react";
import ArticlesCard from "./ArticlesCard";
import QuiverData from "../../quiver/QuiverData";
import { useGetArticlesDataQuery } from "./articlesSlice";

export default function ArticlesList({ article }) {
  const { data: articledata, isLoading, isError } = useGetArticlesDataQuery();
  if (!articledata || articledata.length === 0) {
    return <p>No articles available.</p>;
  }

  return (
    <>
      <div className="article-container">
        <h2>Latest Articles</h2>
        {/* {articledata.data.map((article) => (
          <ArticlesCard key={article.uuid} article={article} />
        ))} */}
      </div>

      <QuiverData />
    </>
  );
}
