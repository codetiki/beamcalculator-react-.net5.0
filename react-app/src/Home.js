import React, { useState } from "react";
import { Tabs, Tab, AppBar } from "@material-ui/core";
import Beam from "./components/Beam/index";
import Result from "./components/Result";
import Example from "./components/Result/Example";

// Luodaan välilehdet (Basic tabs [material-ui])
const Home = () => {
    const [selectedTab, setSelectedTab] = React.useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    // tänne provider / context (ylin taso)

    // context-metodi app/home väliin
    // values- state tähän, niin toimii molemmissa
    // alustetaan objekti, jossa kaikki muuttujat

    // alustetaan objekti, jossa kaikki muuttujat
    const getFreshModelObject = () => ({
        beamId: 0,
        beamName: "",
        beamDefinition: "",
        span: "",
        a: "",
        b: "",
        vmax: 0,
        vmin: 0,
        mmax: 0,
        mmin: 0,
        types: [],
        xp1: 0,
        fy1: 0,
        xm1: 0,
        m1: 0,
        xStartUDL1: 0,
        xEndUDL1: 0,
        fyUDL1: 0,
        xStartLDL1: 0,
        xEndLDL1: 0,
        fy_StartLDL1: 0,
        fy_EndLDL1: 0,
        forceTypeId: null,
        changed: false,
        check: false
    })
    const [values, setValues] = useState(getFreshModelObject());
    const [results, setResults] = useState({
        "Vmax": null,
        "Vmin": null,
        "Mmax": null,
        "Mmin": null
    });

    const resetFormControls = () => {
        setValues(getFreshModelObject());
    }

    // Alustetaan viivadiagrammit
    const [shearData, setShearData] = useState({
        labels: [],
        datasets: [
            {
                label: "X-akseli",
                data: [],
                borderColor: 'black',
                borderWidth: 3,
                tension: 0.1,
                pointRadius: 0
            },
            {
                label: "V [kN]",
                data: [],
                backgroundColor: '#97ff97',
                borderColor: 'green',
                borderWidth: 1,
                fill: true,
                tension: 0.1,
                pointRadius: 0
            },
        ],
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Leikkausvoima-käyrä',
                }
            },
            maintainAspectRatio: true,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: false,
                        },
                    },
                ],
            },
        },
    });

    const [momentData, setMomentData] = useState({
        labels: [],
        datasets: [
            {
                label: "X-akseli",
                data: [],
                borderColor: 'black',
                borderWidth: 3,
                tension: 0.1,
                pointRadius: 0
            },
            {
                label: "M [kNm]",
                data: [],
                backgroundColor: '#ffe5e5',
                borderColor: 'red',
                borderWidth: 1,
                fill: true,
                tension: 0.1,
                pointRadius: 0
            },
        ],
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Taivutusmomentti-käyrä',
                }
            },
            maintainAspectRatio: true,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: false,
                        },
                    },
                ],
            },
        },
    });

    return (
        <>
            <AppBar position="static">
                <Tabs value={selectedTab} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Lähtötiedot" />
                    <Tab label="Tulokset" />
                    <Tab label="Laskentaesimerkki" />
                </Tabs>
            </AppBar>
            {selectedTab === 0 && <Beam  {...{
                values,
                setValues,
                results,
                setResults,
                resetFormControls
            }} />}
            {selectedTab === 1 && <Result {...{
                values,
                setValues,
                results,
                setResults,
                shearData,
                setShearData,
                momentData,
                setMomentData,

            }} />}
            {selectedTab === 2 && <Example />}
        </>
    )
};

export default Home;