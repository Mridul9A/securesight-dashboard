import { Dashboard } from "@/components/Dashboard";
import { Navbar } from "@/components/Navbar";

export default function Home() {
  return (
    <div className="bg-gray-950 text-white min-h-screen flex flex-col">
      <Navbar />
      <Dashboard />
    </div>
  );
}