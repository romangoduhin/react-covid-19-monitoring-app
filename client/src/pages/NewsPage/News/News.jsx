import React, {useEffect, useState} from "react";
import s from "./News.module.css";
import newsAPI from "../../../services/newsAPI";
import {useDispatch, useSelector} from "react-redux";
import {
    setNewsActionCreator,
    setTotalResultsActionCreator,
} from "../../../redux/news-reducer";
import newsNotFoundImg from "../../../img/camera.png";


function News() {
    const {covidNews, totalCount, pageSize} = useSelector(
        (state) => state.news
    );

    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        const getNews = async() => {
          setLoading(true)
          try {
            const {articles, totalResults} = await newsAPI.getNews(
                "covid",
                currentPage,
                pageSize
            );
            dispatch(setNewsActionCreator(articles));
            dispatch(setTotalResultsActionCreator(totalResults));
          } catch (err) {
            console.log(err)
          } finally {
            setLoading(false)
          }
        };
        getNews()
    }, [currentPage]);

    let pagesCount = Math.ceil(totalCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    if(loading) return <div className="progress">
        <div className="indeterminate"></div>
    </div>

    return (
        <div className={s.blockWrapper}>
            <div className={s.newsList}>
                {covidNews.map((article, i) => {
                    return (
                        <div className={s.itemWrapper} key={i}>
                            <div className={s.imgWrapper}>
                                <div key={i} className={s.item}>
                                    <a href={article.url}>
                                        <img
                                            className={s.urlToImage}
                                            src={
                                                article.urlToImage === null || article.urlToImage === ""
                                                    ? newsNotFoundImg
                                                    : article.urlToImage
                                            }
                                            alt=""
                                        />
                                    </a>
                                </div>
                            </div>
                            <div className={s.infWrapper}>
                                <a href={article.url}>
                                    <h4 className={s.title}>{article.title}</h4>
                                </a>
                                <div className={s.description}>{article.description}</div>
                                <div className={s.publishedAt}>
                                    {article.publishedAt.split("T")[0]}
                                </div>
                                <h5 className={s.author}>
                                    {article.author === null ? "" : `Source: ${article.author}`}
                                </h5>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className={s.pageList}>
                {pages.map((page, i) => {
                    return (
                        <span
                            className={currentPage === page ? s.selectPage : s.listItem}
                            key={i}
                            onClick={() => {
                                window.scrollTo(0,0)
                                setCurrentPage(page);
                            }}
                        >
              {page}
            </span>
                    );
                })}
            </div>
        </div>
    );
}

export default News;
