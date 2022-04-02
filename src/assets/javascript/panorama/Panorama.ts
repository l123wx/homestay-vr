import * as THREE from 'three'
import { OrbitControls } from 'three-orbitcontrols-ts';
export class Panorama {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  geometry: THREE.SphereGeometry
  mesh: THREE.Mesh
  // touchMesh: THREE.Mesh
  renderer: THREE.WebGLRenderer
  containerElement: HTMLElement
  controls: OrbitControls
  _fov = 60
  _enablePolarMove = true // 是否允许俯仰
  panoramaData: PanoramaItem | undefined
  raycaster: THREE.Raycaster
  pointer: THREE.Vector2 = new THREE.Vector2()
  _interactPointsList: Array<THREE.Object3D> = []
  interactPointClickCallbackFun: ((object3D: THREE.Object3D) => void) | undefined
  mouseMoveCallbackFun: ((intersects: THREE.Intersection) => void) | undefined
  mouseUpCallbackFun: (() => void) | undefined
  constructor(containerElement: HTMLElement) {
    this.containerElement = containerElement

    this.scene = new THREE.Scene()

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.containerElement.clientWidth, this.containerElement.clientHeight);
    this.renderer.setClearColor(0xb9d3ff, 1)
    containerElement.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(this._fov, this.containerElement.clientWidth / this.containerElement.clientHeight, 1, 1100);
    this.camera.position.set( 0, 0, 1 );

    (window as any).camera  = this.camera;

    this.geometry = new THREE.SphereGeometry(50, 60, 60);
    this.geometry.scale(1, 1, -1);
    this.geometry.rotateY(degToRad(90));

    (window as any).geometry  = this.geometry;

    this.mesh = new THREE.Mesh(this.geometry);
    this.scene.add(this.mesh)
    
    this.containerElement.addEventListener('resize', this.onElementResize.bind(this), false);
    this.containerElement.addEventListener('mousedown', this.onMouseDown.bind(this), false);
    this.containerElement.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    this.containerElement.addEventListener('onMouseUp', this.onMouseUp.bind(this), false);

    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    this.controls.enablePan = false;
    this.controls.enableDamping = true;
    this.controls.enableZoom = true;
    this.controls.rotateSpeed = - 0.02;
    this.controls.dampingFactor = 0.1;
    this.controls.zoomSpeed = 1.0;
    this.enablePolarMove = true;

    this.raycaster = new THREE.Raycaster();

