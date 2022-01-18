import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    // document.title = `NewsDaily - ${capitalizeFirstLetter(props.category)}`;

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const updateNews = async (props) => {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        props.setProgress(40);
        let data = await fetch(url).then((obj) => {
            return obj.json();
        });
        setArticles(data.articles);
        setLoading(false);
        setTotalResults(data.totalResults);
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
    })

    const fetchMoreData = async (props) => {
        setPage(page + 1);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url).then((obj) => {
            return obj.json();
        });
        setArticles(articles.concat(data.articles));
        setTotalResults(data.totalResults);
    }

    return (
        <div className='container my-5'>
            <h1 className='text-center my-5' style={{ color: props.mode === 'light' ? 'black' : 'white' }}>NewsDaily-Top {capitalizeFirstLetter(props.category)} Headlines</h1>

            {loading && <Spinner />}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-xl-4 col-md-6 col-12 mb-3" key={element.url}>
                                <NewsItem mode={props.mode} title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </div>
    )
}

News.propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string
}
News.defaultProps = {
    pageSize: 20,
    country: 'in',
    category: 'general'
}

export default News