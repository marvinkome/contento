import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { classnames } from 'classnames';

class SidebarRoute extends React.Component {
    state = {
        showingChildren: false
    };

    componentDidMount() {
        const { item, match } = this.props;

        if (item.children && !!item.children.filter((child) => child.path === match.path).length) {
            this.setState({
                showingChildren: true
            });
        }
    }

    toggleChildren = (e) => {
        e.preventDefault();

        this.setState({
            showingChildren: !this.state.showingChildren
        });
    };

    isActive = () => {
        const { item, match } = this.props;

        if (item.path === match.path) return true;

        if (item.children && !!item.children.filter((child) => child.path === match.path).length) {
            return true;
        }

        return this.state.showingChildren;
    };

    renderChilren = (items) => {
        return items.map((item, index) => {
            const active = item.path === this.props.match.path;
            return (
                <div className="item" key={index}>
                    <Link className={classnames({ active })} to={item.path}>
                        {item.icon}
                        {item.title}
                    </Link>
                </div>
            );
        });
    };

    render() {
        const { item } = this.props;
        const active = this.isActive();

        return (
            <div>
                {item.path ? (
                    <Link to={item.path}>
                        {item.icon}
                        {item.title}
                    </Link>
                ) : (
                    item.children && (
                        <a
                            href="/"
                            className={classnames('sidebar__title', {
                                active
                            })}
                            onClick={this.toggleChildren}
                        >
                            {item.icon}
                            {item.title}
                        </a>
                    )
                )}

                {this.state.showingChildren && item.children && this.renderChilren(item.children)}
            </div>
        );
    }
}

export default withRouter(SidebarRoute);
