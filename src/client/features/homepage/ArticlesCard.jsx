import React from "react";
import "./Articles.scss";

export default function ArticlesCard({article}){
    return(
        <div className="article">
            <h2>{article.title}</h2>
            <p>{article.description}</p>
        </div>
    )
}