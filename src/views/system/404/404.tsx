import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import four from "/@/assets/images/404.png"
import four_cloud from "/@/assets/images/404_cloud.png"
import './404.scss'

export default defineComponent({
  setup() {
    const router = useRouter()
    const backHome = () =>  router.push('/')
    
    return () => (
      <div class="wscn-http404-container layout-container flex center">
        <div class="wscn-http404">
          <div class="pic-404">
            <img class="pic-404__parent" src={four} alt="404" />
            <img class="pic-404__child left" src={four_cloud} alt="404" />
            <img class="pic-404__child mid" src={four_cloud} alt="404" />
            <img class="pic-404__child right" src={four_cloud} alt="404" />
          </div>
          <div class="bullshit">
            <div class="bullshit__oops">页面不存在!</div>
            <div class="bullshit__info">
              请检查您输入的网址是否正确，或单击下面的按钮返回主页
            </div>
            <el-button onClick={backHome} type="primary" round>跳转首页</el-button>
          </div>
        </div>
      </div>
    )
  },
})
