import { toRefs, reactive, computed, defineComponent, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeConfig } from '/@/stores/themeConfig';
import logoMini from '/@/assets/tsxtlogo.png';
import loginIconTwo from '/@/assets/login-icon-two.svg';
import { NextLoading } from '/@/utils/loading';
import Account from '/@/views/system/login/component/account';
import Mobile from '/@/views/system/login/component/mobile';
import Scan from '/@/views/system/login/component/scan';
import './index.scss';

// 定义接口来定义对象的类型
interface LoginState {
	tabsActiveName: string;
	isScan: boolean;
}

export default defineComponent({
	name: 'loginIndex',
	components: { Account, Mobile, Scan },
	setup() {
		const storesThemeConfig = useThemeConfig();
		const { themeConfig } = storeToRefs(storesThemeConfig);
		const state = reactive<LoginState>({
			tabsActiveName: 'account',
			isScan: false,
		});
		// 获取布局配置信息
		const getThemeConfig = computed(() => themeConfig.value);

		// 页面加载时
		onMounted(() => {
			NextLoading.done();
		});
		return () => (
			<div class="login-container">
				<div class="login-icon-group">
					<div class="login-icon-group-title">
						<img src={logoMini} alt="logo" />
						<div class="login-icon-group-title-text font25">{getThemeConfig.value.globalViceTitle}</div>
					</div>
					{/* <!-- <img src={loginIconTwo} class="login-icon-group-icon" /> --> */}
				</div>
				<div class="login-content">
					<div class="login-content-main">
						<h4 class="login-content-title ml15">{getThemeConfig.value.globalTitle}</h4>
						{!state.isScan ? (
							<div>
								<el-tabs v-model={state.tabsActiveName}>
									<el-tab-pane label="账号密码登录" name="account">
										<Account />
									</el-tab-pane>
									<el-tab-pane label="手机号登录" name="mobile">
										<Mobile />
									</el-tab-pane>
								</el-tabs>
							</div>
						) : (
							<Scan />
						)}
						<div class="login-content-main-sacn" onClick={() => (state.isScan = !state.isScan)}>
							<i class={state.isScan ? 'iconfont icon-diannao1' : 'iconfont icon-barcode-qr'}></i>
							<div class="login-content-main-sacn-delta"></div>
						</div>
					</div>
				</div>
			</div>
		);
	},
});
