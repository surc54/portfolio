import React from "react";
import ReactDOM from "react-dom";
import { Paper, Typography, Button, IconButton, Icon } from "@material-ui/core";
import { CSSTransition } from "react-transition-group";
import { Link, withRouter } from "react-router-dom";
import styles from "./OverlayMenu.module.scss";
import FullscreenBackdrop from "../FullscreenBackdrop";

const handleClose = ({ e, onClose, setAllButtonsDisabled }) => {
    setAllButtonsDisabled(true);
    onClose(e);
};

const OverlayMenu = ({
    open,
    timeout = 300,
    onClose,
    actions,
    disableIfSelected = false,
    match,
    allButtonsDisabled,
    setAllButtonsDisabled,
}) => {
    // console.log(open ? "open" : "close");

    return (
        <CSSTransition
            in={open}
            timeout={timeout}
            classNames={styles.menuWrapper}
            unmountOnExit
        >
            <FullscreenBackdrop
                onClick={onClose}
                className={styles.menuWrapper}
            >
                <CSSTransition
                    in={open}
                    timeout={timeout}
                    classNames={styles.paper}
                    appear
                >
                    <Paper square className={styles.paper}>
                        <div className={styles.header}>
                            <Typography variant="h1">Menu</Typography>
                            <div className="spacer"></div>
                            <IconButton onClick={onClose}>
                                <Icon>keyboard_arrow_up</Icon>
                            </IconButton>
                        </div>
                        {(() => {
                            return actions.map(
                                ({ name, path, external, disabled }) => (
                                    <Button
                                        onClick={e =>
                                            handleClose({
                                                e,
                                                setAllButtonsDisabled,
                                                onClose,
                                            })
                                        }
                                        variant="outlined"
                                        fullWidth
                                        className={styles.menuButton}
                                        key={path}
                                        component={!external ? Link : undefined}
                                        disabled={
                                            allButtonsDisabled ||
                                            disabled ||
                                            (disableIfSelected &&
                                                match.path === path)
                                        }
                                        to={!external ? path : undefined}
                                        href={external ? path : undefined}
                                    >
                                        {name}
                                    </Button>
                                )
                            );
                        })()}
                    </Paper>
                </CSSTransition>
            </FullscreenBackdrop>
        </CSSTransition>
    );
};

class PortalizedMenu extends React.Component {
    constructor(props) {
        super(props);
        if (document.querySelectorAll("#overlay-menu").length === 0) {
            // console.log("Creating overlay-menu div");
            let div = document.createElement("div");
            div.id = "overlay-menu";
            document.querySelector("body").appendChild(div);
        }
    }

    render() {
        return ReactDOM.createPortal(
            <OverlayMenu {...this.props} />,
            document.getElementById("overlay-menu")
        );
    }
}

export default withRouter(PortalizedMenu);
