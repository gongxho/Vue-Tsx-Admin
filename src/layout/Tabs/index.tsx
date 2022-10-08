import type { Ref } from 'vue'
import type { ElScrollbar } from 'element-plus'
import { ArrowDown, RefreshLeft, CircleClose, FullScreen } from '@element-plus/icons-vue'

/** 引用vue系列函数 */
import { defineComponent, computed, watch, reactive, ref, nextTick } from 'vue'
import { useStoreApp } from '/@/stores/app'
import { useStoreKeep } from '/@/stores/keepAlive'
import { useRoute, useRouter } from 'vue-router'

import Item from './item'
import tabsHook from './tabsHook'
import './index.scss'

export default defineComponent({
  components: { Item, ArrowDown, FullScreen },
  setup() {
    const store_app = useStoreApp()
    const store_keep = useStoreKeep()
    const route = useRoute()
    const router = useRouter()
    const scrollbarDom: Ref<typeof ElScrollbar | null> = ref(null)
    const scrollLeft = ref(0)
    const defaultMenu = {
      path: '/',
      meta: { title: 'index', hideClose: true }
    }
    const contentFullScreen = computed(() => store_app.contentFullScreen)
    const currentDisabled = computed(() => route.path === defaultMenu.path)

    let activeMenu: any = reactive({ path: '' })
    let menuList = ref(tabsHook.getItem())
    if (menuList.value.length === 0) { // 判断之前有没有调用过
      addMenu(defaultMenu)
    }
    watch(menuList.value, (newVal: []) => {
      tabsHook.setItem(newVal)
    })
    watch(menuList, (newVal: []) => {
      tabsHook.setItem(newVal)
    })
    router.afterEach(() => {
      addMenu(route)
      initMenu(route)
    })

    // 全屏
    const onFullscreen = () => {
      store_app.contentFullScreenChange(!contentFullScreen.value)
    }
    // 当前页面组件重新加载
    const pageReload = () => {
      const self: any = route.matched[route.matched.length - 1].instances.default

      self.handleReload();
    }

    // 关闭当前标签，首页不关闭
    const closeCurrentRoute = () => {
      if (route.path !== defaultMenu.path) {
        delMenu(route)
      }
    }
    // 关闭除了当前标签之外的所有标签
    const closeOtherRoute = () => {
      menuList.value = [defaultMenu]
      if (route.path !== defaultMenu.path) {
        addMenu(route)
      }
      setKeepAliveData()
    }

    // 关闭所有的标签，除了首页
    const closeAllRoute = () => {
      menuList.value = [defaultMenu]
      setKeepAliveData()
      router.push(defaultMenu.path)
    }

    // 添加新的菜单项
    const addMenu = (menu: any) => {
      let { path, meta, name } = menu
      if (meta.hideTabs) {
        return
      }
      let hasMenu = menuList.value.some((obj: any) => {
        return obj.path === path
      })
      if (!hasMenu) {
        menuList.value.push({
          path,
          meta,
          name
        })
      }
    }

    // 删除菜单项
    const delMenu = (menu: any) => {
      let index = 0
      if (!menu.meta.hideClose) {
        if (menu.meta.cache && menu.name) {
          store_keep.delKeepAliveComponentsName(menu.name)
        }
        index = menuList.value.findIndex((item: any) => item.path === menu.path)
        menuList.value.splice(index, 1)
      }
      if (menu.path === activeMenu.path) {
        index - 1 > 0 ? router.push(menuList.value[index - 1].path) : router.push(defaultMenu.path)
      }
    }

    // 初始化activeMenu
    const initMenu = (menu: object) => {
      activeMenu = menu
      // nextTick(() => {
      //   setPosition()
      // })
    }
    /** 设置当前滚动条应该在的位置 */
    const setPosition = () => {
      if (scrollbarDom.value) {
        const domBox = {
          scrollbar: scrollbarDom.value.scrollbar$.querySelector('.el-scrollbar__wrap ') as HTMLDivElement,
          activeDom: scrollbarDom.value.scrollbar$.querySelector('.active') as HTMLDivElement,
          activeFather: scrollbarDom.value.scrollbar$.querySelector('.el-scrollbar__view') as HTMLDivElement
        }
        let hasDoms = true
        Object.keys(domBox).forEach((dom) => {
          if (!dom) {
            hasDoms = false
          }
        })
        if (!hasDoms) {
          return
        }
        const domData = {
          scrollbar: domBox.scrollbar.getBoundingClientRect(),
          activeDom: domBox.activeDom.getBoundingClientRect(),
          activeFather: domBox.activeFather.getBoundingClientRect()
        }
        const num = domData.activeDom.x - domData.activeFather.x + 1 / 2 * domData.activeDom.width - 1 / 2 * domData.scrollbar.width
        domBox.scrollbar.scrollLeft = num
      }
    }

    // 配置需要缓存的数据
    const setKeepAliveData = () => {
      let keepAliveNames: string[] | any = []
      menuList.value.forEach((menu: any) => {
        menu.meta && menu.meta.cache && menu.name && keepAliveNames.push(menu.name)
      })
      store_keep.setKeepAliveComponentsName(keepAliveNames)
    }

    /** 监听鼠标滚动事件 */
    const handleWhellScroll = (e: any) => {
      let distance = 0
      let speed = 5
      if (e.wheelDelta > 30) {
        distance = -10
      } else if (e.wheelDelta < -30) {
        distance = 10
      }
      // console.log(scrollLeft.value + eventDelta / 4)
      scrollbarDom.value?.setScrollLeft(scrollLeft.value + distance * speed)
    }

    /** 监听滚动事件 */
    const handleScroll = ({ scrollLeft: left }: { scrollLeft: number }) => {
      scrollLeft.value = left
    }

    // 初始化时调用：1. 新增菜单 2. 初始化activeMenu
    addMenu(route)
    initMenu(route)
    return () => (
      <div class="tabs">
        <el-scrollbar class="scroll-container tags-view-container" ref={scrollbarDom} onScroll={handleScroll}>

          {menuList.value.map((menu: any) => (
            <Item key={menu.meta.title} menu={menu} active={activeMenu.path === menu.path}
              onClose={() => delMenu(menu)} onReload={pageReload} />
          ))}
        </el-scrollbar>
        <div class="handle">
          <el-dropdown placement="bottom" v-slots={{
            dropdown: () => (
              <el-dropdown-menu>
                <el-dropdown-item class="tab-ddropdown-item" icon={RefreshLeft} onClick={pageReload}>
                  message.system.tab.reload
                </el-dropdown-item>
                <el-dropdown-item class="tab-ddropdown-item" icon={CircleClose} disabled={currentDisabled.value} onClick={closeCurrentRoute}>
                  message.system.tab.closeCurrent
                </el-dropdown-item>
                <el-dropdown-item class="tab-ddropdown-item" icon={CircleClose} disabled={menuList.value.length < 3} onClick={closeOtherRoute}>
                  message.system.tab.closeOther
                </el-dropdown-item>
                <el-dropdown-item class="tab-ddropdown-item" icon={CircleClose} disabled={menuList.value.length <= 1} onClick={closeAllRoute}>
                  message.system.tab.closeAll
                </el-dropdown-item>
              </el-dropdown-menu>
            )
          }}>
            <div class="el-dropdown-link">
              <el-icon>
                <ArrowDown />
              </el-icon>
            </div>
          </el-dropdown>
          <el-tooltip class="item" effect="dark" content={contentFullScreen ? 'fullScreenBack' : 'fullScreen'}
            placement="bottom">
            <el-icon onClick={onFullscreen}>
              <FullScreen />
            </el-icon>
          </el-tooltip>
        </div>
      </div>
    )
  }
})

