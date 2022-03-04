<template>
  <div id="container" ref="container"></div>
</template>

<script lang="ts" setup>
import * as THREE from "three";
import { onMounted, ref } from "vue";
const outside_low_url = require('@/assets/images/outside_low.jpg');
const outside_url = require('@/assets/images/outside.jpg');
const inside_low_url = require('@/assets/images/inside_low.jpg');
const inside_url = require('@/assets/images/inside_low.jpg');
const point_url = require('@/assets/images/point.png');

let container = ref()

var camera: any, scene: any, renderer: any, light;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var isUserInteracting = false, onPointerDownPointerX = 0, onPointerDownPointerY = 0, lon = 0, onPointerDownLon = 0, lat = 0, onPointerDownLat = 0, phi = 0, theta = 0;
// 球体网格
var geometry;
// 室外、室内全景图材质
var outside, outside_low: any, inside, inside_low: any;
// 全景球体对象
var mesh: any;
// 摄像机移动参数
var camera_time = 0;
var interactMeshes: any = [];
var anchorMeshes: any = [];
var murderer;
var outsideTextTip: any;
function degToRad( degrees: any ) {
	return degrees * Math.PI / 180;
}
onMounted(() => {
  init();
  animate();
})
function init() {
  // 摄像机
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
  camera.target = new THREE.Vector3(0, 0, 0);

  scene = new THREE.Scene();
  // 添加灯光
  light = new THREE.HemisphereLight(0xffffff);
  light.position.set(0, 40, 0);
  scene.add(light);
  light = new THREE.DirectionalLight(0xffffff);
  light.position.set(0, 40, -10);
  scene.add(light);
  // 全景场景
  geometry = new THREE.SphereGeometry(50, 60, 60);
  // 按z轴翻转
  geometry.scale(1, 1, -1);
  // 添加贴图
  outside_low = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(outside_low_url)
  });
  inside_low = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load(inside_low_url)
  });
  mesh = new THREE.Mesh(geometry, outside_low);

  console.log(new THREE.TextureLoader().load(inside_low_url))

  // 异步加载高清纹理图
  new THREE.TextureLoader().load(outside_url, texture => {
    outside = new THREE.MeshBasicMaterial({ map: texture });
    mesh.material = outside;
  });
  // 加载交互点
  loadMarker('outside');

  scene.add(mesh);
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.value.appendChild(renderer.domElement);

  document.addEventListener('mousedown', onDocumentMouseDown, false);
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  document.addEventListener('mouseup', onDocumentMouseUp, false);
  document.addEventListener('touchstart', onDocumentTouchDown, false);
  document.addEventListener('touchmove', onDocumentTouchMove, false);
  document.addEventListener('touchend', onDocumentMouseUp, false);
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  update();
  anchorMeshes.map((item: any) => {
    item.rotation.y += 0.02;
  });
}

//捕捉鼠标
function update() {
  lat = Math.max(- 85, Math.min(85, lat));
  phi = degToRad(90 - lat);
  theta = degToRad(lon);
  camera.target.x = 500 * Math.sin(phi) * Math.cos(theta);
  camera.target.y = 500 * Math.cos(phi);
  camera.target.z = 500 * Math.sin(phi) * Math.sin(theta);
  camera.lookAt(camera.target);
  if (camera_time > 0 && camera_time < 50) {
    camera.target.x = 0;
    camera.target.y = 1;
    camera.target.z = 24;
    camera.lookAt(camera.target);
    camera.fov -= 1;
    camera.updateProjectionMatrix();
    camera_time++;
    outsideTextTip.visible = false;
  } else if (camera_time === 50) {
    lat = -2;
    lon = 182;
    camera_time = 0;
    camera.fov = 75;
    camera.updateProjectionMatrix();
    mesh.material = inside_low;
    new THREE.TextureLoader().load(inside_url, function (texture) {
      inside = new THREE.MeshBasicMaterial({
        map: texture
      });
      mesh.material = inside;
    });
    // 加载交互点
    loadMarker('inside');
  }
  renderer.render(scene, camera);
}

