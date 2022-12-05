import {
    Grow,
    Typography
} from '@mui/material';

export default function StandardHeader(props) {
    return (
        <Grow in={true} style={{transformOrigin: '0 0 0'}} timeout={1000}>
            <Typography align="left" variant={props.variant} className="consolas" >
                {props.children}
            </Typography>
        </Grow>
    )
}