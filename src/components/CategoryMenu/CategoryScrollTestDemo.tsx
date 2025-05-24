import Navbar from '@/components/Navbar/Navbar';

const CategoryScrollTestDemo = () => {
	return (
		<div className='min-h-screen bg-gray-50'>
			{/* Top spacer to create scroll */}
			<div
				className='h-32 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center
					justify-center'
			>
				<h1 className='text-white text-2xl font-bold'>
					Scroll Test Area
				</h1>
			</div>

			{/* Navbar - CategoryDropdown sẽ được test ở đây */}
			<div className='bg-white shadow-sm sticky top-0 z-40'>
				<div className='py-4'>
					<Navbar className='' />
				</div>
			</div>

			{/* Long content để test scroll behavior */}
			<div className='container mx-auto px-4 py-8'>
				<div className='bg-white rounded-lg shadow p-6 mb-8'>
					<h2 className='text-2xl font-bold text-gray-900 mb-4'>
						🧪 Test Scroll Behavior
					</h2>
					<div className='space-y-4'>
						<div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
							<h3 className='font-semibold text-yellow-900 mb-2'>
								📋 Test Instructions:
							</h3>
							<ol className='text-yellow-800 space-y-1 text-sm list-decimal list-inside'>
								<li>
									<strong>Scroll down</strong> để Navbar
									sticky ở top
								</li>
								<li>
									<strong>
										Hover vào "Danh mục sản phẩm"
									</strong>{' '}
									→ Dropdown xuất hiện
								</li>
								<li>
									<strong>Verify:</strong> Dropdown height =
									(viewport height - button bottom)
								</li>
								<li>
									<strong>Try scroll body</strong> → Should be
									prevented when dropdown open
								</li>
								<li>
									<strong>Scroll inside dropdown</strong> →
									Should work normally
								</li>
								<li>
									<strong>Scroll body again</strong> → Should
									not scroll while dropdown open
								</li>
								<li>
									<strong>Close dropdown</strong> → Body
									scroll should be restored
								</li>
							</ol>
						</div>

						<div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
							<h3 className='font-semibold text-blue-900 mb-2'>
								🎯 Expected Behavior:
							</h3>
							<ul className='text-blue-800 space-y-1 text-sm'>
								<li>
									✅ <strong>Dynamic height:</strong> Dropdown
									height = viewport - trigger bottom
								</li>
								<li>
									✅ <strong>Position tracking:</strong>{' '}
									Dropdown follows trigger when scrolling
								</li>
								<li>
									✅ <strong>Body scroll lock:</strong> Page
									không scroll khi dropdown mở
								</li>
								<li>
									✅ <strong>Internal scroll:</strong>{' '}
									Dropdown content có scroll riêng
								</li>
								<li>
									✅ <strong>Scroll restore:</strong> Body
									scroll restore khi dropdown đóng
								</li>
							</ul>
						</div>
					</div>
				</div>

				{/* Long content sections để create scroll */}
				{Array.from({ length: 10 }, (_, i) => (
					<div
						key={i}
						className='bg-white rounded-lg shadow p-6 mb-6'
					>
						<h3 className='text-xl font-bold text-gray-900 mb-4'>
							Content Section {i + 1}
						</h3>
						<div className='space-y-4'>
							<p className='text-gray-600'>
								Đây là section {i + 1} để tạo content dài và
								test scroll behavior. Lorem ipsum dolor sit amet
								consectetur adipisicing elit. Maxime mollitia,
								molestiae quas vel sint commodi repudiandae
								consequuntur voluptatum laborum numquam
								blanditiis harum quisquam eius sed odit fugiat
								iusto fuga praesentium optio, eaque rerum!
							</p>

							<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
								{Array.from({ length: 6 }, (_, j) => (
									<div
										key={j}
										className='bg-gray-100 rounded-lg p-4'
									>
										<div className='h-24 bg-gray-200 rounded mb-2'></div>
										<h4 className='font-medium text-gray-900'>
											Item {j + 1}
										</h4>
										<p className='text-sm text-gray-600'>
											Description for item {j + 1} in
											section {i + 1}
										</p>
									</div>
								))}
							</div>

							{i === 2 && (
								<div className='bg-red-50 border border-red-200 rounded-lg p-4'>
									<h4 className='font-semibold text-red-900 mb-2'>
										🔍 Debug Info:
									</h4>
									<div className='text-red-800 text-sm space-y-1'>
										<p>
											<strong>
												Current scroll position:
											</strong>{' '}
											<span id='scroll-position'>0</span>
											px
										</p>
										<p>
											<strong>Viewport height:</strong>{' '}
											<span id='viewport-height'>
												{typeof window !== 'undefined'
													? window.innerHeight
													: 0}
											</span>
											px
										</p>
										<p>
											<strong>Document height:</strong>{' '}
											<span id='document-height'>
												{typeof document !== 'undefined'
													? document.documentElement
															.scrollHeight
													: 0}
											</span>
											px
										</p>
									</div>
								</div>
							)}
						</div>
					</div>
				))}

				{/* Bottom spacer */}
				<div
					className='h-64 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center
						justify-center'
				>
					<div className='text-center text-white'>
						<h3 className='text-2xl font-bold mb-2'>
							End of Content
						</h3>
						<p>Scroll back up để test CategoryDropdown</p>
					</div>
				</div>
			</div>

			{/* Debug script */}
			<script
				dangerouslySetInnerHTML={{
					__html: `
					if (typeof window !== 'undefined') {
						const updateDebugInfo = () => {
							const scrollPos = document.getElementById('scroll-position');
							const viewportHeight = document.getElementById('viewport-height');
							const documentHeight = document.getElementById('document-height');

							if (scrollPos) scrollPos.textContent = window.scrollY;
							if (viewportHeight) viewportHeight.textContent = window.innerHeight;
							if (documentHeight) documentHeight.textContent = document.documentElement.scrollHeight;
						};

						window.addEventListener('scroll', updateDebugInfo);
						window.addEventListener('resize', updateDebugInfo);
						updateDebugInfo();
					}
				`
				}}
			/>
		</div>
	);
};

export default CategoryScrollTestDemo;
