import React from "react";
import s from "./MapBlock.module.scss";


function MapBlock() {
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
}

export default MapBlock;
