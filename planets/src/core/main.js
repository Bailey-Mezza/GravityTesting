import { canvas, content } from './canvas.js';
import { camera } from './camera.js';
import { registerEvents } from '../ui/events.js';
import { bindSliderToPrediction } from '../ui/userControls.js';
import { getPresets } from '../logic/utils.js';

import { init, animate } from './simulation.js';

// Shared state
export let mouse = { x: innerWidth / 2, y: innerHeight / 2 };
export let planets = [];
export let moons = [];
export let suns = [];
export let distantStars = [];
export let scale = 1;
export let isPaused = false;
export let followTarget = { value: null };
export let presets = [];

// References passed to event handlers
const scaleRef = { value: scale };
const isPausedRef = { value: isPaused };


// Initialize and start simulation
async function start() {
    const initData = init(canvas);
    suns = initData.suns;
    planets = initData.planets;
    moons = initData.moons;
    distantStars = initData.distantStars;
    presets = await getPresets();

    bindSliderToPrediction(planets, suns);

    registerEvents(
        mouse,
        planets,
        scaleRef,
        isPausedRef,
        followTarget,
        camera,
        suns,
        presets
    );

    animate({
        content, canvas, camera,
        suns, planets, moons, distantStars,
        mouse, scaleRef, isPausedRef,
        followTargetRef: followTarget
    });
}

start();
