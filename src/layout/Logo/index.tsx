import { defineComponent, computed } from 'vue';
import { useStoreApp } from '/@/stores/app';
import { systemTitle } from '/@/config/index';
import logo from '/@/assets/tsxtlogo.png';
import './logo.scss';

export default defineComponent({
	setup() {
		const store = useStoreApp();
		const isCollapse = computed(() => store.isCollapse);
		return () => (
			<div class="logo-container">
				<img style="width:60px" src={logo} alt="logo" />
				{isCollapse.value ? <h1>{systemTitle}</h1> : null}
			</div>
		);
	},
});
