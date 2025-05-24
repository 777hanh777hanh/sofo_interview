interface IconProps {
	name: string;
	className?: string;
	size?: number;
}

const Icon = ({ name, className = '', size = 20 }: IconProps) => {
	const iconStyle = {
		width: size,
		height: size
	};

	// For now, return a simple filter icon since we have limited SVG assets
	// In a real project, you'd dynamically import the SVG based on the name
	return (
		<svg
			width={size}
			height={size}
			viewBox='0 0 20 20'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={className}
			style={iconStyle}
		>
			<path
				d='M8 12H12V14H8V12ZM2 6V8H18V6H2ZM4 9H16V11H4V9Z'
				fill='currentColor'
			/>
		</svg>
	);
};

export default Icon;
