import React from "react";
import { Tooltip, IconButton, Icon, Menu, MenuItem } from "@material-ui/core";

const ResumeOptions = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const openMenu = (/** @type {MouseEvent} */ e) => {
        setAnchorEl(e.currentTarget);
    };

    const onClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Tooltip title="More options" enterDelay={500}>
                <IconButton onClick={openMenu}>
                    <Icon>more_vert</Icon>
                </IconButton>
            </Tooltip>
            <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={onClose}>
                <MenuItem onClick={onClose}>Update</MenuItem>
                <MenuItem onClick={onClose}>View file details</MenuItem>
                <MenuItem onClick={onClose} disabled>
                    View version history
                </MenuItem>
            </Menu>
        </>
    );
};

export default ResumeOptions;
