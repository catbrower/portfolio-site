import React, { useEffect, useState } from "react";

import {Accordion, AccordionDetails, AccordionSummary, Card, Stack, Typography} from '@mui/material';


export default function ProjectsAccordion() {
    const [expanded, setExpanded] = useState(0);

    function handleAccordion(index) {
        setExpanded(index);
    }

    return (
        <Stack direction="column" spacing={5} p={5}>
            <Accordion className="noBg">
                <AccordionSummary
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
                <Typography className="consolas" sx={{ width: '33%', flexShrink: 0 }}>
                    Experience
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                    Aliquam eget maximus est, id dignissim quam.
                </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion className="noBg">
                <AccordionSummary
                aria-controls="panel2bh-content"
                id="panel2bh-header"
                >
                <Typography className="consolas" sx={{ width: '33%', flexShrink: 0 }}>Background</Typography>
                <Typography sx={{ color: 'text.secondary' }}>
                    You are currently not an owner
                </Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
                    varius pulvinar diam eros in elit. Pellentesque convallis laoreet
                    laoreet.
                </Typography>
                </AccordionDetails>
            </Accordion>
        </Stack>
    )
}