import {
    Button,
    Grid,
    Icon,
    LinearProgress,
    Typography,
    IconButton,
    Tooltip,
    Hidden,
} from "@material-ui/core";
import axios from "axios";
import React from "react";
import { CSSTransition } from "react-transition-group";
import { withConfig } from "../../contexts/ConfigContext";
// import ResumeOptions from "./ResumeOptions";
import styles from "./ResumePage.module.scss";

// const RESUME_URL = "/scheduler/v1/eee.pdf";
// const RESUME_URL = "/assets/resume.pdf";

class ResumePage extends React.Component {
    state = {
        loading: true,
        percent: 0,
        error: null,
        blobUrl: null,
        lastUpdated: null,
    };

    pdfDownloadCancelToken = axios.CancelToken.source();

    static resumeCache = {
        loading: false,
        blobUrl: null,
        callbacks: [],
    };

    componentDidMount() {
        setTimeout(this.loadPdf, 250);
        // this.loadPdf();
        // console.log("Component mounted");
    }

    componentWillUnmount() {
        this.pdfDownloadCancelToken.cancel("User navigated away from page.");
    }

    loadCachedPdf = () => {
        if (
            !ResumePage.resumeCache.loading &&
            ResumePage.resumeCache.blobUrl === null
        )
            return false;
        if (ResumePage.resumeCache.loading) {
            ResumePage.resumeCache.callbacks = [
                ...(ResumePage.resumeCache.callbacks || []),
                this.loadPdf,
            ];
            return true;
        } else {
            this.setState({
                loading: false,
                percent: 100,
                error: null,
                blobUrl: ResumePage.resumeCache.blobUrl,
            });
            return true;
        }
    };

    loadPdf = (failedCallback = null) => {
        if (failedCallback) {
            this.setState({
                loading: false,
                percent: 0,
                error:
                    typeof failedCallback === "string"
                        ? failedCallback
                        : "Unknown error",
            });
            return;
        }

        if (this.props.config.status !== "ok") {
            this.setState({
                loading: false,
                percent: 0,
                error: "Config not loaded",
            });
            return;
        }

        this.getLastUpdated();

        if (this.loadCachedPdf()) return;

        this.setState({
            loading: true,
            percent: 0,
            // error: null,
        });

        ResumePage.resumeCache = {
            loading: true,
            blobUrl: null,
            callbacks: [],
        };

        axios
            .get(this.props.config.resume.pdf, {
                onDownloadProgress: this.updateLoading,
                responseType: "blob",
                cancelToken: this.pdfDownloadCancelToken.token,
            })
            .then(res => {
                let blob = new Blob([res.data], { type: "application/pdf" });
                const blobUrl = URL.createObjectURL(blob);
                this.setState({
                    blobUrl,
                    loading: false,
                    error: null,
                });

                const callbacks = ResumePage.resumeCache.callbacks;
                ResumePage.resumeCache = {
                    loading: false,
                    blobUrl,
                    callbacks: [],
                };

                for (let i = 0; i < callbacks.length; i++) {
                    const callback = callbacks[i];
                    callback();
                }
            })
            .catch(err => {
                if (err instanceof axios.Cancel) {
                    console.warn("PDF download cancelled: " + err.message);
                    const callbacks = ResumePage.resumeCache.callbacks;

                    ResumePage.resumeCache = {
                        loading: false,
                        blobUrl: null,
                        callbacks: [],
                    };

                    callbacks.forEach(callback => {
                        callback(err.message);
                    });
                    return;
                }
                this.setState({
                    loading: false,
                    percent: 0,
                    error: (err && err.message) || err || "Unknown Error",
                    blobUrl: null,
                });

                ResumePage.resumeCache = {
                    loading: false,
                    blobUrl: null,
                    callbacks: [],
                };

                const callbacks = ResumePage.resumeCache.callbacks;
                for (let i = 0; i < callbacks.length; i++) {
                    const callback = callbacks[i];
                    callback((err && err.message) || err || "Unknown Error");
                }
            });
    };

    updateLoading = (/** @type {ProgressEvent} */ progress) => {
        if (!progress.lengthComputable) {
            this.setState({
                percent: 0,
            });
        } else {
            this.setState({
                percent: Math.ceil((progress.loaded * 100) / progress.total),
            });
        }
    };

    renderMainContent = () => {
        const { loading, blobUrl, percent, error } = this.state;

        return (
            <>
                <CSSTransition
                    in={loading}
                    classNames={styles.progressWrapper}
                    timeout={300}
                    unmountOnExit
                >
                    <div className={styles.progressWrapper}>
                        <LinearProgress
                            className={styles.progressBar}
                            value={percent}
                            variant={
                                percent === 0 ? "indeterminate" : "determinate"
                            }
                        />
                        <Typography
                            variant="button"
                            align="center"
                            component="p"
                        >
                            Loading
                        </Typography>
                    </div>
                </CSSTransition>
                <CSSTransition
                    in={!loading && (!!error || !blobUrl)}
                    classNames={styles.errorWrapper}
                    timeout={300}
                    unmountOnExit
                >
                    <div className={styles.errorWrapper}>
                        <Typography color="error">{error}</Typography>
                        <Button
                            variant="outlined"
                            onClick={() => this.loadPdf()}
                        >
                            Retry
                        </Button>
                    </div>
                </CSSTransition>
                <CSSTransition
                    in={!loading && !(!!error || !blobUrl)}
                    classNames={styles.pdfObject}
                    timeout={0}
                    unmountOnExit
                >
                    <object
                        data={blobUrl}
                        type="application/pdf"
                        className={styles.pdfObject}
                    >
                        <div className={styles.errorWrapper}>
                            <Typography color="error" align="center">
                                Your device cannot view an embedded PDF. <br />
                                Use the download button below.
                            </Typography>
                        </div>
                    </object>
                    {/* <embed
                        src={blobUrl}
                        type="application/pdf"
                        className={styles.pdfObject}
                    ></embed> */}
                </CSSTransition>
            </>
        );
    };

    getLastUpdated = () => {
        const { lastUpdated } = this.props.config.resume;

        this.setState({
            lastUpdated: new Date(lastUpdated).toLocaleString(),
        });
    };

    render() {
        // const { loading, blobUrl, percent, error } = this.state;
        return (
            <div>
                <div className={styles.pdfWrapper}>
                    {this.renderMainContent()}
                </div>
                <Grid container className={styles.actions}>
                    <Grid item xs={12} sm={6} className={styles.updatedText}>
                        <Hidden xsDown>
                            {this.state.lastUpdated && (
                                <Typography variant="caption">
                                    Last Updated: {this.state.lastUpdated}
                                </Typography>
                            )}
                        </Hidden>
                    </Grid>
                    <Grid item xs={12} sm={6} className={styles.buttons}>
                        <Button
                            variant="contained"
                            color="primary"
                            href={
                                !this.state.loading &&
                                this.state.blobUrl !== null &&
                                !this.state.error
                                    ? this.state.blobUrl
                                    : this.props.config.resume.pdf
                            }
                            download="resume_haridas_adithya.pdf"
                        >
                            Download
                        </Button>
                        <Tooltip title="Open in new tab" enterDelay={500}>
                            <IconButton
                                href={this.props.config.resume.pdf}
                                target="_blank"
                            >
                                <Icon>open_in_new</Icon>
                            </IconButton>
                        </Tooltip>
                        {/* <ResumeOptions /> */}
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withConfig(ResumePage);
