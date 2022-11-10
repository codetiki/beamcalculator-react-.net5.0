import React, { useState, useEffect, Component, useContext } from 'react';
import axios from 'axios';
import { createAPIEndpoint, ENDPOINTS } from "./api/Index";
import 'bootstrap/dist/css/bootstrap.min.css';
import BeamCalculator from './BeamCalculator';
import { Select } from "./control/Select";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ResultList from './components/Result/ResultList';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';


// import images from local
import img0 from './images/supportsWithBeam.png';
import img1 from './images/pointloadWithSupportsWithBeam.png';
import img2 from './images/momentloadWithSupports.png';
import img3 from './images/distributedLoadWithSupport.png';
import img4 from './images/linearLoadWithSupport.png';


const getFreshModelObject = () => ({
    beamId: 0,
    beamName: "",
    beamDefinition: "",
    span: 0,
    a: 0,
    b: 0,
    types: []
})

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const BeamUI = () => {

    const [createBeamId, setCreateBeamId] = useState(null);
    // const createBeamId = null;
    // const { CalculateShearForce } = useContext(BeamContext);
    const [values, setValues] = useState(getFreshModelObject());
    const [forceTypeList, setForceTypeList] = useState([]);
    const [updateResult, setUpdateResult] = useState(false);

    const [forceType, setForceType] = useState("");
    const [pointLoadCount, setPointLoadCount] = useState(1);
    const [pointMomentCount, setPointMomentCount] = useState(1);
    const [distributedLoadCount, setDistributedLoadCount] = useState(1);
    const [linearLoadCount, setLinearLoadCount] = useState(1);

    const [formData, setFormData] = useState({
        "name": "",
        "definition": "",
        "span": "0",
        "A": "0",
        "B": "0",
        "type": "PL",
        "xp1": "0",
        "fy1": "0",
        "xm1": "0",
        "m1": "0",
        "xStartUDL1": "0",
        "xEndUDL1": "0",
        "fyUDL1": "0",
        "xStartLDL1": "0",
        "xEndLDL1": "0",
        "fy_StartLDL1": "0",
        "fy_EndLDL1": "0",
        "changed": false,
        "check": false,
    });

    const [results, setResults] = useState({
        "Vmax": "",
        "Vmin": "",
        "Mmax": "",
        "Mmin": ""
    });

    const [formType1, setFormType1] = useState({
        "xp": "0",
        "fy": "0",
        "xm": "0",
        "m": "0",
        "xStartUDL": "0",
        "xEndUDL": "0",
        "fyUDL": "0",
        "xStartLDL": "0",
        "xEndLDL": "0",
        "fy_StartLDL": "0",
        "fy_EndLDL": "0",
        "beamId": createBeamId,
    });

    const [formType2, setFormType2] = useState({
        "xp": "0",
        "fy": "0",
        "xm": "0",
        "m": "0",
        "xStartUDL": "0",
        "xEndUDL": "0",
        "fyUDL": "0",
        "xStartLDL": "0",
        "xEndLDL": "0",
        "fy_StartLDL": "0",
        "fy_EndLDL": "0",
        "beamId": createBeamId,
    });

    const [formType3, setFormType3] = useState({
        "xp": "0",
        "fy": "0",
        "xm": "0",
        "m": "0",
        "xStartUDL": "0",
        "xEndUDL": "0",
        "fyUDL": "0",
        "xStartLDL": "0",
        "xEndLDL": "0",
        "fy_StartLDL": "0",
        "fy_EndLDL": "0",
        "beamId": createBeamId,
    });

    // console.log("formType1", formType1);
    // console.log("formType2", formType2);
    // console.log("formType3", formType3);

    const [showResultButton, setShowResultButton] = useState(false);
    const [showBeamValues, setShowBeamValues] = useState(false);
    const [showLoadsValues, setShowLoadsValues] = useState(false);
    let buttonBeamText = showBeamValues ? "Palkki ja tuet OFF" : "Palkki ja tuet ON";
    let buttonLoadsText = showLoadsValues ? "Kuormat OFF" : "Kuormat ON";

    // Haetaan Backendistä API
    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.FORCETYPE).fetchAll()
            .then(res => {
                let forceTypeList = res.data.map(item => ({
                    id: item.forceTypeId,
                    title: item.forceTypeName
                }));
                forceTypeList = [{ id: 0, title: 'Select' }].concat(forceTypeList);
                setForceTypeList(forceTypeList);
            })
            .catch(err => console.log(err))
    }, [])

    // Kopioidaan formData-objekti. Luodaan tyhjä formData-objekti "target"
    function bestCopyEver(src) {
        return Object.assign({}, src);
    }

    const target = bestCopyEver(formData);
    console.log("target 1", target)
    useEffect(() => {
        if (formData.span !== "0" && formData.B !== "0" &&
            ((formData.fy1 !== "0" && formData.fy1 !== "-" && formData.fy1 !== "+" && formData.fy1.length !== 0) ||
                (formData.m1 !== "0" && formData.m1 !== "-" && formData.m1 !== "+" && formData.m1.length !== 0) ||
                (formData.xEndUDL1 !== "0" && formData.fyUDL1 !== "0" && formData.fyUDL1 !== "-" && formData.fyUDL1 !== "+" && formData.fyUDL1.length !== 0) ||
                (formData.xEndLDL1 !== "0" &&
                    ((formData.fy_StartLDL1 !== "0" || formData.fy_EndLDL1 !== "0") && (formData.fy_StartLDL1 !== "-" && formData.fy_StartLDL1 !== "+" && formData.fy_StartLDL1.length !== 0) &&
                        (formData.fy_EndLDL1 !== "-" && formData.fy_EndLDL1 !== "+" && formData.fy_EndLDL1.length !== 0))))) {
            setShowResultButton(true);
        }
        else {
            setShowResultButton(false);
        }
    }, [formData]);

    delete target.type;
    Object.keys(target).map(k => target[k] == "0" ? delete target[k] : target[k]);
    Object.keys(target).map(k => target[k] == true ? delete target[k] : target[k]);
    Object.keys(target).map(k => target[k] == false ? delete target[k] : target[k]);

    const [maxV, setMaxV] = useState();
    const [minV, setMinV] = useState();
    const [maxM, setMaxM] = useState();
    const [minM, setMinM] = useState();

    const handleForceChange = (newForce) => {
        setResults({ ...results, Vmax: newForce[0], Vmin: newForce[1], Mmax: newForce[2], Mmin: newForce[3] });
    }

    const onShowBeamForm = () => {
        setShowBeamValues(!showBeamValues);
    }

    const onShowLoadsForm = () => {
        setShowLoadsValues(!showLoadsValues);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
        setForceType(forceTypeList[value].title);
        console.log("handleInputChange e.target", e.target);
        console.log("forceTypeList[value].title", forceTypeList[value].title);
    }

    const onCreateBeam = () => {
        console.log("formData", formData)
        const postData = {
            "beamName": formData.name,
            "beamDefinition": formData.definition,
            "span": formData.span,
            "A": formData.A,
            "B": formData.B,
            "vmax": results.Vmax,
            "vmin": results.Vmin,
            "mmax": results.Mmax,
            "mmin": results.Mmin
        }
        // axios.post(url, postData,)
        createAPIEndpoint(ENDPOINTS.BEAM).create(postData)
            .then((response) => {
                console.log("response.data.beamId", response.data.beamId);
                // haetaan luodun palkin id
                setCreateBeamId(response.data.beamId)
            });
    }

    useEffect(() => {
        if (createBeamId !== null && (formType1.fy !== "0" || formType1.m !== "0" || formType1.fyUDL !== "0" || formType1.fy_StartLDL !== "0" || formType1.fy_EndLDL !== "0")) {
            console.log("createBeamId useEffect", createBeamId)
            const postType1 = {
                "xp": formType1.xp,
                "fy": formType1.fy,
                "xm": formType1.xm,
                "m": formType1.m,
                "xStartUDL": formType1.xStartUDL,
                "xEndUDL": formType1.xEndUDL,
                "fyUDL": formType1.fyUDL,
                "xStartLDL": formType1.xStartLDL,
                "xEndLDL": formType1.xEndLDL,
                "fy_StartLDL": formType1.fy_StartLDL,
                "fy_EndLDL": formType1.fy_EndLDL,
                "beamId": createBeamId

            }
            createAPIEndpoint(ENDPOINTS.TYPE).create(postType1)
                .then((response) => {
                    console.log("response formType1", response);
                    //setUpdateResult(true);
                });
        }

        if (createBeamId !== null && (formType2.fy !== "0" || formType2.m !== "0" || formType2.fyUDL !== "0" || formType2.fy_StartLDL !== "0" || formType2.fy_EndLDL !== "0")) {
            console.log("createBeamId useEffect", createBeamId)
            const postType2 = {
                "xp": formType2.xp,
                "fy": formType2.fy,
                "xm": formType2.xm,
                "m": formType2.m,
                "xStartUDL": formType2.xStartUDL,
                "xEndUDL": formType2.xEndUDL,
                "fyUDL": formType2.fyUDL,
                "xStartLDL": formType2.xStartLDL,
                "xEndLDL": formType2.xEndLDL,
                "fy_StartLDL": formType2.fy_StartLDL,
                "fy_EndLDL": formType2.fy_EndLDL,
                "beamId": createBeamId

            }
            createAPIEndpoint(ENDPOINTS.TYPE).create(postType2)
                .then((response) => {
                    console.log("response formType1", response);
                    // setUpdateResult(true);
                });
        }

        if (createBeamId !== null && (formType3.fy !== "0" || formType3.m !== "0" || formType3.fyUDL !== "0" || formType3.fy_StartLDL !== "0" || formType3.fy_EndLDL !== "0")) {
            console.log("createBeamId useEffect", createBeamId)
            const postType3 = {
                "xp": formType3.xp,
                "fy": formType3.fy,
                "xm": formType3.xm,
                "m": formType3.m,
                "xStartUDL": formType3.xStartUDL,
                "xEndUDL": formType3.xEndUDL,
                "fyUDL": formType3.fyUDL,
                "xStartLDL": formType3.xStartLDL,
                "xEndLDL": formType3.xEndLDL,
                "fy_StartLDL": formType3.fy_StartLDL,
                "fy_EndLDL": formType3.fy_EndLDL,
                "beamId": createBeamId

            }
            createAPIEndpoint(ENDPOINTS.TYPE).create(postType3)
                .then((response) => {
                    console.log("response formType1", response);
                    // setUpdateResult(true);
                });
        }

        setUpdateResult(true);

    }, [createBeamId])


    return (
        <>
            <Grid container spacing={2} >
                <Grid item xs={12}>
                    <Item>
                        <Stack spacing={2} direction="row" justifyContent="center">
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setFormData({
                                        ...formData,
                                        name: "",
                                        definition: "",
                                        span: "0",
                                        A: "0",
                                        B: "0",
                                        xp1: "0",
                                        fy1: "0",
                                        xp2: "",
                                        fy2: "",
                                        xp3: "",
                                        fy3: "",
                                        xm1: "0",
                                        m1: "0",
                                        xm2: "",
                                        m2: "",
                                        xm3: "",
                                        m3: "",
                                        xStartUDL1: "0",
                                        xEndUDL1: "0",
                                        fyUDL1: "0",
                                        xStartUDL2: "",
                                        xEndUDL2: "",
                                        fyUDL2: "",
                                        xStartUDL3: "",
                                        xEndUDL3: "",
                                        fyUDL3: "",
                                        xStartLDL1: "0",
                                        xEndLDL1: "0",
                                        fy_StartLDL1: "0",
                                        fy_EndLDL1: "0",
                                        xStartLDL2: "",
                                        xEndLDL2: "",
                                        fy_StartLDL2: "",
                                        fy_EndLDL2: "",
                                        xStartLDL3: "",
                                        xEndLDL3: "",
                                        fy_StartLDL3: "",
                                        fy_EndLDL3: "",
                                        check: false
                                    });
                                    setFormType1({
                                        ...formType1,
                                        "xp": "0",
                                        "fy": "0",
                                        "xm": "0",
                                        "m": "0",
                                        "xStartUDL": "0",
                                        "xEndUDL": "0",
                                        "fyUDL": "0",
                                        "xStartLDL": "0",
                                        "xEndLDL": "0",
                                        "fy_StartLDL": "0",
                                        "fy_EndLDL": "0",
                                        "beamId": null,
                                    })
                                    setFormType2({
                                        ...formType2,
                                        "xp": "0",
                                        "fy": "0",
                                        "xm": "0",
                                        "m": "0",
                                        "xStartUDL": "0",
                                        "xEndUDL": "0",
                                        "fyUDL": "0",
                                        "xStartLDL": "0",
                                        "xEndLDL": "0",
                                        "fy_StartLDL": "0",
                                        "fy_EndLDL": "0",
                                        "beamId": null,
                                    })
                                    setFormType3({
                                        ...formType3,
                                        "xp": "0",
                                        "fy": "0",
                                        "xm": "0",
                                        "m": "0",
                                        "xStartUDL": "0",
                                        "xEndUDL": "0",
                                        "fyUDL": "0",
                                        "xStartLDL": "0",
                                        "xEndLDL": "0",
                                        "fy_StartLDL": "0",
                                        "fy_EndLDL": "0",
                                        "beamId": null,
                                    })
                                }}
                            >Tyhjennä lähtötiedot
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={onCreateBeam}
                            >Tallenna tulos
                            </Button>
                        </Stack>
                    </Item>
                </Grid>

                <Grid item xs={5}>
                    <Item>
                        <h3>Syötä palkin pituus ja tuet</h3>
                        <Button
                            variant="outlined"
                            onClick={onShowBeamForm}
                        >{buttonBeamText}
                        </Button>
                    </Item>
                </Grid>
                <Grid item xs={5}>
                    <Item>xs=5</Item>
                </Grid>
                <Grid item xs={2}>
                    <Item>xs=2</Item>
                </Grid>
            </Grid>
        </>
    )

}

export default BeamUI
