import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
apiKey = process.env.REACT_APP_NEWS_API
  static defaultProps = {
   country:'in',
   pageSize:6,
   category:'general',
  }

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };
 constructor(props){
    super(props);
    this.state ={
        page:1,
        articles:[],
        loading:true,
        totalResults:0,
    }
    this.categoryTitle =this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1);
 }
  
 async updateNews(){
  this.props.setProgress(0);
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apiKey}&page=${this.state.page }&pageSize=${this.props.pageSize}`
  let data = await fetch(url);
  let parseddata =await data.json()
  console.log(parseddata); 
  this.setState({articles: this.state.articles.concat(parseddata.articles), totalResults: parseddata.totalResults})  
  this.props.setProgress(100);
 }

  async componentDidMount(){
    this.updateNews() 
  }


  fetchMoreData = async() => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    this.setState({page : this.state.page + 1})
    let data = await fetch(url);
    let parseddata =await data.json()
    console.log(parseddata); 
    this.setState({articles: this.state.articles.concat(parseddata.articles), totalResults: parseddata.totalResults})  
  };

  render() {
    return (
      <div className='container-fluid mt-5'> 
       <div><h1 className='text-center' style={{marginBottom:'2.5rem',marginTop: '4.5rem'}} >JaanKari-Top {this.categoryTitle} Headlines</h1></div>
        {/* {this.state.loading && <Spinner/>}   */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        > 
               <div className='container'>        
                <div className='row md-3'>
                    {this.state.articles.map((element)=>{
                      
                    return <div className='col-md-4'key={element.url}>
                    <NewsItem  title={element.title} description={element.description} imageUrl = {element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                    </div> 
                    })}
                    
                </div>
           </div>
           </InfiniteScroll>
      </div>
    )
  }
}

export default News
