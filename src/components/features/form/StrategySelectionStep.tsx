'use client';

import { Coffee, Palmtree, Shuffle, Star, Sunrise } from 'lucide-react';
import { cn } from '@/lib/utils';
import { OPTIMIZATION_STRATEGIES } from '@/constants';
import { OptimizationStrategy } from '@/types';
import { StepHeader } from './components/StepHeader';
import { FormSection } from './components/FormSection';
import { useStrategySelection } from '@/hooks/useOptimizer';
import { StepTitleWithInfo } from './components/StepTitleWithInfo';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Map strategy IDs to their respective icons
const STRATEGY_ICONS = {
  balanced: Shuffle,
  miniBreaks: Star,
  longWeekends: Coffee,
  weekLongBreaks: Sunrise,
  extendedVacations: Palmtree,
} as const;

export function StrategySelectionStep() {
  const { strategy, setStrategy } = useStrategySelection();

  // Using the new StepTitleWithInfo component
  const titleWithInfo = (
    <StepTitleWithInfo
      title="Choose Your Style"
      colorScheme="blue"
      tooltip={{
        title: "Optimization Styles",
        description: "Your selected style determines how your days will be distributed throughout the year. Each option creates a different pattern of time off based on your preferences - from short breaks to longer vacations.",
        ariaLabel: "About optimization styles"
      }}
    />
  );

  return (
    <FormSection colorScheme="blue" headingId="strategy-heading">
      <StepHeader
        number={2}
        title={titleWithInfo}
        colorScheme="blue"
        id="strategy-heading"
      />
      <Select
        value={strategy}
        onValueChange={(value) => setStrategy(value as OptimizationStrategy)}
      >
        <SelectTrigger className="w-full" id="strategy-select">
          <SelectValue placeholder="Select a style" />
        </SelectTrigger>
        <SelectContent>
          {OPTIMIZATION_STRATEGIES.map((strategyOption) => {
            const Icon = STRATEGY_ICONS[strategyOption.id as OptimizationStrategy];
            return (
              <SelectItem key={strategyOption.id} value={strategyOption.id}>
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span>{strategyOption.label}</span>
                  {strategyOption.id === 'balanced' && (
                    <span className="ml-auto text-xs text-blue-600 dark:text-blue-400">
                      Recommended
                    </span>
                  )}
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </FormSection>
  );
} 