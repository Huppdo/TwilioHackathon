import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../components/copyright.js';
import mainTheme from '../components/theme.js'
import {MuiThemeProvider} from "@material-ui/core";
import SimpleNavBar from '../components/SimpleNavBar';
import MainFeaturedPost from '../components/MainBanner';
import FeaturedPost from '../components/FeaturedCards';
import Grid from "@material-ui/core/Grid";
import app from "../components/base";

const useStyles = makeStyles((theme) => ({
    main: {
        flex: 1,
        padding: 0
    },
    noPad: {
        padding: 0
    }
}));

const mainFeaturedPost = {
    title: 'Welcome to Spontaneous Conversations',
    description:
        "A social platform dedicated to spontaneous and random video chats between first and second degree friends!",
    image: 'https://images.unsplash.com/photo-1474945039698-141672b0b403?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
    imgText: 'Technology Photo'
};

const featuredPosts = [
    {
        title: 'About',
        date: '---',
        description:
            'This platform attempts to simulate random face to face conversations through the use of random videochats to friends',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
        imageText: 'Image Text',
    },
    {
        title: 'Technical Details',
        date: '---',
        description:
            'Spontaneous Conversations uses the Twilio Video API, a Python & Flask Backend, combined with a React & Material UI frontend',
        image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80',
        imageText: 'Image Text',
    },
];

export default function MainPage({history}) {
    const classes = useStyles();

    app.auth().onAuthStateChanged(function (user) {
        if (user) {
            history.push("/main")
        }
    })

    return (
            <MuiThemeProvider theme={mainTheme}>
                <SimpleNavBar className={classes.noPad} />
                <Container maxWidth="xl">
                <MainFeaturedPost post={mainFeaturedPost} />
                <Grid container spacing={4}>
                    {featuredPosts.map((post) => (
                        <FeaturedPost key={post.title} post={post} />
                    ))}
                </Grid>
                </Container>
            </MuiThemeProvider >
    );
}