import React from "react";
import axios from "axios";
import {
    Typography,
    Button,
    withStyles,
    CircularProgress,
    Icon,
} from "@material-ui/core";
import styles from "./Description.module.scss";
import ReactMarkdown from "react-markdown";

class Description extends React.Component {
    state = {
        readMore: false,
        description: null,
        error: "Unable to load error",
        loading: true,
    };

    componentDidMount() {
        this.loadDescription();
    }

    loadDescription = () => {
        let base = axios.create({
            baseURL: "/projects/scheduler-website",
        });

        this.setState({
            loading: true,
        });

        base.get("/description")
            .then(val => {
                this.setState({
                    description: val.data,
                    error: null,
                    loading: false,
                });
            })
            .catch(err => {
                console.error(
                    "An error occurred trying to get description: ",
                    err.message || err
                );
                this.setState({
                    error: err,
                    loading: false,
                });
            });
    };

    setReadMore = val => {
        this.setState({
            readMore: val,
        });
    };

    render() {
        const { readMore, description, error, loading } = this.state;
        const { classes, ...others } = this.props;

        if (loading) {
            return (
                <div
                    {...others}
                    className={`${styles.wrapper} scroll-bar loading`}
                >
                    <CircularProgress color="primary" />
                </div>
            );
        } else if (error) {
            return (
                <div
                    {...others}
                    className={`${styles.wrapper} scroll-bar error`}
                >
                    <Icon fontSize="large" color="error">
                        warning
                    </Icon>
                    <Typography align="center" variant="body1" color="error">
                        Could not retrieve description
                    </Typography>
                    <Button
                        className={styles.retryButton}
                        variant="outlined"
                        onClick={this.loadDescription}
                    >
                        Retry
                    </Button>
                </div>
            );
        } else {
            return (
                <div
                    {...others}
                    className={`${styles.wrapper}${
                        !readMore ? " compact" : ""
                    } scroll-bar`}
                >
                    <Typography variant="body1" align="justify" component="div">
                        <ReactMarkdown source={description} />
                    </Typography>
                    <div
                        className={`${styles.readMoreButton} ${
                            classes.readMoreButtonRoot
                        } ${readMore ? "inactive" : ""}`}
                    >
                        <Button onClick={() => this.setReadMore(true)}>
                            Read more
                        </Button>
                    </div>
                </div>
            );
        }
    }
}

export default withStyles(theme => ({
    readMoreButtonRoot: {
        background: `linear-gradient(transparent 0%, ${theme.palette.background
            .content || theme.palette.background.paper} 50px)`,
    },
}))(Description);
