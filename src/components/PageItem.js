import {Grid} from '@mui/material';

import Header from './Header';
import Footer from './Footer';

export default function PageItem(props) {
    return (
        <Grid container className="pageItem">
            <Header></Header>
            {props.children}
            <Footer></Footer>
        </Grid>
    )
}