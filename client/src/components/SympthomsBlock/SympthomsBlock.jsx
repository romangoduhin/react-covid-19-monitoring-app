import React from "react";
import s from "./SympthomsBlock.module.scss";


function SympthomsBlock() {
    return (
        <div className={s.sympthomsInfo}>
            <h1 className={s.headline}>Symptoms of the coronavirus</h1>
            <div className={s.discription}>
                The incubation period of the coronavirus Covid-19 may last more than two
                weeks. Longer incubation periods may be
                are characteristic for the transmission of the virus from animals. Symptoms of the coronavirus
                Covid-19 similar to symptoms of pneumonia or severe acute
                respiratory syndrome:
            </div>
            <div className={s.sympthoms}>
                <ul>
                    <li>
                        Loss of consciousness (as a result of progressive destruction of the lungs
                        tissue
                    </li>
                    <li>- Dry, unproductive cough</li>
                    <li>- Fever and fever (38 ° C or higher, chills)</li>
                    <li>- Difficulty breathing</li>
                    <li>- Chest pain</li>
                    <li>- Headache</li>
                    <li>- Muscle pain</li>
                    <li>- General malaise</li>
                </ul>
                <h2>Mild form of coronavirus COVID-19</h2>
                <div>
                    Mild fever, mild headache, increased fatigue,
                    sore throat, coughing, muscle aches, lungs
                    signs of a cold, pallor, chills. Rarely runny nose.
                </div>
                <h2>How not to confuse the symptoms of coronavirus COVID-19 with SARS</h2>
                <div>
                    With ARVI and colds, unlike COVID-19, the cough is wet, not dry,
                    and there is always a stuffy nose and a runny nose. Of the similar symptoms -
                    slight fever and headache from mild to
                    moderate.
                </div>
                <h2>How not to confuse the symptoms of the coronavirus COVID-19 with the flu</h2>
                <div>
                    Rospotrebnadzor, based on information from WHO, reports on its
                    website that the symptoms of COVID-19 and the flu are similar: "both cause
                    respiratory disease with a wide range of options - from
                    asymptomatic or mild to serious condition and death. "But when
                    flu, there is no shortness of breath or other breathing problems, and the temperature
                    almost always high, unlike COVID-19.
                </div>
                <h2>Unusual symptoms of coronavirus COVID-19 in Germany</h2>
                <div>
                    German virologist Hendrik Strick, who observed almost all
                    cases of COVID-19 in Germany, in an interview with the Frankfurter newspaper
                    Allgemeine Zeitung shared personal experience. According to the expert,
                    of a typical COVID-19 coronavirus patient only mild symptoms.
                    A dry, irritating cough and mild fever are characteristic, in 30
                    percent of those infected had diarrhea. Met and very
                    unusual signs: Approximately two-thirds of cases reported a disorder
                    smell and taste. For several days, they celebrated strange
                    Feel. This suggests that patients from Germany have the virus
                    SARS-CoV-2 penetrated not only into the lungs, but also into the gastrointestinal
                    tract.
                </div>
            </div>
            <h1 className={s.headline}>Effective methods of protection</h1>
            <div className={s.video}>
                <iframe
                    width="1280"
                    height="720"
                    src="https://www.youtube.com/embed/Rb_gtUYXxqY"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                >
                    video
                </iframe>
            </div>
        </div>
    );
}

export default SympthomsBlock;
