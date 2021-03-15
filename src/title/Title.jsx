import logo from '../resources/logo.png'
import './Title.css'

export default function Title(){

    return (
        <div className="title-grid">
            <img className="logo" alt="VOLVO" src={logo} />
            <p className="title-text">Road Selector</p>
        </div>
    )
}