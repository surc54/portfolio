import {
    Button,
    Container,
    Icon,
    IconButton,
    Paper,
    Typography,
    useMediaQuery,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import React from "react";
import ReactDOM from "react-dom";
import history from "../../../history";
import FullscreenBackdrop from "../../FullscreenBackdrop";
import Gallery from "../../gallery/Gallery";
import Description from "./description/Description";
import LinkNode from "./LinkNode";
import ModalHeader from "./ModalHeader";
import styles from "./ProjectModal.module.scss";

const SectionTitle = ({ children }) => {
    return (
        <Typography variant="h3" className={styles.sectionName}>
            {children}
        </Typography>
    );
};

const RawModal = ({
    initialPos = {},
    initialSize = {},
    onClose: onFullyClose,
    project = {},
}) => {
    const [open, setOpen] = React.useState(0);
    const { x, y } = initialPos;
    const { width, height } = initialSize;

    const {
        title = "Unknown Project",
        subtitle = null,
        // thumbnail, // Only used in card form
        launchable = false,
        url,
        description,
        gallery,
        tools,
        links,
    } = project;

    const containerRef = React.createRef();
    const ref = React.createRef();

    /** @type {import("@material-ui/core").Theme} */
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    let [initialStyle, setInitStyle] = React.useState({
        opacity: 0,
    });

    const onClose = (...params) => {
        const current = {
            height: ref.current.clientHeight,
            width: ref.current.clientWidth,
            top: ref.current.offsetTop,
            left: ref.current.offsetLeft,
        };

        const scaleX = width / current.width;
        const scaleY = height / current.height;

        const page = document.getElementById("page");
        setInitStyle({
            transform: `translateX(${-1 *
                (window.innerWidth / 2 - width / 2 - x) +
                page.scrollLeft}px) translateY(${-1 *
                (window.innerHeight / 2 -
                    height / 2 -
                    y +
                    page.scrollTop)}px) scaleX(${scaleX}) scaleY(${scaleY})`,
            opacity: 0,
            transition: "transform 0.25s, opacity 0.25s",
        });
        setTimeout(() => onFullyClose(...params), 200);
    };

    React.useEffect(() => {
        // setTimeout(() => {
        //     setOpen(true);
        // }, 2);
        setOpen(1);
        // setTimeout(() => setOpen(1), 1);
        setTimeout(() => setOpen(2), 1);
    }, []);

    React.useEffect(() => {
        if (open === 1 && ref.current) {
            const current = {
                height: ref.current.clientHeight,
                width: ref.current.clientWidth,
                top: ref.current.offsetTop,
                left: ref.current.offsetLeft,
            };

            const scaleX = width / current.width;
            const scaleY = height / current.height;

            const page = document.getElementById("page");

            setInitStyle({
                transform: `translateX(${-1 *
                    (window.innerWidth / 2 - width / 2 - x) +
                    page.scrollLeft}px) translateY(${-1 *
                    (window.innerHeight / 2 -
                        height / 2 -
                        y +
                        page.scrollTop)}px) scaleX(${scaleX}) scaleY(${scaleY})`,
                opacity: 0,
            });
        } else if (open === 2) {
            setInitStyle({
                transition: "transform 0.25s, opacity 0.25s",
                transform: "translate(0) scale(1)",
                opacity: 1,
            });
        }
        // eslint-disable-next-line
    }, [open]);

    return (
        <FullscreenBackdrop className={styles.backdrop} onClick={onClose}>
            <Container
                ref={containerRef}
                maxWidth="md"
                className={
                    styles.outerContainer + (isSmall ? " " + styles.small : "")
                }
            >
                <Paper
                    ref={ref}
                    style={initialStyle}
                    square={isSmall}
                    className={
                        styles.paper +
                        " scroll-bar" +
                        (isSmall ? " " + styles.small : "")
                    }
                >
                    <Container className={styles.content}>
                        <ModalHeader
                            title={title}
                            subtitle={subtitle}
                            actions={
                                <>
                                    {launchable && (
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            className="primary"
                                            onClick={() => window.open(url)}
                                        >
                                            Open
                                        </Button>
                                    )}
                                    <Button
                                        variant="outlined"
                                        onClick={onClose}
                                    >
                                        Done
                                    </Button>
                                    {false && (
                                        <IconButton>
                                            <Icon>more_vert</Icon>
                                        </IconButton>
                                    )}
                                </>
                            }
                        />
                        <section>
                            <Typography
                                className={styles.description}
                                variant="body1"
                                component="div"
                            >
                                {(() => {
                                    /** @type {string[]} */
                                    let type = description.type.split(":");

                                    return (
                                        <Description
                                            markdown={type[0] === "markdown"}
                                            fetchOnline={type[1] === "url"}
                                            data={description.data}
                                        />
                                    );
                                })()}
                            </Typography>
                        </section>
                        <section>
                            <SectionTitle>Gallery</SectionTitle>
                            <Gallery
                                src={gallery}
                                loadDelay={400}
                                disableHoverZoom
                            />
                        </section>
                        {tools && tools.length !== 0 && (
                            <section>
                                <SectionTitle>
                                    Tools, Languages, and Frameworks
                                </SectionTitle>
                                {tools.map(tool => (
                                    <LinkNode
                                        key={`${tool.url}:${tool.displayName}`}
                                        href={tool.url}
                                        baseProps={{
                                            className: styles.linkNode,
                                        }}
                                    >
                                        {tool.displayName}
                                    </LinkNode>
                                ))}
                            </section>
                        )}
                        {links && links.length !== 0 && (
                            <section>
                                <SectionTitle>Links</SectionTitle>
                                {links.map(link => (
                                    <LinkNode
                                        key={`${link.url}:${link.displayName}`}
                                        href={link.url}
                                        baseProps={{
                                            className: styles.linkNode,
                                        }}
                                    >
                                        {link.displayName}
                                    </LinkNode>
                                ))}
                            </section>
                        )}
                    </Container>
                </Paper>
            </Container>
        </FullscreenBackdrop>
    );
};

class ProjectModal extends React.Component {
    unlisten = null;
    image = false;
    userActivated = false;

    constructor(props) {
        super(props);
        if (document.querySelectorAll("#project-details").length === 0) {
            // console.log("Creating project-details div");
            let div = document.createElement("div");
            div.id = "project-details";
            document.querySelector("body").appendChild(div);
        }
    }

    componentDidMount() {
        const { onClose, project } = this.props;
        this.userActivated = false;

        history.push({
            pathname: history.location.pathname,
            hash: project.id,
        });

        this.unlisten = history.listen((location, action) => {
            if (
                action.toLowerCase() === "push" &&
                location.hash.toLowerCase().includes("img")
            ) {
                this.image = true;
            } else if (action.toLowerCase() === "pop") {
                if (this.image) this.image = false;
                else if (onClose && typeof onClose === "function") {
                    this.userActivated = true;
                    if (location.hash !== "") {
                        history.replace({
                            ...location,
                            hash: "",
                        });
                    }
                    onClose();
                }
            }
        });
    }

    componentWillUnmount() {
        if (this.unlisten) {
            this.unlisten();
        }

        if (
            !this.userActivated &&
            history.location.hash === `#${this.props.project.id}`
        ) {
            // history.goBack();
            history.push({
                ...history.location,
                hash: "",
            });
            // history.replace({
            //     ...history.location,
            //     hash: "",
            // });
        }
    }

    render() {
        return ReactDOM.createPortal(
            <RawModal {...this.props} />,
            document.getElementById("project-details")
        );
    }
}

export default ProjectModal;
