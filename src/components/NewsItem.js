import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
      let {title,description,imageUrl,newsUrl} = this.props;
    return (
      <div className=' mx-3'>
         <div className="card  my-3">
        <img src={imageUrl?imageUrl:"https://images.wsj.net/im-785590/social"} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a href={newsUrl} className="btn btn-dark" target='_blank'>Read More</a>
        </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
