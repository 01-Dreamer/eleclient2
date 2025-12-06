<template>
  <HeaderBase>
    距离: {{ distance }}
  </HeaderBase>

  <div class="map-page-container">
    <div id="map-container" ref="map_ref"></div>
  </div>
</template>

<script lang="ts" setup>
import HeaderBase from '@/components/HeaderBase.vue';
import { ref, onMounted, onUnmounted } from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';

(window as any)._AMapSecurityConfig = {
  securityJsCode: '9014d78e66eebdc92f9c68f8b4ae2693',
};

const map_ref = ref<HTMLElement | null>(null);
let map_instance: any = null; 
let my_marker: any = null;
let rider_marker: any = null;
let AMapObj: any = null;
let driving_route: any = null;
const distance = ref('');

const my_location = ref<[number, number]>([116.397428, 39.90923]); 
const rider_location = ref<[number, number]>([116.410792, 39.921131]); 

const calculateDistance = (point_1: [number, number], point_2: [number, number]) => {
  if (!AMapObj || !driving_route) return;

  driving_route.clear();

  driving_route.search(
    new AMapObj.LngLat(point_1[0], point_1[1]),
    new AMapObj.LngLat(point_2[0], point_2[1]),
    (status: string, result: any) => {
      if (status === 'complete') {
        const s = result.routes[0].distance;
        if (s < 1000) {
          distance.value = s + 'm';
        } else {
          distance.value = (s / 1000).toFixed(2) + 'km';
        }
      }
    }
  );
};

const updateDistance = () => {
  calculateDistance(rider_location.value, my_location.value);
};

const updateMyLocation = (latitude: number, longitude: number) => {
  my_location.value = [longitude, latitude];
  if (my_marker) {
    my_marker.setPosition([longitude, latitude]);
  }
  updateDistance();
};

const updateRiderLocation = (latitude: number, longitude: number) => {
  rider_location.value = [longitude, latitude];
  if (rider_marker) {
    rider_marker.setPosition([longitude, latitude]);
  }
  updateDistance();
};

const initMap = () => {
  AMapLoader.load({
    key: "af0fa92e8323040428b2b991461e2732", 
    version: "2.0",
    plugins: ['AMap.Riding'],
  }).then((AMap) => {
    AMapObj = AMap;
    map_instance = new AMap.Map(map_ref.value, {
      viewMode: "2D",
      zoom: 13,
      center: my_location.value,
    });

    driving_route = new AMap.Driving({
      map: map_instance,
      hideMarkers: true,
      showTraffic: false,
      autoFitView: true,
    });

    const my_icon = new AMap.Icon({
      size: new AMap.Size(25, 34),
      image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
      imageSize: new AMap.Size(25, 34),
    });

    const rider_icon = new AMap.Icon({
      size: new AMap.Size(25, 34),
      image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png',
      imageSize: new AMap.Size(25, 34),
    });

    my_marker = new AMap.Marker({
      position: new AMap.LngLat(my_location.value[0], my_location.value[1]),
      icon: my_icon,
      offset: new AMap.Pixel(-13, -34),
      title: '我'
    });

    rider_marker = new AMap.Marker({
      position: new AMap.LngLat(rider_location.value[0], rider_location.value[1]),
      icon: rider_icon,
      offset: new AMap.Pixel(-13, -34),
      title: '骑手'
    });

    map_instance.add([my_marker, rider_marker]);
    map_instance.setFitView();
    updateDistance();

  }).catch((e) => {
    console.error(e);
  });
};

onMounted(() => {
  initMap();
});

onUnmounted(() => {
  if (map_instance) {
    map_instance.destroy();
    map_instance = null;
  }
  if (driving_route) {
    driving_route.clear();
    driving_route = null;
  }
});

defineExpose({
  updateMyLocation,
  updateRiderLocation
});
</script>

<style scoped>
.map-page-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 50px); 
}

#map-container {
  width: 100%;
  height: 100%;
  background-color: #f0f2f5; 
}
</style>