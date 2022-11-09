import React from 'react';
import { useForm } from '../../hook/useForm';
import BeamForm from './BeamForm';
import { Grid } from '@material-ui/core';
import TypeForm from './TypeForm';
import ButtonForm from './ButtonForm';
import SelectedValuesForm from './SelectedValuesForm';

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



export default function Beam() {

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
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetFormControls
    } = useForm(getFreshModelObject);

    return (
        <>
            <Grid container spacing={2}
                direction="row"
            >
                <Grid item xs={12}>
                    <ButtonForm
                        {...{
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
                            values,
                            setValues,
                            errors,
                            setErrors,
                            handleInputChange,
                            resetFormControls
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <BeamForm
                        {...{
                            createBeamId,
                            setCreateBeamId,
                            formType1,
                            setFormType1,
                            formType2,
                            setFormType2,
                            formType3,
                            setFormType3,
                            values,
                            setValues,
                            errors,
                            setErrors,
                            handleInputChange,
                            resetFormControls
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TypeForm
                        {...{
                            values,
                            setValues,
                            errors,
                            setErrors,
                            handleInputChange,
                            resetFormControls
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
                {/* <Grid item xl={12}>xs=5</Grid>
                <Grid item xl={12}>xs=5</Grid> */}
            </Grid>
        </>
    )
}

