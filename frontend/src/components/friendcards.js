import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import app from "../components/base"
import Grid from "@material-ui/core/Grid";
import apiPath from "../constants/apipath";
import { Redirect } from "react-router-dom";
import {withRouter} from "react-router";

const styles = theme => ({
    card: {
        minWidth: 150,
        paddingLeft: 5
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
        flexGrow: 1,
    },
    pos: {
        marginBottom: 12,
    },
});

class SimpleCard extends React.Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { friends:[["Loading","Loading"]], user:{}, redirect: null};
    }

    updateUser = (newUser) => {
        if (newUser){
            this.setState({friends: this.state.friends, user: newUser});
        }
        this.updateFriends()
    }

    updateFriendState = (newFriends) => {
        if (newFriends){
            this.setState({friends: newFriends, user: this.state.user});
        }
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
        this.updateUser(user)
    }

    componentDidMount() {
        this.getSignInState().then();
    };

    callFriend = (e) => {
        let friendID = e.currentTarget.id;
        app.auth().currentUser.getIdToken(false).then(function(idToken){
            fetch(apiPath+"/friendcall?token="+idToken+"&friendUID="+friendID).then(function(){window.location.reload();})});
        this.setState({redirect:"/video"});
    }

    updateFriends = async() => {
        let user = this.state.user;
        let users = [];
        let usersFinal = [];
        //console.log(this.state.friends[0][0])
        if (this.state.friends[0][0] !== "Loading"){
            //console.log("Whelp, it's finished loading")
            return false
        }
        try {
            await app.database().ref('users/' + user["uid"] + "/friends").once('value').then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    //console.log(childSnapshot.key);
                    users.push(childSnapshot.key);
                });
            })
            //console.log(users);
            for (const entry of users) {
                //console.log(entry)
                await app.database().ref('users/' + entry).once('value').then(function(snapshot) {
                    let dispName = ""
                    let online = false;
                    snapshot.forEach(function(childSnapshot) {
                        //console.log(childSnapshot.key)
                        if (childSnapshot.key === "displayName"){
                            dispName=childSnapshot.val()
                        }
                        if (childSnapshot.key === "online"){
                            online=childSnapshot.val()
                        }
                    }
                    )
                    if (online){
                        usersFinal.push([entry,dispName])
                    };
                })
            }
        }
        catch {
            users = []
        }
        //console.log(usersFinal)
        this.updateFriendState(usersFinal)
    };

    removeFriend = async(e) => {
        let friendID = e.currentTarget.id;
        let user = this.state.user;
        if (window.confirm("Are you positive that you would like to remove this friend?") && e.currentTarget.id !== "global") {
            app.database().ref('users/' + user["uid"] + "/friends").child(friendID).set(null);
            app.database().ref('users/' + friendID + "/friends").child(user["uid"]).set(null);
            window.location.reload();
        }
    }

    render() {
        const { classes } = this.props;
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={2}
            >
                {this.state.friends.map((value) => (
                    <Grid item id={value[0]}>
                        <Card id={value[0]} className={classes.card}>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary">
                                    Friend:
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    {value[1]}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={this.callFriend} id={value[0]} variant="contained" color="Primary" disableElevation>
                                    Call
                                </Button>
                                <Button onClick={this.removeFriend} size="small" id={value[0]} variant="contained" disableElevation>
                                    Remove Friend
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        );
    }
}

export default withRouter(withStyles(styles)(SimpleCard));
