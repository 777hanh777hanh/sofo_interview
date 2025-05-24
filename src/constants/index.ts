import walletIcon from '@/assets/icons/wallet.svg';
import headPhoneIcon from '@/assets/icons/head-phone.svg';
import truckCircleIcon from '@/assets/icons/truck-circle.svg';
import boxIcon from '@/assets/icons/box.svg';

export const SITE_MAP = [
	{
		label: 'About',
		path: '/about'
	},
	{
		label: 'Article',
		path: '/article'
	},
	{
		label: 'Cart',
		path: '/cart'
	},
	{
		label: 'Contact',
		path: '/contact'
	}
];

export const LEGAL_LINKS = [
	{
		label: 'Privacy Policy',
		path: '/privacy-policy'
	},
	{
		label: 'Cookie Policy',
		path: '/cookie-policy'
	},
	{
		label: 'Delivery Policy',
		path: '/delivery-policy'
	},
	{
		label: 'FAQs',
		path: '/faq'
	}
];

export const MENU = [
	{
		label: 'Về chúng tôi',
		path: '/about'
	},
	{
		label: 'Bài viết',
		path: '/article'
	},
	{
		label: 'Catalog',
		path: '/catalog'
	},
	{
		label: 'Liên hệ',
		path: '/contact'
	}
];

export const FEATURES = [
	{
		title: 'Miễn phí vận chuyển',
		description: 'Với hoá đơn từ 1 triệu',
		icon: walletIcon
	},
	{
		title: 'Hỗ trợ 24/7',
		description:
			'Đội ngũ CSKH tận tình sẵn sàng lắng nghe và phục vụ tận tâm',
		icon: headPhoneIcon
	},
	{
		title: 'Giao hàng nhanh 2h',
		description: 'Trong vòng bán kính 10km nội thành TP HCM',
		icon: truckCircleIcon
	},
	{
		title: '30 ngày đổi trả',
		description:
			'Hoàn tiền 100% nếu phát sinh lỗi từ NSX hoặc đơn vị vận chuyển',
		icon: boxIcon
	}
];
