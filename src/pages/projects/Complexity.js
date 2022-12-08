import React, {useState, useEffect} from 'react';
import { Button } from '@mui/material';
import * as THREE from 'three';

import PageItem from "../../components/PageItem";
// import RenderObjectList from '../../Complexity/components/RenderObjectList';
import RenderObjectList from '../../complexity/components/RenderObjectList';

export default function Complexity() {
    let camera, scene, renderer;
    let startTime = 0;
    
    let globals = {
        'time': 0
    }

    let workingRenderObjects = [
        {
            'name': 'Starter Cube',
            'id': 'asdads',
            'color': 0xff00ff,
            'geometry': null,
            'material': null,
            'mesh': null,
            'init': (self, globals) => {
                self['geometry'] = new THREE.BoxGeometry(1, 1, 1);
                self['material'] = new THREE.MeshBasicMaterial({
                    'color': self['color']
                });
                self['mesh'] = new THREE.Mesh(self['geometry'], self['material']);

                return self['mesh'];
            },
            'animate': (self, globals) => {
                self['mesh'].rotation.z = globals['time'];
                self['mesh'].rotation.y = globals['time'] * self['test'];
            },
            'test': 0.8
        }
    ];

    const [renderObjects, setRenderObjects] = useState(workingRenderObjects);
    const [antialias, setAntialias] = useState(false);
    const [clearColor, setClearColor] = useState(0xffffff);

    function init() {
        let canvas = document.getElementById('complexityCanvas');
        renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: antialias})
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(clearColor);

        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 4000);
        camera.position.z = 5;

        scene = new THREE.Scene();

        renderObjects.forEach((item) => {
            scene.add(item.init(item, globals))
        })
    }

    function animate() {
        requestAnimationFrame(animate);

        renderObjects.forEach((item) => {
            item.animate(item, globals)
        });

        if(startTime === 0) {
            startTime = Date.now() / 1000;
        }

        globals['time'] = (Date.now() / 1000) - startTime;

        renderer.render(scene, camera);
    }

    function updateRenderObject(index, newValues) {
        workingRenderObjects[0]['name'] = "gabagoool";
        workingRenderObjects[0]['test'] = 0;
    }

    useEffect(() => {
        init();
        animate();
    });

    function run() {
        setRenderObjects(workingRenderObjects);
    }

    return (
        <PageItem>
            <React.Fragment>
                <Button onClick={run}>Run</Button>
                <RenderObjectList renderObjects={workingRenderObjects} update={updateRenderObject} />
            </React.Fragment>
            <canvas id="complexityCanvas" className="stretchCanvas"></canvas>
        </PageItem>
    )
}