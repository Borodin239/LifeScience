import React from 'react';
import { alpha, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {Button} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            width: "1100px",
            margin: "auto",
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.primary.light, 0.35),
            '&:hover': {
                backgroundColor: alpha(theme.palette.primary.light, 0.45),
            },
            marginLeft: "50px",
            width: '500px',
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
            width: "100%",
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
        grow: {
            flexGrow: 1,
        },
        signButton: {
            display: "inline-block",
            color: theme.palette.common.white,
            fontSize: "1.1rem",
            fontWeight: 500,
            lineHeight: 1.5,
            marginRight: theme.spacing(1),
        },
        homeLink: {
            cursor: "pointer",
        }
    }),
);

const Header = (props: any) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };


    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleHomeClick = () => {
        //go to home page
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const loggedProfile = (
        <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
        >
            <AccountCircle />
        </IconButton>
    );

    const loggedOutProfile = (
        <div>
            <Button className={classes.signButton}>
                Sign in
            </Button>
            <Button className={classes.signButton}>
                Sign up
            </Button>
        </div>
    )

    return (
        <div className={classes.main}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.homeLink}
                                variant="h6"
                                noWrap
                                onClick={handleHomeClick}>
                        JetScience
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.grow}/>
                    <div>
                        {props.logged ? loggedProfile : loggedOutProfile}
                    </div>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    );
}
export default Header