import React, { useState, useCallback } from 'react';
import Room from './Room';
import Link from "@material-ui/core/Link";
import apiPath from "../constants/apipath";
import app from "../components/base"

class VideoChat extends React.Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { token:null, roomName:"none"};
    }

    updateState = async(result) => {
        console.log(result.token)
        this.setState({roomName: result.room, token:result.token});
    }

    fetchUser = new Promise((resolve, reject) => {
        app.auth().onAuthStateChanged(function (user) {
            if (user) {
                user.getIdToken(/* forceRefresh */ true).then(function(idToken) {
                    fetch(apiPath+"/gettoken?token="+idToken).then(res => res.json()).then(
                        (result) => {
                            resolve(result)
                        }
                    )})
            } else {
                resolve(null)
            }
        })});

    getSignInState = async() => {
        let user = await this.fetchUser;
        this.updateState(user)
    }

    componentDidMount() {
        this.getSignInState().then();
    };

    handleLogout = () => {
        this.setState({token:null})
    };

    render() {
        if (this.state.token) {
            return (
                <Room roomName={this.state.roomName} token={this.state.token} handleLogout={this.handleLogout} />
            );
        } else {
            return (
            <Link href="/main" variant="body2">
                {"Return To Main Page"}
            </Link>
            );
        }
    }
};

export default VideoChat;