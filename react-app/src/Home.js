import React, { useState } from "react";
import { Tabs, Tab, AppBar } from "@material-ui/core";
import About from "./About";
import Contact from "./Contact";
import BeamUI from "./BeamUI";
import Beam from "./components/Beam/index";
import Result from "./components/Result";

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
        span: 0,
        a: 0,
        b: 0,
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
        // setErrors({})
    }

    return (
        <>
            <AppBar position="static">

                <Tabs value={selectedTab} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Lähtötiedot" />
                    <Tab label="Tulokset" />
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
                setResults
            }} />}
        </>
    )
};

export default Home;