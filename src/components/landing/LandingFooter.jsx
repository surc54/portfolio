import React from "react";
import styles from "./LandingFooter.module.scss";
import { Link } from "@material-ui/core";

const LandingFooter = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <span>Copyright &copy; 2019</span>
                <Link href="/account">Account</Link>
            </div>
        </div>
    );
};

export default LandingFooter;