    // this.initGuides();
    this.animate();
    
  }

  get fov() {
    return this._fov;
  }
  set fov(value: number) {
    this.camera.fov = value;
    this.camera.updateProjectionMatrix();
    this._fov = value;
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

  initPanorama(panorama: PanoramaItem) {
    this.panoramaData = panorama;
    return new Promise((resolve, reject) => {
      try {
        this.fov = panorama.fov
        if (panorama.cameraPosition.x != 0 && panorama.cameraPosition.y != 0 && panorama.cameraPosition.z != 0) {
          this.camera.position.set(panorama.cameraPosition.x, panorama.cameraPosition.y, panorama.cameraPosition.z);
        }
        this.asyncLoadPanoramaImg(panorama.path, panorama.lowPath || '').then(res => {
          resolve(true)
        })
        if (panorama.path)
        // 清除旧交互点，加载新交互点
        this.removeAllInteractPointFromScene()
        if (panorama.interactPointData && panorama.interactPointData.length) {
          this.addInteractPointListToScene(panorama.interactPointData)
        }
      } catch (error) {
        reject(error);
      }
    })
  }

  

  // 异步加载高清全景图
  asyncLoadPanoramaImg(path: string, lowPath?: string) {
    return Promise.race([this.setPanoramaImg(lowPath || ''), this.setPanoramaImg(path)])
  }

  setPanoramaImg(path: string) {
    if (!path) return
    return new Promise((resolve, reject) => {
      this.loadMaterial(path).then((material: THREE.Material) => {
        this.mesh.material = material
        resolve(true);
      })
    })
  }

  loadMaterial(imgPath: string) {
    return new Promise((resolve: (material: THREE.Material) => void) => {
      new THREE.TextureLoader().load(imgPath,  texture => {
        resolve(new THREE.MeshBasicMaterial({ map: texture }))
      })
    })
  }

  switchPanorama(newPanorama: PanoramaItem) {
    return new Promise((resolve, reject) => {
      this.switchPanoramaAnimation().then(res => {
        this.asyncLoadPanoramaImg(newPanorama.path, newPanorama.lowPath || '').then(res => {
          this.fov = newPanorama.fov
          if (newPanorama.cameraPosition.x != 0 && newPanorama.cameraPosition.y != 0 && newPanorama.cameraPosition.z != 0) {
            this.camera.position.set(newPanorama.cameraPosition.x, newPanorama.cameraPosition.y, newPanorama.cameraPosition.z);
          }
          this.removeAllInteractPointFromScene()
          if (newPanorama.interactPointData && newPanorama.interactPointData.length) {
            this.addInteractPointListToScene(newPanorama.interactPointData)
          }
          resolve(true)
        })
      })
    })
  }

  switchPanoramaAnimation() {
    return new Promise((resolve) => {
      const preFov = this.fov,
        diffFov = 10,
        time = 1000
      const interval = setInterval(() => {
        if (preFov - this.fov < diffFov) {
          this.fov -= diffFov * 10 / time
        } else {
          clearInterval(interval)
          resolve(true)
        }
      }, 10)
    })
  }

  addInteractPointToScene(pointInfo: InteractPoint) {
    const pointTexture = new THREE.TextureLoader().load(require('@/assets/images/point.png'));
    const pointMaterial = new THREE.SpriteMaterial({ map: pointTexture });
    const point = new THREE.Sprite(pointMaterial);
    point.name = pointInfo.name;
    point.scale.set(pointInfo.scale, pointInfo.scale, pointInfo.scale);
    point.position.set(pointInfo.position.x, pointInfo.position.y, pointInfo.position.z);
    point.userData = pointInfo;
    point.lookAt(0, 0, 0);
    this.scene.add(point);
    this._interactPointsList.push(point);
    return point;
  }

  addInteractPointListToScene(pointList: Array<InteractPoint>) {
    pointList.forEach(item => {
      this.addInteractPointToScene(item)
    })
  }

  removeInteractPointFromScene(pointObject: THREE.Object3D) {
   this.scene.remove(pointObject);
   const removeIndex = this._interactPointsList.findIndex(item => {
    return item.uuid == pointObject.uuid;
   })
   this._interactPointsList.splice(removeIndex, 1);
  }

  removeAllInteractPointFromScene() {
    this._interactPointsList.forEach(item => {
      this.scene.remove(item);
    })
    this._interactPointsList = [];
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

  private onMouseDown(event: MouseEvent) {
    const intersects = this.getMouseIntersectsInteractPoints(event);
    if (intersects.length) {
      console.log(intersects)
      if (typeof this.interactPointClickCallbackFun != 'function') return;
      this.interactPointClickCallbackFun(intersects[0].object);
    }
  }

  private onMouseMove(event: MouseEvent) {
    const intersects = this.getCenterIntersects();
    if (!intersects.length) return;
    if (typeof this.mouseMoveCallbackFun != 'function') return;
    this.mouseMoveCallbackFun(intersects[0]);
  }

  getMouseIntersectsInteractPoints(event: MouseEvent) {
    return this.getIntersects({
      x: ( event.offsetX / this.containerElement.clientWidth ) * 2 - 1,
      y: - ( event.offsetY / this.containerElement.clientHeight ) * 2 + 1
    }, this._interactPointsList);
  }

  getCenterIntersects() {
    return this.getIntersects({x: 0, y: 0}, [this.mesh]);
  }

  getIntersects(location: Location, object3DArray: Array<THREE.Object3D>) {
    this.pointer.set( location.x, location.y );
    this.raycaster.setFromCamera( this.pointer, this.camera );
    const intersects = this.raycaster.intersectObjects(object3DArray);
    return intersects;
  }

  private onMouseUp() {
    if (typeof this.mouseUpCallbackFun != 'function') return;
    this.mouseUpCallbackFun()
  }

  onInteractPointClick(callback: any) {
    this.interactPointClickCallbackFun = callback;
  }

  onPanoramaMouseMove(callback: any) {
    this.mouseMoveCallbackFun = callback;
  }

  onPanoramaMouseUp(callback: any) {
    this.mouseUpCallbackFun = callback;
  }

  getCameraRotationsAngle(): object {
    return {
      x: this.camera.position.x,
      y: this.camera.position.y,
      z: this.camera.position.z
    }
  }
  getCameraAzimuthalAngle() {
    let angle = radToDeg(this.controls.getAzimuthalAngle());
    angle = Number(angle.toFixed(2));
    if (angle > 0) {
      return 360 - angle;
    } else {
      return Math.abs(angle);
    }
  }
}

export interface PanoramaItem {
  name: string
  path: string 
  lowPath?: string // 低质量全景图
  fov: number
  cameraPosition: Position
  location?: Location
  interactPointData?: Array<InteractPoint> | undefined
}

export interface Location {
  x: number,
  y: number
}

export interface Position {
  x: number
  y: number
  z: number
}

export interface InteractPoint {
  name: string
  message: string
  position: Position
  scale: number
  object?: THREE.Object3D
  targetPanoramaName?: string
}

function degToRad( degrees: any ) {
  return degrees * Math.PI / 180;
}

function radToDeg( radians: number ) {
  return radians * 180 / Math.PI;
}