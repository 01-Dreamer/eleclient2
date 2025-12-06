import { defineStore } from 'pinia'
import { ref } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

export const useLocationStore = defineStore('location', () => {
  const latitude = ref<number>(0)
  const longitude = ref<number>(0)
  const is_located = ref<boolean>(false)
  
  let timer_interval: any = null
  let geolocation_instance: any = null

  const startLocation = async () => {
    if (timer_interval) return

    try {
      (window as any)._AMapSecurityConfig = {
        securityJsCode: '9014d78e66eebdc92f9c68f8b4ae2693',
      }

      const A_Map = await AMapLoader.load({
        key: 'af0fa92e8323040428b2b991461e2732',
        version: '2.0',
        plugins: ['AMap.Geolocation']
      })

      if (!geolocation_instance) {
        geolocation_instance = new A_Map.Geolocation({
          enableHighAccuracy: true,
          timeout: 10000,
          needAddress: false
        })
      }

      const run_locate = () => {
        geolocation_instance.getCurrentPosition((status: string, result: any) => {
          if (status === 'complete') {
            latitude.value = result.position.lat
            longitude.value = result.position.lng
            is_located.value = true
          } else {
            is_located.value = false
          }
        })
      }

      run_locate()
      timer_interval = setInterval(run_locate, 10000)

    } catch (e) {
      console.error(e)
    }
  }

  const stopLocation = () => {
    if (timer_interval) {
      clearInterval(timer_interval)
      timer_interval = null
    }
  }

  return {
    latitude,
    longitude,
    is_located,
    startLocation,
    stopLocation
  }
})