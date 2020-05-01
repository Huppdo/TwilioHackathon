import React, {useCallback} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import * as firebase from "firebase/app";
import "firebase/auth";
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Copyright from '../components/copyright.js';
import mainTheme from '../components/theme.js'
import {MuiThemeProvider} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import app from "../components/base";

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: mainTheme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class SignInPage extends React.Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { user: null};
    }

    updateState = (newUser) => {
        if (newUser){
            this.props.history.push("/main")
        }
        this.setState({user: newUser});
    }

    fetchUser = new Promise((resolve, reject) => {
        app.auth().onAuthStateChanged(function (user) {
        if (user) {
            resolve(user)
        } else {
            reject()
        }
    })});

    getSignInState = async() => {
        let user = null;
        try {user = await this.fetchUser;} catch {console.log("No user signed in")}
        this.updateState(user)
    }

     componentDidMount() {
        this.getSignInState().then();
    };

    handleSignIn = async event => {
        event.preventDefault();
        const { email, password} = event.target.elements;
        try {
            await app.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(app
                .auth()
                .signInWithEmailAndPassword(email.value, password.value))
            console.log("User Logged In");
            this.props.history.push("/main");
        } catch (error) {
            alert(error);
        }
    };

    render (){
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <MuiThemeProvider  theme={mainTheme}>
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={this.handleSignIn}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="/forgotPassword" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    <Box mt={8}>
                        <Copyright />
                    </Box>
                </MuiThemeProvider >
            </Container>
        );
    }
}

export default withStyles(styles)(SignInPage);