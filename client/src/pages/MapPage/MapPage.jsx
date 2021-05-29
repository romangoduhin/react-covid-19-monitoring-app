import React from "react";
import s from "./MapPage.module.scss";


const MapPage = () => {
    return (
        <div className={s.blockWrapper}>
            <iframe
                className={s.map}
                src="https://coronavirus-monitor.ru/map"
                scrolling="no"
            >
                Your browser doesnt support this map
            </iframe>
        </div>
    );
};

export default MapPage;
