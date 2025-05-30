import React from "react";
import BackButton from "@/components/BackButton";

const NotFoundPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">404 - Page Not Found</h1>
      <p className="mb-4">The page you are looking for does not exist.</p>
      <BackButton />
    </div>
  );
};

export default NotFoundPage;
