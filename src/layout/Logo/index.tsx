import { defineComponent, computed } from 'vue'
import { useStore } from '/@/stores/app'
import { systemTitle } from '/@/config/index'
import './logo.scss'

export default defineComponent({
  setup() {
    const store = useStore()
    const isCollapse = computed(() => store.isCollapse)
    return () => (
      <div class="logo-container">
        {/* <img src="@/assets/logo.png" alt=""> */}
        {isCollapse ? <h1 >{systemTitle}</h1> : null}
      </div>
    )
  }
})

