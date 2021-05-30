import React, {useEffect, useState} from "react";
import CovidAPI from "../../services/covidAPI";
import {
    setGlobalStatActionCreator,
    setSummaryStatActionCreator,
} from "../../redux/covid-reducer";
import {useDispatch, useSelector} from "react-redux";
import s from "./StatPage.module.scss";


function StatPage() {
    const {summaryCovidStat, globalCovidStat} = useSelector(
        (state) => state.covid
    );

    const dispatch = useDispatch();

    const [arr, setArr] = useState(globalCovidStat);

    const [value, setValue] = useState("");

    const [isSorted, setIsSorted] = useState(null);
    const [defaultArr, setDefaultArr] = useState([]);

    useEffect(() => {
        const getStat = async() => {
            const {Countries, Global} = await CovidAPI.getGlobalStatistics();
            dispatch(setSummaryStatActionCreator(Global));
            dispatch(setGlobalStatActionCreator(Countries));
            setArr(Countries);
            setDefaultArr(Countries)
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
        console.log(isSorted)
        if(isSorted) {
            let sortedArr = globalCovidStat.sort((a, b) => {
                return b.TotalConfirmed - a.TotalConfirmed;
            });
            setArr(sortedArr);
        } else if(isSorted === false) {
            let sortedArr = globalCovidStat.sort((a, b) => {
                return a.TotalConfirmed - b.TotalConfirmed;
            });
            setArr(sortedArr);
        }

    }, [isSorted]);

    if(summaryCovidStat.length === 0 && globalCovidStat.length === 0)
        return <div className="progress">
            <div className="indeterminate"></div>
        </div>

    return (
        <div className={s.blockWrapper}>
            <div>
                <div className="row">
                    <div className="input-field s6">
                        <i className="material-icons prefix">search</i>
                        <textarea id="icon_prefix2" placeholder={"Enter coutnry"} className="materialize-textarea"
                                  onChange={(event) => setValue(event.target.value)}></textarea>
                    </div>
                </div>
                <span className={s.sortTitle}>Sort: </span>

                <a style={{marginTop: '-7px'}} className="waves-effect waves-light  green darken-1 btn-small"
                   onClick={() => {
                       setIsSorted(!isSorted)
                   }}>
                    <i className="material-icons left">cloud</i>
                    {isSorted === null && "By default"}
                    {isSorted === true && "Ascending"}
                    {isSorted === false && "Descending"}</a>

                {isSorted !== null && <a style={{marginLeft: '20px', marginTop: '-7px'}}
                                         className="waves-effect green darken-1 waves-light btn-small" onClick={() => {
                    setIsSorted(null)
                    setArr(defaultArr)
                }}>
                    <i className="material-icons left">cloud</i>
                    By default
                </a>}
            </div>

            <div className={s.statBlock}>
                {arr.map((item, i) => {
                    return (
                        <div className={s.item} key={i}>
                        <div className="row">
                            <div className="col s12 ">
                                <div className="card green darken-1 medium">
                                    <div className="card-content white-text">
                                        <span style={{fontSize:'40px'}} className="card-title">{item.Country}</span>
                                        <div className={s.infBlock}>
                                            <div className={s.TotalConfirmed}>
                                                Total Confirmed:{item.TotalConfirmed}
                                            </div>
                                            <div className={s.TotalDeaths}>
                                                Total Deaths: {item.TotalDeaths}
                                            </div>
                                            <div className={s.TotalRecovered}>
                                                Total Recovered: {item.TotalRecovered}
                                            </div>
                                            <h5>
                                                Statistics for today {item.Date.split("T")[0]}
                                            </h5>
                                            <div className={s.NewConfirmed}>
                                                New Confirmed: {item.NewConfirmed}
                                            </div>
                                            <div className={s.NewDeaths}>
                                                New Deaths: {item.NewDeaths}
                                            </div>
                                            <div className={s.NewRecovered}>
                                                New Recovered: {item.NewRecovered}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default StatPage;
