import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { RGBShiftShader } from 'three/addons/shaders/RGBShiftShader.js';
import { DotScreenShader } from 'three/addons/shaders/DotScreenShader';
import { SphereGeometry } from 'three';

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Fade, Stack, Typography } from '@mui/material';

import PageItem from '../components/PageItem';

function TitlePageContent(props) {
    const [isLeaving, setIsLeaving] = useState(false);
    const [fontSize, setFontSize] = useState(parseInt(window.innerWidth / 10));
    function leavePage() {
        setIsLeaving(true);
        props.leavePage();
    }

    function handleResisze() {
        setFontSize(parseInt(window.innerWidth / 10));
    }


    window.addEventListener('resize', handleResisze);

    return (
        <React.Fragment>
            <Stack direction='row' alignItems='center' justifyContent='center' style={{'width': '100%'}}>
                <Fade in={!isLeaving} timeout={1000}>
                    <Typography style={{'fontSize': `${fontSize}px`}} className="title fixedCenterText" align='center'>
                        Catherine
                    </Typography>
                </Fade>
            </Stack>
            <div className="titleOverlay" onClick={leavePage}></div>
        </React.Fragment>
    )
}

function Title() {
    let navigate = useNavigate();
    let isLeaving = false;
    const camera_z = 400;
    const rotation_speed = 0.0002;
    let scale = 1;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let renderer;
    let camera;
    let scene;
    let composer;
    let object;
    let animation_progress = 0;
    let animationSpeed = 0.02;
    let meshes = [];
    let scales = [];

    function init() {
        let canvas = document.getElementsByClassName('titleCanvas')[0];
        renderer = new THREE.WebGLRenderer({canvas: canvas, alpha: true});
        // renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        renderer.setClearColor(0xffffff, 1);
        // document.body.appendChild(renderer.domElement);

        camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = camera_z;

        scene = new THREE.Scene();
        object = new THREE.Object3D();
        scene.add(object);
        // scene.fog = new THREE.Fog(0x000000, 1, 1000);

        const geometry = new SphereGeometry(1, 4, 4);
        const material = new THREE.MeshPhongMaterial({color: 0xffffff, flatShading: true});

        for(let i = 0; i < 50; i++) {
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize()
            mesh.position.multiplyScalar(Math.random() * 400);
            mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
            mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50;
            scales.push(mesh.scale.x);
            meshes.push(mesh);
            object.add(mesh);
        }

        scene.add(new THREE.AmbientLight(0x222222));

        const light = new THREE.DirectionalLight(0xffffff);
        light.position.set(1, 1, 1);
        scene.add(light);

        //post processing
        composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));

        const effect1 = new ShaderPass(DotScreenShader);
        effect1.uniforms['scale'].value = 2;
        composer.addPass(effect1);

        const effect2 = new ShaderPass(RGBShiftShader);
        effect2.uniforms['amount'].value = 0.005;
        composer.addPass(effect2);
    }

    function animate() {
        requestAnimationFrame(animate);
        object.rotation.x += 1 * rotation_speed;
        object.rotation.y += 5 * rotation_speed;

        if(animation_progress > 0) {
            for(let i = 0; i < meshes.length; i++) {
                scale = (1 - animation_progress * 1.5) * scales[i]
                if(scale < 0) {
                    scale = 0;
                }

                meshes[i].scale.x = scale;
                meshes[i].scale.y = scale;
                meshes[i].scale.z = scale;
            }
        }
        
        composer.render();
    }

    useEffect(() => {
        window.addEventListener('resize', handleResisze);
        
        init();
        animate();
    });

    function handleResisze(event) {
        width = window.innerWidth;
        height = window.innerHeight;
        renderer.setSize(width, height);
        // composer.setSize(width, height);
        // camera.aspect = width / height;
        // camera.updateProjectionMatrix();
    }

    function animationTimer() {
        animation_progress += animationSpeed;
        // setIsLeaving(true);
        isLeaving = true;

        if(animation_progress < 1) {
            window.setTimeout(animationTimer, 10);
        } else {
            navigate("/resume");
        }
    }



    return (
        <PageItem hideHeaderFooter={true}>
            <TitlePageContent leavePage={animationTimer} />
            
            <canvas onClick={animationTimer} className='stretchCanvas titleCanvas'></canvas>
        </PageItem>
    )
}

export default Title;