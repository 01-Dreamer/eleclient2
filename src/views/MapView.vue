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

const map_ref = ref<HTMLElement | null>(null);
let map_instance: any = null; 
let my_marker: any = null;
let rider_marker: any = null;
const distance = ref('');

const my_location = ref<[number, number]>([116.397428, 39.90923]); 
const rider_location = ref<[number, number]>([116.410792, 39.921131]); 

const calculateDistance = (point_1: [number, number], point_2: [number, number]) => {
  const get_radians = (degree: number) => degree * Math.PI / 180.0;
  const radian_latitude_1 = get_radians(point_1[1]);
  const radian_latitude_2 = get_radians(point_2[1]);
  const difference_latitude = radian_latitude_1 - radian_latitude_2;
  const difference_longitude = get_radians(point_1[0]) - get_radians(point_2[0]);
  let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(difference_latitude / 2), 2) + 
    Math.cos(radian_latitude_1) * Math.cos(radian_latitude_2) * Math.pow(Math.sin(difference_longitude / 2), 2)));
  s = s * 6378.137; 
  if (s < 1) {
    return Math.round(s * 1000) + 'm';
  }
  return s.toFixed(2) + 'km';
};

const updateDistance = () => {
  distance.value = calculateDistance(my_location.value, rider_location.value);
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
    key: "2284fe5929eb4616f50e922d0cf6fbd0", 
    version: "2.0",
    plugins: [],
  }).then((AMap) => {
    map_instance = new AMap.Map(map_ref.value, {
      viewMode: "2D",
      zoom: 13,
      center: my_location.value,
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

  }).catch((e) => {
    console.error(e);
  });
};

onMounted(() => {
  updateDistance();
  initMap();
});

onUnmounted(() => {
  if (map_instance) {
    map_instance.destroy();
    map_instance = null;
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