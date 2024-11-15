import { Component, createElement } from "react";

import Drawer from "@mui/material/Drawer";

export default class DrawerUI extends Component {
    state = { updateDate: undefined };

    componentDidUpdate(prevProps) {
        if (this.props.showDrawer.value !== prevProps.showDrawer.value) {
            this.setState({ updateDate: new Date() });
        }
    }

    onCloseNow = () => {
        if (this.props.closeOnClickOutside) {
            if (this.props.showDrawer.readOnly) {
                console.warn("User has no rights to change the attribute to close the drawer");
            }
            this.props.showDrawer.setValue(false);
            this.setState({ updateDate: new Date() });
        }
        if (this.props.onCloseAction && this.props.onCloseAction.canExecute) {
            this.props.onCloseAction.execute();
        }
    };
    render() {
        return (
            <div>
                <Drawer
                    onClose={this.onCloseNow}
                    open={this.props.showDrawer.value}
                    anchor={this.props.anchor}
                    transitionDuration={{
                        enter: this.props.transitionDurationEnter,
                        exit: this.props.transitionDurationClose
                    }}
                >
                    {this.props.content}
                </Drawer>
            </div>
        );
    }
}
