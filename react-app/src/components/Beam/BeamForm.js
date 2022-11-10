import React, { useState, useEffect } from 'react';
import { createAPIEndpoint, ENDPOINTS } from "../../api/Index";
import { Grid, Paper, TextField, makeStyles, ButtonGroup, Button as MuiButton } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Form from '../../layouts/Form';
import { Input, Select, Button } from '../../control';


// import images from local
import img0 from '../../images/supportsWithBeam.png';
import img1 from '../../images/pointloadWithSupportsWithBeam.png';
import img2 from '../../images/momentloadWithSupports.png';
import img3 from '../../images/distributedLoadWithSupport.png';
import img4 from '../../images/linearLoadWithSupport.png';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const useStyles = makeStyles(theme => ({
    adornmentText: {
        '& .MuiTypography-root': {
            color: '#f3b33d',
            fontWeight: 'bolder',
            fontSize: '1.5em'
        }
    },
    submitButtonGroup: {
        backgroundColor: '#f3b33d',
        color: '#000',
        margin: theme.spacing(1),
        '& .MuiButton-label': {
            textTransform: 'none'
        },
        '&:hover': {
            backgroundColor: '#f3b33d',
        }
    }
}))



export default function BeamForm(props) {

    const {
        createBeamId,
        setCreateBeamId,
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetFormControls
    } = props;
    const classes = useStyles()

    // const [values, setValues] = useState(getFreshModelObject()); // tallennetaan palkin (Beam) arvot

    // const [forceType, setForceType] = useState(""); // Valittu kuormatyyppi (forceType) 





    return (
        <>
            <Form>

                <Grid xs={12}>
                    <Item>
                        <Stack spacing={2} direction="column" justifyContent="center">
                            <h4>Syötä palkin pituus ja tukien sijainti</h4>
                            <hr />
                            <Input
                                label="Beam Name"
                                name="beamName"
                                value={values.beamName}
                                onChange={handleInputChange}
                            // onChange={(e) => { setValues({ ...values, beamName: e.target.value }) }}
                            />
                            <Input
                                label="Beam Definition"
                                name="beamDefinition"
                                value={values.beamDefinition}
                                onChange={handleInputChange}
                            />

                            <img src={img0} alt="PointLoad" height={235} width={550} />
                            <Input
                                label="Span"
                                name="span"
                                value={values.span}
                                onChange={handleInputChange}
                            />
                            <Input
                                label="Location of Left Support"
                                name="a"
                                value={values.a}
                                onChange={handleInputChange}
                            />
                            <Input
                                label="Location of Left Support"
                                name="b"
                                value={values.b}
                                onChange={handleInputChange}
                            />

                        </Stack>
                    </Item>
                </Grid>

            </Form>



        </>
    )
}
