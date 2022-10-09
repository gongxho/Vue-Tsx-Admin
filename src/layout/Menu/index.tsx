import { defineComponent, computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import SidebarItem from './sidebarItem';
import { useStoreApp } from '/@/stores/app';
import './index.scss';

export default defineComponent({
	setup() {
		const store = useStoreApp();
		const isCollapse = computed(() => store.isCollapseNew);
		const routes = useRouter().options.routes;
		const isShowRoutes = computed(() => {
			return routes.filter((item) => !item.meta!.hidden);
		});
		const currentPath = computed(() => useRoute().path);

		const activeIndex = ref('/');
		const handleSelect = (key: string, keyPath: string[]) => {
			console.log(key, keyPath);
		};
		return () => {
			return (
				<div class="layout-sidebar-wrapper">
					<el-scrollbar style="height:100%">
						<el-menu
							default-active={currentPath.value}
							// default-active={activeIndex.value}
							backgroundColor="#304156"
							text-color="#bfcbd9"
							unique-opened={false}
							active-text-color="#409EFF"
							class="el-menu-vertical-demo"
							// class={isCollapse.value? 'collapse': ''}
							collapse={!isCollapse.value}
							collapse-transition={false}
							onSelect={handleSelect}
							mode="vertical"
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
