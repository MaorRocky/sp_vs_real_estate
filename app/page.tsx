import InvestmentComparison from "@/app/(Compare)/InvestmentComparison";

export default function Home() {
  return (
      <main>
          <div className="flex-col justify-center items-center gap-2 w-full h-full p-8">
              <InvestmentComparison/>
          </div>
      </main>
);
}
