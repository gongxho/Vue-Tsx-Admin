import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import './index.scss'

export default defineComponent({
  setup() {
    const defaultProps = {
      children: "children",
      label: "path",
    };
    const router = useRouter();
    console.log(router);
    const routes = router.options.routes;
    console.log(routes);
    const show = (node: any, data: any) => {
      console.log(node.data.meta.title);
      console.log(data);
    };
    return () => (
      <div class="layout-container">
        <div class="box">
          <el-tree
            ref="tree"
            class="my-tree"
            data={routes}
            props={defaultProps}
            node-key="id"
            highlight-current
            default-expand-all
            v-slots={{
              default: ({ node, data }) => (
                <div class="custom-tree-node" onClick={() => show(node, data)}>
                  {data.meta ? <span>{data.meta.title} </span> : null}
                </div>
              )
            }}>
          </el-tree>
        </div>
      </div>
    )
  },
})