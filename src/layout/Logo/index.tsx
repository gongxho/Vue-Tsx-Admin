import { defineComponent, computed } from 'vue';
import { useStoreApp } from '/@/stores/app';
import { systemTitle } from '/@/config/index';
import logo from '/@/assets/tsxtlogo.png';
import './logo.scss';

export default defineComponent({
	setup() {
		const store_app = useStoreApp();
		const isCollapse = computed(() => store_app.isCollapse);
		const modename = computed(() => store_app.layout);
		let mode = modename.value === 'defaults' ? true : false;
		return () => (
			<div class={mode ? 'logo-container' : 'logo-container-transverse'}>
				<img src={logo} alt="logo" />
				{isCollapse.value ? <h1>{systemTitle}</h1> : null}
			</div>
		);
	},
});
