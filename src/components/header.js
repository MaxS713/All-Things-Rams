import Navbar from './nav';
import logolink from '../images/placeholder-logo.jpg'
import '../App.css';


export default function Head() {

    return(
        <>
        <div id="headstyle">
            <div className="froat">
            {/* <img src={logolink} style= /> */}
            <h1>ALL THINGS RAMS</h1>
                <p id='disclaimer'>AllThingsRams.com is not affiliated with the L.A. Rams or the National Football League</p>
                </div>
                
                <Navbar />
                
        </div>

        </>
    )
}