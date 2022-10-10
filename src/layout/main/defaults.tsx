import { defineComponent, computed, onMounted, onBeforeMount, KeepAlive, Transition, h, resolveComponent, resolveDynamicComponent, ref } from 'vue';
import { useStoreApp } from '/@/stores/app';
import { useStoreKeep } from '/@/stores/keepAlive';
import { useEventListener } from '@vueuse/core';
import { NextLoading } from '/@/utils/loading';
import Logo from '/@/layout/Logo/index';
import Menu from '/@/layout/Menu/index';
import Header from '/@/layout/Header/index';
import Tabs from '/@/layout/Tabs/index';
import './index.scss';

export default defineComponent({
	components: { KeepAlive, Transition, Logo, Menu, Header, Tabs },
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
		onMounted(() => {
			NextLoading.done();
		});

		// 隐藏菜单
		const hideMenu = () => store.isCollapseChange(true);

		return () => (
			<div>
				<el-container style="height: 100vh">
					<div class="mask" v-show={isCollapse.value && contentFullScreen.value} onClick={hideMenu} />
					<el-aside
						width={!isCollapse.value ? '60px' : '200px'}
						// class={isCollapse.value ? 'hide-aside' : 'show-side'}
						// v-show={contentFullScreen.value}
					>
						{showLogo ? <Logo /> : null}
						<Menu />
					</el-aside>
					<el-container>
						<el-header v-show={!contentFullScreen.value}>
							<Header />
						</el-header>
						<Tabs v-show={showTabs} />
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
				</el-container>
			</div>
		);
	},
	// `<component :is="name"></component>`
	// render() {
	//     const Component = resolveDynamicComponent(this.name)
	//     return h(Component)
	// }
});
