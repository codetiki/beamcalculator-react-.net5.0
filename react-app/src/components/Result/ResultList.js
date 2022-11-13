import React, { useState, useEffect } from 'react';
import { Grid, Paper, Button as MuiButton } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Table, Accordion, Card, Row, Col } from 'react-bootstrap';
import { createAPIEndpoint, ENDPOINTS } from "../../api/Index";
import { BsTrash, BsPencil, BsList } from "react-icons/bs";

const ResultList = (props) => {

    const {
        values,
        setValues,
        updateResult,
        setUpdateResult,
        results,
        setResults
    } = props;

    // console.log("formData ResultList", formData.name);
    // console.log("updateResult 1", updateResult)

    const [show, setShow] = React.useState(false);
    const handleClose = () => { setShow(false) }
    const handleShow = () => { setShow(true) }

    const [resultList, setResultList] = useState([]);

    useEffect(() => {
        // console.log("updateResult 3", updateResult)
        createAPIEndpoint(ENDPOINTS.BEAM).fetchAll()
            .then(res => {
                setResultList(res.data)
            })
            .catch(err => console.log(err))

        setUpdateResult(false);
    }, [updateResult])

    // console.log("updateResult 2", updateResult)

    const onDeleteResult = (id) => {
        createAPIEndpoint(ENDPOINTS.BEAM).delete(id)
            .then(res => {
                setUpdateResult(true);
            })
            .catch(err => console.log(err))
    }

    // mäpätään resurssit-taulukon rivit Modal-tauluun
    const rowsResults = resultList.map((r, x) => {
        // console.log("r rowsResults", r);
        const rowsTypes = r.types.map((tyyppi, index) => {
            return (
                <tr key={index}>
                    <td>{tyyppi.typeId}</td>
                    <td>{tyyppi.xp}</td>
                    <td>{tyyppi.fy}</td>
                    <td>{tyyppi.xm}</td>
                    <td>{tyyppi.m}</td>
                    <td>{tyyppi.xStartUDL}</td>
                    <td>{tyyppi.xEndUDL}</td>
                    <td>{tyyppi.fyUDL}</td>
                    <td>{tyyppi.xStartLDL}</td>
                    <td>{tyyppi.xEndLDL}</td>
                    <td>{tyyppi.fy_StartLDL}</td>
                    <td>{tyyppi.fy_EndLDL}</td>
                </tr>
            )
        })
        return (
            <Accordion>
                <Accordion.Item as={Button} variant="link" eventKey="0">
                    <Accordion.Header>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Definition</th>
                                    <th>Vmax</th>
                                    <th>Vmin</th>
                                    <th>Mmax</th>
                                    <th>Mmin</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={x}>
                                    <td>{r.beamId}</td>
                                    <td>{r.beamName}</td>
                                    <td>{r.beamDefinition}</td>
                                    <td>{r.vmax}</td>
                                    <td>{r.vmin}</td>
                                    <td>{r.mmax}</td>
                                    <td>{r.mmin}</td>
                                    <td><Button variant="outline-danger" onClick={(e) => onDeleteResult(r.beamId)}><BsTrash /></Button></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Accordion.Header>
                    <Accordion.Body>
                        <Table>
                            <thead>
                                <tr>
                                    <th>TypeId</th>
                                    <th>Xp</th>
                                    <th>Fy</th>
                                    <th>Xm</th>
                                    <th>M</th>
                                    <th>XStartUDL</th>
                                    <th>XEndUDL</th>
                                    <th>FyUDL</th>
                                    <th>XStartLDL</th>
                                    <th>XEndLDL</th>
                                    <th>Fy_StartLDL</th>
                                    <th>Fy_EndLDL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rowsTypes}
                            </tbody>
                        </Table>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        );
    })


    return (
        <>
            {/* palkin tallennus tietokantaan */}
            <MuiButton
                variant="contained"
                onClick={handleShow}
            ><BsList />Tallennetut Tulokset
            </MuiButton>

            <Modal
                size="xl"
                show={show}
                onHide={handleClose}
            >
                <Modal.Header>
                    <Modal.Title>ResultList</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {rowsResults}

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ResultList
