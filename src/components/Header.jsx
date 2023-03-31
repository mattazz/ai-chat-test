import { NavLink } from "react-router-dom"

function Header(){
    return(
        <header>
            <ul className="header-container">
                <NavLink className="header-menu" to={'/'}><li>Chat</li></NavLink>
                <NavLink className="header-menu" to={'/help'}><li>Help</li></NavLink>
            </ul>

        </header>
    )
}

export default Header