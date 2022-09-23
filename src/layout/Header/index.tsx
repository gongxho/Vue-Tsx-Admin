import { defineComponent, computed, reactive, ref } from 'vue'
import { useStore } from '/@/stores/app'
import { useRouter, useRoute } from 'vue-router'
// import FullScreen from './functionList/fullscreen.vue'
// import Word from './functionList/word.vue'
// import SizeChange from './functionList/sizeChange.vue'
import Github from './functionList/github'
import { Expand, Fold } from '@element-plus/icons-vue'
// import Theme from './functionList/theme.vue'
// import Breadcrumb from './Breadcrumb.vue'
// import PasswordLayer from './passwordLayer.vue'
import './header.scss'

export default defineComponent({
  components: {
    // FullScreen,
    // Breadcrumb,
    // Word,
    // SizeChange,
    Github,
    // Theme,
    // PasswordLayer
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const layer = reactive({
      show: false,
      showButton: true
    })
    let isCollapse = ref(false)
    // isCollapse change to hide/show the sidebar
    const opendStateChange = () => {
      isCollapse.value = !isCollapse.value
      store.isCollapseChange(!isCollapse.value)
    }

    // login out the system
    // const loginOut = () => {
    //   store.dispatch('user/loginOut')
    // }

    const showPasswordLayer = () => {
      layer.show = true
    }
    return () => (
      <header>
        <div class="left-box">
          {/* <!-- 收缩按钮 --> */}
          <div class="menu-icon" onClick={opendStateChange}>
            <el-icon>
              {!isCollapse.value ? <Expand /> : <Fold />}
              </el-icon>
          </div>
          {/* <Breadcrumb /> */}
        </div>
        <div class="right-box">
          {/* <!-- 快捷功能按钮 --> */}
          <div class="function-list">
            {/* <div class="function-list-item hidden-sm-and-down"><Full-screen /></div>
          <div class="function-list-item"><Word /></div>
          <div class="function-list-item"><SizeChange /></div>
          <div class="function-list-item hidden-sm-and-down"><Theme /></div> */}
            <div class="function-list-item hidden-sm-and-down">
              <Github />
            </div>
          </div>
          {/* <!-- 用户信息 --> */}
          {/* <div class="user-info">
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ $t('message.system.user') }}
              <i class="sfont system-xiala"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="showPasswordLayer">{{ $t('message.system.changePassword') }}</el-dropdown-item>
                <el-dropdown-item @click="loginOut">{{ $t('message.system.loginOut') }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <password-layer :layer="layer" v-if="layer.show" /> */}
        </div>
      </header>
    )
  }
})