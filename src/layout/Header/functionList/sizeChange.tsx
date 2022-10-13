import { defineComponent, computed, unref } from 'vue';
import { useRoute } from 'vue-router';
import { Paperclip } from '@element-plus/icons-vue';
import { useStoreApp } from '/@/stores/app';

export default defineComponent({
	components: { Paperclip },
	setup() {
		const store_app = useStoreApp();
		const route = useRoute();
		const elementSize = computed(() => store_app.elementSize);
		const list = [
			{ size: 'large', name: 'large' },
			{ size: 'default', name: 'default' },
			{ size: 'small', name: 'small' },
		];
		const { fullPath } = unref(route);

		const handleCommand = (command: string) => {
			store_app.stateChange({
				name: 'elementSize',
				value: command,
			});
		};

		return () => (
			<el-dropdown
				onCommand={handleCommand}
				size="default"
				v-slots={{
					dropdown: () => (
						<el-dropdown-menu>
							{list.map((item) => (
								<el-dropdown-item key={item.size} command={item.size} disabled={elementSize.value === item.size}>
									{item.name}
								</el-dropdown-item>
							))}
						</el-dropdown-menu>
					),
				}}
			>
				<span class="el-dropdown-link">
					<el-icon>
						<Paperclip />
					</el-icon>
				</span>
			</el-dropdown>
		);
	},
});
