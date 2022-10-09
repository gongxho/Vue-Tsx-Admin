import { defineComponent } from 'vue'
import {useRoute, useRouter} from 'vue-router'
import first from "/@/assets/images/401.gif"
import './401.scss'

export default defineComponent({
  setup() {
    const router = useRouter()
    const backHome =() => router.push('/')
    
    return () => (
      <div class="wscn-http401-container layout-container flex center">
      <div class="wscn-http401">
        <div class="pic-401">
          <img class="pic-401__parent" src={first} alt="401" />
        </div>
        <div class="bullshit">
          <div class="bullshit__oops">无权限访问!</div>
          <div class="bullshit__info">
            您没有访问权限，如需权限，请联系上级授权！
          </div>
          <el-button onClick={backHome} type="primary" round>跳转首页</el-button>
        </div>
      </div>
    </div>
    )
  },
})
