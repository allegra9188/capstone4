// Homepage.jsx:
import React from "react";
import ArticlesCard from "./articles/ArticlesCard";
import QuiverData from "../quiver/QuiverData";
import {
  useGetArticlesDataQuery,
  useGetArticlesDataFromCsvQuery,
} from "./articles/articlesSlice";
import Example from "./Graph";

export default function Homepage({ article }) {
  const {
    data: articledata,
    isLoading,
    isError,
  } = useGetArticlesDataFromCsvQuery();

  if (!articledata || articledata.length === 0) {
    return <p>No articles available.</p>;
  }

  return (
    <div className="total-container">
      <div className="copy-container">
        <h2>Welcome To Tradetivity!</h2>
        <div className="copy-item">
          <h3>
            See recent congress trading activity by politician or company!
          </h3>
          <h3>Sign up to follow trading activity of any congress members.</h3>
        </div>
        <h2>Past 3 Years Trading Volume by Sector:</h2>
      </div>
      <Example />
      <div className="article-trade-container">
        <div className="article-container">
          <h2>Latest Articles</h2>
          {articledata?.map((article) => (
            <ArticlesCard key={article.uuid} article={article} />
          ))}
        </div>
        <QuiverData />
      </div>
    </div>
  );
}
