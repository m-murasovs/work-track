import React, {Component} from 'react';

class MenuButton extends Component {
    handleClick = () => {
        this.props.onClick(this.props.index);
    } 

    render() {
        return (
            <button
                id="menu-button"
                type="button"
                className={this.props.modeIndex === 1 ? "control-button disabled" : "control-button menu-button"}
                onClick={this.handleClick}
                disabled={this.props.modeIndex === 1}
            >
                <span>{this.props.name}</span>
            </button>
        )
    }
}

export default MenuButton;