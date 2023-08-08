import React from "react";

class Header extends React.Component {
    render(): React.ReactNode {
        return <div>
            <h1 className="header">Gordle <span>v{APP_VERSION}</span></h1>
        </div>
    }
}

export default Header;