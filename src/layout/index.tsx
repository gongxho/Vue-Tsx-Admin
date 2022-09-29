import { defineComponent, computed, onBeforeMount, KeepAlive, Transition, h, resolveComponent, resolveDynamicComponent, ref } from "vue";
import { useStore } from '/@/stores/app'
import { useStoreKeep } from '/@/stores/keepAlive'
import { useEventListener } from "@vueuse/core";
import Logo from "./Logo/index";
import Menu from "./Menu/index";
import Header from "./Header/index";
import './index.scss'
// import Tabs from "./Tabs/index.vue";

export default defineComponent({
    components: {
        KeepAlive,
        Transition,
        Logo,
        Menu,
        Header,
        // Tabs,
    },
    setup() {
        const store = useStore();
        const storekeep = useStoreKeep();
        // computed
        const isCollapse = computed(() => store.isCollapse);
        const contentFullScreen = computed(() => store.contentFullScreen);
        const showLogo = computed(() => store.showLogo);
        const showTabs = computed(() => store.showTabs);
        const keepAliveComponentsName = computed(() => storekeep.keepAliveComponentsNames);
        // 页面宽度变化监听后执行的方法
        const resizeHandler = () => {
            if (document.body.clientWidth <= 1000 && !isCollapse.value) {
                store.isCollapseChange(true);
            } else if (document.body.clientWidth > 1000 && isCollapse.value) {
                store.isCollapseChange(false);
            }
        };
        // const hello = (props, context) => h(resolveComponent('a-button'), null, 'hello vue3')
        // 初始化调用
        resizeHandler();
        // beforeMount
        onBeforeMount(() => {
            // 监听页面变化
            useEventListener("resize", resizeHandler);
        });
        // methods
        // 隐藏菜单
        const hideMenu = () => {
            store.isCollapseChange(true);
        };
        let tabComponent = ref('Logo');
        return () => (
            <div>
                <el-container style="height: 100vh">
                    <div
                        class="mask"
                        v-show={isCollapse && contentFullScreen}
                        onClick={hideMenu}
                    ></div>
                    <el-aside
                        width={!isCollapse ? '60px' : '250px'}
                        class={isCollapse ? 'hide-aside' : 'show-side'}
                        v-show={contentFullScreen}
                    >
                        {showLogo ? <Logo /> : null}
                        <Menu />
                    </el-aside>
                    <el-container>
                        <el-header v-show={contentFullScreen}>
                            <Header />
                        </el-header>
                        {/* <Tabs v-show={showTabs} /> */}
                        <el-main>
                            {/* 
                            <router-view v-slots={ Component, route }>
                                <Transition
                                    name={'fade-transform'}
                                    mode="out-in"
                                >
                                    {
                                        keepAliveComponentsName
                                            ? <KeepAlive include="keepAliveComponentsName" >{h(resolveComponent(tabComponent.value))}</KeepAlive>
                                            : h(resolveComponent(tabComponent.value))
                                    }
                                </Transition>
                            </router-view> 
                            */}
                            <router-view v-slots={{
                                default: (scope:any) => (
                                    <Transition name={'fade-transform'} mode="out-in">
                                        <KeepAlive>{scope.Component}</KeepAlive>
                                    </Transition>
                                ),
                            }}
                            ></router-view>
                        </el-main>
                    </el-container>
                </el-container>
            </div>
        )
    },
    // `<component :is="name"></component>`
    // render() {
    //     const Component = resolveDynamicComponent(this.name)
    //     return h(Component)
    // }
});
