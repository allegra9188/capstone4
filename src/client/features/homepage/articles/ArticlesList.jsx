import React from "react";
import ArticlesCard from "./ArticlesCard";
import QuiverData from "../../quiver/QuiverData";
import { useGetArticlesDataFromCsvQuery } from "./articlesSlice";


export default function ArticlesList({ article }) {
  const {
    data: articledata,
    isLoading,
    isError,
  } = useGetArticlesDataFromCsvQuery();

  if (!articledata || articledata.length === 0) {
    return <p>No articles available.</p>;
  }

  return (
    <>
      <h2>Latest Articles</h2>
      <div className="article-container">
        
        {articledata?.map((article) => (
          <ArticlesCard key={article.uuid} article={article} />
        ))}
      </div>
      <QuiverData />
    </>
  );
}
