import { defineComponent, ref, reactive, Ref } from 'vue';
import Layer from '/@/components/layer/index';
import { add, update } from '/@/api/table';
import { ElMessage, FormItemContext } from 'element-plus';

export default defineComponent({
	components: {
		Layer,
	},
	props: {
		layer: {
			type: Object,
			default: () => {
				return {
					show: false,
					title: '',
					showButton: true,
				};
			},
		},
	},
	setup(props, ctx) {
		const ruleForm: Ref<FormItemContext | null> = ref(null);
		let form = reactive({ name: '', sort: '', select: '', radio: '' });
		const rules = {
			name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
			sort: [{ required: true, message: '请输入数字', trigger: 'blur' }],
			select: [{ required: true, message: '请选择', trigger: 'blur' }],
			radio: [{ required: true, message: '请选择', trigger: 'blur' }],
		};
		const options = reactive([
			{ value: 1, label: '运动' },
			{ value: 2, label: '健身' },
			{ value: 3, label: '跑酷' },
			{ value: 4, label: '街舞' },
		]);
		const submit = () => {
			if (ruleForm.value) {
				// @ts-ignore
				ruleForm.value.validate((valid: boolean) => {
					if (valid) {
						let params = form;
						if (props.layer.row) {
							updateForm(params);
						} else {
							addForm(params);
						}
					} else {
						return false;
					}
				});
			}
		};
		// 新增提交事件
		const addForm = (params: object) => {
			console.log(ctx);
			add(params).then((res) => {
				ElMessage({
					type: 'success',
					message: '新增成功',
				});
				props.layer.show = false;
				ctx.emit('getTableData', true);
			});
		};
		// 编辑提交事件
		const updateForm = (params: object) => {
			update(params).then((res) => {
				ElMessage({
					type: 'success',
					message: '编辑成功',
				});
				ctx.emit('getTableData', false);
			});
		};
		return () => (
			<Layer layer={props.layer} onConfirm={submit}>
				<el-form model={form} rules={rules} ref={ruleForm} label-width="120px" style="margin-right:30px;">
					<el-form-item label="名称：" prop="name">
						<el-input v-model={form.name} placeholder="请输入名称"></el-input>
					</el-form-item>
					<el-form-item label="数字：" prop="sort">
						<el-input v-model={form.sort} oninput={(form.sort = form.sort.replace(/[^\d]/g, ''))} placeholder="只能输入正整数"></el-input>
					</el-form-item>
					<el-form-item label="选择器：" prop="select">
						<el-select v-model={form.select} placeholder="请选择" clearable>
							{options.map((item) => (
								<el-option key={item.value} label={item.label} value={item.value} />
							))}
						</el-select>
					</el-form-item>
					<el-form-item label="单选框：" prop="radio">
						<el-radio-group v-model={form.radio}>
							<el-radio label={0}>最新开播</el-radio>
							<el-radio label={1}>最早开播</el-radio>
							<el-radio label={2}>最多观看</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-form>
			</Layer>
		);
	},
});
