import { WidgetsGrid } from "@/components";


export const metadata = {
  title: 'Admin dashboard',
  description: 'Admin dashboard',
};

export default function MainPage() {
  return (
    <div className="text-black p-2">
      <h1 className="mt-2 text-3xl">Dashboard</h1>
      <span className="text-xl">Informacion general</span>
      <WidgetsGrid />
    </div>
  );
}