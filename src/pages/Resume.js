import React, { useEffect } from "react";

import * as THREE from 'three';

import {
    Container,
    Stack
} from '@mui/material';

import PageItem from '../components/PageItem';
import StandardHeader from "../components/StandardHeader";
import StandardParagraph from "../components/StandardParagraph";
import ResumeParagraph from "../components/ResumeParagraph";
import Bullet from "../components/Bullet";

export default function Resume() {
    let group;
    const particlesData = [];
    let camera, scene, renderer;
    let positions, colors;
    let particles;
    let pointCloud;
    let particlePositions;
    let linesMesh;

    let fadeIn = 0;
    let start = -1;
    const maxParticleCount = 1000;
    let particleCount = 100;
    let particleSpeed = .1;
    let rotationSpeedY = 0.005;
    let rotationSpeedZ = 0.01;
    const r = 1000;
    const rHalf = r / 2;

    let lineColor = 0x050505;
    let pointColor = 0xFFFFFF;

    const effectController = {
        showDots: false,
        showLines: true,
        minDistance: 200,
        limitConnections: true,
        maxConnections: 20,
        particleCount: 500
    };

    function init() {
        let canvas = document.getElementsByClassName('resumeCanvas')[0];
        renderer = new THREE.WebGLRenderer({canvas: canvas,  antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
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
                if (effectController.limitConnections && particleDataB.numConnections >= effectController.maxConnections )
                    continue;

                const dx = particlePositions[ i * 3 ] - particlePositions[ j * 3 ];
                const dy = particlePositions[ i * 3 + 1 ] - particlePositions[ j * 3 + 1 ];
                const dz = particlePositions[ i * 3 + 2 ] - particlePositions[ j * 3 + 2 ];
                const dist = Math.sqrt( dx * dx + dy * dy + dz * dz );

                if (dist < effectController.minDistance) {
                    particleData.numConnections ++;
                    particleDataB.numConnections ++;

                    let alpha = fadeIn;

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
        if(start === -1) {
            start = Date.now();
        }
        let time = (Date.now() - start) * 0.001;

        if(fadeIn < 1) {
            fadeIn = time * 0.5;
        } else {
            fadeIn = 1;
        }

        group.rotation.y = time * rotationSpeedY;
        group.rotation.z = time * rotationSpeedZ;
        renderer.render( scene, camera );
    }

    function handleResize() {
        renderer.setSize( window.innerWidth, window.innerHeight );
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        
        init();
        animate();
    });

    return (
        <React.Fragment>
            <Stack width={'100vw'} alignItems="center" direction="column" spacing={3}>
                <Container>
                    <ResumeParagraph title="" subTitle="" transitionAmount={1}>
                        <StandardHeader variant="h4">Catherine</StandardHeader>
                        <StandardHeader variant="h5">Brower</StandardHeader>
                        <StandardParagraph>
                            I am a driven and creative software engineer looking for unique opportunities.
                            I have three years experience creating enterprise software with Java.
                            In my most recent Java role I worked on a cloud application and I am very interested in similar positions.
                            Additionally, I have two years of front-end development experience, being most comfortable with React.
                        </StandardParagraph>
                    </ResumeParagraph>
                </Container>

                <Container>
                    <ResumeParagraph title="" subTitle="" transitionAmount={1}>
                        <StandardHeader variant="h4">DeepIntent</StandardHeader>
                        <StandardHeader variant="h6">Remote Senior Java Developer (2020 - 2021)</StandardHeader>
                        <Bullet>
                            Developed latency sensitive marketing software in Java Spring
                        </Bullet>
                        <Bullet>
                            Improved application speed allowing for fast ad bids
                        </Bullet>
                        <Bullet>
                            Deployed and managed production server in kubernetes
                        </Bullet>
                    </ResumeParagraph>
                </Container>
                
                <Container>
                    <ResumeParagraph title="" subTitle="">
                        <StandardHeader variant="h4">Gavant Software</StandardHeader>
                        <StandardHeader variant="h6">Front End Developer (2017 - 2019)</StandardHeader>
                        <Bullet>
                            Extensive use of GIT to maintain, create, merge, and rebase production branches
                        </Bullet>
                        <Bullet>
                            Lead developed complex Javascript based web games, utilizing Ember framework
                        </Bullet>
                        <Bullet>
                            Lead developer on large medical application with many subdomains including administrative portal for managing views and data
                        </Bullet>
                    </ResumeParagraph>
                </Container>
                
                <Container>
                    <ResumeParagraph title="" subTitle="">
                        <StandardHeader variant="h4">Latham Pools</StandardHeader>
                        <StandardHeader variant="h6">Java Developer (Nov 2014 -2016)</StandardHeader>
                        <Bullet>
                            Worked on Latham Pools??? order entry and pool design system built from Java Spring
                        </Bullet>
                        <Bullet>
                            Maintained and retrofitted Viking Pools??? legacy internal systems, increasing speed and usability significantly
                        </Bullet>
                        <Bullet>
                            Maintained and administered RHEL servers including troubleshooting network, Apache, and MySQL issues
                        </Bullet>
                    </ResumeParagraph>
                </Container>
                
                <Container>
                    <ResumeParagraph title="" subTitle="">
                        <StandardHeader variant="h4">Tenex Developers</StandardHeader>
                        <StandardHeader variant="h6">Remote Full Stack Developer (2016)</StandardHeader>
                        <Bullet>
                            Worked on both the angular front and java back end of a web project that can send and receive messages over a cellular network
                            Experience coordinating and working with entirely remote team
                        </Bullet>
                    </ResumeParagraph>
                </Container>

                <Container>
                    <ResumeParagraph title="" subTitle="">
                        <Stack spacing={5}>
                            <Container style={{padding: '0px'}}>
                                <StandardHeader variant="h6">Skills</StandardHeader>
                                <StandardParagraph>
                                    General: Git, Docker, Multithreading, Basic DevOps, Basic Unix
                                </StandardParagraph>
                                <StandardParagraph>
                                    Java: Spring Boot, JPA, Kafka, Maven
                                </StandardParagraph>
                                <StandardParagraph>
                                    Python: Numpy, Pandas, Scipy, Ray, Matplotlib, Jupyter, Keras
                                </StandardParagraph>
                                <StandardParagraph>
                                    Web: React, Material UI, Three.js, Node
                                </StandardParagraph>
                            </Container>

                            <Container style={{padding: '0px'}}>
                                <StandardHeader variant="h6">Limited Exposure</StandardHeader>
                                <StandardParagraph>
                                    C#, Wireguard, Grafana, Postgres, Mongo DB, K8S, BigQuery
                                </StandardParagraph>
                            </Container>

                            <Container style={{padding: '0px'}}>
                                <StandardHeader variant="h6">Education</StandardHeader>
                                <StandardParagraph>
                                    Rensselaer Polytechnic Institute (2022)
                                </StandardParagraph>
                                <StandardParagraph>
                                    International School Bangkok (High School, 2009)
                                </StandardParagraph>
                            </Container>
                        </Stack>
                    </ResumeParagraph>
                </Container>
            </Stack>
            
            <div className="blurBackdrop"></div>
            <canvas className="stretchCanvas resumeCanvas"></canvas>
        </React.Fragment>
    )
}