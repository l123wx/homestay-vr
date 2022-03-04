import * as THREE from 'three'
import { OrbitControls } from 'three-orbitcontrols-ts';
import { ref } from 'vue';
export class Panorama {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  geometry: THREE.SphereGeometry
  mesh: THREE.Mesh
  renderer: THREE.WebGLRenderer
  containerElement: HTMLElement
  controls: OrbitControls
  _enablePolarMove = true // 是否允许俯仰
  constructor(containerElement: HTMLElement) {
    this.containerElement = containerElement
    
    console.dir(this.containerElement)
    this.scene = new THREE.Scene()

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.containerElement.clientWidth, this.containerElement.clientHeight);
    this.renderer.setClearColor(0xb9d3ff, 1)
    containerElement.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(60, this.containerElement.clientWidth / this.containerElement.clientHeight, 1, 1100);
    this.camera.position.set( 0, 0, 30 );

    (window as any).camera  = this.camera;

    this.geometry = new THREE.SphereGeometry(500, 60, 60);
    this.geometry.scale(1, 1, -1);
    this.geometry.rotateY(degToRad(90));

    (window as any).geometry  = this.geometry;

    this.mesh = new THREE.Mesh(this.geometry)
    this.scene.add(this.mesh)
    
    this.containerElement.addEventListener('resize', this.onElementResize.bind(this), false);

    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.controls.enablePan = false;
    this.controls.enableDamping = true;
    this.controls.enableZoom = true;
    this.controls.rotateSpeed = - 0.02;
    this.controls.dampingFactor = 0.1;
    this.controls.zoomSpeed = 1.0;
    this.enablePolarMove = true;

    this.initGuides();
    this.animate();
  }

  get enablePolarMove() {
    return this._enablePolarMove
  }

  set enablePolarMove(value: boolean) {
    if (value) {
      // this.controls.minPolarAngle = degToRad(30);
      // this.controls.maxPolarAngle = degToRad(150);
      this.controls.minPolarAngle = degToRad(30);
      this.controls.maxPolarAngle = degToRad(150);
    } else {
      this.controls.minPolarAngle = Math.PI/2;
      this.controls.maxPolarAngle = Math.PI/2;
    }
    this._enablePolarMove = value;
  }

  initGuides() {
    const axisHelper = new THREE.AxesHelper(250);
    this.scene.add(axisHelper);
    const gridHelper = new THREE.GridHelper( 100, 30, 0x2C2C2C, 0x888888 );
    this.scene.add(gridHelper);
  }

  setPanorama(panorama: PanoramaItem) {
    // TODO: 异步加载高精度的全景图
    return new Promise((resolve, reject) => {
      try {
        new THREE.TextureLoader().load(panorama.path, texture => {
          this.mesh.material = new THREE.MeshBasicMaterial({ map: texture });
          resolve(true);
          this.geometry.rotateY(degToRad(panorama.deviationAngle));
        });
      } catch (error) {
        reject(error);
      }
    })
  }

  private animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.controls.update();
    // 调用渲染方法，重新渲染页面
    this.renderer.render(this.scene, this.camera);
  }

  onElementResize() {
    this.camera.aspect = this.containerElement.clientWidth / this.containerElement.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.containerElement.clientWidth, this.containerElement.clientHeight);
  }

  getCameraRotations(): object {
    return {
      x: this.camera.rotation.x,
      y: this.camera.rotation.y,
      z: this.camera.rotation.z
    }
  }
  getCameraRotationYAngle() {
    // 通过计算 相机初始方向向量和 相机旋转后的方向向量在XZ平面上的投影得到 相机在XZ平面上的旋转角度
    const cameraVector3 = this.camera.position;
    const angle = radToDeg(new THREE.Vector3(0, 0, -30).angleTo(cameraVector3.clone().negate().setY(0))); // 克隆一个是为了不影响到相机
    if (cameraVector3.x > 0) {
      return 360 - angle;
    } else {
      return angle;
    }
  }
}

export interface PanoramaItem {
  name: string,
  path: string,
  fov: number,
  deviationAngle: number
}

function degToRad( degrees: any ) {
  return degrees * Math.PI / 180;
}

function radToDeg( radians: number ) {
  return radians * 180 / Math.PI;
}