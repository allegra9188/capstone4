import React, { useState, useEffect } from "react";
import ArticlesList from "./ArticlesList";
import { useGetArticlesDataQuery } from "./articlesSlice";

export default function Articles() {
  // delete line below when ready to use useGetArticlesDataQuery();
  const [articles, setArticles] = useState([]);
  // the query below works but I have not used it yet because I do not want to cause an
  // issue with calling over the limit
  const { data: articledata, isLoading, isError } = useGetArticlesDataQuery();

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  if (isError) {
    return <h1>Error loading page</h1>;
  }

  // console.log(articledata);

  return (
    <div className="total-container">
      <ArticlesList articles={articles} />
    </div>
  );
}
