import { defineComponent, computed, reactive, ref } from 'vue'
import { useStore } from '/@/stores/app'
import { useRouter, useRoute } from 'vue-router'
// import FullScreen from './functionList/fullscreen.vue'
// import Word from './functionList/word.vue'
// import SizeChange from './functionList/sizeChange.vue'
import Github from './functionList/github'
import { Expand, Fold } from '@element-plus/icons-vue'
// import Theme from './functionList/theme.vue'
import Breadcrumb from './Breadcrumb'
import PasswordLayer from './passwordLayer'
import './index.scss'

export default defineComponent({
  components: {
    // FullScreen,
    Breadcrumb,
    // Word,
    // SizeChange,
    Github,
    // Theme,
    PasswordLayer
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
    const loginOut = () => {
      // store.dispatch('user/loginOut')
    }

    const showPasswordLayer = () => {
      layer.show = true
    }

    const slots = {
      dropdown: () => {
          return (
            <el-dropdown-menu>
              <el-dropdown-item onClick={showPasswordLayer}>修改密码</el-dropdown-item>
              <el-dropdown-item onClick={loginOut}>退出登录</el-dropdown-item>
            </el-dropdown-menu>
            )
      }
  }
    return () => (
      <header>
        <div class="left-box">
          {/* <!-- 收缩按钮 --> */}
          <div class="menu-icon" onClick={opendStateChange}>
            <el-icon class={isCollapse ? 'sfont head-fold system-s-unfold' : 'sfont head-fold system-s-fold'}>
              {!isCollapse.value ? <Expand /> : <Fold />}
              </el-icon>
          </div>
          <Breadcrumb />
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
          <div class="user-info">
          <el-dropdown v-slots={slots}>
            <span class="el-dropdown-link"> admin </span>
          </el-dropdown>
        </div>
        {layer.show ? <password-layer layer={layer} /> : null}
        </div>
      </header>
    )
  }
})