import { useSelector} from 'react-redux'
import './SelectedRoad.css'

export default function SelectedRoad() {

    const selectedRoadFeatures = useSelector(state => state.selectedRoadFeatures.features)

    const renderTableData = () => {
        if(selectedRoadFeatures != null){
            return selectedRoadFeatures.map((feature, index) => {
                const { gid, length, maxspeedforward, roadtype, isoneway } = feature.properties
                return (
                   <tr key={index}>
                      <td>{gid}</td>
                      <td>{roadtype}</td>
                      <td>{length}</td>
                      <td>{maxspeedforward}</td>
                      <td>{isoneway}</td>
                   </tr>
                )
             })
        }
    }

    return (
        <div className="SelectedRoad">
            <p>Selected Roads</p>
            <table className="SelectedRoadTable">
                <thead>
                <tr>
                    <th>GID</th>
                    <th>Road Type</th>
                    <th>Length</th>
                    <th>Max Speed</th>
                    <th>One way</th>
                </tr>   
                </thead>
                <tbody>
                    {renderTableData()}
                </tbody>
            </table>
        </div>
    )

}

