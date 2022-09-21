import { onBeforeMount, onUnmounted, getCurrentInstance, defineComponent, defineAsyncComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/store/themeConfig';
import { Local } from '/@/utils/storage';

export default defineComponent({
	name: 'layout',
	components: {
		defaults: defineAsyncComponent(() => import('/@/layout/main/defaults.vue')),
		// classic: defineAsyncComponent(() => import('/@/layout/main/classic.vue')),
		// transverse: defineAsyncComponent(() => import('/@/layout/main/transverse.vue')),
		// columns: defineAsyncComponent(() => import('/@/layout/main/columns.vue')),
	},
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  setup(prop) {
    // const count = ref(0)
    const { proxy } = getCurrentInstance();
    const storesThemeConfig = useThemeConfig();
    const { themeConfig } = storeToRefs(storesThemeConfig);
    // 窗口大小改变时(适配移动端)
    const onLayoutResize = () => {
        if (!Local.get('oldLayout')) Local.set('oldLayout', themeConfig.value.layout);
        const clientWidth = document.body.clientWidth;
        if (clientWidth < 1000) {
            themeConfig.value.isCollapse = false;
            proxy.mittBus.emit('layoutMobileResize', {
                layout: 'defaults',
                clientWidth,
            });
        } else {
            proxy.mittBus.emit('layoutMobileResize', {
                layout: Local.get('oldLayout') ? Local.get('oldLayout') : themeConfig.value.layout,
                clientWidth,
            });
        }
    };
    // 页面加载前
    onBeforeMount(() => {
        onLayoutResize();
        window.addEventListener('resize', onLayoutResize);
    });
    // 页面卸载时
    onUnmounted(() => {
        window.removeEventListener('resize', onLayoutResize);
    });
    return () => (
      <>
      <component is={themeConfig.layout} />
      </>
    );
  },
});