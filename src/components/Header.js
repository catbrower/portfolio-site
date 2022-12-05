import {
    AppBar, 
    Box,
    Button,
    IconButton,
    Stack,
    Toolbar,
    Typography
} from '@mui/material';

import GitHubIcon from '@mui/icons-material/GitHub';

export default function Header() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar className="toolbar">
                    <Typography variant="h6" pr={3} align="left" component="div" className="consolas">
                        Resume
                    </Typography>

                    <Typography variant="h6" align="left" component="div" className="consolas" sx={{flexGrow: 1}}>
                        Projects
                    </Typography>

                    <Typography className="consolas" align="left">
                        <a href="https://www.github.com/catbrower">
                            <GitHubIcon></GitHubIcon>
                        </a>
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}