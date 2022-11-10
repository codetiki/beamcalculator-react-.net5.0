import React from 'react';
import { Grid, Paper, TextField, makeStyles, ButtonGroup, Button as MuiButton } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function SelectedValuesForm(props) {
    const { values } = props;

    console.log("values SelectedValuesForm", values);

    // Kopioidaan formData-objekti. Luodaan tyhjä values-objekti "target"
    function bestCopyEver(src) {
        return Object.assign({}, src);
    }

    const target = bestCopyEver(values);
    console.log("target 1", target);

    delete target.forceTypeId;
    delete target.check;
    Object.keys(target).map(k => target[k] == "0" ? delete target[k] : target[k]);
    Object.keys(target).map(k => target[k] == 0 ? delete target[k] : target[k]);
    // Object.keys(target).map(k => target[k] == true ? delete target[k] : target[k]);
    // Object.keys(target).map(k => target[k] == false ? delete target[k] : target[k]);
    Object.keys(target).map(k => target[k] == null ? delete target[k] : target[k]);

    return (
        <>
            <Grid xs={12}>
                <Item>
                    <Stack spacing={2} direction="column" justifyContent="center">
                        <h4>Syötetyt lähtötiedot</h4>
                        <hr />
                        {
                            Object.keys(target).length !== 0 ?
                                Object.keys(target).map(key => {
                                    return (
                                        <div key={key}>
                                            <p>
                                                {key}: {target[key]}
                                            </p>

                                        </div>
                                    );
                                })
                                :
                                <p>Ei annettuja alkuarvoja</p>
                        }
                    </Stack>
                </Item>
            </Grid>
        </>
    )
}
