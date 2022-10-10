import {
	onBeforeMount,
	onUnmounted,
	getCurrentInstance,
	defineComponent,
	defineAsyncComponent,
	resolveComponent,
	h,
	ref,
	resolveDynamicComponent,
	computed,
} from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import { useStoreApp } from '/@/stores/app';
import { Local } from '/@/utils/storage';

export default defineComponent({
	name: 'layout',
	components: {
		defaults: defineAsyncComponent(() => import('/@/layout/main/defaults')),
		// classic: defineAsyncComponent(() => import('/@/layout/main/classic.vue')),
		// transverse: defineAsyncComponent(() => import('/@/layout/main/transverse.vue')),
		// columns: defineAsyncComponent(() => import('/@/layout/main/columns.vue')),
	},
	setup(props, { slots }) {
		// const { proxy } = getCurrentInstance();
		const store_app = useStoreApp();
		let Component = computed(() => store_app.layout);
		// const storesThemeConfig = useThemeConfig();
		// const { themeConfig } = storeToRefs(storesThemeConfig);
		// // 窗口大小改变时(适配移动端)
		// const onLayoutResize = () => {
		// 	if (!Local.get('oldLayout')) Local.set('oldLayout', themeConfig.value.layout);
		// 	const clientWidth = document.body.clientWidth;
		// 	if (clientWidth < 1000) {
		// 		themeConfig.value.isCollapse = false;
		// 		proxy.mittBus.emit('layoutMobileResize', {
		// 			layout: 'defaults',
		// 			clientWidth,
		// 		});
		// 	} else {
		// 		proxy.mittBus.emit('layoutMobileResize', {
		// 			layout: Local.get('oldLayout') ? Local.get('oldLayout') : themeConfig.value.layout,
		// 			clientWidth,
		// 		});
		// 	}
		// };
		// // 页面加载前
		// onBeforeMount(() => {
		// 	onLayoutResize();
		// 	window.addEventListener('resize', onLayoutResize);
		// });
		// // 页面卸载时
		// onUnmounted(() => {
		// 	window.removeEventListener('resize', onLayoutResize);
		// });
		return () => <>{h(resolveComponent(Component.value))}</>;
	},
	// render() {
	// 	return h(resolveDynamicComponent('defaults'));
	// },
});
