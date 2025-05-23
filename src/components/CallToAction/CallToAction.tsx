import LocationIcon from "@/assets/icons/location.svg";
import ArrowRightIcon from "@/assets/icons/arrow-right.svg";
import { Link } from "react-router";

const CallToAction = () => {
  const link = "https://www.google.com";

  return (
    <div className="bg-[#E6F1FF]">
      {/* right */}
      <div className="container mx-auto flex items-center justify-between py-8">
        <div className="flex items-center gap-4">
          <img
            className="h-6 w-6 lg:h-9 lg:w-9"
            src={LocationIcon}
            alt="Location"
          />
          <p className="font-primary text-base font-medium text-[#1C252E] lg:text-[28px]">
            Xem hệ thống 88 cửa hàng trên toàn quốc
          </p>
        </div>

        {/* left */}
        <Link
          to={link}
          className="no-drag flex cursor-pointer items-center gap-2 rounded-full bg-white px-4 py-2 select-none lg:gap-3 lg:px-6 lg:py-3"
        >
          <h4 className="font-primary text-base font-medium text-[#025FCA] lg:text-2xl">
            Xem ngay
          </h4>
          <img
            className="h-4 w-4 lg:h-8 lg:w-8"
            src={ArrowRightIcon}
            alt="Arrow Right"
          />
        </Link>
      </div>
    </div>
  );
};

export default CallToAction;
