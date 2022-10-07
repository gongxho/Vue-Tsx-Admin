import { reactive, toRefs, defineComponent, watch } from 'vue';
import { Plus, Delete, Search } from '@element-plus/icons-vue'

// 定义接口来定义对象的类型
interface RuleFormList {
	id: number;
	label: string;
	value: string;
}
interface RuleFormState {
	dicName: string;
	fieldName: string;
	status: boolean;
	list: RuleFormList[];
	describe: string;
	fieldNameList: Array<any>;
}
interface DicState {
	isShowDialog: boolean;
	ruleForm: RuleFormState;
}

export default defineComponent({
	name: 'systemEditDic',
	components: { Plus, Delete, Search },
	setup(porps, { expose }) {
		const state = reactive<DicState>({
			isShowDialog: false,
			ruleForm: {
				dicName: '', // 字典名称
				fieldName: '', // 字段名
				status: true, // 字典状态
				list: [
					// 子集字段 + 属性值
					{
						id: Math.random(),
						label: '',
						value: '',
					},
				],
				describe: '', // 字典描述
				fieldNameList: [], // 字段名: [{子集字段 + 属性值}]
			},
		});
		// 打开弹窗
		const openDialog = (row: RuleFormState) => {
			if (row.fieldName === 'SYS_UERINFO') {
				row.list = [
					{ id: Math.random(), label: 'sex', value: '1' },
					{ id: Math.random(), label: 'sex', value: '0' },
				];
			} else {
				row.list = [
					{ id: Math.random(), label: 'role', value: 'admin' },
					{ id: Math.random(), label: 'role', value: 'common' },
					{ id: Math.random(), label: 'roleName', value: '超级管理员' },
					{ id: Math.random(), label: 'roleName', value: '普通用户' },
				];
			}
			state.ruleForm = row;
			state.isShowDialog = true;
		};
		// 关闭弹窗
		const closeDialog = () => {
			state.isShowDialog = false;
		};
		// 取消
		const onCancel = () => {
			closeDialog();
		};
		// 新增
		const onSubmit = () => {
			closeDialog();
		};
		// 新增行
		const onAddRow = () => {
			state.ruleForm.list.push({
				id: Math.random(),
				label: '',
				value: '',
			});
		};
		// 删除行
		const onDelRow = (k: number) => {
			state.ruleForm.list.splice(k, 1);
		};
		expose({ openDialog, closeDialog })
		return () => (
			<div class="system-add-dic-container">
				<el-dialog title="编辑字典" v-model={state.isShowDialog} width="769px" v-slots={{
					footer: () => (
						<span class="dialog-footer">
							<el-button onClick={onCancel} size="default">取 消</el-button>
							<el-button type="primary" onClick={onSubmit} size="default">保存</el-button>
						</span >
					)
				}}>
					<el-alert title="半成品，交互过于复杂，请自行扩展！" type="warning" closable={false} class="mb20"> </el-alert>
					<el-form model={state.ruleForm} size="default" label-width="90px">
						<el-row gutter={35}>
							<el-col xs={24} sm={12} md={12} lg={12} xl={12} class="mb20">
								<el-form-item label="字典名称">
									<el-input v-model={state.ruleForm.dicName} placeholder="请输入字典名称" clearable></el-input>
								</el-form-item>
							</el-col>
							<el-col xs={24} sm={12} md={12} lg={12} xl={12} class="mb20">
								<el-form-item label="字段名">
									<el-input v-model={state.ruleForm.fieldName} placeholder="请输入字段名，拼接 ruleForm.list" clearable></el-input>
								</el-form-item>
							</el-col>
							<el-col xs={24} sm={24} md={24} lg={24} xl={24} class="mb20">
								<el-form-item label="字典状态">
									<el-switch v-model={state.ruleForm.status} inline-prompt active-text="启" inactive-text="禁"></el-switch>
								</el-form-item>
							</el-col>
							<el-col xs={24} sm={24} md={24} lg={24} xl={24} class="mb20">
								{state.ruleForm.list.map((v, k) => {
									console.log(v, k)
									return <>
										<el-row gutter={35} key={k}>
											<el-col xs={24} sm={12} md={12} lg={12} xl={12} class="mb20">
												<el-form-item prop={`list[${k}].label`} v-slots={{
													label: () => (
														<div>
															{
																k == 0
																	? <el-button type="primary" circle size="small" onClick={onAddRow}><el-icon><Plus /></el-icon></el-button>
																	: <el-button type="danger" circle size="small" onClick={() => onDelRow(k)}><el-icon><Delete /></el-icon></el-button>
															}
															<span class="ml10">字段</span>
														</div>
													)
												}}>
													<el-input v-model={v.label} style="width: 100%" placeholder="请输入字段名"> </el-input>
												</el-form-item >
											</el-col >
											<el-col xs={24} sm={12} md={12} lg={12} xl={12} class="mb20">
												<el-form-item label="属性" prop={`list[${k}].value`}>
													<el-input v-model={v.value} style="width: 100%" placeholder="请输入属性值"> </el-input>
												</el-form-item>
											</el-col >
										</el-row >
									</>
								})}
							</el-col >
							<el-col xs={24} sm={24} md={24} lg={24} xl={24} class="mb20">
								<el-form-item label="字典描述">
									<el-input v-model={state.ruleForm.describe} type="textarea" placeholder="请输入字典描述" maxlength="150"></el-input>
								</el-form-item>
							</el-col>
						</el-row >
					</el-form >
				</el-dialog >
			</div >
		)
	},
});
