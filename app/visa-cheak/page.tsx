import { VisaPredictionForm } from "@/components/visa-prediction-form"

export default function Home() {
  const fetchVisaInfo = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/visa-info/?passport_country=India&destination_country=Sri Lanka");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching visa info:", error);
    }
  };
  
  fetchVisaInfo();
  
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Predict Your Visa Application Outcome</h2>
      <VisaPredictionForm />
      {/* <h1>hello </h1> */}
    </div>
  )
}

