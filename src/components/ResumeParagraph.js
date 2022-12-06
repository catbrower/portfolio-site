import React from 'react';
import { useState } from 'react';

import {
    Fade,
    Grid,
    Typography,
    Slide
} from '@mui/material';

export default function ResumeParagraph(props) {
    const timeout = 1000;
    const subTitleDelay = 0.0;
    const [showSubTitle, setShowSubTitle] = useState(false);

    window.setTimeout(() => {setShowSubTitle(true)}, subTitleDelay);

    // let minHeight = props.title.length * 25;

    return (
        <Grid container className="resumeParagraphContainer">
            <Grid item xs={2}>
                <Fade timeout={timeout} in={true}>
                    <Typography align="left" variant="h4" className="consolas verticalTitle">
                        {props.title}
                    </Typography>
                </Fade>

                <Fade timeout={timeout} in={showSubTitle}>
                    <Typography align="left" variant="h6" className="consolas verticalSubTitle">
                        {props.subTitle}
                    </Typography>
                </Fade>
            </Grid>

            <Grid item xs={8} pt={1.8}>
                {props.children}
            </Grid>
        </Grid>
    )
}