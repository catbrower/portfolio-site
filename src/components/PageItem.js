import {Container, Grid, Stack} from '@mui/material';

import Header from './Header';
import Footer from './Footer';
import React from 'react';

export default function PageItem(props) {
    return (
        <Stack spacing={5} className="pageItem">
            {!props.hideHeaderFooter && <Header></Header>}

            <Container style={{padding: '0px'}} sx={{flexGrow: 100}}>
                {props.children}
            </Container>
            
            {!props.hideHeaderFooter && <Footer></Footer>}
        </Stack>
    )
}