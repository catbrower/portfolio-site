import {
    Fade,
    Typography
} from '@mui/material';
import React from 'react';

export default function StandardParagraph(props) {
    return (
        <Fade in={true} timeout={1000} pl={props.pl} pr={props.pr} pt={props.pt}>
            <Typography align="left" className="consolas">
                {props.children}
            </Typography>
        </Fade>
    )
}