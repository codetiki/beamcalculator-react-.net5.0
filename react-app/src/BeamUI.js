import React, { useState, useEffect, Component, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BeamCalculator from './BeamCalculator';


// import images from local
import img0 from './images/supportsWithBeam.png';
import img1 from './images/pointloadWithSupportsWithBeam.png';
import img2 from './images/momentloadWithSupports.png';
import img3 from './images/distributedLoadWithSupport.png';
import img4 from './images/linearLoadWithSupport.png';


const BeamUI = () => {

    // const { CalculateShearForce } = useContext(BeamContext);

    const [forceType, setForceType] = useState("");
    const [pointLoadCount, setPointLoadCount] = useState(1);
    const [pointMomentCount, setPointMomentCount] = useState(1);
    const [distributedLoadCount, setDistributedLoadCount] = useState(1);
    const [linearLoadCount, setLinearLoadCount] = useState(1);

    const [formData, setFormData] = useState({
        "name": "",
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

    const [results, setResults] = useState({
        "Vmax": "",
        "Vmin": "",
        "Mmax": "",
        "Mmin": ""
    });

    const [showResultButton, setShowResultButton] = useState(false);
    const [showBeamValues, setShowBeamValues] = useState(false);
    const [showLoadsValues, setShowLoadsValues] = useState(false);
    let buttonBeamText = showBeamValues ? "Palkki ja tuet OFF" : "Palkki ja tuet ON";
    let buttonLoadsText = showLoadsValues ? "Kuormat OFF" : "Kuormat ON";

    // Kopioidaan formData-objekti. Luodaan tyhjä formData-objekti "target"
    function bestCopyEver(src) {
        return Object.assign({}, src);
    }

    const target = bestCopyEver(formData);
    console.log("target 1", target)
    useEffect(() => {
        if (formData.span !== "0" && formData.B !== "0" &&
            ((formData.fy1 !== "0") ||
                (formData.m1 !== "0") ||
                (formData.xEndUDL1 !== "0" && formData.fyUDL1 !== "0") ||
                (formData.xEndLDL1 !== "0" && (formData.fy_StartLDL1 !== "0" || formData.fy_EndLDL1 !== "0")))) {
            setShowResultButton(true);
        }
        else {
            setShowResultButton(false);
        }
    }, [formData]);

    delete target.type;
    Object.keys(target).map(k => target[k] == "0" ? delete target[k] : target[k]);
    Object.keys(target).map(k => target[k] == true ? delete target[k] : target[k]);
    Object.keys(target).map(k => target[k] == false ? delete target[k] : target[k]);

    const [maxV, setMaxV] = useState();
    const [minV, setMinV] = useState();
    const [maxM, setMaxM] = useState();
    const [minM, setMinM] = useState();

    const handleForceChange = (newForce) => {
        setResults({ ...results, Vmax: newForce[0], Vmin: newForce[1], Mmax: newForce[2], Mmin: newForce[3] });
    }

    const onShowBeamForm = () => {
        setShowBeamValues(!showBeamValues);
    }

    const onShowLoadsForm = () => {
        setShowLoadsValues(!showLoadsValues);
    }




    return (
        <div style={{ margin: 50 }}>
            <h2>1-aukkoisen palkin tukireaktioiden ja leikkausvoiman ja taivutusmomentin laskenta</h2>
            <div >
                <div class="row">
                    <div class="col-sm-4">
                        <form class="row g-3">
                            <div class="col-sm-4">
                                <button
                                    type="button"
                                    class="btn btn-primary mb-3"
                                    onClick={() => {
                                        setFormData({
                                            ...formData,
                                            name: "",
                                            span: "0",
                                            A: "0",
                                            B: "0",
                                            xp1: "0",
                                            fy1: "0",
                                            xp2: "",
                                            fy2: "",
                                            xp3: "",
                                            fy3: "",
                                            xm1: "0",
                                            m1: "0",
                                            xm2: "",
                                            m2: "",
                                            xm3: "",
                                            m3: "",
                                            xStartUDL1: "0",
                                            xEndUDL1: "0",
                                            fyUDL1: "0",
                                            xStartUDL2: "",
                                            xEndUDL2: "",
                                            fyUDL2: "",
                                            xStartUDL3: "",
                                            xEndUDL3: "",
                                            fyUDL3: "",
                                            xStartLDL1: "0",
                                            xEndLDL1: "0",
                                            fy_StartLDL1: "0",
                                            fy_EndLDL1: "0",
                                            xStartLDL2: "",
                                            xEndLDL2: "",
                                            fy_StartLDL2: "",
                                            fy_EndLDL2: "",
                                            xStartLDL3: "",
                                            xEndLDL3: "",
                                            fy_StartLDL3: "",
                                            fy_EndLDL3: "",
                                            check: false
                                        });
                                    }}
                                >Tyhjennä lähtötiedot</button>
                            </div>
                            {
                                formData.check ?
                                    <>
                                        <div class="col-sm-4">
                                            <button
                                                type="button"
                                                class="btn btn-success mb-3"

                                            >Tallenna tulos</button>
                                        </div>
                                    </>
                                    :
                                    null
                            }

                        </form>
                        <h3>Syötä palkin pituus ja tuet</h3>
                        <button type="button" class="btn btn-outline-secondary" onClick={onShowBeamForm}>{buttonBeamText}</button>
                        {
                            showBeamValues ?
                                <>
                                    <div class="mb-3 row">
                                        <label class="col-sm-2 col-form-label">Palkin nimi:</label>
                                        <div class="col-sm-6">
                                            <input
                                                type="text"
                                                class="form-control"
                                                placeholder='Nimi...'
                                                onChange={(e) => {
                                                    setFormData({ ...formData, name: e.target.value });

                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div class="mb-12 row">
                                        <label class="col-sm-12">
                                            <img src={img0} alt="PointLoad" height={235} width={550} /></label>
                                    </div>

                                    <div class="mb-3 row">
                                        <label class="col-sm-12">Palkin kokonaispituus [m]</label>
                                        <label class="col-sm-1 col-form-label">span:</label>
                                        <div class="col-sm-6">
                                            <input
                                                type="text"
                                                class="form-control"
                                                name='span'
                                                value={formData.span}
                                                onChange={(e) => {
                                                    setFormData({ ...formData, span: e.target.value, changed: false, check: false });

                                                }} />

                                        </div>
                                    </div>

                                    <div class="mb-3 row ">
                                        <label class="col-sm-12">Palkin tuet [m]</label>
                                        <label class="col-sm-1 col-form-label text-center">A:</label>
                                        <div class="col-sm-2">
                                            <input
                                                type="text"
                                                class="form-control"
                                                name='A'
                                                value={formData.A}
                                                onChange={(e) => {
                                                    setFormData({ ...formData, A: e.target.value, changed: false, check: false });
                                                }}
                                            />
                                        </div>
                                        <div class="col-1"></div>
                                        <label class="col-1 col-form-label text-center">B:</label>
                                        <div class="col-2">
                                            <input
                                                type="text"
                                                class="form-control"
                                                name='B'
                                                value={formData.B}
                                                onChange={(e) => {
                                                    setFormData({ ...formData, B: e.target.value, changed: false, check: false });
                                                }}
                                            />
                                        </div>
                                        <div class="col-4"></div>
                                    </div>
                                </>
                                :
                                null
                        }

                        <br />
                        <h3>Syötä palkin kuormat</h3>
                        <button type="button" class="btn btn-outline-secondary" onClick={onShowLoadsForm}>{buttonLoadsText}</button>
                        {
                            showLoadsValues ?
                                <>
                                    <label class="col-sm-12">Kuormatyyppi:</label>
                                    <div class="col-sm-6">
                                        <select class="form-select" aria-label="Default select example" value={forceType} onChange={(e) => {
                                            setFormData({ ...formData, type: e.target.value });
                                            setForceType(e.target.value);
                                        }}>
                                            <option value={0} key={0}>--Choise--</option>
                                            <option value={"PL"} key={1}>PointLoad</option>
                                            <option value={"PM"} key={2}>MomentLoad</option>
                                            <option value={"UDL"} key={3}>DistributedLoad</option>
                                            <option value={"LDL"} key={4}>LinearLoad</option>
                                        </select>
                                    </div>




                                    <br />
                                    <div class="mb-12 row">
                                        {

                                            forceType == "PL" ?
                                                <label class="col-sm-12">
                                                    <img src={img1} alt="PointLoad" height={235} width={550} /></label>
                                                :
                                                forceType == "PM" ?
                                                    <label class="col-sm-12">
                                                        <img src={img2} alt="MomentLoad" height={235} width={550} /></label>
                                                    :
                                                    forceType == "UDL" ?
                                                        <label class="col-sm-12">
                                                            <img src={img3} alt="DistributedLoad" height={235} width={550} /></label>
                                                        :
                                                        forceType == "LDL" ?
                                                            <label class="col-sm-12">
                                                                <img src={img4} alt="LinearLoad" height={235} width={550} /></label>
                                                            :
                                                            null
                                        }
                                    </div>
                                    {
                                        forceType == "PL" && pointLoadCount == 1 ?
                                            <div class="mb-3 row">

                                                <label class="col-sm-12"><b>1. PointLoad (PL)</b></label>
                                                <label class="col-sm-1 col-form-label text-center">xp:</label>
                                                <div class="col-sm-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name='xp'
                                                        value={formData.xp1}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, xp1: e.target.value, changed: false, check: false });
                                                        }}
                                                    />
                                                </div>
                                                <div class="col-sm-1"></div>
                                                <label class="col-sm-1 col-form-label text-center">fy:</label>
                                                <div class="col-sm-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name='fy'
                                                        value={formData.fy1}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, fy1: e.target.value, changed: false, check: false });
                                                        }}
                                                    />
                                                </div>
                                                <div class="col-sm-4"></div>

                                                <form class="row g-3">
                                                    <label class="col-sm-5 col-form-label text-center"><b>Add 2. PointLoad (PL):</b></label>
                                                    <div class="col-sm-4">
                                                        <button
                                                            type="button"
                                                            class="btn btn-primary mb-3"
                                                            onClick={() => {
                                                                setPointLoadCount(2);
                                                                formData["xp2"] = "";
                                                                formData["fy2"] = "";
                                                            }}
                                                        >+</button>
                                                    </div>
                                                </form>
                                            </div>
                                            :
                                            null
                                    }
                                    {
                                        forceType == "PL" && pointLoadCount == 2 ?
                                            <div class="mb-3 row">

                                                <label class="col-sm-12"><b>2. PointLoad (PL)</b></label>
                                                <label class="col-sm-1 col-form-label text-center">xp:</label>
                                                <div class="col-sm-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name='xp'
                                                        value={formData.xp2}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, xp2: e.target.value, changed: false, check: false });
                                                        }}
                                                    />
                                                </div>
                                                <div class="col-sm-1"></div>
                                                <label class="col-sm-1 col-form-label text-center">fy:</label>
                                                <div class="col-sm-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name='fy'
                                                        value={formData.fy2}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, fy2: e.target.value, changed: false, check: false });
                                                        }}
                                                    />
                                                </div>
                                                <div class="col-sm-4"></div>
                                                <form class="row g-3">
                                                    <label class="col-sm-5 col-form-label text-center"><b>Add 3. PointLoad (PL):</b></label>
                                                    <div class="col-sm-4">
                                                        <button
                                                            type="button"
                                                            class="btn btn-primary mb-3"
                                                            onClick={() => {
                                                                setPointLoadCount(3);
                                                                formData["xp3"] = "";
                                                                formData["fy3"] = "";
                                                            }}
                                                        >+</button>
                                                    </div>
                                                </form>
                                            </div>
                                            :
                                            null
                                    }
                                    {
                                        forceType == "PL" && pointLoadCount == 3 ?
                                            <div class="mb-3 row">

                                                <label class="col-sm-12"><b>3. PointLoad (PL)</b></label>
                                                <label class="col-sm-1 col-form-label text-center">xp:</label>
                                                <div class="col-sm-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name='xp'
                                                        value={formData.xp3}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, xp3: e.target.value, changed: false, check: false });
                                                        }}
                                                    />
                                                </div>
                                                <div class="col-sm-1"></div>
                                                <label class="col-sm-1 col-form-label text-center">fy:</label>
                                                <div class="col-sm-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name='fy'
                                                        value={formData.fy3}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, fy3: e.target.value, changed: false, check: false });
                                                        }}
                                                    />
                                                </div>
                                                <div class="col-sm-4"></div>
                                                <form class="row g-3">
                                                    <label class="col-sm-5 col-form-label text-center"><b> Back 1. PointLoad (PL):</b></label>
                                                    <div class="col-sm-4">
                                                        <button
                                                            type="button"
                                                            class="btn btn-primary mb-3"
                                                            onClick={() => {
                                                                setPointLoadCount(1);
                                                            }}
                                                        >-</button>
                                                    </div>
                                                </form>
                                            </div>
                                            :
                                            null
                                    }
                                    {
                                        forceType == "PM" && pointMomentCount == 1 ?
                                            <div class="mb-3 row">
                                                <label class="col-sm-12"><b>MomentLoad 1 (PM)</b></label>
                                                <label class="col-sm-1 col-form-label text-center">xm:</label>
                                                <div class="col-sm-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name='xm'
                                                        value={formData.xm1}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, xm1: e.target.value, changed: false, check: false });
                                                        }}
                                                    />
                                                </div>
                                                <div class="col-sm-1"></div>
                                                <label class="col-sm-1 col-form-label text-center">m:</label>
                                                <div class="col-sm-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name='m'
                                                        value={formData.m1}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, m1: e.target.value, changed: false, check: false });
                                                        }}
                                                    />
                                                </div>
                                                <div class="col-sm-4"></div>
                                                <form class="row g-3">
                                                    <label class="col-sm-5 col-form-label text-center"><b>Add 2. PointMoment (PM):</b></label>
                                                    <div class="col-sm-4">
                                                        <button
                                                            type="button"
                                                            class="btn btn-primary mb-3"
                                                            onClick={() => {
                                                                setPointMomentCount(2);
                                                                formData["xm2"] = "";
                                                                formData["m2"] = "";
                                                            }}
                                                        >+</button>
                                                    </div>
                                                </form>
                                            </div>
                                            :
                                            null
                                    }
                                    {
                                        forceType == "PM" && pointMomentCount == 2 ?
                                            <div class="mb-3 row">
                                                <label class="col-sm-12"><b>MomentLoad 2 (PM)</b></label>
                                                <label class="col-sm-1 col-form-label text-center">xm:</label>
                                                <div class="col-sm-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name='xm'
                                                        value={formData.xm2}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, xm2: e.target.value, changed: false, check: false });
                                                        }}
                                                    />
                                                </div>
                                                <div class="col-sm-1"></div>
                                                <label class="col-sm-1 col-form-label text-center">m:</label>
                                                <div class="col-sm-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name='m'
                                                        value={formData.m2}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, m2: e.target.value, changed: false, check: false });
                                                        }}
                                                    />
                                                </div>
                                                <div class="col-sm-4"></div>
                                                <form class="row g-3">
                                                    <label class="col-sm-5 col-form-label text-center"><b>Add 3. PointMoment (PM):</b></label>
                                                    <div class="col-sm-4">
                                                        <button
                                                            type="button"
                                                            class="btn btn-primary mb-3"
                                                            onClick={() => {
                                                                setPointMomentCount(3);
                                                                formData["xm3"] = "";
                                                                formData["m3"] = "";
                                                            }}
                                                        >+</button>
                                                    </div>
                                                </form>
                                            </div>
                                            :
                                            null
                                    }
                                    {
                                        forceType == "PM" && pointMomentCount == 3 ?
                                            <div class="mb-3 row">
                                                <label class="col-sm-12"><b>MomentLoad 3 (PM)</b></label>
                                                <label class="col-sm-1 col-form-label text-center">xm:</label>
                                                <div class="col-sm-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name='xm'
                                                        value={formData.xm3}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, xm3: e.target.value, changed: false, check: false });
                                                        }}
                                                    />
                                                </div>
                                                <div class="col-sm-1"></div>
                                                <label class="col-sm-1 col-form-label text-center">m:</label>
                                                <div class="col-sm-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name='m'
                                                        value={formData.m3}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, m3: e.target.value, changed: false, check: false });
                                                        }}
                                                    />
                                                </div>
                                                <div class="col-sm-4"></div>
                                                <form class="row g-3">
                                                    <label class="col-sm-5 col-form-label text-center"><b>Back 1. PointMoment (PM):</b></label>
                                                    <div class="col-sm-4">
                                                        <button
                                                            type="button"
                                                            class="btn btn-primary mb-3"
                                                            onClick={() => {
                                                                setPointMomentCount(1);
                                                            }}
                                                        >-</button>
                                                    </div>
                                                </form>
                                            </div>
                                            :
                                            null
                                    }
                                    {
                                        forceType == "UDL" && distributedLoadCount == 1 ?
                                            <div class="mb-3 row">
                                                <label class="col-sm-12"><b>1. DistributedLoad (UDL)</b></label>
                                                <label class="col-sm-1 col-form-label text-center">xStart:</label>
                                                <div class="col-sm-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name='xStartUDL1'
                                                        placeholder='xStartUDL1...'
                                                        value={formData.xStartUDL1}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, xStartUDL1: e.target.value, changed: false, check: false });

                                                        }}
                                                    />
                                                </div>
                                                <div class="col-sm-1"></div>
                                                <label class="col-sm-1 col-form-label text-center">xEnd:</label>
                                                <div class="col-sm-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name='xEndUDL1'
                                                        placeholder='xEndUDL1...'
                                                        value={formData.xEndUDL1}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, xEndUDL1: e.target.value, changed: false, check: false });
                                                        }}
                                                    />
                                                </div>
                                                <div class="col-sm-1"></div>
                                                <label class="col-sm-1 col-form-label text-center">fyUDL:</label>
                                                <div class="col-sm-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name='fyUDL1'
                                                        placeholder='fyUDL1...'
                                                        value={formData.fyUDL1}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, fyUDL1: e.target.value, changed: false, check: false });
                                                        }}
                                                    />
                                                </div>
                                                <div class="col-sm-4"></div>

                                                <form class="row g-3">
                                                    <label class="col-sm-5 col-form-label text-center"><b>Add 2. DistributedLoad (UDL):</b></label>
                                                    <div class="col-sm-4">
                                                        <button
                                                            type="button"
                                                            class="btn btn-primary mb-3"
                                                            onClick={() => {
                                                                setDistributedLoadCount(2);
                                                                formData["xStartUDL2"] = "";
                                                                formData["xEndUDL2"] = "";
                                                                formData["fyUDL2"] = "";
                                                            }}
                                                        >+</button>
                                                    </div>
                                                </form>
                                            </div> :
                                            null
                                    }
                                    {
                                        forceType == "UDL" && distributedLoadCount == 2 ?
                                            <div class="mb-3 row">
                                                <label class="col-sm-12"><b>2. DistributedLoad (UDL)</b></label>
                                                <label class="col-sm-1 col-form-label text-center">xStart:</label>
                                                <div class="col-sm-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name='xStartUDL2'
                                                        value={formData.xStartUDL2}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, xStartUDL2: e.target.value, changed: false, check: false });

                                                        }}
                                                    />
                                                </div>
                                                <div class="col-sm-1"></div>
                                                <label class="col-sm-1 col-form-label text-center">xEnd:</label>
                                                <div class="col-sm-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name='xEndUDL2'
                                                        value={formData.xEndUDL2}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, xEndUDL2: e.target.value, changed: false, check: false });
                                                        }}
                                                    />
                                                </div>
                                                <div class="col-sm-1"></div>
                                                <label class="col-sm-1 col-form-label text-center">fyUDL:</label>
                                                <div class="col-sm-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name='fyUDL2'
                                                        value={formData.fyUDL2}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, fyUDL2: e.target.value, changed: false, check: false });
                                                        }}
                                                    />
                                                </div>
                                                <div class="col-sm-4"></div>

                                                <form class="row g-3">
                                                    <label class="col-sm-5 col-form-label text-center"><b>Add 3. DistributedLoad (UDL):</b></label>
                                                    <div class="col-sm-4">
                                                        <button
                                                            type="button"
                                                            class="btn btn-primary mb-3"
                                                            onClick={() => {
                                                                setDistributedLoadCount(3);
                                                                formData["xStartUDL3"] = "";
                                                                formData["xEndUDL3"] = "";
                                                                formData["fyUDL3"] = "";
                                                            }}
                                                        >+</button>
                                                    </div>
                                                </form>
                                            </div> :
                                            null
                                    }
                                    {
                                        forceType == "UDL" && distributedLoadCount == 3 ?
                                            <div class="mb-3 row">
                                                <label class="col-sm-12"><b>3. DistributedLoad (UDL)</b></label>
                                                <label class="col-sm-1 col-form-label text-center">xStart:</label>
                                                <div class="col-sm-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name='xStartUDL3'
                                                        value={formData.xStartUDL3}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, xStartUDL3: e.target.value, changed: false, check: false });

                                                        }}
                                                    />
                                                </div>
                                                <div class="col-sm-1"></div>
                                                <label class="col-sm-1 col-form-label text-center">xEnd:</label>
                                                <div class="col-sm-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name='xEndUDL3'
                                                        value={formData.xEndUDL3}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, xEndUDL3: e.target.value, changed: false, check: false });
                                                        }}
                                                    />
                                                </div>
                                                <div class="col-sm-1"></div>
                                                <label class="col-sm-1 col-form-label text-center">fyUDL:</label>
                                                <div class="col-sm-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name='fyUDL3'
                                                        value={formData.fyUDL3}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, fyUDL3: e.target.value, changed: false, check: false });
                                                        }}
                                                    />
                                                </div>
                                                <div class="col-sm-4"></div>

                                                <form class="row g-3">
                                                    <label class="col-sm-5 col-form-label text-center"><b> Back 1. DistributedLoad (UDL):</b></label>
                                                    <div class="col-sm-4">
                                                        <button
                                                            type="button"
                                                            class="btn btn-primary mb-3"
                                                            onClick={() => {
                                                                setDistributedLoadCount(1);
                                                            }}
                                                        >-</button>
                                                    </div>
                                                </form>
                                            </div> :
                                            null
                                    }
                                    {
                                        forceType == "LDL" && linearLoadCount == 1 ?
                                            <div class="mb-3 row">
                                                <label class="col-sm-12"> <b>1. LinearLoad (LDL)</b></label>
                                                <label class="col-sm-1 col-form-label text-center">xStart:</label>
                                                <div class="col-sm-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name='xStartLDL1'
                                                        value={formData.xStartLDL1}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, xStartLDL1: e.target.value, changed: false, check: false });

                                                        }}
                                                    />
                                                </div>
                                                <div class="col-sm-1"></div>
                                                <label class="col-sm-1 col-form-label text-center">xEnd:</label>
                                                <div class="col-sm-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name='xEndLDL1'
                                                        value={formData.xEndLDL1}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, xEndLDL1: e.target.value, changed: false, check: false });

                                                        }}
                                                    />
                                                </div>
                                                <div class="col-sm-5"></div>
                                                <label class="col-sm-1 col-form-label text-center">fy_Start:</label>
                                                <div class="col-sm-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name='fy_StartLDL1'
                                                        value={formData.fy_StartLDL1}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, fy_StartLDL1: e.target.value, changed: false, check: false });

                                                        }}
                                                    />
                                                </div>
                                                <div class="col-sm-1"></div>
                                                <label class="col-sm-1 col-form-label text-center">fy_End:</label>
                                                <div class="col-sm-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name='fy_EndLDL1'
                                                        value={formData.fy_EndLDL1}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, fy_EndLDL1: e.target.value, changed: false, check: false });

                                                        }}
                                                    />
                                                </div>
                                                <div class="col-sm-4"></div>

                                                <form class="row g-3">
                                                    <label class="col-sm-5 col-form-label text-center"><b>Add 2. LinearLoad (LDL):</b></label>
                                                    <div class="col-sm-4">
                                                        <button
                                                            type="button"
                                                            class="btn btn-primary mb-3"
                                                            onClick={() => {
                                                                setLinearLoadCount(2);
                                                                formData["xStartLDL2"] = "";
                                                                formData["xEndLDL2"] = "";
                                                                formData["fy_StartLDL2"] = "";
                                                                formData["fy_EndLDL2"] = "";
                                                            }}
                                                        >+</button>
                                                    </div>
                                                </form>
                                            </div> :
                                            null
                                    }
                                    {
                                        forceType == "LDL" && linearLoadCount == 2 ?
                                            <div class="mb-3 row">
                                                <label class="col-sm-12"> <b>2. LinearLoad (LDL)</b></label>
                                                <label class="col-sm-1 col-form-label text-center">xStart:</label>
                                                <div class="col-sm-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name='xStartLDL2'
                                                        value={formData.xStartLDL2}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, xStartLDL2: e.target.value, changed: false, check: false });

                                                        }}
                                                    />
                                                </div>
                                                <div class="col-sm-1"></div>
                                                <label class="col-sm-1 col-form-label text-center">xEnd:</label>
                                                <div class="col-sm-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name='xEndLDL2'
                                                        value={formData.xEndLDL2}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, xEndLDL2: e.target.value, changed: false, check: false });

                                                        }}
                                                    />
                                                </div>
                                                <div class="col-sm-5"></div>
                                                <label class="col-sm-1 col-form-label text-center">fy_Start:</label>
                                                <div class="col-sm-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name='fy_StartLDL2'
                                                        value={formData.fy_StartLDL2}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, fy_StartLDL2: e.target.value, changed: false, check: false });

                                                        }}
                                                    />
                                                </div>
                                                <div class="col-sm-1"></div>
                                                <label class="col-sm-1 col-form-label text-center">fy_End:</label>
                                                <div class="col-sm-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name='fy_EndLDL2'
                                                        value={formData.fy_EndLDL2}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, fy_EndLDL2: e.target.value, changed: false, check: false });

                                                        }}
                                                    />
                                                </div>
                                                <div class="col-sm-4"></div>

                                                <form class="row g-3">
                                                    <label class="col-sm-5 col-form-label text-center"><b>Add 3. LinearLoad (LDL):</b></label>
                                                    <div class="col-sm-4">
                                                        <button
                                                            type="button"
                                                            class="btn btn-primary mb-3"
                                                            onClick={() => {
                                                                setLinearLoadCount(3);
                                                                formData["xStartLDL3"] = "";
                                                                formData["xEndLDL3"] = "";
                                                                formData["fy_StartLDL3"] = "";
                                                                formData["fy_EndLDL3"] = "";
                                                            }}
                                                        >+</button>
                                                    </div>
                                                </form>
                                            </div> :
                                            null
                                    }
                                    {
                                        forceType == "LDL" && linearLoadCount == 3 ?
                                            <div class="mb-3 row">
                                                <label class="col-sm-12"> <b>3. LinearLoad (LDL)</b></label>
                                                <label class="col-sm-1 col-form-label text-center">xStart:</label>
                                                <div class="col-sm-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name='xStartLDL3'
                                                        value={formData.xStartLDL3}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, xStartLDL3: e.target.value, changed: false, check: false });

                                                        }}
                                                    />
                                                </div>
                                                <div class="col-sm-1"></div>
                                                <label class="col-sm-1 col-form-label text-center">xEnd:</label>
                                                <div class="col-sm-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name='xEndLDL3'
                                                        value={formData.xEndLDL3}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, xEndLDL3: e.target.value, changed: false, check: false });

                                                        }}
                                                    />
                                                </div>
                                                <div class="col-sm-5"></div>
                                                <label class="col-sm-1 col-form-label text-center">fy_Start:</label>
                                                <div class="col-sm-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name='fy_StartLDL3'
                                                        value={formData.fy_StartLDL3}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, fy_StartLDL3: e.target.value, changed: false, check: false });

                                                        }}
                                                    />
                                                </div>
                                                <div class="col-sm-1"></div>
                                                <label class="col-sm-1 col-form-label text-center">fy_End:</label>
                                                <div class="col-sm-2">
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        name='fy_EndLDL3'
                                                        value={formData.fy_EndLDL3}
                                                        onChange={(e) => {
                                                            setFormData({ ...formData, fy_EndLDL3: e.target.value, changed: false, check: false });

                                                        }}
                                                    />
                                                </div>
                                                <div class="col-sm-4"></div>

                                                <form class="row g-3">
                                                    <label class="col-sm-5 col-form-label text-center"><b>Back 1. LinearLoad (LDL):</b></label>
                                                    <div class="col-sm-4">
                                                        <button
                                                            type="button"
                                                            class="btn btn-primary mb-3"
                                                            onClick={() => {
                                                                setLinearLoadCount(1);
                                                            }}
                                                        >-</button>
                                                    </div>
                                                </form>
                                            </div> :
                                            null
                                    }
                                </>
                                :
                                null

                        }
                    </div>

                    <div class="col-sm-1">
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
                    </div>
                    <div class="col-sm-1">
                        <h4>Max/Min tulokset</h4>
                        <hr />

                        {
                            formData.check ?
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

                    </div>
                    <div class="col-sm-6">
                        <BeamCalculator
                            formData={formData}
                            setFormData={setFormData}
                            forceChange={handleForceChange}
                            showResultButton={showResultButton}
                            setShowResultButton={setShowResultButton}
                        />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default BeamUI
