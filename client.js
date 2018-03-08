global.THREE = require('three');
const glslify = require('glslify');
const vertexShader = glslify('./src/js/shaders/circle/vertexShader.vert');
const fragmentShader = glslify('./src/js/shaders/circle/fragmentShader.frag');

const clock = new THREE.Clock();

let time = 0.0;
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let dpr = window.devicePixelRatio;

const app = {
  renderer: new THREE.WebGLRenderer(),
  scene: new THREE.Scene(),
  camera: new THREE.PerspectiveCamera(60, windowWidth / windowHeight, 0.1, 1000)
};
const body = document.getElementsByTagName('body')[0];

app.renderer.setClearColor(new THREE.Color(0xffffff), 1.0);
app.renderer.setPixelRatio(window.devicePixelRatio || 1);

// canvasをbodyに追加
body.appendChild(app.renderer.domElement);

// canvasをリサイズ
app.renderer.setSize(windowWidth, windowHeight);

//LIGHTS
let light = new THREE.AmbientLight(0xffffff, 1.0);
app.scene.add(light);

app.camera.position.z = 1.5;

// Geometory作成
let geometry = new THREE.IcosahedronGeometry(0.5, 4);

// Material作成
let material = new THREE.ShaderMaterial({
  uniforms: {
    'time': {
      type: 'f',
      value: time
    },
    'resolution': {
      type: 'v2',
      value: new THREE.Vector2(windowWidth * dpr, windowHeight * dpr)
    }
  },
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  //wireframe:true
});

let mesh = new THREE.Mesh(geometry, material);

app.scene.add(mesh);

render();

function render() {
  time = clock.getElapsedTime();
  mesh.material.uniforms.time.value = time;
  app.renderer.render(app.scene,app.camera);
  requestAnimationFrame(render);
}