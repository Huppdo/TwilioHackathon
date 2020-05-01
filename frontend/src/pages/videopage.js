import React from 'react';
import {MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import mainTheme from "../components/theme";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Typography from "@material-ui/core/Typography";
import VideoChat from "../components/VideoChat";

const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        spacing: 2
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
});

class VideoPage extends React.Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {};
    }


    componentDidMount() {

    };

    render() {
        const { classes } = this.props;
        const open = true;
        return (
            <MuiThemeProvider  theme={mainTheme}>
                <div className={classes.root}>
                    <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                        <Toolbar className={classes.toolbar}>
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                                Video Chat
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <Container maxWidth="xl" className={classes.container}>
                            <VideoChat />
                        </Container>
                    </main>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(VideoPage)