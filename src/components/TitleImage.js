import React from "react";
import {
    Grow,
    Typography
} from '@mui/material';

import StandardHeader from "./StandardHeader";

export default function TitleImage(props) {
    return (
        <React.Fragment>
            <div className="titleImageText">
                <StandardHeader variant="h4">
                    {props.children}
                </StandardHeader>
            </div>

            <Grow>
                <img className="titleImg" src={props.src}></img>
            </Grow>
        </React.Fragment>
    )
}