import React from "react";
import { Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Landing from "./landing/Landing";
import Page from "./page/Page";

class Content extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        const { location: newLocation } = nextProps;
        const { location: curLocation } = this.props;

        return (
            nextState !== this.state ||
            newLocation.pathname !== curLocation.pathname
        );
    }

    render() {
        const { location, match } = this.props;

        const wasLanding = this.landing;
        if (match.isExact !== this.landing) {
            this.landing = match.isExact; // dont do
            // this.setState({
            // landing: match.isExact,
            // });
        }
        return (
            <TransitionGroup
                childFactory={child =>
                    wasLanding || this.landing
                        ? React.cloneElement(child, {
                              classNames: "anim-comp",
                              timeout: 300,
                          })
                        : child
                }
            >
                <CSSTransition
                    key={location.key}
                    classNames="anim-comp-minimal"
                    timeout={250}
                >
                    <Switch location={location}>
                        <Route exact path="/" component={Landing} />
                        <Route component={Page} />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        );
    }
}

export default Content;
