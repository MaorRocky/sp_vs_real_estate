import {Sp500FutureValueResult} from "@/lib/types/RealEstateProfitResult";

export default async function calculateSp500FutureValue(
    initialInvestment: number,
    annualReturnRate: number,
    years: number,
    inflationRate: number,
    monthlyDeposit: number,
    taxRate: number
): Promise<Sp500FutureValueResult> {
    const months = years * 12;
    const monthlyReturnRate = annualReturnRate / 12;

    // Calculate nominal future value from the initial investment
    let nominalFutureValue = initialInvestment * Math.pow(1 + monthlyReturnRate, months);

    // Add monthly deposits
    for (let i = 1; i <= months; i++) {
        nominalFutureValue += monthlyDeposit * Math.pow(1 + monthlyReturnRate, months - i);
    }

    // Adjust nominal future value for inflation
    const realFutureValue = nominalFutureValue / Math.pow(1 + inflationRate, years);
    const afterTaxFutureValue = realFutureValue * (1 - taxRate);

    const result: Sp500FutureValueResult = {
        nominalFutureValue,
        realFutureValue,
        afterTaxFutureValue
        
    };

    console.log(result);
    return result;
}
