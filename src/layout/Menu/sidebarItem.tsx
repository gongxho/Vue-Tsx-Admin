import { defineComponent, PropType } from 'vue'
import { RouteRecordRaw, useRouter } from 'vue-router'
import path from 'path-browserify'

const SidebarItem = defineComponent({
    name: 'SidebarItem',
    props: {
        item: {
            type: Object as PropType<RouteRecordRaw>,
            required: true
        },
        basePath: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const router = useRouter()
        let data: Partial<RouteRecordRaw> = {
        }

        const resolvePath = (routePath: string): string => {
            return path.resolve(props.basePath, routePath)
        }

        const navigation = (path: string) => {
            router.push(path)
        }

        return () => {
            const handleRoute = () => {
                const { item } = props
                if (!item.children) {
                    data = { ...item, path: '' }
                    return <el-menu-item onClick={() => { navigation(resolvePath(data.path!)) }} index={resolvePath(data.path!)}>
                        <span>{data.meta!.title}</span>
                    </el-menu-item>
                }

                const showingChildren = item.children.filter((item) => {
                    return item.meta && !item.meta.hidden
                })
                item.children = showingChildren

                if (showingChildren.length === 1 && !showingChildren[0].children && (item.meta && !item.meta.alwaysShow)) {
                    data = showingChildren[0]
                    return <el-menu-item index={resolvePath(data.path!)} onClick={() => { navigation(resolvePath(data.path!)) }}>
                        <span>{data.meta!.title}</span>
                    </el-menu-item>
                }

                const slots = {
                    title: () => {
                        return <div>
                            {item.meta!.icon ? <i class={item.meta!.icon}></i> : null}
                            <span>{item.meta!.title ? item.meta!.title : '未定义菜单名称'}</span>
                        </div>
                    }
                }

                return <el-sub-menu index={resolvePath(item.path)} v-slots={slots}>
                    {item.children.map((child) => {
                        return <SidebarItem item={child} basePath={resolvePath(child.path)} key={child.path}></SidebarItem>
                    })}
                </el-sub-menu>
            }
            return <div>{handleRoute()}</div>
        }
    }
})

export default SidebarItem
