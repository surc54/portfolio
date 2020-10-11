import React from "react";
import ReactDOM from "react-dom";
import styles from "./LoadingConfig.module.scss";
import { CSSTransition } from "react-transition-group";
import { CircularProgress, Typography, Button } from "@material-ui/core";

const RawLoadingConfig = ({ open, error, loading, onRetry }) => {
    return (
        <CSSTransition
            in={open}
            timeout={300}
            classNames={styles.wrapper}
            unmountOnExit
            appear
        >
            <div className={styles.wrapper}>
                <CSSTransition
                    in={loading}
                    timeout={300}
                    classNames={styles.content}
                    unmountOnExit
                    appear
                >
                    <div className={styles.content}>
                        <CircularProgress />
                        <Typography
                            className={styles.loadingText}
                            variant="button"
                        >
                            Loading Config...
                        </Typography>
                    </div>
                </CSSTransition>
                <CSSTransition
                    in={!loading && !!error}
                    timeout={300}
                    classNames={styles.content}
                    unmountOnExit
                    appear
                >
                    <div className={styles.content}>
                        <Typography
                            className={styles.loadingText}
                            variant="h3"
                            color="error"
                        >
                            An error has occurred
                        </Typography>
                        <Typography
                            className={styles.loadingText}
                            variant="subtitle1"
                            color="error"
                        >
                            {error || "Unknown error"}
                        </Typography>
                        <Button variant="outlined" onClick={onRetry}>
                            Retry
                        </Button>
                    </div>
                </CSSTransition>
            </div>
        </CSSTransition>
    );
};

class LoadingConfig extends React.Component {
    constructor(props) {
        super(props);
        if (document.querySelectorAll("#loading-config").length === 0) {
            // console.log("Creating loading-config div");
            let div = document.createElement("div");
            div.id = "loading-config";
            document.querySelector("body").appendChild(div);
        }
    }

    render() {
        return ReactDOM.createPortal(
            <RawLoadingConfig {...this.props} />,
            document.getElementById("loading-config")
        );
    }
}

export default LoadingConfig;
