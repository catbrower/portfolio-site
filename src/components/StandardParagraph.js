import {
    Fade,
    Typography
} from '@mui/material';

export default function StandardParagraph(props) {
    return (
        <Fade in={true} timeout={1000} pl={5 * props.indent}>
            <Typography align="left" className="consolas">
                {props.children}
            </Typography>
        </Fade>
    )
}