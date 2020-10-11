import React from "react";
import ReactDOM from "react-dom";
import styles from "./Image.module.scss";
import PinchZoomPan from "react-responsive-pinch-zoom-pan";
import $ from "jquery";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import history from "../../history";

import {
    IconButton,
    Icon,
    CircularProgress,
    Typography,
    Button,
} from "@material-ui/core";
import { withTheme } from "@material-ui/styles";

class Image extends React.Component {
    static Cache = {};

    state = {
        fullscreen: false,
        error: null,
        blobUrl: null,
        loading: true,
    };

    componentDidMount() {
        setTimeout(this.loadImage, this.props.loadDelay || 10);
    }

    loadImage = () => {
        const { src } = this.props;

        this.setState({
            loading: true,
        });

        if (Image.Cache[src]) {
            const { loading, promise, data } = Image.Cache[src];

            if (loading) {
                // Loading. Hook into promise
                promise
                    .then(res => {
                        this.setState({
                            loading: false,
                            error: null,
                            blobUrl: res,
                        });
                    })
                    .catch(err => {
                        this.setState({
                            loading: false,
                            error:
                                (err && err.message) ||
                                (typeof err === "string" && err) ||
                                "Unknown error",
                        });
                    });
            } else {
                // Data ready
                this.setState({
                    loading: false,
                    error: null,
                    blobUrl: data,
                });
            }
        } else {
            // Not in cache
            Image.Cache[src] = {
                loading: true,
                promise: new Promise((resolve, reject) => {
                    axios
                        .get(src, {
                            responseType: "blob",
                        })
                        .then(res => {
                            const url = URL.createObjectURL(res.data);

                            resolve(url);

                            this.setState({
                                loading: false,
                                error: null,
                                blobUrl: url,
                            });

                            Image.Cache[src].loading = false;
                            Image.Cache[src].data = url;
                        })
                        .catch(err => {
                            reject(err);

                            Image.Cache[src] = null;

                            this.setState({
                                loading: false,
                                error: err.message,
                            });
                        });
                }),
            };
        }
    };

    render() {
        const {
            src,
            alt = "",
            className = "",
            disableFullscreenViewer = false,
            theme,
            caption,
            loadDelay,
            disableHoverZoom = false,
            ...others
        } = this.props;

        const { error, blobUrl, loading, fullscreen } = this.state;

        const backgroundStyle = {
            backgroundColor: theme.palette.background.imageBack,
        };

        const imageRef = React.createRef();

        return (
            <>
                <div
                    ref={imageRef}
                    className={`${className} ${styles.wrapper}`}
                    {...others}
                    onClick={() => this.setState({ fullscreen: true })}
                >
                    <CSSTransition
                        in={!error && !loading && !!blobUrl}
                        timeout={300}
                        unmountOnExit
                        mountOnEnter
                        classNames={styles.image}
                        appear
                    >
                        <div
                            className={
                                styles.image +
                                (disableHoverZoom ? ` ${styles.noZoom}` : "")
                            }
                            style={{
                                backgroundImage: `url(${blobUrl || ""})`,
                                ...backgroundStyle,
                            }}
                        />
                    </CSSTransition>
                    {caption && (
                        <div
                            className={`${styles.overlay} ${
                                error || loading ? "disabled" : ""
                            }`}
                        >
                            {caption}
                        </div>
                    )}
                    <CSSTransition
                        in={error && !loading}
                        timeout={500}
                        unmountOnExit
                        mountOnEnter
                        classNames={styles.error}
                    >
                        <div className={styles.error} style={backgroundStyle}>
                            <Typography
                                color="error"
                                variant="subtitle1"
                                align="center"
                            >
                                Could not load image
                                <br />
                                {error || "Unknown error"}
                                <br />
                                <Button
                                    variant="outlined"
                                    style={{ marginTop: 10 }}
                                    onClick={this.loadImage}
                                >
                                    Retry
                                </Button>
                            </Typography>
                        </div>
                    </CSSTransition>
                    <CSSTransition
                        in={loading}
                        timeout={500}
                        unmountOnExit
                        classNames={styles.loading}
                    >
                        <div className={styles.loading} style={backgroundStyle}>
                            <CircularProgress />
                        </div>
                    </CSSTransition>
                    {/* <img src={src} alt={alt} /> */}
                </div>
                {!disableFullscreenViewer && !loading && !error && (
                    <FullscreenViewer
                        src={blobUrl}
                        alt={alt}
                        show={fullscreen}
                        imageRef={imageRef}
                        onClick={e => {
                            if (e && e.stopPropagation) e.stopPropagation();
                            this.setState({ fullscreen: false });
                        }}
                    />
                )}
            </>
        );
    }
}

export default withTheme(Image);

class FullscreenViewer extends React.PureComponent {
    state = {
        injectableStyles: {},
    };

    constructor(props) {
        super(props);
        if (document.querySelectorAll("#fs-image-viewer").length === 0) {
            // console.log("Creating fs-image-viewer div");
            let div = document.createElement("div");
            div.id = "fs-image-viewer";
            document.querySelector("body").appendChild(div);
        }

        this.fsImageViewer = document.querySelector("div#fs-image-viewer");
    }

    setInjectableStyles = injectableStyles => {
        this.setState({ injectableStyles });
    };

    componentDidUpdate({ show: oldShow }) {
        if (this.props.show !== oldShow) {
            if (this.props.show) {
                history.push(history.location.pathname + "#img");
                $("body").css({
                    overflow: "hidden",
                });

                this.backListener = history.listen((location, action) => {
                    if (action === "POP") {
                        // console.log("POP! ", location);
                        this.props.onClick();
                        if (this.backListener) this.backListener();
                    }
                });
            } else {
                $("body").css({
                    overflow: "",
                });
            }

            if (!this.props.imageRef || !this.props.imageRef.current) return;
            this.loadInjectableStyles();
            setTimeout(() => {
                this.setState({ show: this.props.show });
            });
        }
    }

    loadInjectableStyles = () => {
        const image = $(this.props.imageRef.current);
        const height = image.height();
        const width = image.width();
        const x = image.offset().left - window.scrollX;
        const y = image.offset().top - window.scrollY;

        this.setInjectableStyles({
            height,
            width,
            top: y,
            left: x,
        });
    };

    onCloseClick = e => {
        e.stopPropagation();
        history.goBack();
    };

    render() {
        const { src, alt = "" } = this.props;

        return ReactDOM.createPortal(
            <CSSTransition
                in={this.state.show}
                timeout={500}
                classNames={styles.fsRoot}
                unmountOnExit
                mountOnEnter
                onEntering={() => this.setInjectableStyles({})}
                onExit={() => this.loadInjectableStyles()}
            >
                <div
                    className={styles.fsRoot}
                    style={{ ...this.state.injectableStyles }}
                >
                    <div>
                        <PinchZoomPan
                            className="aloha"
                            initialScale={1}
                            minScale={1}
                            maxScale={3}
                            zoomButtons={false}
                            position="center"
                        >
                            <img src={src} alt={alt} />
                        </PinchZoomPan>
                    </div>
                    <IconButton
                        className={styles.fsClose}
                        onClick={this.onCloseClick}
                    >
                        <Icon>close</Icon>
                    </IconButton>
                </div>
            </CSSTransition>,
            this.fsImageViewer
        );
    }
}
