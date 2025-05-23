import React from "react";
import useNavigation from "@/hooks/useNavigation";

const HomePage: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Home Page</h1>
      <p className="mb-4">
        This is the home page. Navigate to About to test the back functionality.
      </p>
      <button
        onClick={() => navigate("/about")}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Go to About
      </button>
    </div>
  );
};

export default HomePage;
