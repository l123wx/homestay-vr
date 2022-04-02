import { PanoramaItem } from "@/assets/javascript/panorama/Panorama";

export const panorama = {
  state: () => ({
    panoramaList: [
      {
        name: '厨房',
        path: require('@/assets/images/outside.jpg'),
        fov: 70,
        cameraPosition: {"x":-27.17911339489851,"y":-2.278686674962343,"z":-12.494133907742409},
        location: { x: 30, y: 60 }
      }, {
        name: '厨房111',
        path: require('@/assets/images/inside_low.jpg'),
        fov: 70,
        cameraPosition: { x: 0, y: 0, z: 0 }
      }
    ],
    floorPlanPath: require('@/assets/images/floorPlan-text.png'),
    houseArea: 0,
    compass: 0
  }),
  getters: {

  },
  mutations: {
    addPanorama: (state: any, panoramaItem: PanoramaItem) => {
      state.panoramaList.push(panoramaItem);
    },
    updatePanorama: (state: any, payload: { panoramaItem: PanoramaItem, index: number }) => {
      const { panoramaItem, index } = payload;
      state.panoramaList.splice(index, 1, panoramaItem);
    },
    setFloorPlan: (state: any, payload: { path: string }) => {
      state.floorPlanPath = payload.path;
    },
    setHouseArea: (state: any, payload: { area: number }) => {
      state.houseArea = payload.area;
    },
    setCompass: (state: any, payload: { compass: number }) => {
      state.compass = payload.compass;
    },
  },
  actions: {
    
  }
}