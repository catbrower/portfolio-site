import {
    AppBar, 
    Box,
    Toolbar,
    Typography,
    Slide
} from '@mui/material';

import GitHubIcon from '@mui/icons-material/GitHub';

export default function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Slide direction="down" in={true}>
                <AppBar position="static">
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
                </AppBar>
            </Slide>
        </Box>
    )
}