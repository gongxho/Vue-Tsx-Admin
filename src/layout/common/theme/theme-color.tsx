import { defineComponent } from 'vue';
import './index.scss';

export default defineComponent({
	props: {
		active: {
			type: String,
			default: '',
		},
		activeTextColor: {
			type: String,
			default: '',
		},
		tip: {
			type: String,
			default: '默认蓝',
		},
		color: {
			type: String,
			default: '#409eff',
		},
		textColor: {
			type: String,
			default: '#fff',
		},
	},
	setup(props, { emit }) {
		// 点击事件，触发v-model修改active值
		const handleClick = () => {
			emit('update:active', props.color);
			emit('update:activeTextColor', props.textColor);
		};
		return () => (
			<el-tooltip class="item" effect="dark" content={props.tip} placement="top">
				<div class="theme-color" style={{ 'background-color': props.color }} onClick={handleClick}>
					{props.active === props.color ? (
						<div class="active">
							<i class="sfont system-success" style={{ color: props.textColor }}></i>
						</div>
					) : null}
				</div>
			</el-tooltip>
		);
	},
});
