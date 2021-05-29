import React, {useEffect, useState} from "react";
import s from "./SearchNews.module.scss";
import {useDispatch, useSelector} from "react-redux";
import newsAPI from "../../../services/newsAPI";
import {setFullNewsActionCreator} from "../../../redux/news-reducer";


function SearchNews({}) {
    const {covidFullNews} = useSelector((state) => state.news);
    const dispatch = useDispatch();
    const [value, setValue] = useState("");
    const [arr, setArr] = useState([]);

    useEffect(() => {
        let filteredArr = covidFullNews.filter((item) => {
            return item.title.includes(value);
        });
        let slicedArr;
        if(filteredArr.length > 10) {
            slicedArr = filteredArr.slice(1, 11)
        } else {
            slicedArr = filteredArr
        }
        value === "" ? setArr([]) : setArr(slicedArr);
    }, [value]);

    useEffect(() => {
        const getFullNews = async() => {
            const {articles} = await newsAPI.getFullNews("covid", 100);
            dispatch(setFullNewsActionCreator(articles));
        };
        getFullNews();
    }, []);

    return (
        <div className={s.blockWrapper}>
            <div className={s.inputBlock}>
                <div className="row">
                    <div className="input-field s6">
                        <i className="material-icons prefix">search</i>
                        <textarea id="icon_prefix2" placeholder={"Enter keywords"} className="materialize-textarea"
                                  onChange={(event) => setValue(event.target.value)}></textarea>
                    </div>
                </div>
            </div>

            <div className={s.searchedList}>
                {arr.map((article, i) => {
                    return (
                        <a href={article.url}>
                            <div key={i} className={s.searchedNews}>
                                <div>{article.title}</div>
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}

export default SearchNews;
