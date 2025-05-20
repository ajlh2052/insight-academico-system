
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface StatCardProps {
  title: string;
  value: number;
  maxValue?: number;
  percentageText?: string;
  progressColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  maxValue = 100,
  percentageText,
  progressColor = 'bg-primary',
}) => {
  const percentage = (value / maxValue) * 100;
  
  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium text-gray-700">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline justify-between">
          <div className="text-3xl font-bold">
            {value}
            {maxValue && <span className="text-sm text-gray-500 ml-1">/ {maxValue}</span>}
          </div>
          <div className="text-sm font-medium text-gray-600">
            {percentageText || `${Math.round(percentage)}%`}
          </div>
        </div>
        <Progress value={percentage} className="mt-2 h-2" />
      </CardContent>
    </Card>
  );
};

export default StatCard;
