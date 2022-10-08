import { defineComponent, withModifiers } from 'vue'
import { RefreshRight, Close } from '@element-plus/icons-vue'
import './index.scss'

export default defineComponent({
  props: {
    menu: {
      type: Object,
      default: () => {
        return {
          path: '',
          meta: {
            label: '',
            hideClose: false
          }
        }
      }
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  components: { RefreshRight, Close },
  setup(props, { emit }) {
    // 关闭按钮
    const closeTab = () => emit('close')
    // 刷新按钮
    const reload = () => emit('reload')

    return () => (
      <div class={props.active ? 'tags-view-item active' : 'tags-view-item'}>
        {props.menu.meta.title ? <router-link to={props.menu.path}>{props.menu.meta.title}</router-link> : null}
        {props.active ? <el-icon onClick={withModifiers(reload, ['stop'])}> <RefreshRight /></el-icon > : null}
        {!props.menu.meta.hideClose ? <el-icon onClick={withModifiers(closeTab, ['stop'])} alt="message.common.del" > <close /></el-icon > : null}
      </div >
    )
  }
})