"use server";

import {RealEstateProfitResult} from "@/lib/types/RealEstateProfitResult";

export default async function calculateRealEstateProfit(initialInvestment: number,
                                                        mortgageAmount: number,
                                                        mortgageInterestRate: number,
                                                        years: number,
                                                        priceIncreaseRate: number,
                                                        inflationRate: number) {


    let propertyValue = initialInvestment + mortgageAmount;

    // Calculate monthly mortgage payment
    const monthlyInterestRate = mortgageInterestRate / 12;
    const numPayments = years * 12;
    let mortgagePayment: number;

    if (monthlyInterestRate > 0) {
        mortgagePayment =
            (mortgageAmount *
                (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numPayments))) /
            (Math.pow(1 + monthlyInterestRate, numPayments) - 1);
    } else {
        mortgagePayment = mortgageAmount / numPayments;
    }

    const totalPaidToBank = mortgagePayment * numPayments;
    const totalInterestPaid = totalPaidToBank - mortgageAmount;

    // Calculate property value over time
    for (let i = 0; i < years; i++) {
        propertyValue *= 1 + priceIncreaseRate;
    }

    // Adjust for inflation to get real property value
    const realPropertyValue = propertyValue / Math.pow(1 + inflationRate, years);

    // Calculate real profit
    const realProfit = realPropertyValue - initialInvestment - totalInterestPaid;

    const ans: RealEstateProfitResult = {
        realProfit,
        nominalPropertyValue: propertyValue,
        totalPaidToBank,
    };
    return ans;
    

}