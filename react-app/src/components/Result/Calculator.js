import React, { useState, useEffect } from 'react';
import LineChart from "./LineChart";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Calculator(props) {
    const {
        values,
        setValues,
        forceChange,
        shearData,
        setShearData,
        momentData,
        setMomentData,
        showResultButton,
        setShowResultButton
    } = props;

    const X = [];
    // Luodaan tyhjät taulukot kuormituksille
    const [pointLoads, setPointLoads] = useState([[]]);
    const [pointMoments, setPointMoments] = useState([[]]);
    const [distributedLoads, setDistributedLoads] = useState([[]]);
    const [linearLoads, setLinearLoads] = useState([[]]);

    // Luodaan tyhjä tukireaktio-taulukko
    const reactions = [];
    // Haetaan käyttöliittymästä palkin pituus ja tukien sijainnit
    const span = parseInt(values.span);
    const A = parseInt(values.a);
    const B = parseInt(values.b);
    // apumuuttujat tukireaktiota laskettaessa
    let va, ha, vb;
    // eri kuormituksista saadut momenttien ja leikkausvoimien arvot
    let [leikkausvoima, setLeikkausvoima] = useState([]);
    let [momentti, setMomentti] = useState([]);

    // Luodaan tyhjät tulostustaulukot, johon summautuu lopulliset momenttien ja leikkausvoimien arvot
    let newMoment = [];
    let newShearforce = [];



    // Lisätään kuormituksille taulukkoon taulukko (esim. kaksi taulukkoa taulukossa [[], []])
    useEffect(() => {
        setPointLoads([[parseInt(values.xp1), 0, parseInt(values.fy1)]]);
        setPointMoments([[parseInt(values.xm1), parseInt(values.m1)]]);
        setDistributedLoads([[parseInt(values.xStartUDL1), parseInt(values.xEndUDL1), parseInt(values.fyUDL1)]]);
        setLinearLoads([[parseInt(values.xStartLDL1), parseInt(values.xEndLDL1), parseInt(values.fy_StartLDL1), parseInt(values.fy_EndLDL1)]]);
        // setValues({ ...values, changed: true });
    }, [values.changed == false]);

    // Varsinainen laskentafunktio, jota kutsutaan
    const CalculateForce = () => {
        // Lisätään toinen pistekuorma
        if (values.fy2) {
            pointLoads.push([parseInt(values.xp2), 0, parseInt(values.fy2)]);
        }
        // Lisätään kolmas pistekuorma
        if (values.fy3) {
            pointLoads.push([parseInt(values.xp3), 0, parseInt(values.fy3)]);
        }
        // Lisätään toinen pistemomentti
        if (values.m2) {
            pointMoments.push([parseInt(values.xm2), parseInt(values.m2)]);
        }
        // Lisätään kolmas pistemomentti
        if (values.m3) {
            pointMoments.push([parseInt(values.xm3), parseInt(values.m3)]);
        }
        // Lisätään toinen tasainen viivakuorma
        if (values.fyUDL2) {
            distributedLoads.push([parseInt(values.xStartUDL2), parseInt(values.xEndUDL2), parseInt(values.fyUDL2)]);
        }
        // Lisätään kolmas tasainen viivakuorma
        if (values.fyUDL3) {
            distributedLoads.push([parseInt(values.xStartUDL3), parseInt(values.xEndUDL3), parseInt(values.fyUDL3)]);
        }
        // Lisätään toinen lineaarinen viivakuorma
        if (values.fy_EndLDL2) {
            linearLoads.push([parseInt(values.xStartLDL2), parseInt(values.xEndLDL2), parseInt(values.fy_StartLDL2), parseInt(values.fy_EndLDL2)]);
        }
        // Lisätään kolmas lineaarinen viivakuorma
        if (values.fy_EndLDL3) {
            linearLoads.push([parseInt(values.xStartLDL3), parseInt(values.xEndLDL3), parseInt(values.fy_StartLDL3), parseInt(values.fy_EndLDL3)]);
        }

        // jaetaan palkin pituusmetri 100 osaan
        const divs = 100 * span;
        let delta = span / divs;
        // palkin osamitat taulukkoon, jota käytetään laskennassa
        for (var i = 0; i < span; i += delta) {
            X.push(i.toFixed(2));
        }
        // x-akselin arvot viivadiagrammiin
        let XAxis = [];
        for (var i = 0; i < span; i += delta) {
            XAxis.push(0);
        }

        // lasketaan kuormitusten lkm
        const nPL = pointLoads.length;
        const nPM = pointMoments.length;
        const nUDL = distributedLoads.length;
        const nLDL = linearLoads.length;

        // Alustetaan tukireaktiot
        reactions.push(0);
        reactions.push(0);
        reactions.push(0);

        // Lasketaan tukireaktio PL-kuormitustapauksissa
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

        // Lasketaan tukireaktio PM-kuormitustapauksissa
        const reactions_PM = (index) => {
            let xm = pointMoments[index][0];
            let m = pointMoments[index][1];
            let la_vb = B - A;
            let Vb = m / la_vb;
            let Va = -Vb;

            return { Va, Vb }
        };

        // Lasketaan tukireaktio UDL-kuormitustapauksissa
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

        // Lasketaan tukireaktio LDL-kuormitustapauksissa
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

        // Summataan yksittäiset (index) PL-kuormitusten tukirektiot PL_record-taulukkoon
        let PL_record = [];
        if (nPL > 0) {
            for (let index in pointLoads) {
                va = reactions_PL(index).Va; // yksittäisen pistekuormituksen vasen tukireaktio (pysty)
                ha = reactions_PL(index).Ha; // yksittäisen pistekuormituksen vasen tukireaktio (pysty)
                vb = reactions_PL(index).Vb; // yksittäisen pistekuormituksen oikea tukireaktio 
                // Summaa tukireaktiot taulukkoon ([[1.tulos], [2.tulos]] <= kaksi pistekuormatapausta)
                // käytetään jatkossa momentin ja leikkausvoimien laskennassa
                PL_record.push([va, ha, vb]);

                // lopulliset tukireaktiot
                reactions[0] = reactions[0] + va;
                reactions[1] = reactions[1] + ha;
                reactions[2] = reactions[2] + vb;
            }
        }

        // PM-kuormitusten tukireaktioiden summaus
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

        // UDL-kuormitusten tukireaktioiden summaus
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

        // LDL-kuormitusten tukireaktioiden summaus
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

        // Lasketaan momentti ja leikkausvoima yksittäisissä (index) PL-kuormitustapauksissa
        const shear_moment_PL = (index) => {
            let xp = pointLoads[index][0]; // pistekuorman etäisyys palkin vasemmasta laidasta
            let fy = pointLoads[index][2]; // pistekuorman suuruus
            let Va = PL_record[index][0]; // vasen tukireaktio
            let Vb = PL_record[index][2]; // oikea tukireaktio

            // Luodaan tyhjät momentti ja leikkausvoimataulukot
            let Shear = [];
            let Moment = [];

            // käydään koko palkin pituus läpi
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
            // palautetaan saatu momentti/leikkausvoima-data  
            return { Shear, Moment }
        }

        // Lasketaan momentti ja leikkausvoima yksittäisissä (index) PM-kuormitustapauksissa
        const shear_moment_PM = (index) => {
            let xm = pointMoments[index][0]; // pistemomentin etäisyys palkin vasemmasta laidasta
            let m = pointMoments[index][1]; // pistemomentin suuruus palkin vasemmasta laidasta
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

        // Lasketaan momentti ja leikkausvoima yksittäisissä (index) UDL-kuormitustapauksissa
        const shear_moment_UDL = (index) => {
            let xStart = distributedLoads[index][0]; // tasaisen viivakuorman aloituksen etäisyys palkin vasemmasta laidasta
            let xEnd = distributedLoads[index][1]; // tasaisen viivakuorman lopetuksen etäisyys palkin vasemmasta laidasta
            let fy = distributedLoads[index][2]; // tasaisen viivakuorman suuruus
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

        // Lasketaan momentti ja leikkausvoima yksittäisissä (index) LDL-kuormitustapauksissa
        const shear_moment_LDL = (index) => {
            let xStart = linearLoads[index][0]; // lineaarisen viivakuorman aloituksen etäisyys palkin vasemmasta laidasta
            let xEnd = linearLoads[index][1]; // lineaarisen viivakuorman lopetuksen etäisyys palkin vasemmasta laidasta
            let fy_Start = linearLoads[index][2]; // lineaarisen viivakuorman aloituksen suuruus 
            let fy_End = linearLoads[index][3]; // lineaarisen viivakuorman lopetuksen suuruus 
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

        // Summataan PL-kuormitustapausten momentti ja leikkausvoimat 
        if (nPL > 0) {
            for (let index in pointLoads) {
                leikkausvoima.push(shear_moment_PL(index).Shear);
                momentti.push(shear_moment_PL(index).Moment);
            }
        }
        // Summataan PM-kuormitustapausten momentti ja leikkausvoimat
        if (nPM > 0) {
            for (let index in pointMoments) {
                leikkausvoima.push(shear_moment_PM(index).Shear);
                momentti.push(shear_moment_PM(index).Moment);
            }
        }
        // Summataan UDL-kuormitustapausten momentti ja leikkausvoimat
        if (nUDL > 0) {
            for (let index in distributedLoads) {
                leikkausvoima.push(shear_moment_UDL(index).Shear);
                momentti.push(shear_moment_UDL(index).Moment);
            }
        }
        // Summataan LDL-kuormitustapausten momentti ja leikkausvoimat
        if (nLDL > 0) {
            for (let index in linearLoads) {
                leikkausvoima.push(shear_moment_LDL(index).Shear);
                momentti.push(shear_moment_LDL(index).Moment);
            }
        }

        // Summataan kaikkien kuormitustapausten leikkausvoimat ja momentit 
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

        // taulukoiden tyhjennys
        leikkausvoima.length = 0;
        momentti.length = 0;

        // Maksimiarvojen haku taulukosta
        const maxShearforce = Math.max(...newShearforce);
        const minShearforce = Math.min(...newShearforce);
        const maxMoment = Math.max(...newMoment);
        const minMoment = Math.min(...newMoment);
        const maxmin = [];
        maxmin.push(maxShearforce.toFixed(2));
        maxmin.push(minShearforce.toFixed(2));
        maxmin.push(maxMoment.toFixed(2));
        maxmin.push(minMoment.toFixed(2));
        // maksimiarvojen vienti ylemmäksi index.js:ään
        forceChange(maxmin);

        // asetetaan check-arvoksi "true" --> laskennan arvot ok.
        setValues({ ...values, check: true });

        // tukireaktiot (näkyy konsolissa)
        console.log('Pystykuorma pisteessä A on ' + reactions[0].toFixed(2) + ' [kN]');
        console.log('Pystykuorma pisteessä B on ' + reactions[2].toFixed(2) + ' [kN]');
        console.log('Vaakakuorma pisteessä A on ' + reactions[1].toFixed(2) + ' [kN]');

        // asetaan shearData/momentData-stateen koko viivadiagrammin tarvitsemat data-asetukset
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
                (showResultButton && !values.check) ?
                    <>
                        <button type="button" class="btn btn-primary" onClick={CalculateForce}>Laske tulos</button>
                        <hr />
                    </>
                    :
                    null
            }
            {
                values.check ?
                    <>
                        <div style={{ width: 700 }}>
                            <LineChart chartData={momentData} />
                        </div><div style={{ width: 700 }}>
                            <LineChart chartData={shearData} />
                        </div>
                    </>
                    :
                    <p>Ei näytettäviä tuloksia</p>
            }
        </div>
    )
}


