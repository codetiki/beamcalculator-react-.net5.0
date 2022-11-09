import React from 'react'

export default function SelectedValuesForm(props) {
    const { values } = props;

    // Kopioidaan formData-objekti. Luodaan tyhjä values-objekti "target"
    function bestCopyEver(src) {
        return Object.assign({}, src);
    }

    const target = bestCopyEver(values);
    console.log("target 1", target);

    delete target.forceTypeId;
    Object.keys(target).map(k => target[k] == "0" ? delete target[k] : target[k]);
    Object.keys(target).map(k => target[k] == 0 ? delete target[k] : target[k]);
    // Object.keys(target).map(k => target[k] == true ? delete target[k] : target[k]);
    // Object.keys(target).map(k => target[k] == false ? delete target[k] : target[k]);
    Object.keys(target).map(k => target[k] == null ? delete target[k] : target[k]);

    return (
        <div>
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
    )
}
