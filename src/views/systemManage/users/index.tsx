import { defineComponent, ref, reactive } from 'vue';
import { getData, del, updateStatus } from './user';
import { LayerInterface } from '/@/components/layer/index';
import { ElMessage } from 'element-plus';
import Table from '/@/components/table/index';
import Layer from './layer';
import { Plus, Delete, Search } from '@element-plus/icons-vue';

interface Page {
	index: Number;
	size: Number;
	total: Number;
}

export default defineComponent({
	components: { Table, Layer },
	setup() {
		// 存储搜索用的数据
		const query = reactive({ input: '' });
		// 弹窗控制器
		const layer: LayerInterface = reactive({
			show: false,
			title: '新增',
			showButton: true,
		});
		// 分页参数, 供table使用
		const page: Page = reactive({
			index: 1,
			size: 20,
			total: 0,
		});
		const loading = ref(true);
		const tableData = ref([]);
		const chooseData = ref([]);
		const handleSelectionChange = (val: []) => (chooseData.value = val);
		// 获取表格数据
		// params <init> Boolean ，默认为false，用于判断是否需要初始化分页
		const getTableData = (init: Boolean) => {
			loading.value = true;
			if (init) {
				page.index = 1;
			}
			let params = {
				page: page.index,
				pageSize: page.size,
				...query,
			};
			getData(params)
				.then((res) => {
					let data = res.data.list;
					data.forEach((d: any) => (d.loading = false));
					tableData.value = data;
					page.total = Number(res.data.pager.total);
				})
				.catch((error) => {
					tableData.value = [];
					page.index = 1;
					page.total = 0;
				})
				.finally(() => (loading.value = false));
		};
		// 删除功能
		const handleDel = (data: object[]) => {
			let params = {
				ids: data
					.map((e: any) => {
						return e.id;
					})
					.join(','),
			};
			del(params).then((res) => {
				ElMessage({ type: 'success', message: '删除成功' });
				getTableData(tableData.value.length === 1 ? true : false);
			});
		};
		// 新增弹窗功能
		const handleAdd = () => {
			layer.title = '新增数据';
			layer.show = true;
			delete layer.row;
		};
		// 编辑弹窗功能
		const handleEdit = (row: any) => {
			console.log(row);
			layer.title = '编辑数据';
			layer.row = row;
			layer.show = true;
		};
		// 状态编辑功能
		const handleUpdateStatus = (row: any) => {
			if (!row.id) {
				return;
			}
			row.loading = true;
			let params = {
				id: row.id,
				status: row.status,
			};
			updateStatus(params)
				.then((res) => {
					ElMessage({ type: 'success', message: '状态变更成功' });
				})
				.catch((err) => {
					ElMessage({ type: 'error', message: '状态变更失败' });
				})
				.finally(() => (row.loading = false));
		};
		getTableData(true);
		return () => (
			<div class="layout-container">
				<div class="layout-container-form flex space-between">
					<div class="layout-container-form-handle">
						<el-button type="primary" icon={Plus} onClick={handleAdd}>
							add
						</el-button>
						<el-popconfirm
							title="$t('message.common.delTip')"
							onConfirm={() => handleDel(chooseData.value)}
							v-slots={{
								reference: () => (
									<el-button type="danger" icon={Delete} disabled={chooseData.value.length === 0}>
										del
									</el-button>
								),
							}}
						/>
					</div>
					<div class="layout-container-form-search">
						<el-input v-model={query.input} placeholder="$t('message.common.searchTip')" />
						<el-button type="primary" icon={Search} class="search-btn" onClick={() => getTableData(true)}>
							search
						</el-button>
					</div>
				</div>
				<div class="layout-container-table">
					<Table
						// ref="table"
						style="width: 100%"
						v-model:page={page}
						v-loading={loading.value}
						showSelection={true}
						data={tableData.value}
						onGetTableData={getTableData}
						onSelection-change={handleSelectionChange}
					>
						<el-table-column prop="id" label="Id" align="center" width="80" />
						<el-table-column prop="name" label="用户名" align="center" />
						<el-table-column prop="nickName" label="昵称" align="center" />
						<el-table-column prop="role" label="角色" align="center" />
						<el-table-column
							prop="isAdmin"
							label="超级管理员"
							align="center"
							v-slots={{
								default: (scope: any) => (
									<span class="statusName" style="margin-right:10px">
										{scope.row.isAdmin === 1 ? '是' : '否'}
									</span>
								),
							}}
						/>
						<el-table-column
							prop="status"
							label="状态"
							align="center"
							v-slots={{
								default: (scope: any) => (
									<>
										<span class="statusName" style="margin-right:10px">
											{scope.row.status === 1 ? '启用' : '禁用'}
										</span>
										<el-switch
											v-model={scope.row.status}
											active-color="#13ce66"
											inactive-color="#ff4949"
											active-value={1}
											inactive-value={0}
											loading={scope.row.loading}
											onChange={() => handleUpdateStatus(scope.row)}
										/>
									</>
								),
							}}
						></el-table-column>
						<el-table-column
							label="$t('message.common.handle')"
							align="center"
							fixed="right"
							width="200"
							v-slots={{
								default: (scope: any) => (
									<>
										<el-button onClick={() => handleEdit(scope.row)}>update</el-button>
										<el-popconfirm
											title="$t('message.common.delTip')"
											onConfirm={() => handleDel([scope.row])}
											v-slots={{
												reference: () => <el-button type="danger">delete</el-button>,
											}}
										></el-popconfirm>
									</>
								),
							}}
						></el-table-column>
					</Table>
					{layer.show ? <Layer layer={layer} onGetTableData={() => getTableData} /> : null}
				</div>
			</div>
		);
	},
});
