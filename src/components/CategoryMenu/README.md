# CategoryMenu Components

## Overview

Category menu system với dropdown functionality cho website bán phụ tùng xe hơi.

## Components

### 1. `CategoryMenu.tsx`

- Vertical menu với các category của bộ lọc xe hơi
- Có thể sử dụng standalone hoặc trong dropdown
- Props: `className`, `onCategorySelect`

### 2. `CategoryDropdown.tsx`

- Full-width dropdown menu xuất hiện khi hover
- Có 4 cột: Bộ lọc xe hơi, Phụ tùng khác, Thương hiệu, Sản phẩm hot
- Auto-scroll nếu content vượt quá 70vh

### 3. `CategoryDropdownDemo.tsx`

- Demo page để test functionality

## Hover System

### Cách hoạt động:

1. **Hover vào nút "Danh mục sản phẩm"** → Dropdown hiện ra
2. **Di chuyển chuột vào dropdown** → Dropdown tiếp tục hiển thị
3. **Rời chuột khỏi dropdown/button** → Đợi 150ms rồi đóng dropdown
4. **Click outside hoặc ESC** → Đóng ngay lập tức

### Technical Implementation:

```tsx
// Timer-based hover system
const handleMouseEnter = () => {
	clearTimeout(timeoutRef.current); // Cancel close timer
	setIsDropdownOpen(true);
};

const handleMouseLeave = () => {
	timeoutRef.current = setTimeout(() => {
		setIsDropdownOpen(false);
	}, 150); // 150ms delay
};
```

### Benefits:

- ✅ **Smooth UX**: User có thể di chuyển chuột tự nhiên
- ✅ **No flickering**: Không bị đóng mở liên tục
- ✅ **Responsive**: Hoạt động tốt trên mọi device
- ✅ **Accessible**: Hỗ trợ keyboard navigation

## Usage

### Basic Integration:

```tsx
import Navbar from '@/components/Navbar/Navbar';

// Navbar already includes CategoryDropdown
<Navbar className='' />;
```

### Standalone CategoryMenu:

```tsx
import CategoryMenu from '@/components/CategoryMenu/CategoryMenu';

<CategoryMenu className='w-64' onCategorySelect={(id) => console.log(id)} />;
```

## Styling

### Full-width Dropdown:

- Width: `100vw` (toàn màn hình)
- Position: `fixed` từ trigger button
- Max height: `70vh` với scroll
- Z-index: `50`

### Responsive Grid:

- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns
- Large: 4 columns

## Files Structure:

```
src/components/CategoryMenu/
├── CategoryMenu.tsx          # Main menu component
├── CategoryDropdown.tsx      # Dropdown wrapper
├── CategoryDropdownDemo.tsx  # Demo page
├── CategoryMenuExample.tsx   # Standalone example
└── README.md                # This file
```
