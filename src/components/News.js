import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ country = "us", pageSize = 9, category = "general", setProgress }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);


  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    document.title = `NewsMonkey - ${capitalizeFirstLetter(category)}`;
    const fetchData = async () => {
      setProgress(10);
      let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=845ad3f47f794f429027eb98d0da0ee4&pageSize=${pageSize}`;
      setLoading(true);

      let data = await fetch(url);
      setProgress(30);
      let parsedData = await data.json();

      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      setProgress(100);
    };

    fetchData();
  }, [category, country, pageSize, setProgress]);

  const fetchMoreData = async () => {
    setPage(page + 1);

    let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=845ad3f47f794f429027eb98d0da0ee4&page=${page}&pageSize=${pageSize}`;

    let data = await fetch(url);
    let parsedData = await data.json();

    setArticles((prevArticles) => prevArticles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };


  // const handlePrevClick = async () => {
  //     const newPage = page - 1;
  //     let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=845ad3f47f794f429027eb98d0da0ee4&page=${newPage}&pageSize=${pageSize}`;
  //     setLoading(true);
  //     let data = await fetch(url);
  //     let parsedData = await data.json();
  //     setPage(newPage);
  //     setArticles(parsedData.articles || []);
  //     setLoading(false);
  // };

  // const handleNextClick = async () => {
  //     if (page + 1 > Math.ceil(totalResults / pageSize)) {
  //         return;
  //     }
  //     const newPage = page + 1;
  //     let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=845ad3f47f794f429027eb98d0da0ee4&page=${newPage}&pageSize=${pageSize}`;
  //     setLoading(true);
  //     let data = await fetch(url);
  //     let parsedData = await data.json();
  //     setPage(newPage);
  //     setArticles(parsedData.articles || []);
  //     setLoading(false);
  // };

  
  return (
    <>
      <div className="container my-4 text-center">
        <div className="line" style={{ width: "100%", height: "10px", backgroundColor: "#CB6040", margin: "0 0 10px 0" }}></div>
        <div className="card-body">
          <h1 className="card-title" style={{ color: "black", marginBottom: "0", fontFamily: "Algerian", fontWeight: "bold" }}>
            NewsMonkey - Top {capitalizeFirstLetter(category)} Headlines
          </h1>
        </div>
        <div className="line" style={{ width: "100%", height: "10px", backgroundColor: "#CB6040", margin: "10px 0 0 0" }}></div>
      </div>

      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container my-4" style={{ overflowX: "hidden" }}>
          <div className="row my-3">
            {articles.map((element) => {
              return (
                <div className="col-md-4 mb-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageURL={element.urlToImage}
                    newsURL={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>

      {/* <div className="container d-flex justify-content-between">
        <button
          type="button"
          disabled={page <= 1}
          className="btn btn-dark"
          onClick={handlePrevClick}
        >
          &larr;PREV
        </button>
        <button
          type="button"
          disabled={page + 1 > maxPages}
          className="btn btn-dark"
          onClick={handleNextClick}
        >
          NEXT&rarr;
        </button>
      </div> */}
    </>
  );
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
