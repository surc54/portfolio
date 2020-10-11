import React from "react";
import {
    Link,
    Button,
    Typography,
    useTheme,
    useMediaQuery,
    IconButton,
    Icon,
    Tooltip,
} from "@material-ui/core";
import { Link as RouterLink, withRouter } from "react-router-dom";

import styles from "./Header.module.scss";
import { CSSTransition } from "react-transition-group";
import OverlayMenu from "./OverlayMenu";

const actions = [
    {
        name: "Resume",
        path: "/resume",
        external: false,
        disabled: false,
    },
    {
        name: "Projects",
        path: "/projects",
        external: false,
        disabled: false,
    },
    {
        name: "Links",
        path: "/links",
        external: false,
        disabled: false,
    },
];

const renderActions = ({
    pathname,
    setAllButtonsDisabled,
    allButtonsDisabled,
}) => {
    return actions.map(({ name, path, external, disabled }) =>
        !external ? (
            <Button
                key={path}
                color={pathname === path ? "primary" : "default"}
                component={RouterLink}
                to={path}
                disabled={disabled || pathname === path || allButtonsDisabled}
                onClick={() => setAllButtonsDisabled(true)}
            >
                {name}
            </Button>
        ) : (
            <Button
                key={path}
                color={pathname === path ? "primary" : "default"}
                href={path}
                disabled={disabled || allButtonsDisabled}
                onClick={() => setAllButtonsDisabled(true)}
            >
                {name}
            </Button>
        )
    );
};

const Header = ({ title, ...others }) => {
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [allButtonsDisabled, setAllButtonsDisabled] = React.useState(false);

    const theme = useTheme();
    const isMedium = useMediaQuery(theme.breakpoints.down("md"));
    const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

    const { pathname } = others.location;

    return (
        <div className={styles.header}>
            <Tooltip title="Go back to home page" enterDelay={500}>
                <Link component={RouterLink} to="/" color={"textPrimary"}>
                    {isMedium ? (
                        <Typography component="span" variant="h2">
                            AH
                        </Typography>
                    ) : (
                        <Typography component="span" variant="h2">
                            Adithya Haridas
                        </Typography>
                    )}
                </Link>
            </Tooltip>
            <CSSTransition
                in={!!title}
                classNames={styles.pageName}
                timeout={300}
                appear
            >
                {title && (
                    <Typography
                        component="span"
                        variant="h2"
                        className={styles.pageName}
                    >
                        &nbsp;/ {title}
                    </Typography>
                )}
            </CSSTransition>
            <span className="spacer"></span>
            {(!isSmall && (
                <div className={styles.actions}>
                    {renderActions({
                        pathname,
                        setAllButtonsDisabled,
                        allButtonsDisabled,
                    })}
                </div>
            )) || (
                <IconButton onClick={() => setMenuOpen(!menuOpen)}>
                    <Icon>menu</Icon>
                </IconButton>
            )}
            <OverlayMenu
                open={isSmall && menuOpen}
                onClose={() => setMenuOpen(false)}
                actions={actions}
                disableIfSelected
                setAllButtonsDisabled={setAllButtonsDisabled}
                allButtonsDisabled={allButtonsDisabled}
            />
        </div>
    );
};

export default withRouter(Header);
