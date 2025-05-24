import Navbar from '@/components/Navbar/Navbar';

const CategoryDropdownDemo = () => {
	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Demo header with some spacing */}
			<div className='bg-white shadow-sm'>
				<div className='py-4'>
					<Navbar className='' />
				</div>
			</div>

			{/* Demo content */}
			<div className='container mx-auto px-4 py-8'>
				<div className='bg-white rounded-lg shadow p-6'>
					<h1 className='text-2xl font-bold text-gray-900 mb-4'>
						Demo CategoryDropdown với Filter System
					</h1>
					<div className='space-y-4'>
						<p className='text-gray-600'>
							Hover vào nút "Danh mục sản phẩm" trong navbar và
							thử click vào các filter categories.
						</p>

						<div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
							<h3 className='font-semibold text-blue-900 mb-2'>
								🎯 Tính năng Filter System:
							</h3>
							<ul className='text-blue-800 space-y-1 text-sm'>
								<li>
									✅ <strong>Dynamic filtering:</strong> Click
									category → Load brands & products tương ứng
								</li>
								<li>
									✅ <strong>Responsive brands grid:</strong>{' '}
									2 cột (mobile) → 3 cột (desktop)
								</li>
								<li>
									✅ <strong>Smart product limit:</strong> 5
									items (xs), 4 items (lg+)
								</li>
								<li>
									✅ <strong>Real API simulation:</strong> Có
									loading state và error handling
								</li>
								<li>
									✅{' '}
									<strong>Card component integration:</strong>{' '}
									Sử dụng Card.tsx có sẵn
								</li>
								<li>
									✅ <strong>Placeholder images:</strong>{' '}
									Auto-generated colored placeholders
								</li>
							</ul>
						</div>

						<div className='bg-green-50 border border-green-200 rounded-lg p-4'>
							<h3 className='font-semibold text-green-900 mb-2'>
								🔧 Fixed Scroll Behaviors:
							</h3>
							<ul className='text-green-800 space-y-1 text-sm'>
								<li>
									✅{' '}
									<strong>Dynamic height calculation:</strong>{' '}
									Height = viewport height - trigger bottom
									position
								</li>
								<li>
									✅ <strong>Position tracking:</strong>{' '}
									Dropdown follows trigger button when
									scrolling
								</li>
								<li>
									✅ <strong>Body scroll prevention:</strong>{' '}
									Page không scroll khi dropdown mở
								</li>
								<li>
									✅ <strong>Internal scroll only:</strong>{' '}
									Chỉ scroll được trong dropdown
								</li>
								<li>
									✅ <strong>Scroll restoration:</strong> Body
									scroll restore khi dropdown đóng
								</li>
								<li>
									✅ <strong>Responsive height:</strong> Min
									200px height, auto-adjust theo available
									space
								</li>
							</ul>
						</div>

						<div className='bg-purple-50 border border-purple-200 rounded-lg p-4'>
							<h3 className='font-semibold text-purple-900 mb-2'>
								📋 Layout Structure:
							</h3>
							<ul className='text-purple-800 space-y-1 text-sm'>
								<li>
									• <strong>Left (1 col):</strong>{' '}
									CategoryMenu với active states
								</li>
								<li>
									• <strong>Right (3 col):</strong> Filtered
									content area
								</li>
								<li>
									&nbsp;&nbsp;→ <strong>Brands grid:</strong>{' '}
									Responsive 2-3 columns
								</li>
								<li>
									&nbsp;&nbsp;→ <strong>Divider:</strong>{' '}
									Visual separator
								</li>
								<li>
									&nbsp;&nbsp;→{' '}
									<strong>Hot products header:</strong> Title
									+ "Xem tất cả" button
								</li>
								<li>
									&nbsp;&nbsp;→{' '}
									<strong>Products grid:</strong> Card
									components với hover effects
								</li>
								<li>
									&nbsp;&nbsp;→{' '}
									<strong>Extra products:</strong> More
									content để test scroll behavior
								</li>
							</ul>
						</div>

						<div className='bg-orange-50 border border-orange-200 rounded-lg p-4'>
							<h3 className='font-semibold text-orange-900 mb-2'>
								🔧 API Ready Architecture:
							</h3>
							<ul className='text-orange-800 space-y-1 text-sm'>
								<li>
									• <strong>Service layer:</strong>{' '}
									CategoryService với async methods
								</li>
								<li>
									• <strong>Type safety:</strong> TypeScript
									interfaces cho Brand, Product,
									FilterResponse
								</li>
								<li>
									• <strong>Easy migration:</strong> Fake data
									→ Real API chỉ thay đổi 1 chỗ
								</li>
								<li>
									• <strong>Loading states:</strong> Spinner
									và error handling
								</li>
								<li>
									• <strong>Responsive hooks:</strong>{' '}
									useProductLimit cho responsive limits
								</li>
							</ul>
						</div>

						<div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
							<h3 className='font-semibold text-yellow-900 mb-2'>
								🚀 Try it now:
							</h3>
							<ol className='text-yellow-800 space-y-1 text-sm list-decimal list-inside'>
								<li>
									Hover vào nút "Danh mục sản phẩm" ở navbar
								</li>
								<li>
									Click vào "Bộ Lọc Dầu" → Xem brands và
									products tương ứng
								</li>
								<li>
									Click vào "Bộ Lọc Không Khí" → Content thay
									đổi dynamically
								</li>
								<li>
									Thử resize browser để test responsive
									behavior
								</li>
								<li>
									Hover vào products để xem Card hover effects
								</li>
								<li>
									<strong>NEW:</strong> Scroll trong dropdown
									để test scroll behavior
								</li>
							</ol>
						</div>

						<div className='bg-red-50 border border-red-200 rounded-lg p-4'>
							<h3 className='font-semibold text-red-900 mb-2'>
								🧪 Advanced Scroll Test:
							</h3>
							<p className='text-red-800 text-sm mb-2'>
								Để test comprehensive scroll behavior, sử dụng{' '}
								<code className='bg-red-100 px-1 rounded'>
									CategoryScrollTestDemo
								</code>
								:
							</p>
							<ul className='text-red-800 space-y-1 text-sm'>
								<li>• Trang có content dài để test scroll</li>
								<li>
									• Sticky navbar để test position tracking
								</li>
								<li>
									• Debug info hiển thị scroll position &
									viewport height
								</li>
								<li>• Comprehensive scroll behavior testing</li>
							</ul>
						</div>

						{/* Demo cards grid */}
						<div className='mt-8'>
							<h2 className='text-xl font-bold text-gray-900 mb-4'>
								Preview: Card Component
							</h2>
							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
								{/* Demo static cards để show Card component style */}
								{[
									{
										name: 'Lọc gió cao cấp',
										price: 299000,
										discount: 199000
									},
									{ name: 'Lọc dầu premium', price: 399000 },
									{
										name: 'Lọc nhiên liệu',
										price: 259000,
										discount: 199000
									},
									{ name: 'Lọc cabin filter', price: 329000 }
								].map((item, index) => (
									<div
										key={index}
										className='bg-gray-100 rounded-lg p-4 text-center'
									>
										<div className='h-32 bg-gray-200 rounded mb-3 flex items-center justify-center'>
											<span className='text-gray-500 text-sm'>
												Card Preview
											</span>
										</div>
										<h3 className='font-medium text-gray-900 text-sm'>
											{item.name}
										</h3>
										<div className='flex items-center justify-center gap-2 mt-2'>
											<p className='text-blue-600 font-bold text-sm'>
												{item.discount
													? `${item.discount?.toLocaleString()} đ`
													: `${item.price.toLocaleString()} đ`}
											</p>
											{item.discount && (
												<p className='text-gray-400 line-through text-xs'>
													{item.price.toLocaleString()}{' '}
													đ
												</p>
											)}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CategoryDropdownDemo;
