import {
    WebGLRenderer,
    Scene,
    PerspectiveCamera,
    GridHelper,
    Mesh,
    BoxGeometry,
    MeshBasicMaterial,
    AxesHelper,
} from "three";
import { OrbitControls } from "../node_modules/three/examples/jsm/controls/OrbitControls";

const renderer = new WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new Scene();

const camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 1000);
camera.position.z = 10;

window.addEventListener("resize", () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
});

const controls = new OrbitControls(camera, renderer.domElement);

const SCALE = 0.1;
const acceleration = {
    isInitial: true,
    initialX: 0,
    initialY: 0,
    initialZ: 0,
    hasRead: false,
    x: 0,
    y: 0,
    z: 0,
};
const speed = {
    x: 0,
    y: 0,
    z: 0
}

// DeviceMotion API implementation.
window.addEventListener("devicemotion", handleDeviceMotion);
function handleDeviceMotion(event: DeviceMotionEvent) {
    acceleration.hasRead = true;
    acceleration.x = event.acceleration.x * SCALE - event.accelerationIncludingGravity.x * SCALE;
    acceleration.y = event.acceleration.y * SCALE - event.accelerationIncludingGravity.y * SCALE;
    acceleration.z = event.acceleration.z * SCALE - event.accelerationIncludingGravity.z * SCALE;
    updateSpeed();
}

// Accelerometer API implementation.
/* const acl = new Accelerometer({ frequency: 60 });
acl.addEventListener("reading", () => {
    acceleration.hasRead = true;
    if (acceleration.isInitial) {
        acceleration.isInitial = false;
        acceleration.initialX = acl.x * SCALE;
        acceleration.initialY = acl.y * SCALE;
        acceleration.initialZ = acl.z * SCALE;
    }
    acceleration.x = acl.x * SCALE; //- acceleration.initialX;
    acceleration.y = acl.y * SCALE; //- acceleration.initialY;
    acceleration.z = acl.z * SCALE; //- acceleration.initialZ;
    updateSpeed();
});
acl.start(); */

// LinearAccelerometer API implementation
/* const acl = new LinearAccelerationSensor({ frequency: 60 });
acl.addEventListener("reading", () => {
    acceleration.hasRead = true;
    acceleration.x = acl.x * SCALE;
    acceleration.y = acl.y * SCALE;
    acceleration.z = acl.z * SCALE;
    updateSpeed();
})
acl.start(); */

function updateSpeed() {
    speed.x += acceleration.x;
    speed.y += acceleration.y;
    speed.z += acceleration.z;
    cube.position.x += speed.x;
    cube.position.y += speed.y;
    cube.position.z += speed.z;
}

const grid = new GridHelper(10, 10);
const axis = new AxesHelper();
const cube = new Mesh(
    new BoxGeometry(0.3, 0.3, 0.3),
    new MeshBasicMaterial({ color: 0xaaaaaa })
);
scene.add(grid, axis, cube);

animate();

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
