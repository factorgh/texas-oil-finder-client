import PricingCard from "../components/common/custom-pricing-card";

const PricingPage = () => {
  const texasItems = [
    { text: "Advanced Searching", included: true },
    { text: "Map Based Searching", included: true },
    { text: "Production By Lease", included: false },
    { text: "Production By  Operator", included: false },
    { text: "Well Logs", included: true },
    { text: "Drilling Permits", included: true },
    { text: "Well Completion Information", included: true },
    { text: "Well Header Information", included: true },
    { text: "Data Exporting", included: true },
  ];
  const lightItems = [
    { text: "Advanced Searching", included: true },
    { text: "Map Based Searching", included: true },
    { text: "Production By Lease", included: true },
    { text: "Production By  Operator", included: true },
    { text: "Well Logs", included: false },
    { text: "Drilling Permits", included: false },
    { text: "Well Completion Information", included: false },
    { text: "Well Header Information", included: false },
    { text: "Data Exporting", included: false },
  ];
  const blackItems = [
    { text: "Advanced Searching", included: true },
    { text: "Map Based Searching", included: true },
    { text: "Production By Lease", included: true },
    { text: "Production By  Operator", included: true },
    { text: "Well Logs", included: true },
    { text: "Drilling Permits", included: true },
    { text: "Well Completion Information", included: true },
    { text: "Well Header Information", included: true },
    { text: "Data Exporting", included: true },
  ];
  return (
    <div className="bg-gray-50">
      <h1 className="text-3xl font-bold text-[#2B2B2B] px-3 text-center mb-5  pt-10">
        Start Your 3 Day Free Trial Today
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center  gap-5 p-5">
        <PricingCard
          title="Texas Tea"
          price="$39.99/month"
          items={texasItems}
          height="h-[600px]"
        />
        <PricingCard
          title="Light Crude"
          price="$59.99/month"
          items={lightItems}
          height="h-[600px]"
        />
        <PricingCard
          title="Black Gold"
          price="$89.99/month"
          items={blackItems}
          height="h-[600px]"
        />
      </div>
    </div>
  );
};

export default PricingPage;
