import React from "react";
import styles from "./FullscreenBackdrop.module.scss";

const FullscreenBackdrop = ({ children, className, onClick, ...others }) => {
    const handleClick = (/** @type {MouseEvent} */ e) => {
        if (onClick && e.currentTarget === e.target) {
            onClick(e);
        }
    };
    return (
        <div
            {...others}
            onClick={handleClick}
            className={styles.fsBackdrop + ` ${className}`}
        >
            {children}
        </div>
    );
};

export default FullscreenBackdrop;
