import Default from "@/layouts/Default";
import CallToAction from "@/components/CallToAction";

const HomePage = () => {
  return (
    <Default>
      <h1 className="grow">HomePage</h1>

      {/* call to action */}
      <CallToAction />
    </Default>
  );
};

export default HomePage;
