import React from "react";
import { Tabs, Tab, AppBar } from "@material-ui/core";
import About from "./About";
import Contact from "./Contact";
import BeamUI from "./BeamUI";
import Beam from "./components/Beam/index";

// Luodaan välilehdet (Basic tabs [material-ui])
const Home = () => {
    const [selectedTab, setSelectedTab] = React.useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <>
            <AppBar position="static">

                <Tabs value={selectedTab} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="About" />
                    <Tab label="Contact Us" />
                    <Tab label="BeamUI" />
                    <Tab label="Lähtötiedot" />
                    <Tab label="Tulokset" />
                </Tabs>
            </AppBar>
            {selectedTab === 0 && <About />}
            {selectedTab === 1 && <Contact />}
            {selectedTab === 2 && <BeamUI />}
            {selectedTab === 3 && <Beam />}
            {selectedTab === 4 && <Beam />}
        </>
    )
};

export default Home;