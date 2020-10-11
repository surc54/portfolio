import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Icon,
    IconButton,
    Tooltip,
    Typography,
} from "@material-ui/core";
import React from "react";
import { CSSTransition } from "react-transition-group";
import ProjectModal from "./project-modal/ProjectModal";
import styles from "./ProjectCard.module.scss";

const ProjectCard = ({ project = {}, forceOpen = false }) => {
    const [expanded, setExpanded] = React.useState(forceOpen);
    const [initialLoc, setInitialLoc] = React.useState({});
    const cardRef = React.createRef();

    const {
        title = "Unknown Project",
        subtitle = null,
        thumbnail,
        launchable = false,
        url,
        description,
        // gallery, // Used in Modal
        // tools, // Used in Modal
        // links, // Used in Modal
    } = project;

    React.useEffect(() => {
        if (forceOpen) setExpanded(forceOpen);
    }, [forceOpen]);

    React.useEffect(() => {
        if (expanded && cardRef.current) {
            // setTimeout(() => setExpanded(false), 2000);
            setInitialLoc({
                initialPos: {
                    x: cardRef.current.offsetLeft,
                    y: cardRef.current.offsetTop,
                },
                initialSize: {
                    width: cardRef.current.clientWidth,
                    height: cardRef.current.clientHeight,
                },
            });
        }
        // eslint-disable-next-line
    }, [expanded, setExpanded]);

    const onCardClick = (/** @type {MouseEvent} */ e) => {
        setExpanded(true);
    };

    const onMoreDetailsClick = (/** @type {MouseEvent} */ e) => {
        e.stopPropagation();
        setExpanded(true);
    };

    const onOpenExternalClick = (/** @type {MouseEvent} */ e) => {
        e.stopPropagation();
        window.open(url);
    };

    return (
        <>
            <Card
                className={
                    styles.card + (expanded ? " " + styles.expanded : "")
                }
                elevation={0}
                ref={cardRef}
                onClick={onCardClick}
            >
                <CardHeader
                    title={<Typography variant="h3">{title}</Typography>}
                    subheader={subtitle}
                />
                <CardMedia
                    className={styles.media}
                    image={thumbnail.url}
                    title={thumbnail.caption}
                />
                <CardContent>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {description.small}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={onMoreDetailsClick}>More Details</Button>
                    <span className="spacer"></span>
                    {launchable && (
                        <Tooltip title="Launch" enterDelay={500}>
                            <IconButton onClick={onOpenExternalClick}>
                                <Icon>open_in_new</Icon>
                            </IconButton>
                        </Tooltip>
                    )}
                    {/* <Button>Open</Button> */}
                </CardActions>
            </Card>
            <CSSTransition
                appear
                in={expanded}
                timeout={250}
                classNames={styles.backdrop}
                unmountOnExit
            >
                <ProjectModal
                    {...initialLoc}
                    project={project}
                    onClose={() => setExpanded(false)}
                />
            </CSSTransition>
        </>
    );
};

export default ProjectCard;
