import React from "react";

export default function ArticlesCard({article}){
    return(
        <>
        <div>
            <div className="article-item">
                <h3>{article.title}</h3>
                <p>{article.description}</p>
            </div>
        </div>
        </>
    )
}