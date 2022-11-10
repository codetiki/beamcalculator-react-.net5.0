import React from 'react';
import { Grid, Paper, Button as MuiButton } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Form from '../../layouts/Form';
import { Input } from '../../control';

// import images from local
import img0 from '../../images/supportsWithBeam.png';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function BeamForm(props) {

    const {
        values,
        setValues,
        handleInputChange,
    } = props;

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
