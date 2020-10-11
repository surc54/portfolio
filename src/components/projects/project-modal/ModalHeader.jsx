import React from "react";
import { Typography, useTheme, useMediaQuery } from "@material-ui/core";
import styles from "./ProjectModal.module.scss";

const ModalHeader = ({ title, subtitle, actions: Actions }) => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <div
            className={
                styles.headerWrapper + (isSmall ? " " + styles.small : "")
            }
        >
            <div>
                <Typography className={styles.title} variant="h2">
                    {title}
                </Typography>
                <Typography className={styles.subtitle} variant="subtitle1">
                    {subtitle}
                </Typography>
            </div>
            <span className="spacer"></span>
            <div className={styles.actions}>{Actions}</div>
        </div>
    );
};

export default ModalHeader;
