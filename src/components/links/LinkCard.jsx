import {
    Icon,
    IconButton,
    Paper,
    Tooltip,
    Typography,
} from "@material-ui/core";
import copy from "copy-to-clipboard";
import { useSnackbar } from "notistack";
import React from "react";
import styles from "./LinksPage.module.scss";

const copyToClipboard = (text, enqueueSnack) => {
    copy(text, {
        message: "Copy to clipboard: #{key} , Enter",
        format: "text/plain",
    });

    enqueueSnack(`Copied "${text}" to clipboard.`);
};

const LinkCard = ({
    title,
    external,
    href,
    category,
    className,
    ...others
}) => {
    const { enqueueSnackbar } = useSnackbar();
    return (
        <Paper
            className={styles.linkPaper + (className ? " " + className : "")}
            key={href}
            onClick={() => external && window.open(href)}
            {...others}
        >
            <div className={styles.linkDetails}>
                <Typography variant="h6">{title}</Typography>
                <Tooltip title={href}>
                    <Typography
                        variant="subtitle1"
                        noWrap
                        className={styles.linkHref}
                    >
                        {category && (
                            <>
                                <strong style={{ fontWeight: "bold" }}>
                                    {category}
                                </strong>{" "}
                                -{" "}
                            </>
                        )}
                        {href}
                    </Typography>
                </Tooltip>
            </div>
            <span className="spacer"></span>
            <div className={styles.actions}>
                {external && (
                    <Tooltip title="Copy link to clipboard" enterDelay={500}>
                        <IconButton
                            onClick={e => {
                                e.stopPropagation();
                                copyToClipboard(href, enqueueSnackbar);
                            }}
                        >
                            <Icon>link</Icon>
                        </IconButton>
                    </Tooltip>
                )}
            </div>
        </Paper>
    );
};

export default LinkCard;
