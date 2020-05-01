import React from 'react';
import clsx from 'clsx';
import {makeStyles, MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import mainTheme from "../components/theme";
import app from "../components/base";
import ListItems from '../components/listitems';
import FriendCards from "../components/friendcards";
import AcceptRequestCards from "../components/acceptrequestcards"
import apiPath from "../constants/apipath"
import {BrowserRouter, Redirect} from "react-router-dom";


const drawerWidth = 240;

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
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
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
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
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

class Dashboard extends React.Component {

    intervalID;
    result;

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { user: {displayName: "Loading", email:  "Loading"}, redirect: null};
    }

    updateState = async(newUser) => {
        let newUserTwo = await app.auth().currentUser;
        if (!newUser && !newUserTwo){
            this.props.history.push("/")
        }
        this.setState({user: newUser});
    }

    fetchUser = new Promise((resolve, reject) => {
        app.auth().onAuthStateChanged(function (user) {
            if (user) {
                resolve(user)
            } else {
                resolve(null)
            }
        })});

    getSignInState = async() => {
        let user = await this.fetchUser;
        this.updateState(user)
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    getData = () => {
        var component = this;
        this.state.user.getIdToken(false).then(function(idToken){
            fetch(apiPath+"/serverupdates?token="+idToken).then(res => res.json()).then(
                (result) => {
                    if(result.status === "200") {
                        component.setState({redirect: "/video"})
                    }
                }
            )}).then();
    }

    componentDidMount() {
        this.getSignInState().then(function(){
            try {
            app.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
            fetch(apiPath+"/firstload?token="+idToken).then(res => res.json())})
            } catch {
                console.log("error on first load")
            }
        });
        this.intervalID = setInterval(this.getData.bind(this), 15000);
    };

    render(){
        const { classes } = this.props;
        const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
        const open = true;
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <MuiThemeProvider  theme={mainTheme}>
                <div className={classes.root}>
                    <CssBaseline />
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
                                Dashboard
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        classes={{
                            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                        }}
                        open={open}
                    >
                        <ListItems />
                        <Divider />
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <Container maxWidth="lg" className={classes.container}>
                            <BrowserRouter>
                                <FriendCards />
                                <AcceptRequestCards/>
                            </BrowserRouter>
                        </Container>
                    </main>
                </div>
            </MuiThemeProvider>
        );
    }
}


export default withStyles(styles)(Dashboard);