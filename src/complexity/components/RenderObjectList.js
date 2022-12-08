import React, { useState } from "react";
import {Button, SwipeableDrawer, Stack} from '@mui/material';
import RenderObject from './RenderObject';

export default function RenderObjectList(props) {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <React.Fragment>
            <Button onClick={() => setDrawerOpen(true)}>open</Button>
                <SwipeableDrawer
                    anchor={'bottom'}
                    open={drawerOpen}
                    onClose={() => {setDrawerOpen(false)}}
                >
                    Code blocks are here
                    <Stack direction="column" spacing={1} p={5}>
                        {props.renderObjects.map((item) => (
                            <RenderObject object={item} key={item.id} update={props.update}/>
                        ))}
                    </Stack>
            </SwipeableDrawer>
        </React.Fragment>
    )
}