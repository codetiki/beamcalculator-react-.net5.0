import React, { useState, useEffect, Component, useContext } from 'react';
import LineChart from "./LineChart";
import 'bootstrap/dist/css/bootstrap.min.css';

const BeamCalculator = (props) => {
    const {
        formData,
        setFormData,
        forceChange,
        showResultButton,
        setShowResultButton,
    } = props;

    const X = [];
    const [pointLoads, setPointLoads] = useState([[]]);
    const [pointMoments, setPointMoments] = useState([[]]);
    const [distributedLoads, setDistributedLoads] = useState([[]]);
    const [linearLoads, setLinearLoads] = useState([[]]);

    const reactions = [];
    const span = parseInt(formData.span);
    const A = parseInt(formData.A);
    const B = parseInt(formData.B);
    let newMoment = [];
    let newShearforce = [];
    let va, ha, vb;
    let [leikkausvoima, setLeikkausvoima] = useState([]);
    let [momentti, setMomentti] = useState([]);
    const [amount, setAmount] = useState([]);

    const [shearData, setShearData] = useState({
        labels: [],
        datasets: [
            {
                label: "X-akseli",
                data: [],
                borderColor: 'black',
                borderWidth: 3,
                tension: 0.1,
                pointRadius: 0
            },
            {
                label: "V [kN]",
                data: [],
                backgroundColor: '#97ff97',
                borderColor: 'green',
                borderWidth: 1,
                fill: true,
                tension: 0.1,
                pointRadius: 0
            },
        ],
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Leikkausvoima-käyrä',
                }
            },
            maintainAspectRatio: true,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: false,
                        },
                    },
                ],
            },
        },
    });

    const [momentData, setMomentData] = useState({
        labels: [],
        datasets: [
            {
                label: "X-akseli",
                data: [],
                borderColor: 'black',
                borderWidth: 3,
                tension: 0.1,
                pointRadius: 0
            },
            {
                label: "M [kNm]",
                data: [],
                backgroundColor: '#ffe5e5',
                borderColor: 'red',
                borderWidth: 1,
                fill: true,
                tension: 0.1,
                pointRadius: 0
            },
        ],
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Taivutusmomentti-käyrä',
                }
            },
            maintainAspectRatio: true,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: false,
                        },
                    },
                ],
            },
        },
    });

    useEffect(() => {
        setPointLoads([[parseInt(formData.xp1), 0, parseInt(formData.fy1)]]);
        setPointMoments([[parseInt(formData.xm1), parseInt(formData.m1)]]);
        setDistributedLoads([[parseInt(formData.xStartUDL1), parseInt(formData.xEndUDL1), parseInt(formData.fyUDL1)]]);
        setLinearLoads([[parseInt(formData.xStartLDL1), parseInt(formData.xEndLDL1), parseInt(formData.fy_StartLDL1), parseInt(formData.fy_EndLDL1)]]);
        setFormData({ ...formData, changed: true });
    }, [formData.changed == false]);

    const CalculateShearForce = () => {
        // Lisätään toinen pistekuorma
        if (formData.fy2) {
            pointLoads.push([parseInt(formData.xp2), 0, parseInt(formData.fy2)]);
        }
        if (formData.fy3) {
            pointLoads.push([parseInt(formData.xp3), 0, parseInt(formData.fy3)]);
        }
        // Lisätään toinen pistemomentti
        if (formData.m2) {
            pointMoments.push([parseInt(formData.xm2), parseInt(formData.m2)]);
        }
        if (formData.m3) {
            pointMoments.push([parseInt(formData.xm3), parseInt(formData.m3)]);
        }
        // Lisätään toinen tasainen viivakuorma
        if (formData.fyUDL2) {
            distributedLoads.push([parseInt(formData.xStartUDL2), parseInt(formData.xEndUDL2), parseInt(formData.fyUDL2)]);
        }
        if (formData.fyUDL3) {
            distributedLoads.push([parseInt(formData.xStartUDL3), parseInt(formData.xEndUDL3), parseInt(formData.fyUDL3)]);
        }
        // Lisätään toinen lineaarinen viivakuorma
        if (formData.fy_EndLDL2) {
            linearLoads.push([parseInt(formData.xStartLDL2), parseInt(formData.xEndLDL2), parseInt(formData.fy_StartLDL2), parseInt(formData.fy_EndLDL2)]);
        }
        if (formData.fy_EndLDL3) {
            linearLoads.push([parseInt(formData.xStartLDL3), parseInt(formData.xEndLDL3), parseInt(formData.fy_StartLDL3), parseInt(formData.fy_EndLDL3)]);
        }

        const divs = 100 * span;
        let delta = span / divs;
        for (var i = 0; i < span; i += delta) {
            X.push(i.toFixed(2));
        }
        let XAxis = [];
        for (var i = 0; i < span; i += delta) {
            XAxis.push(0);
        }

        const nPL = pointLoads.length;
        const nPM = pointMoments.length;
        const nUDL = distributedLoads.length;
        const nLDL = linearLoads.length;

        reactions.push(0);
        reactions.push(0);
        reactions.push(0);

        const reactions_PL = (index) => {
            let xp = pointLoads[index][0];
            let fx = pointLoads[index][1];
            let fy = pointLoads[index][2];
            let la_p = A - xp;
            let mp = fy * la_p;
            let la_vp = B - A;
            let Vb = mp / la_vp;
            let Va = -fy - Vb;
            let Ha = -fx;

            return { Va, Ha, Vb }
        };

        const reactions_PM = (index) => {
            let xm = pointMoments[index][0];
            let m = pointMoments[index][1];
            let la_vb = B - A;
            let Vb = m / la_vb;
            let Va = -Vb;

            return { Va, Vb }
        };

        const reactions_UDL = (index) => {
            let xStart = distributedLoads[index][0];
            let xEnd = distributedLoads[index][1];
            let fy = distributedLoads[index][2];
            const fy_Res = fy * (xEnd - xStart);
            const x_Res = xStart + 0.5 * ((xEnd - xStart));
            let la_p = A - x_Res;
            let mp = fy_Res * la_p;
            let la_vp = B - A;
            let Vb = mp / la_vp;
            let Va = -fy_Res - Vb;

            return { Va, Vb }
        };

        const reactions_LDL = (index) => {
            let xStart = linearLoads[index][0];
            let xEnd = linearLoads[index][1];
            let fy_Start = linearLoads[index][2];
            let fy_End = linearLoads[index][3];
            let fy_Res = 0;
            let x_Res = 0;

            if (Math.abs(fy_Start) > 0) {
                fy_Res = 0.5 * fy_Start * (xEnd - xStart);
                x_Res = xStart + (1 / 3) * ((xEnd - xStart));
            }
            else {
                fy_Res = 0.5 * fy_End * (xEnd - xStart);
                x_Res = xStart + (2 / 3) * ((xEnd - xStart));
            }

            let la_p = A - x_Res;
            let mp = fy_Res * la_p;
            let la_vp = B - A;
            let Vb = mp / la_vp;
            let Va = -fy_Res - Vb;

            return { Va, Vb }
        };

        let PL_record = [];
        if (nPL > 0) {
            for (let index in pointLoads) {
                va = reactions_PL(index).Va;
                ha = reactions_PL(index).Ha;
                vb = reactions_PL(index).Vb;

                PL_record.push([va, ha, vb]);

                reactions[0] = reactions[0] + va;
                reactions[1] = reactions[1] + ha;
                reactions[2] = reactions[2] + vb;
            }
        }

        let PM_record = [];
        if (nPM > 0) {
            for (let index in pointMoments) {
                va = reactions_PM(index).Va;
                vb = reactions_PM(index).Vb;

                PM_record.push([va, vb]);

                reactions[0] = reactions[0] + va;
                reactions[2] = reactions[2] + vb;
            }
        }

        let UDL_record = [];
        if (nUDL > 0) {
            for (let index in distributedLoads) {
                va = reactions_UDL(index).Va;
                vb = reactions_UDL(index).Vb;

                UDL_record.push([va, vb]);

                reactions[0] = reactions[0] + va;
                reactions[2] = reactions[2] + vb;
            }

        }

        let LDL_record = [];
        if (nLDL > 0) {
            for (let index in linearLoads) {
                va = reactions_LDL(index).Va;
                vb = reactions_LDL(index).Vb;

                LDL_record.push([va, vb]);

                reactions[0] = reactions[0] + va;
                reactions[2] = reactions[2] + vb;
            }

        }


        // Leikkausvoima  ja Momentti
        const shear_moment_PL = (index) => {
            let xp = pointLoads[index][0];
            let fy = pointLoads[index][2];
            let Va = PL_record[index][0];
            let Vb = PL_record[index][2];

            let Shear = [];
            let Moment = [];

            for (let x in X) {
                let shear = 0;
                let moment = 0;

                if (x / 100 > A) {
                    shear = shear + Va;
                    moment = moment - Va * ((x / 100) - A);
                }

                if (x / 100 > B) {
                    shear = shear + Vb;
                    moment = moment - Vb * ((x / 100) - B)
                }

                if (x / 100 > xp) {
                    shear = shear + fy;
                    moment = moment - fy * ((x / 100) - xp);
                }

                Shear.push(shear);
                Moment.push(moment);
            }
            return { Shear, Moment }
        }

        const shear_moment_PM = (index) => {
            let xm = pointMoments[index][0];
            let m = pointMoments[index][1];
            let Va = PM_record[index][0];
            let Vb = PM_record[index][1];

            let Shear = [];
            let Moment = [];

            for (let x in X) {
                let shear = 0;
                let moment = 0;

                if (x / 100 > A) {
                    shear = shear + Va;
                    moment = moment - Va * ((x / 100) - A);
                }

                if (x / 100 > B) {
                    shear = shear + Vb;
                    moment = moment - Vb * ((x / 100) - B)
                }

                if (x / 100 > xm) {
                    moment = moment - m;
                }

                Shear.push(shear);
                Moment.push(moment);
            }
            return { Shear, Moment }
        }

        const shear_moment_UDL = (index) => {
            let xStart = distributedLoads[index][0];
            let xEnd = distributedLoads[index][1];
            let fy = distributedLoads[index][2];
            let Va = UDL_record[index][0];
            let Vb = UDL_record[index][1];

            let Shear = [];
            let Moment = [];

            for (let x in X) {
                let shear = 0;
                let moment = 0;

                if (x / 100 > A) {
                    shear = shear + Va;
                    moment = moment - Va * ((x / 100) - A);
                }

                if (x / 100 > B) {
                    shear = shear + Vb;
                    moment = moment - Vb * ((x / 100) - B)
                }

                if (x / 100 > xStart && x / 100 <= xEnd) {
                    shear = shear + fy * ((x / 100) - xStart);
                    moment = moment - fy * ((x / 100) - xStart) * 0.5 * ((x / 100) - xStart);
                }
                else if (x / 100 > xEnd) {
                    shear = shear + fy * (xEnd - xStart);
                    moment = moment - fy * (xEnd - xStart) * ((x / 100) - xStart - 0.5 * (xEnd - xStart));
                }

                Shear.push(shear);
                Moment.push(moment);
            }
            return { Shear, Moment }
        }

        const shear_moment_LDL = (index) => {
            let xStart = linearLoads[index][0];
            let xEnd = linearLoads[index][1];
            let fy_Start = linearLoads[index][2];
            let fy_End = linearLoads[index][3];
            let Va = LDL_record[index][0];
            let Vb = LDL_record[index][1];

            let Shear = [];
            let Moment = [];

            for (let x in X) {
                let shear = 0;
                let moment = 0;

                if (x / 100 > A) {
                    shear = shear + Va;
                    moment = moment - Va * ((x / 100) - A);
                }

                if (x / 100 > B) {
                    shear = shear + Vb;
                    moment = moment - Vb * ((x / 100) - B)
                }

                if (x / 100 > xStart && x / 100 <= xEnd) {
                    if (Math.abs(fy_Start) > 0) {
                        const x_base = (x / 100) - xStart;
                        const f_cut = fy_Start - x_base * (fy_Start / (xEnd - xStart));
                        const R1 = 0.5 * x_base * (fy_Start - f_cut);
                        const R2 = x_base * f_cut;
                        shear = shear + R1 + R2;
                        moment = moment - R1 * (2 / 3) * x_base - R2 * (x_base / 2);
                    }
                    else {
                        const x_base = (x / 100) - xStart;
                        const f_cut = fy_End * (x_base / (xEnd - xStart));
                        const R = 0.5 * x_base * f_cut;
                        shear = shear + R;
                        moment = moment - R * (x_base / 3);
                    }
                }
                else if (x / 100 > xEnd) {
                    if (Math.abs(fy_Start) > 0) {
                        const R = 0.5 * fy_Start * (xEnd - xStart);
                        const xr = xStart + (1 / 3) * (xEnd - xStart);
                        shear = shear + R;
                        moment = moment - R * ((x / 100) - xr);
                    }
                    else {
                        const R = 0.5 * fy_End * (xEnd - xStart);
                        const xr = xStart + (2 / 3) * (xEnd - xStart);
                        shear = shear + R;
                        moment = moment - R * ((x / 100) - xr);
                    }
                }

                Shear.push(shear);
                Moment.push(moment);
            }
            return { Shear, Moment }
        }


        // 
        if (nPL > 0) {
            amount.push({ PL: nPL });
            for (let index in pointLoads) {
                leikkausvoima.push(shear_moment_PL(index).Shear);
                momentti.push(shear_moment_PL(index).Moment);
            }
        }

        if (nPM > 0) {
            amount.push({ PM: nPM });
            for (let index in pointMoments) {
                leikkausvoima.push(shear_moment_PM(index).Shear);
                momentti.push(shear_moment_PM(index).Moment);
            }
        }

        if (nUDL > 0) {
            amount.push({ UDL: nUDL });
            for (let index in distributedLoads) {
                leikkausvoima.push(shear_moment_UDL(index).Shear);
                momentti.push(shear_moment_UDL(index).Moment);
            }
        }

        if (nLDL > 0) {
            amount.push({ LDL: nLDL });
            for (let index in linearLoads) {
                leikkausvoima.push(shear_moment_LDL(index).Shear);
                momentti.push(shear_moment_LDL(index).Moment);
            }
        }

        // Leikkausvoima ja momentti pitää vielä yhdistää/summata 
        leikkausvoima.forEach((arr) => {
            arr.forEach((value, i) => {
                if (newShearforce[i])
                    newShearforce[i] += value;
                else
                    newShearforce[i] = value;
            })
        });
        momentti.forEach((arr) => {
            arr.forEach((value, i) => {
                if (newMoment[i])
                    newMoment[i] += value;
                else
                    newMoment[i] = value;
            })
        });

        leikkausvoima.length = 0;
        momentti.length = 0;

        const maxShearforce = Math.max(...newShearforce);
        const minShearforce = Math.min(...newShearforce);
        const maxMoment = Math.max(...newMoment);
        const minMoment = Math.min(...newMoment);
        const maxmin = [];
        maxmin.push(maxShearforce.toFixed(2));
        maxmin.push(minShearforce.toFixed(2));
        maxmin.push(maxMoment.toFixed(2));
        maxmin.push(minMoment.toFixed(2));
        forceChange(maxmin);

        setFormData({ ...formData, check: true });

        console.log('Pystykuorma pisteessä A on ' + reactions[0].toFixed(2) + ' [kN]');
        console.log('Pystykuorma pisteessä B on ' + reactions[2].toFixed(2) + ' [kN]');

        setShearData({
            labels: X,
            datasets: [
                {
                    label: "X-akseli",
                    data: XAxis,
                    borderColor: 'black',
                    borderWidth: 3,
                    tension: 0.1,
                    pointRadius: 0
                },
                {
                    label: "V [kN]",
                    data: newShearforce,
                    backgroundColor: '#97ff97',
                    borderColor: 'green',
                    borderWidth: 1,
                    fill: true,
                    tension: 0.1,
                    pointRadius: 0
                },
            ],
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Leikkausvoima-käyrä',
                    }
                },
                maintainAspectRatio: true,
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: false,
                            },
                        },
                    ],
                },
            },
        });

        setMomentData({
            labels: X,
            datasets: [
                {
                    label: "X-akseli",
                    data: XAxis,
                    borderColor: 'black',
                    borderWidth: 3,
                    tension: 0.1,
                    pointRadius: 0
                },
                {
                    label: "M [kNm]",
                    data: newMoment,
                    backgroundColor: '#ffe5e5',
                    borderColor: 'red',
                    borderWidth: 1,
                    fill: true,
                    tension: 0.1,
                    pointRadius: 0
                },
            ],
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Taivutusmomentti-käyrä',
                    }
                },
                maintainAspectRatio: true,
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: false,
                            },
                        },
                    ],
                },
            },
        });

    }


    return (
        <div className="App">

            {
                formData.check ?
                    <>
                        <div style={{ width: 700 }}>
                            <LineChart chartData={momentData} />
                        </div><div style={{ width: 700 }}>
                            <LineChart chartData={shearData} />
                        </div>
                    </>
                    :
                    null
            }
            {
                (showResultButton && !formData.check) ?
                    <button type="button" class="btn btn-primary" onClick={CalculateShearForce}>Laske tulos</button>
                    :
                    null
            }
        </div>
    )
}

export default BeamCalculator;
