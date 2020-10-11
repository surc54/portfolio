import { ButtonBase } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./LinkNode.module.scss";

const LinkNode = ({
    children,
    href,
    useRouter = false,
    baseProps,
    className,
    ...others
}) => {
    const onClick = () => {
        window.open(href);
    };

    return (
        <ButtonBase
            {...baseProps}
            className={styles.buttonBase + " " + (baseProps.className || "")}
            component={useRouter ? Link : undefined}
            to={useRouter ? href : undefined}
            onClick={useRouter ? undefined : onClick}
        >
            <div className={styles.linkNode + " " + className} {...others}>
                {children}
            </div>
        </ButtonBase>
    );
};

export default LinkNode;
