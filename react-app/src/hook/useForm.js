import React, { useState } from 'react'

export function useForm(getFreshModelObject) {

    const [values, setValues] = useState(getFreshModelObject());
    const [errors, setErrors] = useState({});
    const [createBeamId, setCreateBeamId] = useState(null);

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


    const handleInputChange = e => {
        console.log("e handleInputChange", e.target);
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        console.log("values handleInputChange", values);
    }

    // Tallennetaan valittu kuormatyyppi (forceType) forceType-statemuutttujaan
    // const handleInputChangeForceType = (e) => {
    //     const { name, value } = e.target;
    //     setForceType(forceTypes[value].title);
    //     console.log("handleInputChange e.target", e.target);
    //     console.log("forceTypes[value].title", forceTypes[value].title);
    // }

    const resetFormControls = () => {
        setValues(getFreshModelObject());

        setErrors({});
    }

    return {
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
    }
}