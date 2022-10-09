import { defineComponent } from 'vue';
import { useFullscreen } from '@vueuse/core';
import { Crop, FullScreen } from '@element-plus/icons-vue';

export default defineComponent({
	name: 'fullscreen',
	setup() {
		const { isFullscreen, toggle } = useFullscreen();
		return () => (
			<div>
				<el-icon onClick={toggle}>{isFullscreen ? <FullScreen /> : <Crop />}</el-icon>
			</div>
		);
	},
});
