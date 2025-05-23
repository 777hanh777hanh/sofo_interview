import React from "react";
import useNavigation from "@/hooks/useNavigation";

interface BackButtonProps {
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ className = "" }) => {
  const { goBack } = useNavigation();

  return (
    <button
      onClick={goBack}
      className={`rounded bg-gray-200 px-4 py-2 hover:bg-gray-300 ${className}`}
    >
      Back
    </button>
  );
};

export default BackButton;
