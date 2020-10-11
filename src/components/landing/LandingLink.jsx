import React from "react";
import { Button, makeStyles, Icon } from "@material-ui/core";
import { Link } from "react-router-dom";
import styles from "./LandingLink.module.scss";

const useStyles = makeStyles({
    buttonLabel: {
        justifyContent: "flex-start",
    },
});

const LandingLink = ({ name, path, external, disabled, ...others }) => {
    const classes = useStyles();

    return (
        <Button
            component={!external ? Link : undefined}
            to={path}
            disabled={disabled}
            variant="outlined"
            className={styles.button}
            classes={{
                label: classes.buttonLabel,
            }}
        >
            {name}
            <span className="spacer"></span>
            {/* Remove if icon not needed */}
            <Icon>chevron_right</Icon>
        </Button>
    );
};

export default LandingLink;
