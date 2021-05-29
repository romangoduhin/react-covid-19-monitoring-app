import React, { useEffect, useState } from "react";
import CovidAPI from "../../../services/covidAPI";
import {
  setGlobalStatActionCreator,
  setSummaryStatActionCreator,
} from "../../../redux/covid-reducer";
import { useDispatch, useSelector } from "react-redux";
import s from "./Statistic.module.css";

function Statistic() {
  const { summaryCovidStat, globalCovidStat } = useSelector(
    (state) => state.covid
  );

  const dispatch = useDispatch();

  const [arr, setArr] = useState(globalCovidStat);

  const [value, setValue] = useState("");

  const [count, setCount] = useState(0);

  useEffect(() => {
    const getStat = async () => {
      const { Countries, Global } = await CovidAPI.getGlobalStatistics();
      dispatch(setSummaryStatActionCreator(Global));
      dispatch(setGlobalStatActionCreator(Countries));
      setArr(Countries);
    };
    getStat();
  }, []);

  useEffect(() => {
    let filteredArr = globalCovidStat.filter((item) => {
      return item.Country.includes(value);
    });
    setArr(filteredArr);
  }, [value]);

  useEffect(() => {
    let sortedArr = globalCovidStat.sort((a, b) => {
      return b.TotalConfirmed - a.TotalConfirmed;
    });
    setArr(sortedArr);
  }, [count]);

  if (summaryCovidStat.length === 0 && globalCovidStat.length === 0)
    return <div> loading</div>;

  return (
    <div className={s.blockWrapper}>
      <div className={s.inputBlock}>
        <input
          className={s.input}
          type="text"
          value={value}
          placeholder={"Введите искомую страну"}
          onChange={(event) => setValue(event.target.value)}
        />
        <button
          className={s.button}
          onClick={() => {
            setCount(count + 1);
          }}
        >
          По убыванию
        </button>
      </div>

      <div className={s.statBlock}>
        {arr.map((item, i) => {
          return (
            <div className={s.item} key={i}>
              <div className={s.Country}>{item.Country}</div>
              <div className={s.infBlock}>
                <div className={s.TotalConfirmed}>
                  Случаев заражения:{item.TotalConfirmed}
                </div>
                <div className={s.TotalDeaths}>
                  Случаев смерти: {item.TotalDeaths}
                </div>
                <div className={s.TotalRecovered}>
                  Случаев выздоровления: {item.TotalRecovered}
                </div>
                <h5>
                  {" "}
                  Статистика по сегоднешнему дню {item.Date.split("T")[0]}
                </h5>
                <div className={s.NewConfirmed}>
                  Случаев заражения: {item.NewConfirmed}
                </div>
                <div className={s.NewDeaths}>
                  Случаев смерти: {item.NewDeaths}
                </div>
                <div className={s.NewRecovered}>
                  Случаев выздоровления: {item.NewRecovered}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Statistic;
