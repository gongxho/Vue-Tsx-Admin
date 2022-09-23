import { ChromeFilled } from '@element-plus/icons-vue'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return () => (
      <a href="https://github.com/cmdparkour/vue-admin-box" target="_blank" title="github">
        <el-icon><ChromeFilled /></el-icon>
      </a>
    )
  }
})


{/* <style lang="scss" scoped>
  a {
    &:focus {
      outline: none;
    }
  }
  i {
    cursor: pointer;
    font-size: 18px;
    &:focus {
      outline: none;
    }
  }
</style> */}