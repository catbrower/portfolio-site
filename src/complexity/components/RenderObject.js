import React from "react";
import { Card, Container, TextField } from '@mui/material';

export default function RenderObject(props) {
    let yabba = "sdfsd";

    function changeName(e) {
        props.update('asda', 'asdasd');
    }

    return (
        <Container>
            <TextField label="Name" onChange={changeName} defaultValue={props.object.name} />
            <TextField label="Color" value={props.object.color} />
            <TextField label="yabba" value={yabba}/>
        </Container>
    )
}