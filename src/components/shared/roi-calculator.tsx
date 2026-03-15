"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Calculator } from "lucide-react";

interface ROICalculatorProps {
  liftPercentage: number;
  markets: number;
}

export function ROICalculator({ liftPercentage, markets }: ROICalculatorProps) {
  const [monthlyVisitors, setMonthlyVisitors] = useState(50000);
  const [conversionRate, setConversionRate] = useState(3);
  const [avgDealSize, setAvgDealSize] = useState(99);

  const currentConversions = (monthlyVisitors * (conversionRate / 100));
  const currentRevenue = currentConversions * avgDealSize;
  const liftedConversions = currentConversions * (1 + liftPercentage / 100);
  const liftedRevenue = liftedConversions * avgDealSize;
  const additionalRevenue = liftedRevenue - currentRevenue;
  const annualImpact = additionalRevenue * 12 * markets;

  return (
    <Card className="border-2 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-base">Revenue Impact Calculator</CardTitle>
            <p className="text-xs text-muted-foreground">Estimate the ROI of cultural adaptation</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1">
            <Label className="text-xs">Monthly Visitors</Label>
            <Input
              type="number"
              value={monthlyVisitors}
              onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
              className="h-9 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Current CR (%)</Label>
            <Input
              type="number"
              step="0.1"
              value={conversionRate}
              onChange={(e) => setConversionRate(Number(e.target.value))}
              className="h-9 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Avg Deal ($)</Label>
            <Input
              type="number"
              value={avgDealSize}
              onChange={(e) => setAvgDealSize(Number(e.target.value))}
              className="h-9 text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Current Monthly Revenue</p>
            <p className="text-lg font-bold">${currentRevenue.toLocaleString()}</p>
          </div>
          <div className="rounded-xl border border-green-200 bg-green-50/50 p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">After Adaptation</p>
            <p className="text-lg font-bold text-green-600">${liftedRevenue.toLocaleString()}</p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 p-5 text-center text-white"
        >
          <p className="text-sm font-medium mb-1">Estimated Annual Revenue Impact</p>
          <p className="text-3xl font-extrabold">
            <DollarSign className="w-6 h-6 inline -mt-1" />
            {annualImpact.toLocaleString()}
          </p>
          <p className="text-xs text-white/70 mt-1">
            +{liftPercentage.toFixed(0)}% lift × {markets} markets × 12 months
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
}
