import { toRefs, reactive, defineComponent } from 'vue';
import { Position, Iphone } from '@element-plus/icons-vue'
import '/@/theme/common/transition.scss'

// 定义接口来定义对象的类型
interface LoginMobileState {
	userName: any;
	code: string | number | undefined;
}


export default defineComponent({
	name: 'loginMobile',
	components: { Position, Iphone },
	setup() {
		// 定义对象与类型
		const ruleForm: LoginMobileState = reactive({
			userName: '',
			code: '',
		});		
		return () => (
			<el-form size="large" class="login-content-form">
				<el-form-item class="login-animation1">
					<el-input type="text" placeholder="placeholder1" v-model={ruleForm.userName} clearable autocomplete="off" v-slots={
						{
							prefix: () => (
								<el-icon><Iphone /></el-icon>
							)
						}
					}></el-input>
				</el-form-item>
				<el-form-item class="login-animation2">
					<el-col span={15}>
						<el-input type="text" maxlength="4" placeholder="placeholder2" v-model={ruleForm.code} clearable autocomplete="off" v-slots={
							{
								prefix: () => (
									<el-icon> <Position /> </el-icon>
								)
							}
						}></el-input>
					</el-col>
					<el-col span={1}></el-col>
					<el-col span={8}>
						<el-button class="login-content-code">codeText</el-button>
					</el-col>
				</el-form-item>
				<el-form-item class="login-animation3">
					<el-button round type="primary" class="login-content-submit">
						<span>登录</span>
					</el-button>
				</el-form-item>
				<div class="font12 mt30 login-animation4 login-msg">msgText</div>
			</el-form>
		);
	},
});

