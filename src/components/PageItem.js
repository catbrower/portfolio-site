import {Grid} from '@mui/material';

export default function PageItem(props) {
    return (
        <Grid container className="pageItem">
            {props.children}
        </Grid>
    )
}