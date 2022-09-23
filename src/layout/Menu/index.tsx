// import { defineComponent, computed, onMounted } from 'vue'
// import { useRouter, useRoute } from 'vue-router'
// import { useStore } from '/@/stores/app'
// import MenuItem from './MenuItem.vue'

// export default defineComponent({
//   components: {
//     MenuItem
//   },
//   setup() {
//     const store = useStore()
//     const isCollapse = computed(() => store.isCollapse)
//     const expandOneMenu = computed(() => store.expandOneMenu)
//     const allRoutes = useRouter().options.routes
//     const route = useRoute()
//     const activeMenu = computed(() => {
//       const { meta, path } = route;
//       if (meta.activeMenu) {
//         return meta.activeMenu;
//       }
//       return path;
//     });
//     onMounted(() => {

//     })
//     return () => (
//       <el-scrollbar>
//       <el-menu
//         // background-color="var(--system-menu-background)"
//         // text-color="var(--system-menu-text-color)"
//         // active-text-color="var(--system-primary-color)"
//         default-active={activeMenu}
//         class={isCollapse? 'collapse layout-menu system-scrollbar': 'layout-menu system-scrollbar'}
//         collapse={!isCollapse}
//         collapse-transition={false}
//         unique-opened={expandOneMenu}
//       >
//         {allRoutes.map((menu,key )=> (
//           <menu-item key={key} menu={menu}></menu-item>
//         ))}
//       </el-menu>
//     </el-scrollbar>
//     )
//   }
// })

import { defineComponent, computed } from 'vue'
// import '../style/sidebar.scss'
import { useRoute, useRouter } from 'vue-router'
import SidebarItem from './sidebarItem'

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
                return <SidebarItem item={route}
                  basePath={route.path}
                  key={route.path}>
                </SidebarItem>
              })
            }
          </el-menu>
        </el-scrollbar>
      </div>
    }
  }
})
