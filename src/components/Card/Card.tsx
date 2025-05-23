import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";

interface CardProps {
  className?: string;
  [key: string]: any;
}

const Card = ({ className = "", ...props }: CardProps) => {
  const [isBuy, setIsBuy] = useState(false);

  useEffect(() => {
    if (props.isBuy) {
      setIsBuy(true);
    }
  }, [props.isBuy]);

  return <div className={cn("", className)}>Card</div>;
};

export default Card;
