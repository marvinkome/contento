import React from 'react';
import plus from 'assets/icons/plus_icon.svg';

export default class SidebarAside extends React.Component {
    render() {
        return (
            <aside className="dashboard--aside">
                <button onClick={this.props.toggleModal} className="aside--btn">
                    <img src={plus} alt="icon" />
                </button>
            </aside>
        );
    }
}
