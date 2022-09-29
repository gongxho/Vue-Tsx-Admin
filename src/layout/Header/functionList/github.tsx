import { defineComponent } from 'vue'
import { ChromeFilled } from '@element-plus/icons-vue'
import './funlist.scss'

export default defineComponent({
  setup() {
    return () => (
      <a href="https://github.com/" target="_blank" title="github">
        <el-icon class="icon-github">
          <ChromeFilled />
           {/* fa-github */}
        </el-icon>
      </a>
    )
  }
})
