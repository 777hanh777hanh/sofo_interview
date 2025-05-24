// Utility để generate placeholder images
export const generatePlaceholderImage = (
	width: number = 400,
	height: number = 400,
	text?: string
): string => {
	const encodedText = encodeURIComponent(text || 'Product');
	return `https://dummyimage.com/${width}x${height}/f0f0f0/666666?text=${encodedText}`;
};

// Predefined placeholder images cho filter products
export const PRODUCT_PLACEHOLDERS = [
	'https://dummyimage.com/400x400/e3f2fd/1976d2?text=Image+1',
	'https://dummyimage.com/400x400/f3e5f5/7b1fa2?text=Image+2',
	'https://dummyimage.com/400x400/e8f5e8/388e3c?text=Image+3',
	'https://dummyimage.com/400x400/fff3e0/f57c00?text=Image+4',
	'https://dummyimage.com/400x400/fce4ec/c2185b?text=Image+5',
	'https://dummyimage.com/400x400/e0f2f1/00796b?text=Image+6'
];

export const getRandomPlaceholder = (): string => {
	return PRODUCT_PLACEHOLDERS[
		Math.floor(Math.random() * PRODUCT_PLACEHOLDERS.length)
	];
};
