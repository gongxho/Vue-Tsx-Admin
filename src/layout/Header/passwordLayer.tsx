// import type { Ref } from 'vue'
import { ElMessage, FormItemContext } from 'element-plus'
import { defineComponent, reactive, Ref, ref, toRef, toRefs } from 'vue'
// import { ElMessage } from 'element-plus'
import { useStore } from '/@/stores/user'
import Layer from '/@/components/layer/index'
import type { LayerType } from '/@/components/layer/index'
import { passwordChange } from '/@/api/user'

export default defineComponent({
  components: {
    Layer
  },
  props: {
    layer: {
      type: Object,
      default: () => {
        return {
          show: false,
          title: '',
          showButton: true
        }
      }
    }
  },
  setup(props, {slots}) {
    const ruleForm: Ref<FormItemContext | null> = ref(null)
    const layerDom: Ref<LayerType | null> = ref(null)
    const store = useStore()
    let form = reactive({
      userId: '123465',
      name: '管理员',
      old: 'qqq',
      new: 'www'
    })
    const rules = {
      old: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
      new: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
    }
    const submit = () => {
      if (ruleForm.value) {
        // @ts-ignore
        ruleForm.value.validate(async (valid: boolean) => {
          if (valid) {
            let params = {
              id: form.userId,
              old: form.old,
              new: form.new
            }
            const res:any = await passwordChange(params)
            console.log('validate', res.data);
            if (res.code == 200) {
                ElMessage({
                  type: 'success',
                  message: res.msg
                })
                console.log(layerDom.value)
                layerDom.value && layerDom.value.close()
                setTimeout(() => {
                  store.loginOut()
                }, 2000)
            }         
          } else {
            return false;
          }
        });
      }
    }
    return () => (
      <Layer layer={props.layer} onConfirm={() => submit()} ref={layerDom}>
      <el-form model={form} rules={rules} ref={ruleForm} label-width="120px" style="margin-right:30px;">
        <el-form-item label="用户名：" prop="name" >{form.name}</el-form-item>
        <el-form-item label="原密码：" prop="old">
          <el-input v-model={form.old} placeholder="请输入原密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="new">
          <el-input v-model={form.new} placeholder="请输入新密码" show-password></el-input>
        </el-form-item>
      </el-form>
    </Layer>
    )
  }
})