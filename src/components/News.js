import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
 
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
 constructor(){
    super();
    console.log("construtor hun mai")
    this.state ={
      page:1,
        articles:[],
        loading:false,
        totalResults:0,
    }
 }

 async componentDidMount(){
   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=af6816ec72a5471caf235d4cfe6db04f&page=1&pageSize=${this.props.pageSize}`
   this.setState({loading:true})   
   let data = await fetch(url);
   let parseddata =await data.json()
   console.log(parseddata); 
   this.setState({articles: parseddata.articles , totalResults: parseddata.totalResults , loading:false})
 }

 prevHandler = async ()=>{
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=af6816ec72a5471caf235d4cfe6db04f&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
 this.setState({loading:true})
  let data = await fetch(url);
  let parseddata =await data.json()
  this.setState({
    page : this.state.page - 1,
    articles: parseddata.articles,
    loading:false
  })
}

nextHandler= async()=>{
  console.log("click next")
  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=af6816ec72a5471caf235d4cfe6db04f&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  this.setState({loading:true})
  let data = await fetch(url);
  let parseddata =await data.json()
  this.setState({
    page : this.state.page + 1,
    articles: parseddata.articles,
    loading:false
  })
}
  render() {
    return (
      <div className='container-sm my-3'> 
        <h1 className='text-center'>JaanKari-Top Headlines</h1>
       {this.state.loading && <Spinner/>}
            <div className='row md-3'>
                {this.state.articles.map((element)=>{
                  
                 return <div className='col-md-4'key={element.url}>
                 <NewsItem  title={element.title} description={element.description} imageUrl = {element.urlToImage} newsUrl={element.url} />
                 </div> 
                })}
                
           </div>
           <div className='container d-flex justify-content-between'>
           <button type="button" disabled={this.state.page<=1} onClick={this.prevHandler} className="btn btn-dark">Previous</button>
           <button type="button"  onClick={this.nextHandler} className="btn btn-dark">Next</button>
           </div>
      </div>
    )
  }
}

export default News
