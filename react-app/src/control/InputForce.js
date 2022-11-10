import React from 'react'
import { TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    textField: {
        width: 120
    }
}))

export default function InputForce(props) {

    const { name, label, value, variant, onChange, error = null, ...other } = props;
    const classes = useStyles()

    return (
        <TextField
            className={classes.textField}
            variant={variant || "outlined"}
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            {...other}
            {...(error && { error: true, helperText: error })}
        />
    )
}