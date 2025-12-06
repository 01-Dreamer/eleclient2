import { defineStore } from 'pinia'
import { ref } from 'vue'
import AMapLoader from '@amap/amap-jsapi-loader'

export const useLocationStore = defineStore('location', () => {
  const latitude = ref<number>(0)
  const longitude = ref<number>(0)
  const is_located = ref<boolean>(false)

  let timer_interval: any = null
  let geolocation_instance: any = null
  let geocoder_instance: any = null

  const _initMapPlugins = async () => {
    try {
      (window as any)._AMapSecurityConfig = {
        securityJsCode: '9014d78e66eebdc92f9c68f8b4ae2693',
      }

      const A_Map = await AMapLoader.load({
        key: 'af0fa92e8323040428b2b991461e2732',
        version: '2.0',
        plugins: ['AMap.Geolocation', 'AMap.Geocoder'] 
      })

      if (!geolocation_instance) {
        geolocation_instance = new A_Map.Geolocation({
          enableHighAccuracy: true,
          timeout: 10000,
          needAddress: false 
        })
      }

      if (!geocoder_instance) {
        geocoder_instance = new A_Map.Geocoder({
          radius: 1000,
          extensions: 'all'
        })
      }
      
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }

  const startLocation = async () => {
    if (timer_interval) return

    await _initMapPlugins()

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
    timer_interval = setInterval(run_locate, 5000)
  }

  const stopLocation = () => {
    if (timer_interval) {
      clearInterval(timer_interval)
      timer_interval = null
    }
  }

  const getLocationText = async (): Promise<string> => {
    if (!latitude.value || !longitude.value) {
      return Promise.reject('no coordinates available')
    }

    if (!geocoder_instance) {
      await _initMapPlugins()
    }

    return new Promise((resolve, reject) => {
      const lnglat = [longitude.value, latitude.value]
      
      geocoder_instance.getAddress(lnglat, (status: string, result: any) => {
        if (status === 'complete' && result.regeocode) {
          resolve(result.regeocode.formattedAddress)
        } else {
          reject('address resolution failed')
        }
      })
    })
  }

  return {
    latitude,
    longitude,
    is_located,
    startLocation,
    stopLocation,
    getLocationText
  }
})