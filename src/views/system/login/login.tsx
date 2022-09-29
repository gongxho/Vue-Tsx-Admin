
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { User, MoreFilled, Hide, View } from '@element-plus/icons-vue'
import { systemTitle, systemSubTitle } from '/@/config'
import { useStore } from '/@/stores/user'
// import loginIconTwo from '/@/assets/login-icon-two.svg';
import { NextLoading } from '/@/utils/loading';
// import Mobile from '/@/views/system/login/component/mobile';
// import Scan from '/@/views/system/login/component/scan';
import './login.scss'

export default defineComponent({
  components: { User, MoreFilled, Hide, View, 
    // Mobile, Scan 
  },
  setup() {
    const store = useStore()
    const ruleFormRef = ref<FormInstance>()
    const form = reactive({
      name: 'admin',
      password: '123',
      loading: false
    })
    const tabstate = reactive({
      tabsActiveName: 'account',
      isScan: false,
    });
    const passwordType = ref('password')
    const passwordTypeChange = () => {
      passwordType.value === '' ? passwordType.value = 'password' : passwordType.value = ''
    }

    const rules = {
      name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      password: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
    }

    const submit = (formEl: FormInstance | undefined) => {
      // @ts-ignore
      if (!formEl) return
      formEl.validate(async (valid: boolean) => {
        if (valid) {
          console.log('submit!')
          form.loading = true
          let params = { name: form.name, password: form.password }
          const res: any = await store.login(params)
          console.log(res)
          if (res) {
            ElMessage.success({ message: '登录成功', type: 'success', showClose: true, duration: 1000 })
          }
          form.loading = false
          return
        } else {
          console.log('error submit!')
          return false
        }
      })
    }
    // 页面加载时
    onMounted(() => {
      NextLoading.done();
    });
    const slots = {
      append: () => (
        <el-icon onClick={passwordTypeChange}>
          {passwordType.value ? <View /> : <Hide />}
        </el-icon>
      )
    }
    return () => (
      <div class="container">
        <div class="login-icon-group">
          <div class="login-icon-group-title">
            {/* <!-- <img :src="logoMini" /> --> */}
            <div class="login-icon-group-title-text font25">@googxh </div>
          </div>
          {/* <!-- <img :src="loginIconTwo" class="login-icon-group-icon" /> --> */}
        </div>
        <div class="box">
          <div class="login-content-left">
            {/* <!-- <img :src="loginLeftPng"/> --> */}
            <div class="login-content-left-mask">
              <div>{{ systemTitle }}</div>
              <div>{{ systemSubTitle }}</div>
            </div>
          </div>

          <div class="box-inner">
            <h2 style="text-align: center;">welcome</h2>
            {
              tabstate.isScan ? <el-tabs v-model={tabstate.tabsActiveName} style="margin: 0 20px;">
                <el-tab-pane label="Account" name="account">
                  <el-form class="form" model={form} rules={rules} ref={ruleFormRef}>
                    <el-form-item prop="name" label="Name" label-width="120px">
                      <el-input size="large" v-model={form.name} placeholder="userName" type="text" maxlength="50"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" label="Password" label-width="120px">
                      <el-input size="large" v-model={form.password} type={passwordType.value} v-slots={slots} placeholder="Password" name="password" maxlength="50"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button round loading={form.loading} class="login-content-submit" type="primary" onClick={() => submit(ruleFormRef.value)}>
                        <span>Submit</span>
                      </el-button>
                      {/* <!-- <el-button @click="resetForm(ruleFormRef)">Reset</el-button> --> */}
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane label="iPhone" name="mobile">
                  {/* <Mobile style="width: 80%; margin: 20px auto;" /> */}
                </el-tab-pane>
              </el-tabs>
                : null
                // <Scan style="width: 80%; margin: 20px auto;" />
            }
            <div class="login-content-main-sacn" onClick={() => tabstate.isScan = !tabstate.isScan}>
              <i class="iconfont"></i>
              <div class="login-content-main-sacn-delta">sss</div>
            </div>
            <div class="fixed-top-right">
              {/* <!-- <select-lang/> --> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
})

