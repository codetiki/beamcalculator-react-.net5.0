import React, { useState } from 'react';
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

export default function ButtonForm(props) {
    const {
        formData,
        setFormData,
        createBeamId,
        setCreateBeamId,
        formType1,
        setFormType1,
        formType2,
        setFormType2,
        formType3,
        setFormType3,
        forceTypes,
        setForceTypes,
        forceType,
        setForceType,
        handleInputChangeForceType,
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetFormControls
    } = props;

    const [notify, setNotify] = useState({ isOpen: false })

    const onCreateBeam = e => {
        e.preventDefault();
        // Uuden palkin (beam) luonti tietokantaan Beams-tauluun
        if (values.beamId == 0) {
            createAPIEndpoint(ENDPOINTS.BEAM).create(values)
                .then(response => {
                    console.log("response beam", response);
                    console.log("response.data.beamId", response.data.beamId);
                    resetFormControls();
                    // otetaan luotu beamId talteen createBeamId-stateen
                    setCreateBeamId(response.data.beamId);
                    setNotify({ isOpen: true, message: 'New beam is created.' });
                })
                .catch(err => console.log(err));
        }
    }


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
