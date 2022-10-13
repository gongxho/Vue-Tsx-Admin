import { defineComponent, computed, onMounted, onBeforeMount, KeepAlive, Transition, h, resolveComponent, resolveDynamicComponent, ref } from 'vue';
import { useStoreApp } from '/@/stores/app';
import { useStoreKeep } from '/@/stores/keepAlive';
import { useEventListener } from '@vueuse/core';
import { NextLoading } from '/@/utils/loading';
import settingDrawer from '/@/layout/common/SettingDrawer/index';
import Logo from '/@/layout/Logo/index';
import Menu from '/@/layout/Menu/index';
import Header from '/@/layout/Header/index';
import Tabs from '/@/layout/Tabs/index';
// import './index.scss';

export default defineComponent({
	components: { KeepAlive, Transition, Logo, Menu, Header, Tabs, settingDrawer },
	setup() {
		const store = useStoreApp();
		const store_keep = useStoreKeep();
		// computed
		const isCollapse = computed(() => store.isCollapse);
		const contentFullScreen = computed(() => store.contentFullScreen);
		const showLogo = computed(() => store.showLogo);
		const showTabs = computed(() => store.showTabs);
		const keepAliveComponentsName = computed(() => store_keep.keepAliveComponentsNames);

		// 页面宽度变化监听后执行的方法
		const resizeHandler = () => {
			if (document.body.clientWidth <= 1000 && !isCollapse.value) {
				store.isCollapseChange(true);
			} else if (document.body.clientWidth > 1000 && isCollapse.value) {
				store.isCollapseChange(false);
			}
		};

		// 初始化调用
		resizeHandler();
		onBeforeMount(() => {
			// 监听页面变化
			useEventListener('resize', resizeHandler);
		});
		// 隐藏菜单
		const hideMenu = () => store.isCollapseChange(true);
		onMounted(() => {
			NextLoading.done();
			hideMenu();
		});

		return () => (
			<div>
				<el-container>
					<el-row gutter={24} style="margin:0">
						<el-col span={1}>{showLogo ? <Logo /> : null}</el-col>
						<el-col span={19}>
							<Menu />
						</el-col>
						<el-col span={4}>
							<Header />
						</el-col>
					</el-row>
					<el-header v-show={!contentFullScreen.value}>
						<Tabs v-show={showTabs} />
					</el-header>

					<el-main>
						<router-view
							v-slots={{
								default: (scope: any) => (
									<Transition name={'fade-transform'} mode="out-in">
										{keepAliveComponentsName.value ? (
											<KeepAlive include={keepAliveComponentsName.value}>{scope.Component}</KeepAlive>
										) : (
											scope.Component
										)}
									</Transition>
								),
							}}
						/>
					</el-main>
				</el-container>
				<settingDrawer />
			</div>
		);
	},
	// `<component :is="name"></component>`
	// render() {
	//     const Component = resolveDynamicComponent(this.name)
	//     return h(Component)
	// }
});
