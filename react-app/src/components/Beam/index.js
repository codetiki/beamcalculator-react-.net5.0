import React from 'react';
import { Grid } from '@material-ui/core';
import BeamForm from './BeamForm';
import TypeForm from './TypeForm';
import ButtonBeamForm from './ButtonBeamForm';
import SelectedValuesForm from './SelectedValuesForm';


export default function Beam(props) {

    const {
        values,
        setValues,
        createBeamId,
        setCreateBeamId,
        results,
        setResults,
        resetFormControls
    } = props;

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    return (
        <>
            <Grid container spacing={2}
                direction="row"
            >
                <Grid item xs={12}>
                    <ButtonBeamForm
                        {...{
                            createBeamId,
                            setCreateBeamId,
                            values,
                            setValues,
                            results,
                            setResults,
                            resetFormControls,
                            handleInputChange,
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <BeamForm
                        {...{
                            values,
                            setValues,
                            handleInputChange,
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TypeForm
                        {...{
                            values,
                            setValues,
                            handleInputChange,
                        }}
                    />
                </Grid>
                <Grid item xs={2}>
                    <SelectedValuesForm
                        {...{
                            values
                        }}
                    />
                </Grid>
            </Grid>
        </>
    )
}

