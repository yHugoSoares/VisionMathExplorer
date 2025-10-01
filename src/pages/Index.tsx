import MainLayout from "@/components/layout/MainLayout";
import VisionScienceTabs from "@/components/tabs/VisionScienceTabs";

const Index = () => {
  return (
    <MainLayout>
      <div className="py-8">
        <VisionScienceTabs />
      </div>
    </MainLayout>
  );
};

export default Index;