// 加载交互点
function loadMarker(type: any) {
  var interactPoints = [
    { name: 'point_0_outside_house', scale: 2, x: 0, y: 1.5, z: 24 },
    { name: 'point_1_outside_car', scale: 3, x: 40, y: 1, z: -20 },
    { name: 'point_2_outside_people', scale: 3, x: -20, y: 1, z: -30 },
    { name: 'point_3_inside_eating_room', scale: 2, x: -30, y: 1, z: 20 },
    { name: 'point_4_inside_bed_room', scale: 3, x: 48, y: 0, z: -20 }
  ];
  // 移除marker
  for (let i = scene.children.length - 1; i >= 0; i--) {
    if (/[inside|outside]/.test(scene.children[i].name)) {
      scene.remove(scene.children[i]);
    }
  }
  // 创建一个canvas绘制文字
  outsideTextTip = makeTextSprite('进入室内查找');
  outsideTextTip.scale.set(2.2, 2.2, 2)
  outsideTextTip.position.set(-0.35, -1, 10);
  type === 'outside' && scene.add(outsideTextTip);
  interactPoints = interactPoints.filter(item => item.name.includes(type));
  // 添加问号标记点
  var pointTexture = new THREE.TextureLoader().load(point_url);
  var pointMaterial = new THREE.SpriteMaterial({ map: pointTexture });
  interactPoints.map(item => {
    let point = new THREE.Sprite(pointMaterial);
    point.name = item.name;
    point.scale.set(item.scale * 1.2, item.scale * 1.2, item.scale * 1.2);
    point.position.set(item.x, item.y, item.z);
    interactMeshes.push(point);
    scene.add(point);
  });
}

// 加载嫌疑人
function loadMurderer() {
  var texture = new THREE.TextureLoader().load('./assets/images/murderer.png');
  var material = new THREE.SpriteMaterial({ map: texture });
  murderer = new THREE.Sprite(material);
  murderer.name = 'murderer';
  murderer.scale.set(12, 12, 12);
  murderer.position.set(43, -1.5, -20);
  scene.add(murderer);
}

// 鼠标控制
function onDocumentMouseDown(event: any) {
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(interactMeshes);
  if (intersects.length > 0) {
    let name = intersects[0].object.name;
    if (name === 'point_0_outside_house') {
      camera_time = 1;
    } else if (name === 'point_4_inside_bed_room') {
      alert('小偷就在这里');
      loadMurderer();
    } else {
      alert(`小偷不在${name.includes('car') ? '车里' : name.includes('people') ? '人群' : name.includes('eating') ? '餐厅' : '这里'}`);
    }
  }
  isUserInteracting = true;
  onPointerDownPointerX = event.clientX;
  onPointerDownPointerY = event.clientY;
  onPointerDownLon = lon;
  onPointerDownLat = lat;
}

function onDocumentTouchDown(event: any) {
  isUserInteracting = true;
  onPointerDownPointerX = event.touches[0].pageX;
  onPointerDownPointerY = event.touches[0].pageY;
  onPointerDownLon = lon;
  onPointerDownLat = lat;
}

function onDocumentMouseMove(event: any) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  if (isUserInteracting === true) {
    lon = (onPointerDownPointerX - event.clientX) * 0.1 + onPointerDownLon;
    lat = (event.clientY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
  }
}

function onDocumentTouchMove(event: any) {
  if (isUserInteracting === true) {
    lon = (onPointerDownPointerX - event.touches[0].pageX) * 0.1 + onPointerDownLon;
    lat = (event.touches[0].pageY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
  }
}

function onDocumentMouseUp(event: any) {
  isUserInteracting = false;
}

function onDocumentMouseWheel(event: any) {
  camera.fov += event.deltaY * 0.05;
  camera.updateProjectionMatrix();
}

// 创建文字
function makeTextSprite(message: any, parameters?: any) {
  if (parameters === undefined) parameters = {};
  var fontface = parameters?.fontface || "Arial";
  var fontsize = parameters?.fontsize || 32;
  var borderThickness = parameters?.borderThickness || 4;
  var borderColor = parameters?.borderColor || { r: 0, g: 0, b: 0, a: 1.0 };

  var canvas = document.createElement('canvas');
  var context: any = canvas.getContext('2d');
  context.font = fontsize + "px " + fontface;
  var metrics = context.measureText(message);
  var textWidth = metrics.width;
  context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";
  context.lineWidth = borderThickness;
  context.fillStyle = "#fffc00";
  context.fillText(message, borderThickness, fontsize + borderThickness);
  context.font = 48 + "px " + fontface;
  var texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  var spriteMaterial = new THREE.SpriteMaterial({ map: texture });
  var sprite = new THREE.Sprite(spriteMaterial);
  return sprite;
}
  
</script>

<style>

</style>