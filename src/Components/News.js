import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `NewsDaily - ${this.capitalizeFirstLetter(this.props.category)}`;
    }

    static propTypes = {
        pageSize: PropTypes.number,
        country: PropTypes.string,
        category: PropTypes.string
    }
    static defaultProps = {
        pageSize: 20,
        country: 'in',
        category: 'general'
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    async updateNews(props) {
        let { pageSize, country, category, setProgress, apiKey } = this.props;
        setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${this.state.page}&pageSize=${pageSize}`;
        this.setState({
            loading: true
        });
        setProgress(40);
        let data = await fetch(url).then((obj) => {
            return obj.json();
        });
        this.setState({
            articles: data.articles,
            loading: false,
            totalResults: data.totalResults
        });
        setProgress(100);
        // let data = await fetch(url);
        // let parsedData = await data.json();
        // this.setState({ articles: data.articles });
    }

    async componentDidMount() {
        await this.updateNews();
    }

    // previousFunc = async () => {
    //     this.setState({
    //         page: this.state.page - 1
    //     });
    //     await this.updateNews();
    // }

    // nextFunc = async () => {
    //     await this.setState({
    //         page: this.state.page + 1
    //     });
    //     await this.updateNews();
    // }

    // API KEYS 
    // 1601656c7b3646e39b1ba950b59209f5
    // efbb14b55a8b43bdbadceee2265ff050

    fetchMoreData = async () => {
        let { pageSize, country, category, apiKey } = this.props;
        this.setState({
            page: this.state.page + 1
        });
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${this.state.page}&pageSize=${pageSize}`;
        let data = await fetch(url).then((obj) => {
            return obj.json();
        });
        this.setState({
            articles: this.state.articles.concat(data.articles),
            totalResults: data.totalResults
        });
    }

    render() {
        return (
            <div className='container my-5'>
                <h1 className='text-center my-5' style={{ color: this.props.mode === 'light' ? 'black' : 'white' }}>NewsDaily-Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>

                {this.state.loading && <Spinner />}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element) => {
                                return <div className="col-xl-4 col-md-6 col-12 mb-3" key={element.url}>
                                    <NewsItem mode={this.props.mode} title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>

                {/* <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} className={`btn btn-${this.props.mode === 'light' ? 'dark' : 'light'}`} onClick={this.previousFunc}>&larr; Previous</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className={`btn btn-${this.props.mode === 'light' ? 'dark' : 'light'}`} onClick={this.nextFunc}>Next &rarr;</button>
                </div> */}
            </div>
        )
    }
}

export default News