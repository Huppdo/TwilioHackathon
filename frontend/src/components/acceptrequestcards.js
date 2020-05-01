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
import Container from "@material-ui/core/Container";
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

class NewFriendCard extends React.Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { friends:[["Loading","Loading"]], user:{}};
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

    updateFriends = async() => {
        let user = this.state.user;
        let users = [];
        let usersFinal = [];
        //console.log(this.state.friends[0][0])
        if (this.state.friends[0][0] !== "Loading"){
            console.log("Whelp, it's finished loading")
            return false
        }
        try {
            await app.database().ref('friendrequests/' + user["uid"]).once('value').then(function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    //console.log(childSnapshot.key);
                    users.push(childSnapshot.key);
                });
            })
            console.log(users);
            for (const entry of users) {
                console.log(entry)
                await app.database().ref('users/' + entry).once('value').then(function(snapshot) {
                    snapshot.forEach(function(childSnapshot) {
                        console.log(childSnapshot.key)
                        if (childSnapshot.key === "displayName"){
                            console.log(childSnapshot.val())
                            usersFinal.push([entry,childSnapshot.val()])
                        }
                    });
                })
            }
        }
        catch {
            users = []
        }
        console.log(usersFinal)
        this.updateFriendState(usersFinal)
    };

    acceptFriend = async(e) => {
        let friendID = e.currentTarget.id;
        let user = this.state.user;
        app.database().ref('friendrequests/' + user["uid"]).child(friendID).set(null);
        app.database().ref('users/' + user["uid"] + "/friends").child(friendID).set(true);
        app.database().ref('users/' + friendID + "/friends").child(user["uid"]).set(true);
        window.location.reload();
    }

    denyFriend = async(e) => {
        let friendID = e.currentTarget.id;
        let user = this.state.user;
        app.database().ref('friendrequests/' + user["uid"]).child(friendID).set(null);
        window.location.reload();
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={2}
            >
                {this.state.friends.map((value) => (
                    <Grid item>
                        <Card className={classes.card}>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary">
                                    Friend Request:
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    {value[1]}
                                </Typography>
                            </CardContent>
                            <CardActions >
                                <Button onClick={this.acceptFriend} id={value[0]} variant="contained" color="Secondary" disableElevation>
                                    Accept
                                </Button>
                                <Button onClick={this.denyFriend} id={value[0]} variant="contained" disableElevation>
                                    Deny
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        );
    }
}

export default withRouter(withStyles(styles)(NewFriendCard));
