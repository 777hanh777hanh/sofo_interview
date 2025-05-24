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

export const MOCK_PRODUCTS = [
	{
		id: 1,
		name: 'Lọc gió động cơ Air Filter - Chevrolet Colorado, Trailblazer, Dmax',
		price: 329000,
		price_discount: 299000,
		image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop',
		is_hot_price: true,
		isBuy: true
	},
	{
		id: 2,
		name: 'Lọc gió động cơ Air Filter - Chevrolet Colorado, Trailblazer',
		price: 329000,
		price_discount: 299000,
		image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&h=300&fit=crop',
		is_hot_price: true,
		isBuy: true
	},
	{
		id: 3,
		name: 'Lọc gió động cơ Air Filter - Chevrolet Colorado, Trailblazer, Dmax, Isuzu',
		price: 329000,
		price_discount: 299000,
		image: 'https://images.unsplash.com/photo-1494976040749-cf2770e13be4?w=300&h=300&fit=crop',
		is_hot_price: true,
		isBuy: true
	},
	{
		id: 4,
		name: 'Lọc gió động cơ Air Filter - Chevrolet Colorado',
		price: 329000,
		price_discount: 299000,
		image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=300&h=300&fit=crop',
		is_hot_price: true,
		isBuy: true
	},
	{
		id: 5,
		name: 'Lọc gió động cơ Air Filter - Chevrolet Colorado, Trailblazer ORU',
		price: 329000,
		price_discount: 299000,
		image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=300&fit=crop',
		is_hot_price: true,
		isBuy: true
	},
	{
		id: 6,
		name: 'Lọc gió động cơ Air Filter - Premium Series',
		price: 399000,
		price_discount: 349000,
		image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=300&h=300&fit=crop',
		is_hot_price: true,
		isBuy: true
	}
];
