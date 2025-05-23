import { useNavigate as useRouterNavigate } from "react-router";
import { goBack as historyGoBack } from "@/routes";

/**
 * Custom navigation hook that extends react-router's useNavigate
 * with additional navigation history functionality
 */
export const useNavigation = () => {
  const navigate = useRouterNavigate();

  /**
   * Navigate to previous page or home page if there's no history
   */
  const goBack = () => {
    // Get the path to go back to from our history system
    const path = historyGoBack();
    // Use react-router's navigate to actually change the page
    navigate(path);
  };

  // Return both the standard navigate function and our custom goBack
  return {
    navigate,
    goBack,
  };
};

export default useNavigation;
