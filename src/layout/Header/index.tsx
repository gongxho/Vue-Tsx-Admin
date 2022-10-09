import { defineComponent, computed, reactive, ref } from 'vue'
import { useStore } from '/@/stores/user'
import { useStoreApp } from '/@/stores/app'
import { useRouter, useRoute } from 'vue-router'
import { Expand, Fold } from '@element-plus/icons-vue'
import Breadcrumb from './Breadcrumb'
import PasswordLayer from './passwordLayer'
import './index.scss'
import FullScreen from './functionList/fullscreen'
import Github from './functionList/github'
// import Word from './functionList/word.vue'
// import SizeChange from './functionList/sizeChange.vue'
// import Theme from './functionList/theme.vue'

export default defineComponent({
  components: {
    FullScreen,
    Breadcrumb,
    // Word,
    // SizeChange,
    Github,
    // Theme,
    PasswordLayer
  },
  setup() {
    const store = useStore()
    const store_app = useStoreApp()
    const router = useRouter()
    const route = useRoute()
    const layer = reactive({
      show: false,
      showButton: true
    })
    let isCollapse = ref(false)
    // isCollapse change to hide/show the sidebar
    const opendStateChange = () => {
      store_app.isCollapseChange(!isCollapse.value)
      isCollapse.value = !isCollapse.value
    }

    // login out the system
    const loginOut = () => store.loginOut()

    const showPasswordLayer = () => layer.show = true

    return () => (
      <header class="header-box">
        <div class="header-left-box">
          {/* <!-- 收缩按钮 --> */}
          <div class="menu-icon" onClick={() => opendStateChange()}>
            <el-icon>
              {!isCollapse.value ? <Expand /> : <Fold />}
            </el-icon>
          </div>
          <Breadcrumb />
        </div>
        <div class="header-right-box">
          {/* <!-- 快捷功能按钮 --> */}
          <div class="function-list">
            <div class="function-list-item hidden-sm-and-down"><Full-screen /></div>
            {/* 
            <div class="function-list-item"><Word /></div>
            <div class="function-list-item"><SizeChange /></div>
            <div class="function-list-item hidden-sm-and-down"><Theme /></div> 
            */}
            <div class="function-list-item hidden-sm-and-down"><Github /></div>
          </div>
          {/* <!-- 用户信息 --> */}
          <div class="user-info">
            <el-dropdown v-slots={
              {
                dropdown: () => {
                  return (
                    <el-dropdown-menu>
                      <el-dropdown-item onClick={showPasswordLayer}>修改密码</el-dropdown-item>
                      <el-dropdown-item onClick={loginOut}>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                  )
                }
              }
            }>
              <span class="el-dropdown-link"> admin </span>
            </el-dropdown>
          </div>
          {layer.show ? <password-layer layer={layer} /> : null}
        </div>
      </header>
    )
  }
})