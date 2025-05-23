import { useRef, useState, useEffect } from "react";

import Welcome from "@/components/Welcome";
import Logo from "@/assets/images/logo.png";
import SearchBar from "@/components/SearchBar";
import VietnameseFlag from "@/assets/images/vietnam-flag.png";
import CartIcon from "@/assets/icons/cart.svg";
import UserIcon from "@/assets/icons/user.svg";
import { formatNumber } from "@/utils";
import Card from "../Card";

const Header = () => {
  const currentLanguage = {
    label: "Tiếng Việt",
    value: "vi",
    image: VietnameseFlag,
  };

  const cartItems = 12;
  const [isCartHovered, setIsCartHovered] = useState(false);
  const [cartPosition, setCartPosition] = useState({
    top: 0,
    left: 0,
    right: "auto",
  });

  const itemHot = [
    {
      id: 1,
      name: "Lọc gió động cơ Air Filter – Chevrolet Colorado, Trailblazer (52046262)",
      price: 329000,
      price_discount: 299000,
      image: `https://picsum.photos/${Math.floor(Math.random() * 1000)}`,
      is_hot_price: true,
      isBuy: true,
    },
  ];

  const cartRef = useRef<HTMLDivElement>(null);

  const calculateCartPosition = () => {
    if (!cartRef.current) return;

    const rect = cartRef.current.getBoundingClientRect();
    const cardWidth = 220; // Estimated card width
    const viewport = window.innerWidth;

    console.log("Cart rect:", rect); // Debug log
    console.log("Window scroll:", window.scrollY); // Debug log

    let position = {
      top: rect.bottom + 8, // 8px gap below cart (already accounts for scroll in getBoundingClientRect)
      left: rect.left,
      right: "auto",
    };

    // Check if there's enough space on the right
    if (rect.left + cardWidth > viewport) {
      // Not enough space on right, align to right edge of cart
      position.left = rect.right - cardWidth;
    }

    // Ensure it doesn't go beyond viewport
    if (position.left < 0) {
      position.left = 8; // 8px margin from edge
    }

    console.log("Calculated position:", position); // Debug log
    setCartPosition(position);
  };

  useEffect(() => {
    if (isCartHovered) {
      calculateCartPosition();
      window.addEventListener("resize", calculateCartPosition);
      return () => window.removeEventListener("resize", calculateCartPosition);
    }
  }, [isCartHovered]);

  return (
    <>
      <Welcome />
      <div className="font-primary container mx-auto mt-6 flex flex-col gap-6">
        <div className="flex items-center justify-between gap-8 lg:gap-12">
          {/* Logo */}
          <img className="max-w-[250px] object-contain" src={Logo} alt="Logo" />

          {/* Search */}
          <SearchBar />

          {/* Info */}
          <div className="flex items-center gap-4 lg:gap-8">
            {/* Language */}
            <div className="flex items-center gap-2">
              <img
                className="flex h-6 w-6 lg:h-9 lg:w-9"
                src={currentLanguage.image}
                alt={currentLanguage.label}
              />
              <p className="text-sm !leading-[1] font-medium text-[#1C252E] uppercase select-none lg:text-base">
                {currentLanguage.value}
              </p>
            </div>

            {/* Cart */}
            <div
              className="relative flex cursor-pointer items-center gap-2"
              ref={cartRef}
              onMouseEnter={() => setIsCartHovered(true)}
              onMouseLeave={() => setIsCartHovered(false)}
            >
              <div className="relative flex items-center gap-2">
                <img src={CartIcon} alt="Cart" />
                <p className="absolute -top-2.5 -right-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#FF5630] text-[12px] font-medium text-white">
                  {cartItems.toString().padStart(2, "0")}
                </p>
              </div>
              <p className="text-sm !leading-[1] font-medium text-[#1C252E] select-none lg:text-base">
                Giỏ hàng
              </p>
            </div>

            {/* Info */}
            <div className="flex cursor-pointer items-center gap-2">
              <div className="flex items-center gap-2">
                <img src={UserIcon} alt="Phone" />
                <p className="text-sm !leading-[1] font-medium text-[#1C252E] select-none lg:text-base">
                  Tài khoản
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Preview Card - Fixed positioning */}
      {isCartHovered && itemHot.length > 0 && (
        <div
          className="fixed z-50"
          style={{
            top: cartPosition.top,
            left: cartPosition.left,
            right: cartPosition.right,
            width: "220px",
            height: "100px",
          }}
        >
          <Card
            className="w-auto max-w-[220px] overflow-hidden rounded-lg bg-white shadow-[0_8px_16px_0_rgba(3,117,243,0.16)]"
            {...itemHot[0]}
          />
        </div>
      )}
    </>
  );
};

export default Header;
