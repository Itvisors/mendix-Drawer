import { Component, createElement } from "react";

import Drawer from '@material-ui/core/Drawer';

export default class DrawerUI extends Component {
    state = { showDrawer: false };

    componentDidUpdate () {
      if (this.state.showDrawer !== this.props.showDrawer.value) {
        this.setState({
          showDrawer: this.props.showDrawer.value,
        });
      }
    }

    onCloseNow = () => {
      if (this.props.closeOnClickOutside) {
        this.setState({
          showDrawer: false,
        });
        if (this.props.showDrawer.readOnly) {
          console.warn("User has no rights to change the attribute to close the drawer")
        }
        this.props.showDrawer.setValue(false);
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
            open={this.state.showDrawer}
            anchor={this.props.anchor}
            transitionDuration= {{enter:this.props.transitionDurationEnter,exit:this.props.transitionDurationClose}}
          >
            {this.props.content}
          </Drawer>
        </div>
      );
    }
}
