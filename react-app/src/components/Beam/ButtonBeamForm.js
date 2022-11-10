import React, { useState, useEffect } from 'react';
import { createAPIEndpoint, ENDPOINTS } from "../../api/Index";
import { Grid, Paper, TextField, makeStyles, ButtonGroup, Button as MuiButton } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Input, Select, Button } from '../../control';
import Notification from '../../layouts/Notifications';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function ButtonBeamForm(props) {
    const {
        values,
        setValues,
        results,
        setResults,
        errors,
        setErrors,
        handleInputChange,
        resetFormControls
    } = props;

    const [notify, setNotify] = useState({ isOpen: false });
    const [createBeamId, setCreateBeamId] = useState(null); // luodun palkin Id
    const [updateResult, setUpdateResult] = useState(false);

    const onCreateBeam = e => {
        e.preventDefault();
        // Uuden palkin (beam) luonti tietokantaan Beams-tauluun
        if (values.beamId == 0) {
            const postData = {
                "beamName": values.beamName,
                "beamDefinition": values.beamDefinition,
                "span": values.span,
                "a": values.a,
                "b": values.b,
                "vmax": results.Vmax,
                "vmin": results.Vmin,
                "mmax": results.Mmax,
                "mmin": results.Mmin
            }
            createAPIEndpoint(ENDPOINTS.BEAM).create(postData)
                .then(response => {
                    console.log("response beam", response);
                    // otetaan luotu beamId talteen createBeamId-stateen
                    setCreateBeamId(response.data.beamId);
                    setNotify({ isOpen: true, message: 'Uusi palkki (beam) on luotu.' });
                })
                .catch(err => console.log(err));
        }
    }

    useEffect(() => {
        if (createBeamId !== null && (values.fy1 !== 0 || values.m1 !== 0 || values.fyUDL1 !== 0 || values.fy_StartLDL1 !== 0 || values.fy_EndLDL1 !== 0)) {
            console.log("createBeamId useEffect", createBeamId)
            const postType1 = {
                "xp": values.xp1,
                "fy": values.fy1,
                "xm": values.xm1,
                "m": values.m1,
                "xStartUDL": values.xStartUDL1,
                "xEndUDL": values.xEndUDL1,
                "fyUDL": values.fyUDL1,
                "xStartLDL": values.xStartLDL1,
                "xEndLDL": values.xEndLDL1,
                "fy_StartLDL": values.fy_StartLDL1,
                "fy_EndLDL": values.fy_EndLDL1,
                "beamId": createBeamId
            }
            createAPIEndpoint(ENDPOINTS.TYPE).create(postType1)
                .then((response) => {
                    console.log("response formType1", response);
                    setNotify({ isOpen: true, message: 'Uusi palkki (beam) ja kuormitukset (type) on luotu.' });
                });
        }

        if (createBeamId !== null && (values.fy2 !== 0 || values.m2 !== 0 || values.fyUDL2 !== 0 || values.fy_StartLDL2 !== 0 || values.fy_EndLDL2 !== 0)) {
            console.log("createBeamId useEffect", createBeamId)
            const postType2 = {
                "xp": values.xp2,
                "fy": values.fy2,
                "xm": values.xm2,
                "m": values.m2,
                "xStartUDL": values.xStartUDL2,
                "xEndUDL": values.xEndUDL2,
                "fyUDL": values.fyUDL2,
                "xStartLDL": values.xStartLDL2,
                "xEndLDL": values.xEndLDL2,
                "fy_StartLDL": values.fy_StartLDL2,
                "fy_EndLDL": values.fy_EndLDL2,
                "beamId": createBeamId
            }
            createAPIEndpoint(ENDPOINTS.TYPE).create(postType2)
                .then((response) => {
                    console.log("response formType1", response);
                    setNotify({ isOpen: true, message: 'Uusi palkki (beam) ja kuormitukset (type) on luotu.' });
                });
        }

        if (createBeamId !== null && (values.fy3 !== 0 || values.m3 !== 0 || values.fyUDL3 !== 0 || values.fy_StartLDL3 !== 0 || values.fy_EndLDL3 !== 0)) {
            console.log("createBeamId useEffect", createBeamId)
            const postType3 = {
                "xp": values.xp3,
                "fy": values.fy3,
                "xm": values.xm3,
                "m": values.m3,
                "xStartUDL": values.xStartUDL3,
                "xEndUDL": values.xEndUDL3,
                "fyUDL": values.fyUDL3,
                "xStartLDL": values.xStartLDL3,
                "xEndLDL": values.xEndLDL3,
                "fy_StartLDL": values.fy_StartLDL3,
                "fy_EndLDL": values.fy_EndLDL3,
                "beamId": createBeamId
            }
            createAPIEndpoint(ENDPOINTS.TYPE).create(postType3)
                .then((response) => {
                    console.log("response formType1", response);
                    setNotify({ isOpen: true, message: 'Uusi palkki (beam) ja kuormitukset (type) on luotu.' });
                });
        }

        setUpdateResult(true);

    }, [createBeamId])


    return (
        <>
            <Grid item xs={12}>
                <Item>
                    <Stack spacing={2} direction="row" justifyContent="center">
                        {/* tyhjennetään kaikki lähtöarvot */}
                        <Button
                            variant="contained"
                            onClick={() => {
                                setValues({
                                    ...values,
                                    beamName: "",
                                    beamDefinition: "",
                                    span: 0,
                                    a: 0,
                                    b: 0,
                                    vmax: 0,
                                    vmin: 0,
                                    mmax: 0,
                                    mmin: 0,
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
                                    xp2: 0,
                                    fy2: 0,
                                    xm2: 0,
                                    m2: 0,
                                    xStartUDL2: 0,
                                    xEndUDL2: 0,
                                    fyUDL2: 0,
                                    xStartLDL2: 0,
                                    xEndLDL2: 0,
                                    fy_StartLDL2: 0,
                                    fy_EndLDL2: 0,
                                    xp3: 0,
                                    fy3: 0,
                                    xm3: 0,
                                    m3: 0,
                                    xStartUDL3: 0,
                                    xEndUDL3: 0,
                                    fyUDL3: 0,
                                    xStartLDL3: 0,
                                    xEndLDL3: 0,
                                    fy_StartLDL3: 0,
                                    fy_EndLDL3: 0,
                                    forceTypeId: null,
                                });
                            }}
                        >Tyhjennä lähtötiedot
                        </Button>
                        {/* palkin tallennus tietokantaan */}
                        <Button
                            variant="contained"
                            onClick={onCreateBeam}
                        >Tallenna tulos
                        </Button>
                    </Stack>
                </Item>
            </Grid>
            <Notification
                {...{ notify, setNotify }} />
        </>
    )
}
