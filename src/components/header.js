import Navbar from './nav';
import logolink from '../images/placeholder-logo.jpg'

import './styles/header.css';


export default function Head() {

    return(
        <>
        <div id="headstyle">

            <div className="header">
            <div className='headerImg'>
            <img src={logolink} width='70vw' />
            </div>
            <div className="title-and-disclaimer">
            <h1>ALL THINGS RAMS</h1>
                <p id='disclaimer'>AllThingsRams.com is not affiliated with the L.A. Rams or the National Football League</p>
            </div>
            </div>
                <Navbar />
                
                
        </div>

        </>
    )
}