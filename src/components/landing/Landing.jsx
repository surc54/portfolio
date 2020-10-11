import React from "react";
import { Paper, Typography, IconButton, Icon } from "@material-ui/core";
import styles from "./Landing.module.scss";
import { withConfig } from "../../contexts/ConfigContext";
import LandingFooter from "./LandingFooter";
import LandingLink from "./LandingLink";

const Landing = ({ config }) => {
    return (
        <div className={styles.wrapper}>
            <Paper className={styles.paper}>
                <div className={styles.container}>
                    <Typography variant="h1" component={"div"}>
                        {config.title || "Loading..."}
                    </Typography>
                    <div className={styles.actions}>
                        {(() => {
                            if (config.status !== "ok") return;
                            let links = config.landing && config.landing.links;
                            return links.map(details => {
                                return (
                                    <LandingLink
                                        {...details}
                                        key={details.path}
                                    />
                                );
                            });
                        })()}
                    </div>

                    <div className={styles.quickLinks}>
                        <IconButton
                            href="https://www.github.com/surc54"
                            target="_blank"
                        >
                            <img src="github.svg" alt="Github" />
                        </IconButton>
                        <IconButton
                            href="https://www.linkedin.com/in/surc/"
                            target="_blank"
                        >
                            <img src="linkedin.svg" alt="LinkedIn" />
                        </IconButton>
                        <IconButton
                            href="mailto:adithyah54@gmail.com"
                            target="_blank"
                        >
                            <Icon>email</Icon>
                        </IconButton>
                    </div>
                </div>
                <span className="spacer"></span>
                <LandingFooter />
            </Paper>
        </div>
    );
};

export default withConfig(Landing);
