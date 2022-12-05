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

export default function FirstProject() {
    let camera, scene, renderer;
    let points;

    const particles = 5000;
    let half_particles = particles / 2.0
    let drawCount = 1000;

    function init() {
        let canvas = document.getElementsByClassName('projectsCanvas')[0];

        renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xffffff);

        camera = new THREE.PerspectiveCamera(27, window.innerWidth / window.innerHeight, 5, 3500);
        camera.position.z = 1000;

        scene = new THREE.Scene();
        // scene.background = new THREE.Color(0x050505);
        // scene.fog = new THREE.Fog( 0x050505, 2000, 3500 );

        const geometry = new THREE.BufferGeometry();

        const positions = [];
        const positions2 = [];
        const colors = [];

        const color = new THREE.Color();

        const n = 1000, n2 = n / 2; // particles spread in the cube

        for ( let i = 0; i < particles; i ++ ) {
            // positions
            const x = Math.random() * n - n2;
            const y = Math.random() * n - n2;
            const z = Math.random() * n - n2;

            positions.push( x, y, z );
            positions2.push( z * 0.3, x * 0.3, y * 0.3 );

            // colors
            const vx = ( x / n ) + 0.5;
            const vy = ( y / n ) + 0.5;
            const vz = ( z / n ) + 0.5;

            color.setRGB( vx, vy, vz );

            let rcolor = Math.random();
            colors.push(rcolor, rcolor, rcolor);
        }

        const gl = renderer.getContext();

        const pos = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, pos );
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( positions ), gl.STATIC_DRAW );

        const pos2 = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, pos2 );
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( positions2 ), gl.STATIC_DRAW );

        const rgb = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, rgb );
        gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( colors ), gl.STATIC_DRAW );

        const posAttr1 = new THREE.GLBufferAttribute( pos, gl.FLOAT, 3, 4, particles );
        const posAttr2 = new THREE.GLBufferAttribute( pos2, gl.FLOAT, 3, 4, particles );
        geometry.setAttribute( 'position', posAttr1 );
        geometry.setAttribute( 'color', new THREE.GLBufferAttribute( rgb, gl.FLOAT, 3, 4, particles ) );

        const material = new THREE.PointsMaterial({size: 15, vertexColors: true});

        points = new THREE.Points( geometry, material );

        // Choose one:
        // geometry.boundingSphere = ( new THREE.Sphere() ).set( new THREE.Vector3(), Infinity );
        points.frustumCulled = false;

        scene.add(points);
    }

    function animate() {
        requestAnimationFrame(animate);
        render();
    }

    function render() {
        const time = Date.now() * 0.0005;

        // drawCount = (Math.max(5000, drawCount) + Math.floor(500 * Math.random())) % particles;
        drawCount = Math.cos(time) * half_particles + half_particles
        points.geometry.setDrawRange(0, drawCount);

        points.rotation.x = time * 0.1;
        points.rotation.y = time * 0.2;
        points.rotation.z = time * 0.05;

        renderer.render(scene, camera);
    }

    function handleResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
        // camera.aspect = window.innerWidth / window.innerHeight;
        // camera.updateProjectionMatrix();

        // renderer.setSize( window.innerWidth, window.innerHeight );
    }

    useEffect(() => {
        init();
        animate();

        window.addEventListener('resize', handleResize);
        // window.addEventListener('scroll', handleScroll);
    });
    
    let padding = 10;

    return (
        <PageItem>
            <Stack direction='column' className="blurBg" spacing={5} alignItems="center"  style={{'width': '100%'}}>
                Nothing is here yet
            </Stack>

            <canvas className="stretchCanvas projectsCanvas"></canvas>
        </PageItem>
    )
}