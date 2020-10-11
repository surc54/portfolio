import { createMuiTheme } from "@material-ui/core";
import * as colors from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/styles";
import axios from "axios";
import React from "react";
import { SnackbarProvider } from "notistack";
import { Route, Router } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { ConfigContext } from "../contexts/ConfigContext";
import history from "../history";
import styles from "./App.module.scss";
import Content from "./Content";
import LoadingConfig from "./loading-config/LoadingConfig";

const theme = createMuiTheme({
    palette: {
        primary: colors.orange,
        secondary: colors.blue,
    },
    typography: {
        h1: {
            fontSize: 38,
            fontWeight: "bold",
        },
        h2: {
            fontSize: 48,
            fontWeight: "bold",
        },
        h3: {
            fontSize: 24,
            fontWeight: "bold",
        },
    },
});

theme.typography.h2 = {
    ...theme.typography.h1,
    [theme.breakpoints.down("md")]: {
        fontSize: 42,
    },
    [theme.breakpoints.down("sm")]: {
        fontSize: 38,
    },
    [theme.breakpoints.down("xs")]: {
        fontSize: 32,
    },
};

const CONFIG_URL = "https://www.hadithya.com/me/config.json";

class App extends React.Component {
    state = {
        config: {
            status: "loading",
            error: null,
        },
    };

    landing = true;

    componentDidMount() {
        setTimeout(() => {
            setTimeout(this.loadConfig, 100);
        }, 1000);
        // this.loadConfig();
    }

    loadConfig = () => {
        this.setState({
            config: {
                ...this.state.config,
                status: "loading",
            },
        });

        axios
            .get(CONFIG_URL)
            .then(res => {
                if (res.data.maintenance) {
                    throw new Error("Website is in maintenance mode");
                }
                this.setState({
                    config: {
                        status: "ok",
                        error: null,
                        ...res.data,
                    },
                });
            })
            .catch(err => {
                this.setState({
                    config: {
                        status: "error",
                        error: err.message || "Unknown error",
                    },
                });
            });
    };

    render() {
        return (
            <ThemeProvider theme={theme}>
                <SnackbarProvider maxSnack={3}>
                    <ConfigContext.Provider value={this.state.config}>
                        <LoadingConfig
                            open={["loading", "error"].includes(
                                this.state.config.status
                            )}
                            error={this.state.config.error}
                            loading={this.state.config.status === "loading"}
                            onRetry={this.loadConfig}
                        />
                        <CSSTransition
                            in={this.state.config.status === "ok"}
                            timeout={300}
                            classNames={styles.componentAnim}
                            unmountOnExit
                        >
                            <Router history={history}>
                                <Route component={Content} />
                            </Router>
                        </CSSTransition>
                    </ConfigContext.Provider>
                </SnackbarProvider>
            </ThemeProvider>
        );
    }
}

export default App;
