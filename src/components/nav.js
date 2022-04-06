import {Routes, Route, NavLink} from 'react-router-dom';
import '../App.css';

export default function Navbar() {
    return (
        <div id='navstyle'>
        <NavLink to='/' className='navItem'>Home</NavLink>
        <NavLink to='/' className='navItem'>News</NavLink>
        <NavLink to='/' className='navItem'>Socials</NavLink>
        <NavLink to='/' className='navItem'>Team</NavLink>
        </div>
    )
}