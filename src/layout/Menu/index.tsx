import { defineComponent, computed } from 'vue'
// import '../style/sidebar.scss'
import { useRoute, useRouter } from 'vue-router'
import SidebarItem from './sidebarItem'
import './index.scss'

export default defineComponent({
  setup() {
    const routes = useRouter().options.routes
    const isShowRoutes = computed(() => {
      return routes.filter((item) => {
        return !item.meta!.hidden
      })
    })
    const currentPath = computed(() => {
      return useRoute().path
    })

    return () => {
      return <div class="layout-sidebar-wrapper">
        <el-scrollbar style="height:100%">
          <el-menu default-active={currentPath.value}
            backgroundColor="#304156"
            text-color="#bfcbd9"
            unique-opened={false}
            active-text-color="#409EFF"
            collapse-transition={false}
            mode="vertical">
            {
              isShowRoutes.value.map((route) => {
                return <SidebarItem item={route} basePath={route.path} key={route.path}> </SidebarItem>
              })
            }
          </el-menu>
        </el-scrollbar>
      </div>
    }
  }
})
