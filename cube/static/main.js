let timer = new Timer();

var scene = new THREE.Scene();

//Creating objects
var pointLight1 = getPointLight(0.5, 0xffffff);
var pointLight2 = getPointLight(0.5, 0xffffff);
var pointLight3 = getPointLight(0.5, 0xffffff);
var pointLight4 = getPointLight(0.5, 0xffffff);
var pointLight5 = getPointLight(0.5, 0xffffff);
var pointLight6 = getPointLight(0.5, 0xffffff);
var pointLight7 = getPointLight(0.5, 0xffffff);
var pointLight8 = getPointLight(0.5, 0xffffff);

//Begining Positions
pointLight1.position.y = 7;
pointLight1.position.x = 7;
pointLight1.position.z = 7;

pointLight2.position.y = -7;
pointLight2.position.x = -7;
pointLight2.position.z = -7;

pointLight3.position.y = -7;
pointLight3.position.x = 7;
pointLight3.position.z = 7;

pointLight4.position.y = 7;
pointLight4.position.x = -7;
pointLight4.position.z = 7;

pointLight5.position.y = 7;
pointLight5.position.x = 7;
pointLight5.position.z = -7;

pointLight6.position.y = -7;
pointLight6.position.x = -7;
pointLight6.position.z = 7;

pointLight7.position.y = 7;
pointLight7.position.x = -7;
pointLight7.position.z = -7;

pointLight8.position.y = -7;
pointLight8.position.x = 7;
pointLight8.position.z = -7;

var rubeCube = new RubeCube();
var cubeSolver = new CubeSolver(rubeCube);

//Adding objects to scene
scene.add(pointLight1);
scene.add(pointLight2);
scene.add(pointLight3);
scene.add(pointLight4);
scene.add(pointLight5);
scene.add(pointLight6);
scene.add(pointLight7);
scene.add(pointLight8);

scene.add(rubeCube.visualCube);

//Camera creation
var camera = new THREE.PerspectiveCamera(55, window.innerWidth / (window.innerHeight - 58), 1, 1000);
camera.position.z = 5;
camera.position.x = 5;
camera.position.y = 5;
camera.lookAt(new THREE.Vector3(0, 0, 0));

//Renderer Creation
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight - 58);
renderer.setClearColor('#070239');

document.getElementById('main').appendChild(renderer.domElement)
var controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.enablePan = false;
controls.screenSpacePanning = false;
controls.minDistance = 4;
controls.maxDistance = 30;
// controls.enableZoom = false;
// controls.mouseButtons.MIDDLE = null;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2()

function onMouseClick(event) {
    console.log("Нажатие\n");
    // Нормализуем координаты мыши (от -1 до 1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Обновляем позицию луча
    raycaster.setFromCamera(mouse, camera);

    // Получаем список объектов, пересекающих луч
    var intersects_piece = raycaster.intersectObjects(scene.children[8].children)[0];
    // console.log("Пересечение найдено с объектом: ", intersects_piece)

    console.log("Пересечение найдено с объектом: ", intersects_piece);
    // if (intersects.length > 0) {
    // }
}

// Добавляем обработчик события клика мыши на окно
window.addEventListener('mousedown', onMouseClick, false);

ContinuousRender(renderer, scene, camera, controls);

document.addEventListener("keydown", function (event) {
    let direction = 'cw';
    if (event.shiftKey)
        direction = 'ccw';
    if (event.code === 'KeyW')
        moveFace('w', direction, true, 100);
    else if (event.code === 'KeyY')
        moveFace('y', direction, true, 100);
    else if (event.code === 'KeyR')
        moveFace('r', direction, true, 100);
    else if (event.code === 'KeyO')
        moveFace('o', direction, true, 100);
    else if (event.code === 'KeyG')
        moveFace('g', direction, true, 100);
    else if (event.code === 'KeyB')
        moveFace('b', direction, true, 100);
});

// --------------- FUNCTIONS -------------------------------------------------------------------
function getCube(s, color) {
    var geometry = new THREE.BoxGeometry(s, s, s);
    var material = new THREE.MeshPhongMaterial({
        color: color,
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    return mesh;
}

function getPointLight(intensity, color) {
    var light = new THREE.PointLight(color, intensity);
    light.castShadow = true;
    return light;
}

function ContinuousRender(renderer, scene, camera, controls) {
    renderer.render(scene, camera);
    controls.update();
    TWEEN.update();
    requestAnimationFrame(() => ContinuousRender(renderer, scene, camera, controls))
}

function Render(renderer, scene, camera) {
    renderer.render(scene, camera);
}

function FindSpecificPiece(cube, solvedLoc) {
    var toReturn;
    cube.cubePieces.forEach(piece => {
        var x = piece.solvedLocation[0] == solvedLoc[0];
        var y = piece.solvedLocation[1] == solvedLoc[1];
        var z = piece.solvedLocation[2] == solvedLoc[2];
        if (x && y && z) {
            toReturn = piece;
        }
    })
    return toReturn;
}

function resizeScene() {
    renderer.setSize(window.innerWidth, window.innerHeight - 58);
    camera.aspect = window.innerWidth / (window.innerHeight - 58);
    camera.updateProjectionMatrix();
}

window.addEventListener('resize', resizeScene);
let isScrambled = false;

// For timer
function scramble_cube() {
    rubeCube.Scramble(50);
    setTimeout(() => {
        isScrambled = true;
    }, 3500);
}

function start_timer() {
    timer.reset();
    if (isScrambled) {
        let buttons = [document.getElementById('start_timer_btn'), document.getElementById('reset_timer_btn')];
        buttons.forEach(button => {
            button.style.display = 'none';
        })
        document.getElementById('stop_timer_btn').style.display = '';
        timer.start(true, 'timer');
    } else scramble_cube();
}

function stop_timer() {
    timer.stop();
    isScrambled = false;
    document.getElementById('stop_timer_btn').style.display = 'none';
    let buttons = [document.getElementById('start_timer_btn'), document.getElementById('reset_timer_btn')];
    buttons.forEach(button => {
        button.style.display = '';
    })
    if (rubeCube.IsSolved()) {
        send_time(timer.get_miliseconds());
    }
}

function moveFace(color, direction, animating, turnTime) {
    rubeCube.Move(color, direction, animating, turnTime);
    if (timer.isStarted && rubeCube.IsSolved()) {
        stop_timer();

    }
}

const send_time = async (time) => {
    const response = await fetch('/save-time/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({milliseconds: time})
    });
    return response.json();
}

