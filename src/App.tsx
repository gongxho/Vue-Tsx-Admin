import { InfoFilled } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { defineComponent, markRaw } from 'vue';
import { RouterView } from 'vue-router';

export default defineComponent({
	name: 'App',
	setup() {
		window.addEventListener(
			'error',
			(event: any) => {
				// console.log('error event:', event);
				if (event.target?.outerHTML?.includes('/assets')) {
					ElMessageBox.confirm('当前页面有新版本，即将为您更新！', '页面更新提示', {
						confirmButtonText: 'OK',
						cancelButtonText: 'Cancel',
						type: 'info',
						icon: markRaw(
							<el-icon>
								<InfoFilled color="#0080FF" />
							</el-icon>
						),
						draggable: true,
					})
						.then(() => {
							ElMessage({ type: 'success', message: '正在更新！' });
							setTimeout(() => {
								window.location.reload();
							}, 500);
						})
						.catch(() => {
							ElMessage({ type: 'info', message: '已取消' });
						});
				}
				return true;
			},
			true // 利用捕获方式
		);
		return () => (
			<>
				<RouterView />
			</>
		);
	},
});
