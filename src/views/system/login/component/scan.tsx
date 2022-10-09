import { ref, defineComponent, onMounted } from 'vue';
import QRCode from 'qrcodejs2-fixes';
import './component.scss';

export default defineComponent({
	name: 'loginScan',
	setup() {
		const qrcodeRef = ref<HTMLElement | null>(null);
		// 初始化生成二维码
		const initQrcode = () => {
			(qrcodeRef.value as HTMLElement).innerHTML = '';
			new QRCode(qrcodeRef.value, {
				text: `https://qm.qq.com/cgi-bin/qm/qr?k=RdUY97Vx0T0vZ_1OOu-X1yFNkWgDwbjC&jump_from=webapi`,
				width: 260,
				height: 260,
				colorDark: '#000000',
				colorLight: '#ffffff',
			});
		};
		// 页面加载时
		onMounted(() => {
			initQrcode();
		});
		return () => (
			<div class="login-scan-container">
				<div ref={qrcodeRef}></div>
				<div class="font12 mt20 login-msg">text</div>
			</div>
		);
	},
});
