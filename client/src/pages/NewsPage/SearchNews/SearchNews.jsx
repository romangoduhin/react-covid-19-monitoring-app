import React, { useEffect, useState } from "react";
import s from "./SearchNews.module.css";
import { useDispatch, useSelector } from "react-redux";
import newsAPI from "../../../services/newsAPI";
import { setFullNewsActionCreator } from "../../../redux/news-reducer";

function SearchNews({}) {
  const { covidFullNews } = useSelector((state) => state.news);

  const dispatch = useDispatch();

  const [value, setValue] = useState("");

  const [arr, setArr] = useState([]);

  useEffect(() => {
    let filteredArr = covidFullNews.filter((item) => {
      return item.title.includes(value);
    });
    value === "" ? setArr([]) : setArr(filteredArr);
  }, [value]);

  useEffect(() => {
    const getFullNews = async () => {
      const { articles } = await newsAPI.getFullNews("covid", 100);
      dispatch(setFullNewsActionCreator(articles));
    };
    getFullNews();
  }, []);

  return (
    <div className={s.blockWrapper}>
      <div className={s.inputBlock}>
        <input
          className={s.input}
          type="text"
          value={value}
          placeholder={"Введите искомую тему новости"}
          onChange={(event) => setValue(event.target.value)}
        />
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
