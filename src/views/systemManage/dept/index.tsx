import { ref, toRefs, reactive, onMounted, defineComponent } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { Search, FolderAdd } from '@element-plus/icons-vue';
import AddDept from '/@/views/systemManage/dept/component/addDept';
import EditDept from '/@/views/systemManage/dept/component/editDept';

// 定义接口来定义对象的类型
interface TableDataRow {
	deptName: string;
	createTime: string;
	status: boolean;
	sort: number;
	describe: string;
	id: number;
	children?: TableDataRow[];
}
interface TableDataState {
	tableData: {
		data: Array<TableDataRow>;
		total: number;
		loading: boolean;
		param: {
			pageNum: number;
			pageSize: number;
		};
	};
}

export default defineComponent({
	name: 'systemDept',
	components: { Search, FolderAdd, AddDept, EditDept },
	setup() {
		const addDeptRef = ref();
		const editDeptRef = ref();
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
			state.tableData.data.push({
				deptName: 'vueNextAdmin',
				createTime: new Date().toLocaleString(),
				status: true,
				sort: Math.random(),
				describe: '顶级部门',
				id: Math.random(),
				children: [
					{
						deptName: 'IT外包服务',
						createTime: new Date().toLocaleString(),
						status: true,
						sort: Math.random(),
						describe: '总部',
						id: Math.random(),
					},
					{
						deptName: '资本控股',
						createTime: new Date().toLocaleString(),
						status: true,
						sort: Math.random(),
						describe: '分部',
						id: Math.random(),
					},
				],
			});
			state.tableData.total = state.tableData.data.length;
		};
		// 打开新增菜单弹窗
		const onOpenAddDept = () => {
			addDeptRef.value.openDialog();
		};
		// 打开编辑菜单弹窗
		const onOpenEditDept = (row: TableDataRow) => {
			editDeptRef.value.openDialog(row);
		};
		// 删除当前行
		const onTabelRowDel = (row: TableDataRow) => {
			ElMessageBox.confirm(`此操作将永久删除部门：${row.deptName}, 是否继续?`, '提示', {
				confirmButtonText: '删除',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(() => {
					ElMessage.success('删除成功');
				})
				.catch(() => {});
		};
		// 页面加载时
		onMounted(() => {
			initTableData();
		});
		return () => (
			<div class="system-dept-container">
				<el-card shadow="hover">
					<div class="system-dept-search mb15">
						<el-input size="default" placeholder="请输入部门名称" style="max-width: 180px"></el-input>
						<el-button size="default" type="primary" class="ml10">
							<el-icon>
								<Search />
							</el-icon>
							查询
						</el-button>
						<el-button size="default" type="success" class="ml10" onClick={onOpenAddDept}>
							<el-icon>
								<FolderAdd />
							</el-icon>
							新增部门
						</el-button>
					</div>
					<el-table data={state.tableData.data} row-key="id" default-expand-all tree-props={{ children: 'children', hasChildren: 'hasChildren' }}>
						<el-table-column prop="deptName" label="部门名称" show-overflow-tooltip></el-table-column>
						<el-table-column
							label="排序"
							show-overflow-tooltip
							width="80"
							v-slots={{
								default: (scope: any) => {
									return scope.$index;
								},
							}}
						></el-table-column>
						<el-table-column
							prop="status"
							label="部门状态"
							show-overflow-tooltip
							v-slots={{
								default: (scope: any) => <>{scope.row.status ? <el-tag type="success">启用</el-tag> : <el-tag type="info">禁用</el-tag>}</>,
							}}
						></el-table-column>
						<el-table-column prop="describe" label="部门描述" show-overflow-tooltip></el-table-column>
						<el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
						<el-table-column
							label="操作"
							show-overflow-tooltip
							width="140"
							v-slots={{
								default: (scope: any) => (
									<>
										<el-button size="small" text type="primary" onClick={onOpenAddDept}>
											新增
										</el-button>
										<el-button size="small" text type="primary" onClick={() => onOpenEditDept(scope.row)}>
											修改
										</el-button>
										<el-button size="small" text type="primary" onClick={() => onTabelRowDel(scope.row)}>
											删除
										</el-button>
									</>
								),
							}}
						></el-table-column>
					</el-table>
				</el-card>
				<AddDept ref={addDeptRef} />
				<EditDept ref={editDeptRef} />
			</div>
		);
	},
});
