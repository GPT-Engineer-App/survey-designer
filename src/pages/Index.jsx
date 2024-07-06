import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl">Welcome to the Survey Design App</h1>
      <p>Create and customize your surveys with ease.</p>
      <Button onClick={() => navigate("/create-survey")}>Create Survey</Button>
    </div>
  );
};

export default Index;