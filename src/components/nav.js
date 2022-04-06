import {Routes, Route, NavLink} from 'react-router-dom';
import '../App.css';

export default function Navbar() {
    return (
        <div id='navstyle'>
        <button><NavLink to='/' className='navItem'>Home</NavLink></button>
        <button><NavLink to='/' className='navItem'>News</NavLink></button>
        <button><NavLink to='/' className='navItem'>Socials</NavLink></button>
        <button><NavLink to='/' className='navItem'>Team</NavLink></button>
        </div>
    )
}