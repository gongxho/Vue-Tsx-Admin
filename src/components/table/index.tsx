import { defineComponent, reactive, ref, onActivated, onMounted } from 'vue'
import './index.scss'

export default defineComponent({
  props: {
    data: { type: Array, default: () => [] }, // 数据源
    select: { type: Array, default: () => [] }, // 已选择的数据，与selection结合使用
    showIndex: { type: Boolean, default: false }, // 是否展示index选择，默认否
    showSelection: { type: Boolean, default: false }, // 是否展示选择框，默认否
    showPage: { type: Boolean, default: true }, // 是否展示页级组件，默认是
    page: { // 分页参数
      type: Object,
      default: () => {
        return { index: 1, size: 20, total: 0 }
      }
    },
    pageLayout: { type: String, default: "total, sizes, prev, pager, next, jumper" }, // 分页需要显示的东西，默认全部
    pageSizes: { type: Array, default: [10, 20, 50, 100] }
  },
  setup(props, context) {
    const table: any = ref(null)
    let timer: any = null
    // 分页相关：监听页码切换事件
    const handleCurrentChange = (val: Number) => {
      if (timer) {
        props.page.index = 1
      } else {
        props.page.index = val
        context.emit("getTableData")
      }
    }
    // 分页相关：监听单页显示数量切换事件
    const handleSizeChange = (val: Number) => {
      timer = 'work'
      setTimeout(() => {
        timer = null
      }, 100)
      props.page.size = val
      context.emit("getTableData", true)
    }
    // 选择监听器
    const handleSelectionChange = (val: []) => {
      context.emit("selection-change", val)
    }
    // 解决BUG：keep-alive组件使用时，表格浮层高度不对的问题
    onActivated(() => {
      table.value.doLayout()
    })
    return () => (
      <div class="system-table-box">
        <el-table
          // v-bind={$attrs}
          ref={table}
          class="system-table"
          border
          height="100%"
          data={props.data}
          onSelection-change={handleSelectionChange}
        >
          {props.showSelection ? <el-table-column type="selection" align="center" width="50" /> : null}
          {props.showIndex ? <el-table-column label="序号" width="60" align="center" v-slots={{
            default: (scope: { $index: number }) => (
              (props.page.index - 1) * props.page.size + scope.$index + 1
            )
          }}>
          </el-table-column> : null}
          {/* @ts-ignore */}
          {context.slots ? context.slots.default() : console.error(`Unknown 组件未定义`)}
        </el-table>
        {props.showPage ? <el-pagination
          v-model:current-page={props.page.index}
          class="system-page"
          background
          layout={props.pageLayout}
          total={props.page.total}
          // page-size={props.page.size}
          page-sizes={props.pageSizes}
          onCurrent-change={handleCurrentChange}
          onSize-change={handleSizeChange}
        >
        </el-pagination> : null}
      </div>
    )
  }
})
