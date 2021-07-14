import React from "react";
import {IconButton} from "@material-ui/core";
import {MainAppBarMenu_ID} from "../MainAppBarProfileMenu";
import {AccountCircle} from "@material-ui/icons";

const AuthorizedProfilePreview: React.FC<{ handleProfileMenuOpen: (event: React.MouseEvent<HTMLElement>) => void }> =
    (props) => {
        return (
            <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={MainAppBarMenu_ID}
                aria-haspopup="true"
                onClick={props.handleProfileMenuOpen}
                color="inherit"
            >
                <AccountCircle/>
            </IconButton>
        );
    }

export default React.memo(AuthorizedProfilePreview);
