<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { useInfoStore } from '@/store'
onLaunch(() => {
  const info = useInfoStore()
  console.log('App Launch')
  console.log('info id is ', info.id)
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style lang="scss">
.content {
  background: $var-bg;
}
</style>
