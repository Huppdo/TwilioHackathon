import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        flex: 1,
        flexDirection: 'row',
        padding: 0,
        marginBottom: 25
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    leftPad: {
        marginLeft: 15
    },
    flexBar: {
        flexGrow: 1,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rightAlign: {
        marginLeft: 'auto'
    }
}));

export default function SimpleNavBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.flexBar}>
                    <Typography variant="h6" color="inherit">
                        Spontaneous Conversations
                    </Typography>
                    <div className={classes.rightAlign}>
                    <Link href="/signup" variant="body1" color="inherit">
                        Sign Up
                    </Link>
                    <Link className={classes.leftPad} href="/signin" variant="body1" color="inherit">
                        Sign In
                    </Link>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}