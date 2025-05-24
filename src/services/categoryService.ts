import type { Brand, Product, FilterResponse } from '@/types/product';
import { PRODUCT_PLACEHOLDERS } from '@/utils/placeholder';

// Fake data - có thể dễ dàng thay thế bằng API calls
const FAKE_BRANDS: Brand[] = [
	{ id: 'toyota', name: 'Toyota', productCount: 156 },
	{ id: 'honda', name: 'Honda', productCount: 134 },
	{ id: 'hyundai', name: 'Hyundai', productCount: 98 },
	{ id: 'mazda', name: 'Mazda', productCount: 76 },
	{ id: 'kia', name: 'Kia', productCount: 65 },
	{ id: 'nissan', name: 'Nissan', productCount: 54 },
	{ id: 'mitsubishi', name: 'Mitsubishi', productCount: 43 },
	{ id: 'subaru', name: 'Subaru', productCount: 32 },
	{ id: 'suzuki', name: 'Suzuki', productCount: 28 }
];

const FAKE_PRODUCTS: Product[] = [
	{
		id: 1,
		name: 'Lọc gió động cơ Air Filter - Chevrolet Captiva',
		price: 399000,
		price_discount: 299000,
		image: `https://picsum.photos/${Math.floor(Math.random() * 1000)}`,
		is_hot_price: true,
		brand: 'Toyota',
		categoryId: 'air-filter'
	},
	{
		id: 2,
		name: 'Lọc dầu Oil Filter - Honda Civic',
		price: 299000,
		image: `https://picsum.photos/${Math.floor(Math.random() * 1000)}`,
		is_best_seller: true,
		brand: 'Honda',
		categoryId: 'oil-filter'
	},
	{
		id: 3,
		name: 'Lọc nhiên liệu Fuel Filter - Hyundai Elantra',
		price: 349000,
		price_discount: 299000,
		image: PRODUCT_PLACEHOLDERS[2],
		is_sale: true,
		brand: 'Hyundai',
		categoryId: 'fuel-filter'
	},
	{
		id: 4,
		name: 'Lọc gió cabin Cabin Filter - Mazda CX-5',
		price: 259000,
		image: PRODUCT_PLACEHOLDERS[3],
		is_new: true,
		brand: 'Mazda',
		categoryId: 'cabin-filter'
	},
	{
		id: 5,
		name: 'Lọc gió động cơ Premium - Toyota Camry',
		price: 459000,
		price_discount: 399000,
		image: PRODUCT_PLACEHOLDERS[4],
		is_featured: true,
		brand: 'Toyota',
		categoryId: 'air-filter'
	},
	{
		id: 6,
		name: 'Lọc dầu cao cấp - Honda Accord',
		price: 359000,
		image: PRODUCT_PLACEHOLDERS[5],
		is_trending: true,
		brand: 'Honda',
		categoryId: 'oil-filter'
	},
	{
		id: 7,
		name: 'Lọc gió cabin cao cấp - Toyota Vios',
		price: 289000,
		price_discount: 249000,
		image: PRODUCT_PLACEHOLDERS[0],
		is_hot_price: true,
		brand: 'Toyota',
		categoryId: 'cabin-filter'
	},
	{
		id: 8,
		name: 'Lọc nhiên liệu premium - Honda City',
		price: 329000,
		image: PRODUCT_PLACEHOLDERS[1],
		is_best_seller: true,
		brand: 'Honda',
		categoryId: 'fuel-filter'
	}
];

// Mapping category IDs to names
const CATEGORY_NAMES: Record<string, string> = {
	'oil-filter': 'Bộ Lọc Dầu',
	'air-filter': 'Bộ Lọc Không Khí',
	'fuel-filter': 'Bộ Lọc Nhiên Liệu',
	'cabin-filter': 'Bộ Lọc Trong Cabin',
	'air-filter-2': 'Bộ Lọc Không Khí',
	'cabin-filter-2': 'Bộ Lọc Trong Cabin',
	'fuel-filter-2': 'Bộ Lọc Nhiên Liệu',
	'air-filter-3': 'Bộ Lọc Không Khí'
};

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class CategoryService {
	// Lấy data theo category
	static async getFilterData(categoryId: string): Promise<FilterResponse> {
		await delay(300); // Simulate network delay

		// Filter products by category
		const filteredProducts = FAKE_PRODUCTS.filter(
			(product) => product.categoryId === categoryId
		);

		// Get related brands
		const relatedBrandIds = [
			...new Set(filteredProducts.map((p) => p.brand))
		];
		const relatedBrands = FAKE_BRANDS.filter((brand) =>
			relatedBrandIds.some((brandName) =>
				brand.name
					.toLowerCase()
					.includes(brandName?.toLowerCase() || '')
			)
		);

		return {
			brands: relatedBrands,
			hotProducts: filteredProducts.slice(0, 10), // Max 10 products
			category: {
				id: categoryId,
				name: CATEGORY_NAMES[categoryId] || 'Danh mục'
			}
		};
	}

	// Lấy tất cả brands
	static async getAllBrands(): Promise<Brand[]> {
		await delay(200);
		return FAKE_BRANDS;
	}

	// Lấy products theo brand
	static async getProductsByBrand(brandId: string): Promise<Product[]> {
		await delay(250);
		return FAKE_PRODUCTS.filter((product) =>
			product.brand?.toLowerCase().includes(brandId.toLowerCase())
		);
	}
}

// Real API:
/*
export class CategoryService {
	static async getFilterData(categoryId: string): Promise<FilterResponse> {
		const response = await fetch(`/api/categories/${categoryId}/filter`);
		return response.json();
	}

	static async getAllBrands(): Promise<Brand[]> {
		const response = await fetch('/api/brands');
		return response.json();
	}

	static async getProductsByBrand(brandId: string): Promise<Product[]> {
		const response = await fetch(`/api/brands/${brandId}/products`);
		return response.json();
	}
}
*/
