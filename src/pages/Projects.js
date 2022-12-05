import React, { useEffect, useState } from "react";

import * as THREE from 'three';

import {
    AppBar, 
    Box,
    Stack,
    Toolbar,
    Typography
} from '@mui/material';

import PageItem from '../components/PageItem';
import ProjectCard from '../components/ProjectCard';
import ProjectsAccordion from "../components/ProjectsAccordion";
import Header from "../components/Header";

export default function FirstProject(props) {
    

    function handleResize() {
        // camera.aspect = window.innerWidth / window.innerHeight;
        // camera.updateProjectionMatrix();

        // renderer.setSize( window.innerWidth, window.innerHeight );
    }

    useEffect(() => {
        // window.addEventListener('resize', handleResize);
        // window.addEventListener('scroll', handleScroll);
        
    });
    
    let padding = 10;

    return (
        <PageItem>
            <Header></Header>

            <Stack direction='column' className="blurBg" spacing={5} alignItems="center"  style={{'width': '100%'}}>
                Nothing is here yet
                <ProjectsAccordion />
            </Stack>
        </PageItem>
    )
}