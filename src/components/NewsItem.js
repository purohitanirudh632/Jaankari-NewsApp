import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
      let {title,description,imageUrl,newsUrl,author,date,source} = this.props;
    return (
      <div className=' mx-3'>
         <div className="card my-3"><span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:'87%',zIndex:'1'}}>{source}</span>
        <img src={imageUrl?imageUrl:"https://images.wsj.net/im-785590/social"} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a href={newsUrl} className="btn btn-dark" target='_blank'>Read More</a>
        </div>
        <div className="card-footer">
          <small className="text-body-secondary">Report By {author?author:'Sources'} on {new Date(date).toGMTString()}</small>
        </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
