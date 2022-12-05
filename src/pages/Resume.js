import React, { useEffect, useState } from "react";

import * as THREE from 'three';

import {
    AppBar, 
    Box,
    Button,
    IconButton,
    Stack,
    Toolbar,
    Typography
} from '@mui/material';

import PageItem from '../components/PageItem';
import Header from '../components/Header';

export default function Resume(props) {
    let group;
    const particlesData = [];
    let camera, scene, renderer;
    let positions, colors;
    let particles;
    let pointCloud;
    let particlePositions;
    let linesMesh;

    const maxParticleCount = 1000;
    let particleCount = 200;
    let particleSpeed = .1;
    let rotationSpeedY = 0.005;
    let rotationSpeedZ = 0.01;
    const r = 1000;
    const rHalf = r / 2;

    let lineColor = 0x111111;
    let pointColor = 0xFFFFFF;

    const effectController = {
        showDots: false,
        showLines: true,
        minDistance: 200,
        limitConnections: true,
        maxConnections: 20,
        particleCount: 500
    };

    init();
    animate();

    function init() {
        let canvas = document.getElementsByClassName('projectsCanvas')[0];
        renderer = new THREE.WebGLRenderer({canvas: canvas,  antialias: true});
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor(0xffffff);
        renderer.outputEncoding = THREE.sRGBEncoding;

        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 4000);
        camera.position.z = 750;

        scene = new THREE.Scene();

        group = new THREE.Group();
        scene.add( group );

        const helper = new THREE.BoxHelper(new THREE.Mesh( new THREE.BoxGeometry( r, r, r ) ));
        helper.material.color.setHex( 0xFF0000 );
        helper.material.blending = THREE.AdditiveBlending;
        helper.material.transparent = true;
        group.add(helper);

        const segments = maxParticleCount * maxParticleCount;

        positions = new Float32Array(segments * 3);
        colors = new Float32Array(segments * 3);

        const pMaterial = new THREE.PointsMaterial( {
            color: pointColor,
            size: 0,
            // blending: THREE.AdditiveBlending,
            // transparent: true,
            sizeAttenuation: false
        } );

        particles = new THREE.BufferGeometry();
        particlePositions = new Float32Array( maxParticleCount * 3 );

        for ( let i = 0; i < maxParticleCount; i ++ ) {
            const x = Math.random() * r - r / 2;
            const y = Math.random() * r - r / 2;
            const z = Math.random() * r - r / 2;

            particlePositions[ i * 3 ] = x;
            particlePositions[ i * 3 + 1 ] = y;
            particlePositions[ i * 3 + 2 ] = z;

            // add it to the geometry
            particlesData.push( {
                velocity: new THREE.Vector3(Math.random() * particleSpeed, Math.random() * particleSpeed, Math.random() * particleSpeed),
                numConnections: 0
            } );
        }

        particles.setDrawRange( 0, particleCount );
        particles.setAttribute( 'position', new THREE.BufferAttribute( particlePositions, 3 ).setUsage( THREE.DynamicDrawUsage ) );

        // create the particle system
        pointCloud = new THREE.Points( particles, pMaterial );
        group.add( pointCloud );

        const geometry = new THREE.BufferGeometry();

        geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ).setUsage( THREE.DynamicDrawUsage ) );
        geometry.setAttribute( 'color', new THREE.BufferAttribute( colors, 3 ).setUsage( THREE.DynamicDrawUsage ) );

        geometry.computeBoundingSphere();

        geometry.setDrawRange( 0, 0 );

        const material = new THREE.LineBasicMaterial( {
            color: lineColor,
            vertexColors: true,
            blending: THREE.SubtractiveBlending,
            transparent: true
        } );

        linesMesh = new THREE.LineSegments( geometry, material );
        group.add( linesMesh );
    }

    function animate() {
        let vertexpos = 0;
        let colorpos = 0;
        let numConnected = 0;

        for ( let i = 0; i < particleCount; i ++ )
            particlesData[ i ].numConnections = 0;

        for ( let i = 0; i < particleCount; i ++ ) {

            // get the particle
            const particleData = particlesData[ i ];

            particlePositions[ i * 3 ] += particleData.velocity.x;
            particlePositions[ i * 3 + 1 ] += particleData.velocity.y;
            particlePositions[ i * 3 + 2 ] += particleData.velocity.z;

            if ( particlePositions[ i * 3 + 1 ] < - rHalf || particlePositions[ i * 3 + 1 ] > rHalf )
                particleData.velocity.y = - particleData.velocity.y;

            if ( particlePositions[ i * 3 ] < - rHalf || particlePositions[ i * 3 ] > rHalf )
                particleData.velocity.x = - particleData.velocity.x;

            if ( particlePositions[ i * 3 + 2 ] < - rHalf || particlePositions[ i * 3 + 2 ] > rHalf )
                particleData.velocity.z = - particleData.velocity.z;

            if ( effectController.limitConnections && particleData.numConnections >= effectController.maxConnections )
                continue;

            // Check collision
            for ( let j = i + 1; j < particleCount; j ++ ) {

                const particleDataB = particlesData[ j ];
                if ( effectController.limitConnections && particleDataB.numConnections >= effectController.maxConnections )
                    continue;

                const dx = particlePositions[ i * 3 ] - particlePositions[ j * 3 ];
                const dy = particlePositions[ i * 3 + 1 ] - particlePositions[ j * 3 + 1 ];
                const dz = particlePositions[ i * 3 + 2 ] - particlePositions[ j * 3 + 2 ];
                const dist = Math.sqrt( dx * dx + dy * dy + dz * dz );

                if ( dist < effectController.minDistance ) {

                    particleData.numConnections ++;
                    particleDataB.numConnections ++;

                    const alpha = 1.0 - dist / effectController.minDistance;

                    positions[ vertexpos ++ ] = particlePositions[ i * 3 ];
                    positions[ vertexpos ++ ] = particlePositions[ i * 3 + 1 ];
                    positions[ vertexpos ++ ] = particlePositions[ i * 3 + 2 ];

                    positions[ vertexpos ++ ] = particlePositions[ j * 3 ];
                    positions[ vertexpos ++ ] = particlePositions[ j * 3 + 1 ];
                    positions[ vertexpos ++ ] = particlePositions[ j * 3 + 2 ];

                    colors[ colorpos ++ ] = alpha;
                    colors[ colorpos ++ ] = alpha;
                    colors[ colorpos ++ ] = alpha;

                    colors[ colorpos ++ ] = alpha;
                    colors[ colorpos ++ ] = alpha;
                    colors[ colorpos ++ ] = alpha;

                    numConnected ++;

                }

            }

        }


        linesMesh.geometry.setDrawRange( 0, numConnected * 2 );
        linesMesh.geometry.attributes.position.needsUpdate = true;
        linesMesh.geometry.attributes.color.needsUpdate = true;

        pointCloud.geometry.attributes.position.needsUpdate = true;

        requestAnimationFrame( animate );

        render();
    }

    function render() {
        const time = Date.now() * 0.001;

        group.rotation.y = time * rotationSpeedY;
        group.rotation.z = time * rotationSpeedZ;
        renderer.render( scene, camera );
    }

    function handleResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        // window.addEventListener('scroll', handleScroll);
        
        init();
        animate();
    });
    
    let padding = 10;

    return (
        <PageItem>
            <Header></Header>

            <Stack direction='column' className="blurBg" spacing={5} alignItems="center"  style={{'width': '100%'}}>
                <Stack direction='column'>
                    <Stack p={4} direction='row' spacing={5}>
                        <Typography className="consolas" variant="h4" align="left">
                            Catherine Brower
                        </Typography>
                        <img src="https://i.kym-cdn.com/photos/images/facebook/000/581/251/5af.jpg"/>

                        <Typography className="consolas" align="left">
                            I am a driven and creative software engineer looking for unique opportunities. I have two years of front-end development experience with the front-end frameworks Angular, React, and Ember. I also have experience working as a backend developer which I believe makes me well suited for a variety of positions.
                        </Typography>
                    </Stack>

                    <Stack p={4} direction="column" spacing={3}>
                        <div>
                            <Typography className="consolas" variant="h6" align="left">
                                Deep Intent (2020)
                            </Typography>
                            <Typography className="consolas indent" align="left">
                                Senior Java Developer
                            </Typography>
                        </div>
                        
                        <div>
                            <Typography className="consolas" align="left" variant="h6">
                                Gavant Software (2017 - 2019)
                            </Typography>
                            <Typography className="consolas indent" align="left">
                                Front End Developer (Ember)
                            </Typography>
                            <Typography className="consolas indent" align="left">
                                Extensive use of GIT to maintain, create, merge, and rebase production branches
                                Lead developed complex Javascript based web games, utilizing Ember framework
                                Lead developer on large medical application with many subdomains including administrative portal for managing views and data
                            </Typography>
                        </div>
                        
                        <div>
                            <Typography className="consolas" variant="h6" align="left">
                                Latham Pool Products (Nov 2014 -2016)
                            </Typography>
                            <Typography className="consolas indent" align="left">
                                Java Developer
                            </Typography>
                            <Typography className="consolas indent" align="left">
                                Worked on Latham Pools’ order entry and pool design system built from Java Spring
                                Maintained and retrofitted Viking Pools’ legacy internal systems, increasing speed and usability significantly
                                Maintained and administered RHEL servers including troubleshooting network, Apache, and MySQL issues
                            </Typography>
                        </div>
                        
                        <div>
                            <Typography className="consolas" variant="h6" align="left">
                                Tenex Developers, Contract (2016)
                            </Typography>
                            <Typography className="consolas indent" align="left">
                                Full Stack Developer
                            </Typography>
                            <Typography className="consolas indent" align="left">
                                Worked on both the angular front and java back end of a web project that can send and receive messages over a cellular network
                                Experience coordinating and working with entirely remote team
                            </Typography>
                        </div>

                        <div>
                            <Typography className="consolas" align="left">
                                Skills
                            </Typography>
                            <Typography className="consolas indent" align="left">
                                I am completeley incompentent
                            </Typography>
                        </div>

                        <div>
                            <Typography className="consolas" align="left">
                                Languages
                            </Typography>
                            <Typography className="consolas indent" align="left">
                                C#, Java, Javascript / Web Languages, Python
                            </Typography>
                        </div>

                        <div>
                            <Typography className="consolas" align="left">
                                Education
                            </Typography>
                            <Typography className="consolas indent" align="left">
                                Rensselaer Polytechnic Institute (In progress)
                            </Typography>
                            <Typography className="consolas indent" align="left">
                                International School Bangkok (High School, 2009)
                            </Typography>
                        </div>
                    </Stack>
                </Stack>
            </Stack>
            <canvas className="stretchCanvas projectsCanvas"></canvas>
        </PageItem>
    )
}