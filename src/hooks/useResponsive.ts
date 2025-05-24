import { useState, useEffect } from 'react';

export const useResponsive = () => {
	const [screenSize, setScreenSize] = useState({
		width: typeof window !== 'undefined' ? window.innerWidth : 0,
		height: typeof window !== 'undefined' ? window.innerHeight : 0
	});

	useEffect(() => {
		const handleResize = () => {
			setScreenSize({
				width: window.innerWidth,
				height: window.innerHeight
			});
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const isXs = screenSize.width < 640;
	const isSm = screenSize.width >= 640 && screenSize.width < 768;
	const isMd = screenSize.width >= 768 && screenSize.width < 1024;
	const isLg = screenSize.width >= 1024 && screenSize.width < 1280;
	const isXl = screenSize.width >= 1280;

	return {
		screenSize,
		isXs,
		isSm,
		isMd,
		isLg,
		isXl,
		isMobile: isXs || isSm,
		isTablet: isMd,
		isDesktop: isLg || isXl
	};
};

export const useProductLimit = () => {
	const { isXs, isSm, isMd, isLg, isXl } = useResponsive();

	const getProductLimit = () => {
		if (isXs) return 5;
		if (isSm) return 4;
		if (isMd) return 4;
		if (isLg) return 4;
		if (isXl) return 5;
		return 4; // default
	};

	return getProductLimit();
};
