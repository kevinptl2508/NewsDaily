import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl,date } = this.props;
        return (
            <div>
                <div className={`card text-${this.props.mode === 'light' ? 'dark' : 'light'} bg-${this.props.mode}`}>
                    <img src={imageUrl ? imageUrl : "https://englishtribuneimages.blob.core.windows.net/gallary-content/2021/12/2021_12$largeimg_349422127.jpg"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">Published on {new Date(date).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className={`btn btn-outline-${this.props.mode === 'light' ? 'dark' : 'light'}`}>Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem