import React, {useEffect, useState} from "react";
import s from "./NewsBlock.module.scss";
import {useDispatch, useSelector} from "react-redux";
import newsAPI from "../../services/newsAPI";
import newsNotFoundImg from "../../img/camera.png";
import {
    setNewsActionCreator,
    setTotalResultsActionCreator,
} from "../../redux/news-reducer";


function NewsBlock() {
    const {
        covidNews,
        totalCount,
        pageSize
    } = useSelector((state) => state.news);

    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const getNews = async() => {
            const {articles, totalResults} = await newsAPI.getNews(
                "covid",
                currentPage,
                pageSize,
            );
            dispatch(setNewsActionCreator(articles));
            dispatch(setTotalResultsActionCreator(totalResults));
        };
        getNews();
    }, [currentPage]);

    let pagesCount = Math.ceil(totalCount / pageSize);
    let pages = [];
    for (let i = 1; i <= (pagesCount > 10 ? 10 : pagesCount); i++) {
        pages.push(i);
    }

    if(covidNews.length === 0) return <div className="progress">
        <div className="indeterminate"></div>
    </div>

    return (
        <div className={s.blockWrapper}>
            <div className={s.newsList}>
                {covidNews.map((article, i) => {
                    return (
                        <div key={i} className={s.item}>
                            <a href={article.url}>
                                <div className={s.title}>{article.title}</div>
                                <img
                                    className={s.urlToImage}
                                    src={
                                        article.urlToImage === null
                                            ? newsNotFoundImg
                                            : article.urlToImage
                                    }
                                    alt=""
                                />
                            </a>
                        </div>
                    );
                })}
            </div>

            <div className={s.pageList}>
                {pages.map((page, i) => {
                    return (
                        <span className={currentPage === page ? s.selectPage : s.listItem}
                              key={i}
                              onClick={() => {
                                  window.scrollTo(0, 0)
                                  setCurrentPage(page)
                              }}>
              {page}
            </span>
                    );
                })}
            </div>
        </div>
    );
}

export default NewsBlock;
