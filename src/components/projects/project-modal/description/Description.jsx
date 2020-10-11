import React from "react";
import { CircularProgress, Typography, Button } from "@material-ui/core";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "github-markdown-css/github-markdown.css";
import { CSSTransition } from "react-transition-group";
import styles from "./Description.module.scss";

// const SAMPLE_CACHE = {
//     url: {
//         status: "loading",
//         promise: new Promise(),
//     },
//     anotherUrl: {
//         status: "ok",
//         data: "...",
//     },
// };

class Description extends React.Component {
    static Cache = {};

    state = {
        loading: true,
        data: null,
        error: null,
    };

    componentDidMount() {
        if (this.props.fetchOnline) {
            // this.loadData();
            setTimeout(this.loadData, 400);
        } else {
            this.setState({
                loading: false,
                error: null,
                data: this.props.data,
            });
        }
    }

    loadData = () => {
        const url = this.props.data;

        this.setState({
            loading: true,
        });

        if (Description.Cache[url]) {
            const { status, promise, data } = Description.Cache[url];
            if (status === "loading") {
                promise
                    .then(res => {
                        this.setState({
                            loading: false,
                            data: res,
                            error: null,
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
                this.setState({
                    loading: false,
                    data: data,
                    error: null,
                });
            }
        } else {
            // Not in cache yet
            Description.Cache[url] = {
                status: "loading",
                promise: new Promise((resolve, reject) => {
                    axios
                        .get(url, {
                            responseType: "text",
                        })
                        .then(res => {
                            resolve(res.data);
                            this.setState({
                                loading: false,
                                data: res.data,
                                error: null,
                            });
                        })
                        .catch(err => {
                            reject(err);
                            this.setState({
                                loading: false,
                                error:
                                    (err && err.message) ||
                                    (typeof err === "string" && err) ||
                                    "Unknown error",
                            });
                            Description.Cache[url] = null;
                        });
                }),
            };
        }
    };

    render() {
        const { /** @type {boolean} */ markdown } = this.props;

        const {
            /** @type {boolean} */ loading,
            /** @type {any} */ data,
            /** @type {string} */ error,
        } = this.state;

        return (
            <div className={styles.wrapper}>
                <CSSTransition
                    in={loading}
                    timeout={300}
                    classNames={styles.anim}
                    unmountOnExit
                >
                    <div className={styles.wrapper}>
                        <CircularProgress size={20} />
                        <Typography variant="button" style={{ marginLeft: 20 }}>
                            Loading description
                        </Typography>
                    </div>
                </CSSTransition>
                <CSSTransition
                    in={!loading && !!error}
                    timeout={300}
                    classNames={styles.anim}
                    unmountOnExit
                >
                    <div className={styles.wrapper}>
                        <Typography variant="body1" color="error">
                            {error}
                        </Typography>
                        <Button
                            variant="outlined"
                            style={{ marginLeft: 20 }}
                            onClick={this.loadData}
                        >
                            Retry
                        </Button>
                    </div>
                </CSSTransition>
                <CSSTransition
                    in={!loading && !error && markdown}
                    timeout={300}
                    classNames={styles.anim}
                    unmountOnExit
                >
                    <div className={styles.description}>
                        <ReactMarkdown
                            className="markdown-body"
                            source={data}
                        />
                    </div>
                </CSSTransition>
                <CSSTransition
                    in={!loading && !error && !markdown}
                    timeout={300}
                    classNames={styles.anim}
                    unmountOnExit
                >
                    <div className={styles.description}>{data}</div>
                </CSSTransition>
            </div>
        );

        // if (loading) {
        //     return (
        //         <div className={styles.wrapper}>
        //             <CircularProgress size={20} />
        //             <Typography variant="button" style={{ marginLeft: 20 }}>
        //                 Loading description
        //             </Typography>
        //         </div>
        //     );
        // } else if (error) {
        //     return (
        //         <Typography variant="body1" color="error">
        //             {error}
        //         </Typography>
        //     );
        // } else {
        //     if (markdown) {
        //         return (
        //             <>
        //                 <ReactMarkdown
        //                     className="markdown-body"
        //                     source={data}
        //                 />
        //             </>
        //         );
        //     } else {
        //         return <>{data}</>;
        //     }
        // }
    }
}

export default Description;
