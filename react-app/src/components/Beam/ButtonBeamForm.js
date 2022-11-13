import React from 'react';
import { Grid, Paper, Button as MuiButton } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Button } from '../../control';

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
    } = props;

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
                                    span: "",
                                    a: "",
                                    b: "",
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
                                    check: false
                                });
                                setResults({
                                    ...results,
                                    "Vmax": null,
                                    "Vmin": null,
                                    "Mmax": null,
                                    "Mmin": null
                                })
                            }}
                        >Tyhjennä lähtötiedot
                        </Button>
                    </Stack>
                </Item>
            </Grid>

        </>
    )
}
