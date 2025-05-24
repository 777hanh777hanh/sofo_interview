import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({
	items
}: {
	items?: { url: string; label: string }[];
}) => {
	const [currentPath, setCurrentPath] = useState<string>('');

	useEffect(() => {
		setCurrentPath(window.location.pathname);
	}, []);

	const currentPathItems = currentPath.split('/').filter(Boolean);

	// Tạo breadcrumb items từ currentPathItems nếu không có items prop
	const breadcrumbItems =
		items ||
		currentPathItems.map((segment, index) => {
			const url = '/' + currentPathItems.slice(0, index + 1).join('/');
			const label = segment.charAt(0).toUpperCase() + segment.slice(1); // Capitalize first letter
			return { url, label };
		});

	return (
		<div className='font-primary flex items-center gap-2 text-sm text-[#919EAB]'>
			{!!breadcrumbItems?.length &&
				breadcrumbItems.map((item, index) => {
					return (
						<div key={item.url} className='flex items-center gap-2'>
							{index < breadcrumbItems.length - 1 && (
								<>
									<Link className='select-none' to={item.url}>
										{item.label}
									</Link>
									<span className='drag-none'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='8'
											height='8'
											viewBox='0 0 8 8'
											fill='none'
										>
											<g clip-path='url(#clip0_6054_244)'>
												<path
													d='M3 1.6669L5 4.00023L3 6.33357'
													stroke='#919EAB'
													stroke-width='1.5'
													stroke-linecap='round'
													stroke-linejoin='round'
												/>
											</g>
											<defs>
												<clipPath id='clip0_6054_244'>
													<rect
														width='8'
														height='8'
														fill='white'
														transform='translate(0 0.000244141)'
													/>
												</clipPath>
											</defs>
										</svg>
									</span>
								</>
							)}
							{index === breadcrumbItems.length - 1 && (
								<span className='text-[#024897] select-none'>
									{item.label}
								</span>
							)}
						</div>
					);
				})}
		</div>
	);
};

export default Breadcrumb;
