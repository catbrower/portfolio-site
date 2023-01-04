import React, { useEffect, useState } from 'react';

import {
    AppBar, 
    Box,
    Container,
    Toolbar,
    Typography,
    Slide
} from '@mui/material';

import GitHubIcon from '@mui/icons-material/GitHub';

export default function Header() {
    function toolbarContent() {
        return (
            <AppBar position="static" className="toolbar">
                <Container sm={6} className="toolbar">
                    <Toolbar className="toolbar">
                        <Typography variant="h6" pr={3} align="left" component="div" className="consolas">
                            <a className="link" href="resume">Resume</a>
                        </Typography>

                        <Typography variant="h6" align="left" component="div" className="consolas" sx={{flexGrow: 1}}>
                            <a className="link" href="projects">Projects</a>
                        </Typography>

                        <Typography className="consolas" align="left">
                            <a className="link" href="https://www.github.com/catbrower">
                                <GitHubIcon></GitHubIcon>
                            </a>
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
        )
    }

    // TODO get the toolbar to stop it's animation every time
    function toolbar() {
        if(true) {
            return (
                <Slide direction="down" in={true}>
                    {toolbarContent()}
                </Slide>
            )
        } else {
            return (
                <React.Fragment>
                    {toolbarContent()}
                </React.Fragment>
            )
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            {toolbar()}
        </Box>
    )
}