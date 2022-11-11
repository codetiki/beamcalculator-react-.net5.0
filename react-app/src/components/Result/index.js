import React, { useState, useEffect } from 'react'
import Calculator from './Calculator';
import ResultList from './ResultList';
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

export default function Result(props) {
    const { values,
        setValues,
        results,
        setResults
    } = props;

    console.log("values MaxResultForm", values);

    const [updateResult, setUpdateResult] = useState(false);


    const forceChange = (newForce) => {
        console.log("newForce", newForce)
        setResults({ ...results, Vmax: newForce[0], Vmin: newForce[1], Mmax: newForce[2], Mmin: newForce[3] });
    }

    return (
        <>
            <Grid container spacing={2}
                direction="row"
            >
                <Grid item xs={3}>
                    <Item>
                        <Stack >
                            <h4>Max/Min tulokset</h4>
                            <hr />
                            {
                                values.span !== "" ?
                                    Object.keys(results).map(key => {
                                        return (
                                            <div key={key}>
                                                <p>
                                                    {key}: {results[key]}
                                                </p>

                                            </div>
                                        );
                                    })
                                    :
                                    <p>Ei laskettuja tuloksia</p>
                            }
                        </Stack>
                    </Item>
                </Grid>
                <Grid item xs={8}>
                    <Item>
                        <Stack >
                            <Calculator
                                {...{
                                    values,
                                    setValues,
                                    forceChange,

                                }}
                            />
                        </Stack>
                    </Item>
                </Grid>
            </Grid>
            <ResultList
                {...{
                    values,
                    setValues,
                    updateResult,
                    setUpdateResult,
                    results,
                    setResults
                }}
            />
        </>
    )
}


