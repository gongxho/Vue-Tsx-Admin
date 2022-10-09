import { toRefs, reactive, onMounted, ref, defineComponent } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { Search, FolderAdd } from '@element-plus/icons-vue';
import AddRole from '/@/views/systemManage/role/component/addRole';
import EditRole from '/@/views/systemManage/role/component/editRole';

// 定义接口来定义对象的类型
interface TableData {
	roleName: string;
	roleSign: string;
	describe: string;
	sort: number;
	status: boolean;
	createTime: string;
}
interface TableDataState {
	tableData: {
		data: Array<TableData>;
		total: number;
		loading: boolean;
		param: {
			pageNum: number;
			pageSize: number;
		};
	};
}

export default defineComponent({
	name: 'systemRole',
	components: { Search, FolderAdd, AddRole, EditRole },
	setup() {
		const addRoleRef = ref();
		const editRoleRef = ref();
		const state = reactive<TableDataState>({
			tableData: {
				data: [],
				total: 0,
				loading: false,
				param: {
					pageNum: 1,
					pageSize: 10,
				},
			},
		});
		// 初始化表格数据
		const initTableData = () => {
			const data: Array<TableData> = [];
			for (let i = 0; i < 2; i++) {
				data.push({
					roleName: i === 0 ? '超级管理员' : '普通用户',
					roleSign: i === 0 ? 'admin' : 'common',
					describe: `测试角色${i + 1}`,
					sort: i,
					status: true,
					createTime: new Date().toLocaleString(),
				});
			}
			state.tableData.data = data;
			state.tableData.total = state.tableData.data.length;
		};
		// 打开新增角色弹窗
		const onOpenAddRole = () => addRoleRef.value.openDialog();
		// 打开修改角色弹窗
		const onOpenEditRole = (row: Object) => editRoleRef.value.openDialog(row);

		// 删除角色
		const onRowDel = (row: any) => {
			ElMessageBox.confirm(`此操作将永久删除角色名称：“${row.roleName}”，是否继续?`, '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					ElMessage.success('删除成功');
				})
				.catch(() => {});
		};
		// 分页改变
		const onHandleSizeChange = (val: number) => {
			state.tableData.param.pageSize = val;
		};
		// 分页改变
		const onHandleCurrentChange = (val: number) => {
			state.tableData.param.pageNum = val;
		};
		// 页面加载时
		onMounted(() => {
			initTableData();
		});
		return () => (
			<div class="system-role-container">
				<el-card shadow="hover">
					<div class="system-user-search mb15">
						<el-input size="default" placeholder="请输入角色名称" style="max-width: 180px"></el-input>
						<el-button size="default" type="primary" class="ml10">
							<el-icon>
								<Search />
							</el-icon>
							查询
						</el-button>
						<el-button size="default" type="success" class="ml10" onClick={onOpenAddRole}>
							<el-icon>
								<FolderAdd />
							</el-icon>
							新增角色
						</el-button>
					</div>
					<el-table data={state.tableData.data}>
						<el-table-column type="index" label="序号" width="60" />
						<el-table-column prop="roleName" label="角色名称" show-overflow-tooltip></el-table-column>
						<el-table-column prop="roleSign" label="角色标识" show-overflow-tooltip></el-table-column>
						<el-table-column prop="sort" label="排序" show-overflow-tooltip></el-table-column>
						<el-table-column
							prop="status"
							label="角色状态"
							show-overflow-tooltip
							v-slots={{
								default: (scope: any) => <>{scope.row.status ? <el-tag type="success">启用</el-tag> : <el-tag type="info">禁用</el-tag>}</>,
							}}
						></el-table-column>
						<el-table-column prop="describe" label="角色描述" show-overflow-tooltip></el-table-column>
						<el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
						<el-table-column
							label="操作"
							width="100"
							v-slots={{
								default: (scope: any) => (
									<>
										<el-button
											disabled={scope.row.roleName === '超级管理员'}
											size="small"
											text
											type="primary"
											onClick={() => onOpenEditRole(scope.row)}
										>
											修改
										</el-button>
										<el-button disabled={scope.row.roleName === '超级管理员'} size="small" text type="primary" onClick={() => onRowDel(scope.row)}>
											删除
										</el-button>
									</>
								),
							}}
						/>
					</el-table>
					<el-pagination
						onSize-change={onHandleSizeChange}
						onCurrent-change={onHandleCurrentChange}
						class="mt15"
						pager-count={5}
						page-sizes={[10, 20, 30]}
						v-model:current-page={state.tableData.param.pageNum}
						background
						v-model:page-size={state.tableData.param.pageSize}
						layout="total, sizes, prev, pager, next, jumper"
						total={state.tableData.total}
					/>
				</el-card>
				<AddRole ref={addRoleRef} />
				<EditRole ref={editRoleRef} />
			</div>
		);
	},
});
