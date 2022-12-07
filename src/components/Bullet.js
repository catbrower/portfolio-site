import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";

import * as THREE from 'three';

import StandardParagraph from "./StandardParagraph"
import { BoxGeometry, SphereGeometry } from "three";

export default function Bullet(props) {
    

    return (
        <Grid container>
            <Grid item xs={1}>
                -
            </Grid>
            <Grid item xs={11}>
                <StandardParagraph>
                    {props.children}
                </StandardParagraph>
            </Grid>
        </Grid>
        
    )
}