import React from 'react';
import ppLogo from "../../images/donation-logo/paypal-logo.png"
import visaLogo from "../../images/donation-logo/Visa-logo.jpg"
import venmoLogo from "../../images/donation-logo/Venmo-logo.png"

import './styles/donateModal.css';

const PopUp = props => {
    const { setPopUp } = props 
    return (
        <div id='slide'  className="PopUp">
            <div className="pu-content">
            <div className="pu-header">
            <h3 className="donate">Donate!</h3>
            {/* x close window */}
            <button className="popup-x" onClick={()=> setPopUp(false)} >X</button>
            </div>
            <div className="pu-text">
                <p className="pu-text">All Things Rams relies on the support of our fans to maintain our site</p>
            </div>
            <div className="pu-content-container">
                <div className="donate-portals"><img src={ppLogo} width='50px' height='50px' />Paypal</div>
                <div className="donate-portals"><div id="visa"><img src={visaLogo} width='50px' height='50px' />Visa</div></div>
                <div className="donate-portals"><img src={venmoLogo} width='50px' height='50px' />Venmo</div>
            </div>
            </div>    
        </div>
    );
}

export default PopUp;