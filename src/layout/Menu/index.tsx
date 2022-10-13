import { defineComponent, computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SidebarItem from './sidebarItem';
import { useStoreApp } from '/@/stores/app';
import './index.scss';

export default defineComponent({
	setup() {
		const store_app = useStoreApp();
		const isCollapse = computed(() => store_app.isCollapseNew);
		const routes = useRouter().options.routes;
		const isShowRoutes = computed(() => {
			return routes.filter((item) => !item.meta!.hidden);
		});
		const currentPath = computed(() => useRoute().path);

		const activeIndex = ref('/');
		const handleSelect = (key: string, keyPath: string[]) => {
			console.log(key, keyPath);
		};

		const modename = computed(() => store_app.layout);
		let mode = modename.value === 'defaults' ? true : false;

		return () => {
			return (
				<div class="layout-sidebar-wrapper" style={mode ? 'height:100vh' : ''}>
					<el-scrollbar style={mode ? 'height:100%' : null}>
						<el-menu
							default-active={currentPath.value}
							// default-active={activeIndex.value}
							backgroundColor={mode ? '#304156' : '#FFFFFF'}
							text-color="#bfcbd9"
							unique-opened={false}
							active-text-color="#409EFF"
							class={mode ? 'el-menu-vertical-demo' : null}
							// class={isCollapse.value? 'collapse': ''}
							collapse={!isCollapse.value}
							collapse-transition={false}
							onSelect={handleSelect}
							mode={mode ? 'vertical' : 'horizontal'}
						>
							{isShowRoutes.value.map((route) => {
								return <SidebarItem item={route} basePath={route.path} key={route.path} />;
							})}
						</el-menu>
					</el-scrollbar>
				</div>
			);
		};
	},
});
