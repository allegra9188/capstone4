import React from "react";
import ArticlesCard from "./ArticlesCard";
import QuiverData from "../../quiver/QuiverData";
import { useGetArticlesDataQuery } from "./articlesSlice";
import { useGetArticlesDataFromCsvQuery } from "./articlesSlice";
export default function ArticlesList({ article }) {
  // get data from api call
  //const { data: articledata, isLoading, isError } = useGetArticlesDataQuery();

  // read data from cvs
  const { data: articledata, isLoading, isError } = useGetArticlesDataFromCsvQuery();
  
  if (!articledata || articledata.length === 0) {
    return <p>No articles available.</p>;
  }

  return (
    <>
      <div className="article-container">
        <h2>Latest Articles</h2>
        {articledata?.map((article) => (
          <ArticlesCard key={article.uuid} article={article} />
        ))}
      </div>

      <QuiverData />
    </>
  );
}
