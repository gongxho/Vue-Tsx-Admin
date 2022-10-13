import { defineComponent } from 'vue';
import drag from '/@/directive/drag/index';
export interface LayerInterface {
	show: boolean;
	title: string;
	showButton?: boolean;
	width?: string;
	[propName: string]: any;
}
export interface LayerType {
	close: Function;
}

export default defineComponent({
	props: {
		layer: {
			type: Object,
			default: () => {
				return {
					show: false,
					title: '',
					showButton: false,
				};
			},
			required: true,
		},
	},
	directives: { drag },
	setup(props, { slots, emit, expose }) {
		const confirm = () => emit('confirm');
		const close = () => (props.layer.show = false);
		// 有选择地暴露局部状态
		expose({ close });

		return () => (
			<div v-drag={props.layer.show}>
				<el-dialog
					v-model={props.layer.show}
					title={props.layer.title}
					width={props.layer.width}
					center
					v-slots={{
						footer: () =>
							props.layer.showButton ? (
								<div>
									<el-button type="primary" onClick={confirm}>
										确认
									</el-button>
									<el-button onClick={close}>取消</el-button>
								</div>
							) : null,
					}}
				>
					{slots ? slots.default?.() : console.error(`Unknown 组件未定义`)}
				</el-dialog>
			</div>
		);
	},
});
