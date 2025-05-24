export interface Brand {
	id: string;
	name: string;
	logo?: string;
	productCount?: number;
}

export interface Product {
	id: string | number;
	name: string;
	price: number;
	image: string;
	price_discount?: number;
	is_best_seller?: boolean;
	is_new?: boolean;
	is_sale?: boolean;
	is_hot?: boolean;
	is_hot_price?: boolean;
	is_featured?: boolean;
	is_trending?: boolean;
	category?: string;
	brand?: string;
	year?: number;
	made_in?: string;
	categoryId?: string;
	brandId?: string;
}

export interface FilterResponse {
	brands: Brand[];
	hotProducts: Product[];
	category: {
		id: string;
		name: string;
	};
}
