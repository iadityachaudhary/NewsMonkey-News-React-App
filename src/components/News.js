import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 9,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  articles = [
    {
      source: {
        id: "bbc-sport",
        name: "BBC Sport",
      },
      author: null,
      title:
        "New Zealand vs Sri Lanka LIVE: Women’s T20 World Cup – cricket score, radio commentary, video highlights and text updates",
      description:
        "New Zealand face Sri Lanka in the Women’s T20 World Cup at Sylhet Stadium, Sylhet – follow text updates, radio commentary and video highlights.",
      url: "http://www.bbc.co.uk/sport/cricket/live/ced3pg0d03yt",
      urlToImage:
        "https://static.files.bbci.co.uk/ws/simorgh-assets/public/sport/images/metadata/poster-1024x576.png",
      publishedAt: "2024-10-12T10:07:21.6573238Z",
      content:
        "New Zealand v Sri Lanka (11:00 BST)\r\nNew Zealand: Suzie Bates, Georgia Plummer, Melie Kerr, Sophie Devine (c), Brooke Halliday, Maddy Green, Izzy Gaze (wk), Leigh Kasparek, Romsemary Mair, Lea Tahuhu… [+248 chars]",
    },
    {
      source: {
        id: "bbc-sport",
        name: "BBC Sport",
      },
      author: null,
      title:
        "Multan cricket pitch: What should England and Pakistan expect in second Test?",
      description:
        "What should England and Pakistan expect from the pitch in the second Test in Multan?",
      url: "http://www.bbc.co.uk/sport/cricket/articles/c77x5r54p5no",
      urlToImage:
        "https://ichef.bbci.co.uk/news/1024/branded_sport/b74a/live/d29cb090-87d6-11ef-8936-1185f9e7d044.jpg",
      publishedAt: "2024-10-12T07:22:15.6725853Z",
      content:
        "The placid nature of the Multan surface made batting look easy at times in the first Test - well, if you came from Yorkshire that is!\r\nHarry Brook, who became England's first triple centurion for 34 … [+1579 chars]",
    },
    {
      source: {
        id: "espn-cric-info",
        name: "ESPN Cric Info",
      },
      author: null,
      title:
        "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
      description:
        "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
      url: "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
      urlToImage:
        "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
      publishedAt: "2020-04-27T11:41:47Z",
      content:
        "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]",
    },
    {
      source: {
        id: "espn-cric-info",
        name: "ESPN Cric Info",
      },
      author: null,
      title:
        "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
      description:
        "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
      url: "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
      urlToImage:
        "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
      publishedAt: "2020-03-30T15:26:05Z",
      content:
        "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]",
    },
  ];
  capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase()+ string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults: 0,
      maxPages: 4,
    };
    document.title=`NewsMonkey-${this.capitalizeFirstLetter(this.props.category)}`;
  }

  async componentDidMount() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a14a3be6084242a1b28206aedc37dcb6&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    
    this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false,
    });
    this.props.setProgress(100);
}

// handlePrevClick = async () => {
//     const newPage = this.state.page - 1;
    
//     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a14a3be6084242a1b28206aedc37dcb6&page=${newPage}&pageSize=${this.props.pageSize}`;
    
//     this.setState({ loading: true });
    
//     let data = await fetch(url);
//     let parsedData = await data.json();
    
//     this.setState({
//         page: newPage,
//         articles: parsedData.articles || [],
//         loading: false,
//     });
// };

// handleNextClick = async () => {
//     if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
        
//     }
    
//     const newPage = this.state.page + 1;
//     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a14a3be6084242a1b28206aedc37dcb6&page=${newPage}&pageSize=${this.props.pageSize}`;
    
//     this.setState({ loading: true });
    
//     let data = await fetch(url);
//     let parsedData = await data.json();
    
//     this.setState({
//         page: newPage,
//         articles: parsedData.articles || [],
//         loading: false,

//     });
// };

fetchMoreData = async() => {
  this.setState({page:this.state.page+1});

  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a14a3be6084242a1b28206aedc37dcb6&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  
  
  let data = await fetch(url);
  let parsedData = await data.json();
  
  this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
  });

};

  render() {
    return (
      <>
        <div className="container my-4  text-center">
    <div className="line" style={{ width: "100%", height: "10px", backgroundColor: "#CB6040", margin: "0 0 10px 0" }}></div>
    <div className="card-body">
      <h1 className="card-title" style={{ color: "black", marginBottom: "0", fontFamily: "Algerian", fontWeight: "bold" }}>
        NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines
      </h1>
    </div>
    <div className="line" style={{ width: "100%", height: "10px", backgroundColor: "#CB6040", margin: "10px 0 0 0" }}></div>
  </div>

        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length<this.state.totalResults}
          loader={<Spinner/>}
        >
      <div className="container my-4 " style={{ overflowX: "hidden" }}>
        <div className="row my-3">
       
          { this.state.articles.map((element) => {
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
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr;PREV
          </button>
          <button
            type="button"
            disabled={this.state.page + 1 > this.state.maxPages}
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            NEXT&rarr;
          </button>
        </div> */}
    </>
    );
  }
}

export default News;
