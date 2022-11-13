import React from 'react';
import LineChart from "./LineChart";


export default function ChartForm(props) {
    const {
        values,
        setValues,
        momentData,
        shearData,
        CalculateForce
    } = props;

    return (
        <div>
            ChartForm
            <button type="button" class="btn btn-primary" onClick={CalculateForce}>Laske tulos</button>
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
                    null
            }
        </div>
    )
}
