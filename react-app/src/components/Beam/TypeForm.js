import React, { useState, useEffect } from 'react';
import { createAPIEndpoint, ENDPOINTS } from "../../api/Index";
import { Grid, Paper, TextField, makeStyles, ButtonGroup, Button as MuiButton } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Form from '../../layouts/Form';
import { Input, Select, Button } from '../../control';
import InputForce from '../../control/InputForce';


// import images from local
import img0 from '../../images/emptyImage.png';
import img1 from '../../images/pointloadWithSupportsWithBeam.png';
import img2 from '../../images/momentloadWithSupports.png';
import img3 from '../../images/distributedLoadWithSupport.png';
import img4 from '../../images/linearLoadWithSupport.png';
import { getBottomNavigationActionUtilityClass } from '@mui/material';



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
    },
    textField: {
        width: 350
    }
}))



export default function TypeForm(props) {

    const { values, setValues, errors, setErrors,
        handleInputChange, resetFormControls } = props;
    const classes = useStyles()

    const [forceType, setForceType] = useState(0); // Valittu kuormatyyppi (forceType) 
    const [forceTypeList, setForceTypeList] = useState([]); // Kaikki kuormtyypit (forceTypes) 
    const [pointLoadCount, setPointLoadCount] = useState(1); // pistekuorman (PL) järjestysnumero
    const [pointMomentCount, setPointMomentCount] = useState(1); // pistemomentin (PM) järjestysnumero
    const [distributedLoadCount, setDistributedLoadCount] = useState(1); // tasaisen viiivakuorman (UDL) järjestysnumero
    const [linearLoadCount, setLinearLoadCount] = useState(1); // lineaarisen viivakuorman (LDL) järjestysnumero

    // Tarvitaan kuormitusten syötön parametrisoinnissa
    // let xpValue = 'xp' + forceType;
    // let fyValue = 'fy' + forceType;

    // Haetaan ForceType:t Backendistä
    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.FORCETYPE).fetchAll()
            .then(res => {
                let forceTypeList = res.data.map(item => ({
                    id: item.forceTypeId,
                    title: item.forceTypeName
                }));
                forceTypeList = [{ id: 0, title: 'Select' }].concat(forceTypeList);
                setForceTypeList(forceTypeList);
            })
            .catch(err => console.log(err))
    }, [])

    // kun valitaan (select) uusi kuormatyyppi (forceType), tässä se uusi arvo sijoitetaan forceType-stateen 
    useEffect(() => {
        if (values.forceTypeId != null) {
            setForceType(values.forceTypeId);
        }
    }, [values])

    console.log('value' + values.forceTypeId + 'arvo');


    return (
        <>
            <Grid item xs={12}>
                <Item>
                    <Stack spacing={2} direction="column" justifyContent="center">
                        <h4>Syötä kuormitukset</h4>
                        <hr />
                        <Select
                            label="ForceType"
                            name="forceTypeId"
                            value={values.forceTypeId ? values.forceTypeId : " "}
                            onChange={handleInputChange}
                            options={forceTypeList}
                        />
                        <div >
                            {
                                forceType === 0 ?
                                    <img src={img0} alt="Empty" height={235} width={550} />
                                    :
                                    forceType === 1 ?
                                        <img src={img1} alt="PointLoad" height={235} width={550} />
                                        :
                                        forceType === 2 ?
                                            <img src={img2} alt="MomentLoad" height={235} width={550} />
                                            :
                                            forceType === 3 ?
                                                <img src={img3} alt="DistributedLoad" height={235} width={550} />
                                                :
                                                forceType === 4 ?
                                                    <img src={img4} alt="LinearLoad" height={235} width={550} />
                                                    :
                                                    null
                            }
                        </div>
                        {/* {
                            forceType === 1 ? pointLoadCount === 
                                <div>

                                    <label ><b>{values.forceTypeId}. PointLoad (PL)</b></label>
                                    <Input
                                        label="Xp"
                                        name={'xp' + forceType}
                                        value={values.xpValue}
                                        onChange={handleInputChange}
                                    />
                                    <Input
                                        label="Fy"
                                        name={'fy' + forceType}
                                        value={values.fyValue}
                                        onChange={handleInputChange}
                                    />
                                    <label ><b>Add {values.forceTypeId + 1}. PointLoad (PL):</b></label>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            setPointLoadCount(values.forceTypeId + 1);
                                            values['xp' + (forceType + 1)] = "";
                                            values['fy' + (forceType + 1)] = "";
                                        }}
                                    >+
                                    </Button>
                                </div>
                                :
                                null
                        } */}
                        {

                            forceType === 1 && pointLoadCount == 1 ?
                                <div >
                                    <label ><b>1. PointLoad (PL)</b></label>
                                    <InputForce
                                        label="Xp"
                                        name="xp1"
                                        value={values.xp1}
                                        onChange={handleInputChange}
                                    />
                                    <InputForce
                                        label="Fy"
                                        name="fy1"
                                        value={values.fy1}
                                        onChange={handleInputChange}
                                    />
                                    <label ><b>Add 2. PointLoad (PL):</b></label>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            setPointLoadCount(2);
                                            values["xp2"] = "";
                                            values["fy2"] = "";
                                        }}
                                    >+
                                    </Button>
                                </div>
                                :
                                null
                        }
                        {
                            forceType === 1 && pointLoadCount == 2 ?
                                <div >
                                    <label ><b>2. PointLoad (PL)</b></label>
                                    <InputForce
                                        label="Xp"
                                        name="xp2"
                                        value={values.xp2}
                                        onChange={handleInputChange}
                                    />
                                    <InputForce
                                        label="Fy"
                                        name="fy2"
                                        value={values.fy2}
                                        onChange={handleInputChange}
                                    />
                                    <label ><b>Add 3. PointLoad (PL):</b></label>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            setPointLoadCount(3);
                                            values["xp3"] = "";
                                            values["fy3"] = "";
                                        }}
                                    >+
                                    </Button>
                                </div>
                                :
                                null
                        }
                        {
                            forceType === 1 && pointLoadCount == 3 ?
                                <div >
                                    <label ><b>3. PointLoad (PL)</b></label>
                                    <InputForce
                                        label="Xp"
                                        name="xp3"
                                        value={values.xp3}
                                        onChange={handleInputChange}
                                    />
                                    <InputForce
                                        label="Fy"
                                        name="fy3"
                                        value={values.fy3}
                                        onChange={handleInputChange}
                                    />
                                    <label ><b>Back 1. PointLoad (PL):</b></label>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            setPointLoadCount(1);
                                        }}
                                    >-
                                    </Button>
                                </div>
                                :
                                null
                        }
                        {
                            forceType === 2 && pointMomentCount == 1 ?
                                <div>
                                    <label ><b>MomentLoad 1 (PM)</b></label>
                                    <InputForce
                                        label="Xm"
                                        name="xm1"
                                        value={values.xm1}
                                        onChange={handleInputChange}
                                    />
                                    <InputForce
                                        label="M"
                                        name="m1"
                                        value={values.m1}
                                        onChange={handleInputChange}
                                    />
                                    <label ><b>Add 2. PointMoment (PM):</b></label>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            setPointMomentCount(2);
                                            values["xm2"] = "";
                                            values["m2"] = "";
                                        }}
                                    >+
                                    </Button>
                                </div>
                                :
                                null
                        }
                        {
                            forceType === 2 && pointMomentCount == 2 ?
                                <div>
                                    <label ><b>MomentLoad 2 (PM)</b></label>
                                    <InputForce
                                        label="Xm"
                                        name="xm2"
                                        value={values.xm2}
                                        onChange={handleInputChange}
                                    />
                                    <InputForce
                                        label="M"
                                        name="m2"
                                        value={values.m2}
                                        onChange={handleInputChange}
                                    />
                                    <label ><b>Add 3 PointMoment (PM):</b></label>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            setPointMomentCount(3);
                                            values["xm3"] = "";
                                            values["m3"] = "";
                                        }}
                                    >+
                                    </Button>
                                </div>
                                :
                                null
                        }
                        {
                            forceType === 2 && pointMomentCount == 3 ?
                                <div>
                                    <label ><b>MomentLoad 3 (PM)</b></label>
                                    <InputForce
                                        label="Xm"
                                        name="xm3"
                                        value={values.xm3}
                                        onChange={handleInputChange}
                                    />
                                    <InputForce
                                        label="M"
                                        name="m3"
                                        value={values.m3}
                                        onChange={handleInputChange}
                                    />
                                    <label ><b>Back 1. PointMoment (PM):</b></label>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            setPointMomentCount(1);
                                        }}
                                    >-
                                    </Button>
                                </div>
                                :
                                null
                        }

                        {
                            forceType === 3 && distributedLoadCount == 1 ?
                                <div>
                                    <label><b>1. DistributedLoad (UDL)</b></label>
                                    <InputForce
                                        label="XStartUDL"
                                        name="xStartUDL1"
                                        value={values.xStartUDL1}
                                        onChange={handleInputChange}
                                    />
                                    <InputForce
                                        label="XEndUDL"
                                        name="xEndUDL1"
                                        value={values.xEndUDL1}
                                        onChange={handleInputChange}
                                    />
                                    <InputForce
                                        label="fyUDL"
                                        name="fyUDL1"
                                        value={values.fyUDL1}
                                        onChange={handleInputChange}
                                    />
                                    <label ><b>Add 2. DistributedLoad (UDL):</b></label>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            setDistributedLoadCount(2);
                                            values["xStartUDL2"] = "";
                                            values["xEndUDL2"] = "";
                                            values["fyUDL2"] = "";
                                        }}
                                    >+
                                    </Button>
                                </div>
                                :
                                null
                        }
                        {
                            forceType === 3 && distributedLoadCount == 2 ?
                                <div>
                                    <label><b>2. DistributedLoad (UDL)</b></label>
                                    <InputForce
                                        label="XStartUDL"
                                        name="xStartUDL2"
                                        value={values.xStartUDL2}
                                        onChange={handleInputChange}
                                    />
                                    <InputForce
                                        label="XEndUDL"
                                        name="xEndUDL2"
                                        value={values.xEndUDL2}
                                        onChange={handleInputChange}
                                    />
                                    <InputForce
                                        label="fyUDL"
                                        name="fyUDL2"
                                        value={values.fyUDL2}
                                        onChange={handleInputChange}
                                    />
                                    <label ><b>Add 3. DistributedLoad (UDL):</b></label>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            setDistributedLoadCount(3);
                                            values["xStartUDL3"] = "";
                                            values["xEndUDL3"] = "";
                                            values["fyUDL3"] = "";
                                        }}
                                    >+
                                    </Button>
                                </div>
                                :
                                null
                        }
                        {
                            forceType === 3 && distributedLoadCount == 3 ?
                                <div>
                                    <label><b>3. DistributedLoad (UDL)</b></label>
                                    <InputForce
                                        label="XStartUDL"
                                        name="xStartUDL3"
                                        value={values.xStartUDL3}
                                        onChange={handleInputChange}
                                    />
                                    <InputForce
                                        label="XEndUDL"
                                        name="xEndUDL3"
                                        value={values.xEndUDL3}
                                        onChange={handleInputChange}
                                    />
                                    <InputForce
                                        label="fyUDL"
                                        name="fyUDL3"
                                        value={values.fyUDL3}
                                        onChange={handleInputChange}
                                    />
                                    <label ><b>Back 1. DistributedLoad (UDL):</b></label>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            setDistributedLoadCount(1);
                                        }}
                                    >-
                                    </Button>
                                </div>
                                :
                                null
                        }
                        {
                            forceType === 4 && linearLoadCount == 1 ?
                                <div>
                                    <label > <b>1. LinearLoad (LDL)</b></label>
                                    <InputForce
                                        label="XStartLDL"
                                        name="xStartLDL1"
                                        value={values.xStartLDL1}
                                        onChange={handleInputChange}
                                    />
                                    <InputForce
                                        label="XEndLDL"
                                        name="xEndLDL1"
                                        value={values.xEndLDL1}
                                        onChange={handleInputChange}
                                    />
                                    <InputForce
                                        label="Fy_StartLDL"
                                        name="fy_StartLDL1"
                                        value={values.fy_StartLDL1}
                                        onChange={handleInputChange}
                                    />
                                    <InputForce
                                        label="Fy_EndLDL"
                                        name="fy_EndLDL1"
                                        value={values.fy_EndLDL1}
                                        onChange={handleInputChange}
                                    />
                                    <label ><b>Add 2. LinearLoad (LDL):</b></label>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            setLinearLoadCount(2);
                                            values["xStartLDL2"] = "";
                                            values["xEndLDL2"] = "";
                                            values["fy_StartLDL2"] = "";
                                            values["fy_EndLDL2"] = "";
                                        }}
                                    >+
                                    </Button>
                                </div> :
                                null
                        }
                        {
                            forceType === 4 && linearLoadCount == 2 ?
                                <div>
                                    <label > <b>2. LinearLoad (LDL)</b></label>
                                    <InputForce
                                        label="XStartLDL"
                                        name="xStartLDL2"
                                        value={values.xStartLDL2}
                                        onChange={handleInputChange}
                                    />
                                    <InputForce
                                        label="XEndLDL"
                                        name="xEndLDL2"
                                        value={values.xEndLDL2}
                                        onChange={handleInputChange}
                                    />
                                    <InputForce
                                        label="Fy_StartLDL"
                                        name="fy_StartLDL2"
                                        value={values.fy_StartLDL2}
                                        onChange={handleInputChange}
                                    />
                                    <InputForce
                                        label="Fy_EndLDL"
                                        name="fy_EndLDL2"
                                        value={values.fy_EndLDL2}
                                        onChange={handleInputChange}
                                    />
                                    <label ><b>Add 3. LinearLoad (LDL):</b></label>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            setLinearLoadCount(3);
                                            values["xStartLDL3"] = "";
                                            values["xEndLDL3"] = "";
                                            values["fy_StartLDL3"] = "";
                                            values["fy_EndLDL3"] = "";
                                        }}
                                    >+
                                    </Button>
                                </div> :
                                null
                        }
                        {
                            forceType === 4 && linearLoadCount == 3 ?
                                <div>
                                    <label > <b>3. LinearLoad (LDL)</b></label>
                                    <InputForce
                                        label="XStartLDL"
                                        name="xStartLDL3"
                                        value={values.xStartLDL3}
                                        onChange={handleInputChange}
                                    />
                                    <InputForce
                                        label="XEndLDL"
                                        name="xEndLDL3"
                                        value={values.xEndLDL3}
                                        onChange={handleInputChange}
                                    />
                                    <InputForce
                                        label="Fy_StartLDL"
                                        name="fy_StartLDL3"
                                        value={values.fy_StartLDL3}
                                        onChange={handleInputChange}
                                    />
                                    <InputForce
                                        label="Fy_EndLDL"
                                        name="fy_EndLDL3"
                                        value={values.fy_EndLDL3}
                                        onChange={handleInputChange}
                                    />
                                    <label ><b>Back 1. LinearLoad (LDL):</b></label>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            setLinearLoadCount(1);
                                        }}
                                    >-
                                    </Button>
                                </div> :
                                null
                        }
                    </Stack>
                </Item>
            </Grid>






        </>
    )
}
