import { defineComponent } from 'vue';
import './index.scss';

export default defineComponent({
	props: {
		name: {
			type: String,
			default: 'default',
		},
		active: {
			type: String,
			default: '',
		},
		menu: {
			type: String,
			defualt: '',
		},
		logo: {
			type: String,
			defualt: '',
		},
		header: {
			type: String,
			defualt: '',
		},
		main: {
			type: String,
			defualt: '',
		},
		tip: {
			type: String,
			default: '默认菜单风格',
		},
		activeColor: {
			type: String,
			default: '',
		},
	},
	setup(props, { emit }) {
		// 点击事件，触发v-model修改active值
		const handleClick = () => emit('update:active', props.name);

		return () => (
			<el-tooltip class="item" effect="dark" content={props.tip} placement="top">
				<div class="theme-icon" onClick={handleClick}>
					<div class="theme-icon-sidebar">
						<div class="theme-icon-sidebar-logo" style={{ 'background-color': props.logo }}></div>
						<div class="theme-icon-sidebar-menu" style={{ 'background-color': props.menu }}></div>
					</div>
					<div class="theme-icon-content">
						<div class="theme-icon-content-header" style={{ 'background-color': props.header }}></div>
						<div class="theme-icon-content-main" style={{ 'background-color': props.main }}>
							{props.active === props.name ? (
								<div class="active">
									<i class="sfont system-success" style={{ color: props.activeColor }}></i>
								</div>
							) : null}
						</div>
					</div>
				</div>
			</el-tooltip>
		);
	},
});
