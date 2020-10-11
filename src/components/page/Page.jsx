import {
    Container,
    Paper,
    useMediaQuery,
    useTheme,
    CircularProgress,
} from "@material-ui/core";
import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../header/Header";
import styles from "./Page.module.scss";

const ProjectsPage = React.lazy(() => import("../projects/ProjectsPage"));
const ResumePage = React.lazy(() => import("../resume/ResumePage"));
const LinksPage = React.lazy(() => import("../links/LinksPage"));
// import ProjectsPage from "../projects/ProjectsPage";
// import ResumePage from "../resume/ResumePage";
// import LinksPage from "../links/LinksPage";

const pathToTitle = {
    "/resume": "Resume",
    "/projects": "Projects",
    "/links": "Links",
};

const Page = ({ title, wrapperProps, ...others }) => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <div className={styles.wrapper} {...wrapperProps}>
            <Container
                // {...others}
                maxWidth={isSmall ? false : undefined}
                className={
                    styles.container + (isSmall ? " " + styles.small : "")
                }
            >
                <Paper
                    square
                    className={styles.paper + " scroll-bar"}
                    id="page"
                >
                    {/* <Link to="/projects">Heroo</Link> */}
                    {/* <Header title={pathToTitle["/resume"]} />
                    <div className={styles.headerBottom}></div> */}
                    <Switch>
                        <Route
                            exact
                            path="/resume"
                            render={Module(ResumePage)}
                        />
                        {/* <Route exact path="/resume" component={ResumePage} /> */}
                        <Route path="/projects" render={Module(ProjectsPage)} />
                        <Route exact path="/links" render={Module(LinksPage)} />
                    </Switch>
                </Paper>
            </Container>
        </div>
    );
};

const Module = Component => ({ match }) => {
    return (
        <>
            <Header title={pathToTitle[match.path.toLowerCase()]} />
            <div className={styles.headerBottom}></div>
            <Suspense fallback={<CircularProgress />}>
                <Component />
            </Suspense>
        </>
    );
};

export default Page;
