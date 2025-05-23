import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";
import HotPriceImage from "@/assets/images/hot-price.png";
import { formatNumberToPrice } from "@/utils";

interface ICardItem {
  className?: string;
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
  [key: string]: any;
}

const Card = ({ className = "", ...props }: ICardItem) => {
  const [isBuy, setIsBuy] = useState(false);

  const percentDiscount = ((props.price_discount ?? 0) / props.price) * 100;

  useEffect(() => {
    if (props.isBuy) {
      setIsBuy(true);
    }
  }, [props.isBuy]);

  return (
    <div className={cn("", className)}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center gap-2">
          <img className="w-full" src={props.image} alt={props.name} />

          {/* Info Card */}
          <div className="flex flex-col gap-2 px-4 py-2.5 lg:gap-4 lg:px-6 lg:py-4">
            {props.is_hot_price && (
              <div className="flex items-center gap-2">
                <img className="h-5" src={HotPriceImage} alt={props.name} />
              </div>
            )}
            <div className="overflow-hidden">
              <p className="line-clamp-2 text-sm font-semibold text-ellipsis text-[#1C252E] md:text-base">
                {props.name}
              </p>
            </div>

            {/* Price */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <p
                  className="text-xl font-semibold text-[#B71D18] md:text-2xl"
                  dangerouslySetInnerHTML={{
                    __html: formatNumberToPrice(
                      props.price_discount ?? props.price,
                      "đ",
                      false,
                    ),
                  }}
                ></p>
              </div>

              {/* Discount */}
              {!!props.price_discount && (
                <div className="flex items-center gap-2.5">
                  <p
                    className="text-[#919EAB text-sm font-normal line-through"
                    dangerouslySetInnerHTML={{
                      __html: formatNumberToPrice(props.price, "đ", false),
                    }}
                  ></p>
                  <p className="text-[#B71D18 text-sm font-normal">
                    {percentDiscount.toFixed(0)} %
                  </p>
                </div>
              )}

              {/* Button */}
              {isBuy && (
                <div className="flex w-full items-center gap-2">
                  <button className="font-secondary w-full rounded-lg bg-[#E6F1FF] py-1 text-[#025FCA] select-none">
                    Mua ngay
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
