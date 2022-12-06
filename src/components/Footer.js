import {
    Box,
    Container,
    Typography,
    Stack
} from "@mui/material";

export default function Footer() {
    return (
        <Box sx={{ flexGrow: 1 }}>

            <Container direction="row" align="center" className="blurBg">
                <Stack direction="column" p={3}>
                    <Typography>
                        <a className="link" href="mailto:hire@catbrower.com">Contact</a>
                    </Typography>
                </Stack>
                
            </Container>
        </Box>
    )
}