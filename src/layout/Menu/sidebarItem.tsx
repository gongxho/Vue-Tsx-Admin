import { computed, defineComponent, PropType } from 'vue';
import { RouteRecordRaw, useRouter } from 'vue-router';
import path from 'path-browserify';
import { useStoreApp } from '/@/stores/app';
import { Location, Setting } from '@element-plus/icons-vue';

const SidebarItem = defineComponent({
	name: 'SidebarItem',
	components: { Location, Setting },
	props: {
		item: {
			type: Object as PropType<RouteRecordRaw>,
			required: true,
		},
		basePath: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const router = useRouter();
		const store = useStoreApp();
		const isCollapse = computed(() => store.isCollapseNew);
		let data: Partial<RouteRecordRaw> = {};

		const resolvePath = (routePath: string): string => {
			return path.resolve(props.basePath, routePath);
		};

		const navigation = (path: string) => router.push(path);

		return () => {
			const handleRoute = () => {
				const { item } = props;
				// 当前项没有子菜单
				if (!item.children) {
					data = { ...item, path: '' };
					return (
						<el-menu-item
							onClick={() => {
								navigation(resolvePath(data.path!));
							}}
							index={resolvePath(data.path!)}
							v-slots={{
								title: () => <span>{data.meta!.title}</span>,
							}}
						>
							<el-icon>
								<Location />
							</el-icon>
						</el-menu-item>
					);
				}
				// 过滤隐藏菜单
				const showingChildren = item.children.filter((item) => item.meta && !item.meta.hidden);
				item.children = showingChildren;

				if (showingChildren.length === 1 && !showingChildren[0].children && item.meta && !item.meta.alwaysShow) {
					data = showingChildren[0];
					return (
						<el-menu-item
							index={resolvePath(data.path!)}
							onClick={() => {
								navigation(resolvePath(data.path!));
							}}
							v-slots={{
								title: () => <span>{data.meta!.title}</span>,
							}}
						>
							<el-icon>
								<Setting />
							</el-icon>
						</el-menu-item>
					);
				}

				return (
					<el-sub-menu
						index={resolvePath(item.path)}
						v-slots={{
							title: () =>
								isCollapse.value ? (
									<div class="sub-menu-icon">
										<el-icon>
											<Setting />
										</el-icon>
										<span>{item.meta!.title ? item.meta!.title : '未定义菜单名称'}</span>
									</div>
								) : (
									<el-icon>
										<Setting />
									</el-icon>
								),
						}}
					>
						{item.children.map((child) => (
							<SidebarItem item={child} basePath={resolvePath(child.path)} key={child.path}></SidebarItem>
						))}
					</el-sub-menu>
				);
			};
			return <div>{handleRoute()}</div>;
		};
	},
});

export default SidebarItem;
