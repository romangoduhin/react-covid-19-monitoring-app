import React from "react";
import s from "./Map.module.css";

function Map() {
  return (
    <div className={s.blockWrapper}>
      <iframe
        className={s.map}
        src="https://coronavirus-monitor.ru/map"
        scrolling="no"
      >
        Ваш браузер не поддерживает данную карту
      </iframe>
    </div>
  );
}

export default Map;
