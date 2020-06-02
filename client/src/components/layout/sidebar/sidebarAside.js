import React from 'react';
import plus from 'assets/icons/plus_icon.svg';

export default class SidebarAside extends React.Component {
    render() {
        return (
            <aside className="dashboard--aside">
                <div className="aside--tooltip__container">
                    <button onClick={this.props.toggleModal} className="aside--btn">
                        <img src={plus} alt="icon" />
                    </button>
                    <span class="aside--tooltip__text">Click here to create a new site</span>
                </div>
            </aside>
        );
    }
}
