import React from "react";
import {
    Grow,
    Typography
} from '@mui/material';

import StandardHeader from "./StandardHeader";

export default function TitleImage(props) {
    return (
        <React.Fragment>
            <Typography align="left" variant="h2" className="consolas titleImageText">
                {props.children}
            </Typography>

            
        </React.Fragment>
    )
}