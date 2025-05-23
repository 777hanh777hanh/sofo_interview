import Welcome from "@/components/Welcome";
import Logo from "@/assets/images/logo.png";
import { SearchBar } from "../SearchBar";
import VietnameseFlag from "@/assets/images/vietnam-flag.png";
import CartIcon from "@/assets/icons/cart.svg";
import UserIcon from "@/assets/icons/user.svg";

const Header = () => {
  const currentLanguage = {
    label: "Tiếng Việt",
    value: "vi",
    image: VietnameseFlag,
  };

  const cartItems = 12;

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
            <div className="flex cursor-pointer items-center gap-2">
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
    </>
  );
};

export default Header;
