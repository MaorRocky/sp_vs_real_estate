import {Sp500FutureValueResult} from "@/lib/types/RealEstateProfitResult";

export default async function calculateSp500FutureValue(initialInvestment: number,
                                                        annualReturnRate: number,
                                                        years: number,
                                                        inflationRate: number
) {
    // Calculate nominal future value using compound interest formula
    const nominalFutureValue = initialInvestment * Math.pow(1 + annualReturnRate, years);

    // Adjust nominal future value for inflation to get real future value
    const realFutureValue = nominalFutureValue / Math.pow(1 + inflationRate, years);

    const ans: Sp500FutureValueResult = {
        nominalFutureValue,
        realFutureValue,
    };
    console.log(ans);
    return ans;
    
}       