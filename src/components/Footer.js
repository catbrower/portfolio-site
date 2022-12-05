import {
    Typography,
    Stack
} from "@mui/material";

export default function Footer() {
    return (
        <Stack direction="row" alignItems="center" p={3}>
            <Typography>
                <a className="link" href="mailto:hire@catbrower.com">Contact</a>
            </Typography>
        </Stack>
    )
}