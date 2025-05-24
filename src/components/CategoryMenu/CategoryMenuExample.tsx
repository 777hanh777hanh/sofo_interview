import CategoryMenu from './CategoryMenu';

const CategoryMenuExample = () => {
	const handleCategorySelect = (categoryId: string) => {
		console.log('Selected category:', categoryId);
		// Handle category selection logic here
		// For example: update URL params, filter products, etc.
	};

	return (
		<div className='flex min-h-screen bg-gray-50'>
			{/* Sidebar with CategoryMenu */}
			<div className='w-64 flex-shrink-0'>
				<CategoryMenu
					className='h-full'
					onCategorySelect={handleCategorySelect}
				/>
			</div>

			{/* Main content area */}
			<div className='flex-1 p-6'>
				<div className='bg-white rounded-lg shadow p-6'>
					<h1 className='text-2xl font-bold text-gray-900 mb-4'>
						Sản Phẩm Bán Chạy
					</h1>
					<p className='text-gray-600'>
						Đây là khu vực hiển thị sản phẩm dựa trên category được
						chọn.
					</p>

					{/* Here you would render your product grid */}
					<div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
						{/* Product items would go here */}
						<div className='bg-gray-100 rounded-lg p-4 text-center'>
							<div className='h-40 bg-gray-200 rounded mb-4'></div>
							<h3 className='font-medium'>Sản phẩm mẫu</h3>
							<p className='text-blue-600 font-bold'>299.000 đ</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CategoryMenuExample;
