import React from "react";
import BackButton from "@/components/BackButton";

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">About Page</h1>
      <p className="mb-4">
        This is the about page that demonstrates navigation history.
      </p>
      <BackButton />
    </div>
  );
};

export default AboutPage;
