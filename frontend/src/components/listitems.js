import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {AlternateEmail, Autorenew, ExitToApp, Face, VideoCall} from "@material-ui/icons";
import List from "@material-ui/core/List";
import app from "./base";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {Redirect, withRouter} from "react-router";
import apiPath from "../constants/apipath";

class ListItems extends React.Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {user: {displayName: "Loading", email: "Loading"}, redirect: null};
    }

    updateState = (newUser) => {
        if (newUser) {
            this.setState({user: newUser});
        }
    }

    fetchUser = new Promise((resolve, reject) => {
        app.auth().onAuthStateChanged(function (user) {
            if (user) {
                resolve(user)
            } else {
                resolve(null)
            }
        })
    });

    getSignInState = async () => {
        let user = await this.fetchUser;
        this.updateState(user)
    }

    refresh = () => {
        window.location.reload();
    }

    signOut = async () => {
        await app.auth().signOut();
        window.location.reload();
    }

    callRandom = () => {
        app.auth().currentUser.getIdToken(false).then(function(idToken){
            fetch(apiPath+"/randomcall?token="+idToken).then(function(){window.location.reload();})});
        this.setState({redirect:"/video"});
    }

    addFriend = async (e) => {
        e.preventDefault();
        const { email } = e.target.elements;
        let emailVal = email.value
        let user = this.state.user;
        await app.database().ref('users/').once('value').then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                console.log(childSnapshot.val()["email"])
                console.log(emailVal)
                if (emailVal === childSnapshot.val()["email"]){
                    app.database().ref('friendrequests/' + childSnapshot.key ).child(user["uid"]).set(true);
                }
            });
        })
        email.value = "";
    }

    componentDidMount() {
        this.getSignInState().then();
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div>
                <ListItem>
                    <ListItemIcon>
                        <PeopleIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Friends"/>
                </ListItem>
                <ListItem button onClick={this.callRandom}>
                    <ListItemIcon>
                        <VideoCall/>
                    </ListItemIcon>
                    <ListItemText primary="Random Call"/>
                </ListItem>
                <ListItem button onClick={this.refresh}>
                    <ListItemIcon>
                        <Autorenew/>
                    </ListItemIcon>
                    <ListItemText primary="Refresh"/>
                </ListItem>
                <ListItem button onClick={this.signOut}>
                    <ListItemIcon>
                        <ExitToApp/>
                    </ListItemIcon>
                    <ListItemText primary="Sign Out"/>
                </ListItem>
                <Divider/>
                <List>
                    <ListSubheader inset>User Information</ListSubheader>
                    <ListItem>
                        <ListItemIcon>
                            <Face/>
                        </ListItemIcon>
                        <ListItemText primary={this.state.user.displayName}/>
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <AlternateEmail/>
                        </ListItemIcon>
                        <ListItemText secondary={this.state.user.email}/>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListSubheader inset>Friend Request</ListSubheader>
                    <ListItem>
                        <form noValidate autoComplete="off" onSubmit={this.addFriend}>
                            <TextField name="email" id="filled-basic" label="" variant="filled"/>
                        </form>
                    </ListItem>
                </List>
            </div>
        );
    }
}

export default withRouter(ListItems);