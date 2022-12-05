import React from "react";
import {
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
            <img className="titleImg" src={props.src}></img>
        </React.Fragment>
    )
}