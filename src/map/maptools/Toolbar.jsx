import StyleControl from "./stylecontrol/StyleControl";
import './Toolbar.css'

export default function Toolbar(props) {

    return (
        <div className="toolbar">
            <p className="toolbar-title">Map tools</p>
            <div className="tool-wrapper first">
                <p className="style-title">Map Style</p>
                <StyleControl controlFunction={props.mapToolFunctions} className="style-control" />
            </div>
        </div>
    )
}