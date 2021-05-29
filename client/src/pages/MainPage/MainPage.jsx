import React from 'react';
import 'materialize-css';
import s from "./MainPage.module.scss";
import MapBlock from "../../components/MapBlock/MapBlock";
import StatBlock from "../../components/StatBlock/StatBlock";
import NewsBlock from "../../components/NewsBlock/NewsBlock";
import SympthomsBlock from "../../components/SympthomsBlock/SympthomsBlock";


function MainPage() {
    return (
        <div className={s.wrapper}>
            <div className={s.wrapperContent}>
                <div className={s.content}>
                    <div className={s.main}>
                        <div className={s.map}><MapBlock/></div>
                        <div className={s.stats}><StatBlock/></div>
                        <div className={s.symptoms}><SympthomsBlock/></div>
                    </div>
                    <div className={s.news}><NewsBlock/></div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;