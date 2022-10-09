import { defineComponent } from 'vue';
import { useStore } from '/@/stores/state';

export default defineComponent({
	name: 'Home',
	setup() {
		const store = useStore();

		return () => (
			<div>
				<h1>Home</h1>
				<h1>{store.title}</h1>
			</div>
		);
	},
});
