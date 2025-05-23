import styles from "./Welcome.module.css";

import SalesIcon from "@/assets/icons/sales.svg";
import PhoneIcon from "@/assets/icons/phone.svg";
import MobileIcon from "@/assets/icons/mobile.svg";
import { Link } from "react-router";

const Welcome = () => {
  const linkDownload = "https://www.google.com";

  return (
    <div className={`${styles.gradient} bg-[#E6F1FF]`}>
      <div className="container mx-auto flex items-center justify-between py-1">
        <div className="flex items-center gap-2">
          <img className="h-2 w-2 lg:h-4 lg:w-4" src={SalesIcon} alt="Sales" />
          <p className="font-primary text-[8px] !leading-[1] font-normal text-[#F3F2F2] lg:text-xs">
            Nhập mã <span className="font-bold text-[#FACA4A]">NEWBIE</span>{" "}
            giảm ngay 10% cho lần đầu mua hàng.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <img
              className="h-2 w-2 lg:h-4 lg:w-4"
              src={PhoneIcon}
              alt="Phone"
            />
            <p className="font-primary text-[8px] !leading-[1] font-normal text-[#F3F2F2] lg:text-xs">
              Hotline:{" "}
              <span className="font-bold text-[#FACA4A]">0283 760 7607</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <img
              className="h-2 w-2 lg:h-4 lg:w-4"
              src={MobileIcon}
              alt="Mobile"
            />
            <Link
              to={linkDownload}
              className="font-primary text-[8px] !leading-[1] font-normal text-[#F3F2F2] lg:text-xs"
            >
              Tải ứng dụng
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
