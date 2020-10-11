import React from "react";
import history from "../../history";
import ProjectCard from "./ProjectCard";
import styles from "./ProjectsPage.module.scss";
import { withConfig } from "../../contexts/ConfigContext";

const ProjectsPage = ({ config }) => {
    // const theme = useTheme();
    // const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
    const [hashId, setHashId] = React.useState(history.location.hash);

    React.useEffect(() => {
        history.listen((location, action) => {
            setHashId(location.hash);
        });
    }, []);

    if (config.status !== "ok") {
        return <div>No config...</div>;
    }

    const { projects } = config;

    return (
        <div className={styles.wrapper + " scroll-bar"}>
            {projects.map(p => (
                <ProjectCard
                    key={p.id}
                    project={p}
                    forceOpen={hashId === `#${p.id}`}
                />
            ))}
        </div>
    );
};

export default withConfig(ProjectsPage);
