import { toRefs, reactive, defineComponent, computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import type { FormInstance } from 'element-plus'
import { Position, User, Lock, View, Hide } from '@element-plus/icons-vue'
// import { useI18n } from 'vue-i18n';
import Cookies from 'js-cookie';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
// import { initFrontEndControlRoutes } from '/@/router/frontEnd';
// import { initBackEndControlRoutes } from '/@/router/backEnd';
import { Session } from '/@/utils/storage';
import { formatAxis } from '/@/utils/formatTime';
import { NextLoading } from '/@/utils/loading';
import '/@/theme/common/transition.scss'
import { useStore } from '/@/stores/user';
import './component.scss'

export default defineComponent({
	name: 'loginAccount',
	components: { Position, User, Lock, View, Hide },
	setup() {
		// const { t } = useI18n();
		const storesThemeConfig = useThemeConfig();
		const { themeConfig } = storeToRefs(storesThemeConfig);
		const route = useRoute();
		const router = useRouter();
		const store = useStore()
		const ruleFormRef = ref<FormInstance>()
		const rules = {
			name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
			password: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
			code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
		}
		const state = reactive({
			isShowPassword: false,
			ruleForm: {
				userName: 'admin',
				password: '123456',
				code: '1234',
			},
			loading: {
				signIn: false,
			},
		});
		// 时间获取
		const currentTime = computed(() => {
			return formatAxis(new Date());
		});
		// 登录
		// const onSignIn = async () => {
		// 	state.loading.signIn = true;
		// 	// 存储 token 到浏览器缓存
		// 	Session.set('token', Math.random().toString(36).substring(0));
		// 	// 模拟数据，对接接口时，记得删除多余代码及对应依赖的引入。用于 `/src/stores/userInfo.ts` 中不同用户登录判断（模拟数据）
		// 	Cookies.set('userName', state.ruleForm.userName);
		// 	if (!themeConfig.value.isRequestRoutes) {
		// 		// 前端控制路由，2、请注意执行顺序
		// 		// await initFrontEndControlRoutes();
		// 		signInSuccess();
		// 	} else {
		// 		// 模拟后端控制路由，isRequestRoutes 为 true，则开启后端控制路由
		// 		// 添加完动态路由，再进行 router 跳转，否则可能报错 No match found for location with path "/"
		// 		// await initBackEndControlRoutes();
		// 		// 执行完 initBackEndControlRoutes，再执行 signInSuccess
		// 		signInSuccess();
		// 	}
		// };
		const submit = (formEl: FormInstance | undefined) => {
			// @ts-ignore
			if (!formEl) return
			formEl.validate(async (valid: boolean) => {
				if (valid) {
					console.log('submit!')
					state.loading.signIn = true;
					let params = { name: state.ruleForm.userName, password: state.ruleForm.password }
					const res: any = await store.login(params)
					console.log(res)
					if (res) {
						// 存储 token 到浏览器缓存
						Session.set('token', res.token);
						// 模拟数据，对接接口时，记得删除多余代码及对应依赖的引入。用于 `/src/stores/userInfo.ts` 中不同用户登录判断（模拟数据）
						Cookies.set('userName', state.ruleForm.userName);
						// ElMessage.success({ message: '登录成功', type: 'success', showClose: true, duration: 1000 })
						signInSuccess();
						location.reload()
					}
					state.loading.signIn = false
					return
				} else {
					console.log('error submit!')
					return false
				}
			})
		}
		// 登录成功后的跳转
		const signInSuccess = () => {
			// 初始化登录成功时间问候语
			let currentTimeInfo = currentTime.value;
			// 登录成功，跳到转首页
			// 如果是复制粘贴的路径，非首页/登录页，那么登录成功后重定向到对应的路径中
			if (route.query?.redirect) {
				router.push({
						// path: {<string>route.query?.redirect},
						// query: {Object.keys(<string>route.query?.params).length > 0 ? JSON.parse(<string>route.query?.params) : ''},
					});
				} else {
				router.push('/');
			}
			// 登录成功提示
			// 关闭 loading
			state.loading.signIn = true;
			const signInText = "admin";
			ElMessage.success(`${currentTimeInfo}, ${signInText}`);
			// 添加 loading，防止第一次进入界面时出现短暂空白
			// NextLoading.start();
		}
		;

		return () => (

			<el-form model={state.ruleForm} rules={rules} ref={ruleFormRef} size="large" class="login-content-form">
				<el-form-item class="login-animation1" prop="userName">
					<el-input type="text" placeholder="$t('message.account.accountPlaceholder1')" v-model={state.ruleForm.userName}
						clearable autocomplete="off" v-slots={
							{
								prefix: () => (
									<el-icon> <User /> </el-icon>
								)
							}
						}></el-input>
				</el-form-item>
				<el-form-item class="login-animation2" prop="password">
					<el-input type={state.isShowPassword ? 'text' : 'password'}
						placeholder="$t('message.account.accountPlaceholder2')" v-model={state.ruleForm.password} autocomplete="off" v-slots={
							{
								prefix: () => (<el-icon> <Lock /> </el-icon>),
								suffix: () => (<el-icon onClick={() => state.isShowPassword = !state.isShowPassword}>
									{state.isShowPassword ? <View /> : <Hide />}
								</el-icon>),
							}
						}></el-input>
				</el-form-item>
				<el-form-item class="login-animation3" prop="code">
					<el-col span={15}>
						<el-input type="text" maxlength="4" placeholder="$t('message.account.accountPlaceholder3')"
							v-model={state.ruleForm.code} clearable autocomplete="off" v-slots={
								{
									prefix: () => (
										<el-icon> <Position /> </el-icon>
									)
								}
							}></el-input>
					</el-col>
					<el-col span={1}></el-col>
					<el-col span={8}>
						<el-button class="login-content-code">验证码</el-button>
					</el-col>
				</el-form-item>
				<el-form-item class="login-animation4">
					<el-button type="primary" class="login-content-submit" round onClick={() => submit(ruleFormRef.value)}
						loading={state.loading.signIn}>
						<span>登录</span>
					</el-button>
				</el-form-item>
			</el-form>
		);
	},
});
