import React from 'react';
import './styles/donateModal.css';

const PopUp = props => {
    const { setPopUp } = props 
    const { popUp } = props 
    const duringPopUp = popUp ? " during-popup" : ""  
    return (
        <div className="PopUp">
            <div className="pu-content">
            <div className="pu-header">
            <h3>Donate!</h3>
            {/* x close window */}
            <button className="popup-x" onClick={()=> setPopUp(false)} >X</button>
            </div>
            <div className="pu-content-container">
                <div className="donate-portals">Paypal</div>
                <div className="donate-portals">Visa</div>
                <div className="donate-portals">Venmo</div>
            </div>
            </div>    
        </div>
    );
}

export default PopUp;