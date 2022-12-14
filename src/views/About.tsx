import { defineComponent } from 'vue';
import HelloWord from '../components/HelloWord';
import Logo from '../assets/logo.png';

export default defineComponent({
	name: 'About',
	setup() {
		return () => (
			<div>
				<h1>About</h1>
				<img src={Logo} />
				<HelloWord />
			</div>
		);
	},
});
