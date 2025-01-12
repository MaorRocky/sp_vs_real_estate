"use client";

import {useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import calculateRealEstateProfit from "@/actions/calculateRealEstateProfit";
import calculateSp500FutureValue from "@/actions/calculateSp500FutureValue";
import {formatSiUnit} from "format-si-unit";
import {Label} from "@/components/ui/label";

const InvestmentComparison = () => {
    const [initialInvestment, setInitialInvestment] = useState(1500000);
    const [mortgageAmount, setMortgageAmount] = useState(1500000);
    const [mortgageInterestRate, setMortgageInterestRate] = useState(0.035);
    const [years, setYears] = useState(25);
    const [priceIncreaseRate, setPriceIncreaseRate] = useState(0.035);
    const [sp500AnnualReturnRate, setSp500AnnualReturnRate] = useState(0.1);
    const [inflationRate, setInflationRate] = useState(0.03);
    const [monthlyDeposit, setMonthlyDeposit] = useState(0);
    const [taxRate, setTaxRate] = useState(0.25);
    const [results, setResults] = useState(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const realEstateResult = await calculateRealEstateProfit(
            initialInvestment,
            mortgageAmount,
            mortgageInterestRate,
            years,
            priceIncreaseRate,
            inflationRate
        );

        const sp500Result = await calculateSp500FutureValue(
            initialInvestment,
            sp500AnnualReturnRate,
            years,
            inflationRate,
            monthlyDeposit,
            taxRate
        );

        setResults({realEstateResult, sp500Result});
    };
    const calculateMonthlyPaymentFormula = () => {
        const P = mortgageAmount;
        const r = mortgageInterestRate / 12;
        const n = years * 12;

        return `M = ${P} × [(${r.toFixed(5)}) × (1 + ${r.toFixed(5)})^${n}] / [(1 + ${r.toFixed(5)})^${n} - 1]`;
    };
    return (
        <div className="w-full h-full flex flex-col items-center gap-2">
            <h1 className="text-3xl font-bold text-center">Investment Comparison</h1>

            <Card className="w-full p-4 m-2">
            <form onSubmit={handleSubmit} className="space-y-4 w-full mt-2">
                {/* Form Group */}
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <Label>Initial Investment</Label>
                        <Input
                            type="number"
                            value={initialInvestment}
                            onChange={(e) => setInitialInvestment(Number(e.target.value))}
                            placeholder="Enter initial investment amount"
                        />
                    </div>

                    <div>
                        <Label>Mortgage Amount</Label>
                        <Input
                            type="number"
                            value={mortgageAmount}
                            onChange={(e) => setMortgageAmount(Number(e.target.value))}
                            placeholder="Enter mortgage amount"
                        />
                    </div>

                    <div>
                        <Label>Mortgage Interest Rate (%)</Label>
                        <Input
                            type="number"
                            step="0.01"
                            value={(mortgageInterestRate * 100).toFixed(2)}
                            onChange={(e) => setMortgageInterestRate(Number(e.target.value) / 100)}
                            placeholder="Enter mortgage interest rate"
                        />
                    </div>

                    <div>
                        <Label>Investment Period (Years)</Label>
                        <Input
                            type="number"
                            value={years}
                            onChange={(e) => setYears(Number(e.target.value))}
                            placeholder="Enter investment period in years"
                        />
                    </div>

                    <div>
                        <Label>Annual Property Price Increase (%)</Label>
                        <Input
                            type="number"
                            step="0.01"
                            value={(priceIncreaseRate * 100).toFixed(2)}
                            onChange={(e) => setPriceIncreaseRate(Number(e.target.value) / 100)}
                            placeholder="Enter annual property price increase"
                        />
                    </div>

                    <div>
                        <Label>S&P 500 Annual Return Rate (%)</Label>
                        <Input
                            type="number"
                            step="0.01"
                            value={sp500AnnualReturnRate * 100}
                            onChange={(e) => setSp500AnnualReturnRate(Number(e.target.value) / 100)}
                            placeholder="Enter S&P 500 annual return rate"
                        />
                    </div>

                    <div>
                        <Label>Annual Inflation Rate (%)</Label>
                        <Input
                            type="number"
                            step="0.01"
                            value={inflationRate * 100}
                            onChange={(e) => setInflationRate(Number(e.target.value) / 100)}
                            placeholder="Enter annual inflation rate"
                        />
                    </div>


                    <div>
                        <Label>Tax Rate (%)</Label>
                        <Input
                            type="number"
                            step="0.01"
                            value={taxRate * 100}
                            onChange={(e) => setTaxRate(Number(e.target.value) / 100)}
                            placeholder="Enter tax rate"
                        />
                    </div>


                    <div>
                        <Label>Monthly addition</Label>
                        <Input
                            type="number"
                            step="100"
                            value={monthlyDeposit}
                            onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                            placeholder="Enter monthly deposit amount"
                        />
                    </div>

                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700">
                        Calculate
                    </Button>
                </div>
            </form>
            </Card>

            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">Mortgage Payment Formula</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-700">
                        M = P × [ (r × (1 + r)<sup>n</sup>) / ((1 + r)<sup>n</sup> - 1) ]
                    </p>
                    <p className="mt-4">
                        <strong>Where:</strong>
                    </p>
                    <ul className="list-disc ml-6 mt-2 text-gray-700">
                        <li>
                            <strong>P:</strong> {formatSiUnit(mortgageAmount)} (Loan Principal)
                        </li>
                        <li>
                            <strong>r:</strong> {(mortgageInterestRate / 12).toFixed(5)} (Monthly Interest Rate) -
                            yearly interest/12
                        </li>
                        <li>
                            <strong>n:</strong> {years * 12} (Total Number of Payments) - years * 12
                        </li>
                    </ul>
                    <p className="mt-6">
                        <strong>Final Formula with Variables:</strong>
                    </p>
                    <p className="text-blue-600 text-lg">{calculateMonthlyPaymentFormula()}</p>
                </CardContent>
            </Card>

            {/* Results Section */}
            {results && (
                <div className=" w-full pb-8 ">
                    <Card className="mt-4">
                        <CardHeader>
                            <CardTitle className="text-center text-lg font-semibold">Real Estate Investment
                                Results</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p>
                                <strong>Real
                                    Profit:</strong> {formatSiUnit(results.realEstateResult.realProfit)} currency units
                            </p>
                            <p>
                                <strong>Nominal Property
                                    Value:</strong> {formatSiUnit(results.realEstateResult.nominalPropertyValue)} currency
                                units
                            </p>
                            <p>
                                <strong>Total Paid to
                                    Bank:</strong> {formatSiUnit(results.realEstateResult.totalPaidToBank)} currency
                                units
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="mt-4">
                        <CardHeader>
                            <CardTitle className="text-center text-lg font-semibold">S&P 500 Investment
                                Results</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p>
                                <strong>Nominal Future
                                    Value:</strong> {formatSiUnit(results.sp500Result.nominalFutureValue)} currency
                                units
                            </p>
                            <p>
                                <strong>Real Future Profit after
                                    Inflation:</strong> {formatSiUnit(results.sp500Result.realFutureValue)} currency
                                units
                            </p>
                            <p>
                                <strong>After
                                    taxes</strong> {formatSiUnit(results.sp500Result.afterTaxFutureValue)} currency
                            </p>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default InvestmentComparison;
