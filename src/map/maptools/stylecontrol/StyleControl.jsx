
export default function StyleControl(props) {

    const controlName = 'StyleControl';

    function changeStyle(event) {
        props.controlFunction(controlName, event.target.value)
    }

    return (
        <select onChange={changeStyle}>
            <option value='mapbox/light-v10'>Basic Light</option> 
            <option value='mapbox/dark-v10'>Basic Dark</option>
            <option value='mapbox/streets-v11'>Streets</option>
            <option value='mapbox/outdoors-v11'>Outdoors</option>
            <option value='mapbox/satellite-v9'>Satellite</option>
            <option value='mapbox/satellite-streets-v11'>Satellite-streets</option>
        </select>
    )
}