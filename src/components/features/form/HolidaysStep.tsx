import { DateList } from '@/components/features/HolidaysDateList';
import { StepHeader } from './components/StepHeader';
import { FormSection } from './components/FormSection';
import { useHolidays } from '@/hooks/useOptimizer';
import { StepTitleWithInfo } from './components/StepTitleWithInfo';
import { useOptimizer } from '@/contexts/OptimizerContext';
import { useEffect, useReducer } from 'react';
import { useHolidaysOfSL } from '@/hooks/useHolidayQueries';
import { CountryInfo, getStoredLocationData, storeLocationData } from '@/lib/storage/location';
import { convertToDateObject } from '@/utils/dates';
import { format } from 'date-fns';

// Define the state interface for the reducer
interface HolidaysState {
  selectedCountryCode: string;
  // selectedState: string; // Removed as we only support SL
  // selectedRegion: string; // Removed as we only support SL
}

const initialState: HolidaysState = {
  selectedCountryCode: 'LK', // Default to Sri Lanka
  // selectedState: '', // Removed
  // selectedRegion: '', // Removed
};

// Define action types
type HolidaysAction =
  | { type: 'SET_COUNTRY_INFO'; payload: CountryInfo }
  | { type: 'RESET_SELECTIONS' };

// Implement the reducer function
const holidaysReducer = (state: HolidaysState, action: HolidaysAction): HolidaysState => {
  switch (action.type) {
    case 'SET_COUNTRY_INFO':
      return {
        ...state,
        selectedCountryCode: action.payload.countryCode,
        // selectedState: action.payload.state!, // Removed
        // selectedRegion: action.payload.region!, // Removed
      };
    case 'RESET_SELECTIONS':
      return { ...initialState, selectedCountryCode: 'LK' }; // Reset to SL
    default:
      return state;
  }
};

interface Holiday {
  date: string;
  name: string;
  // Add other properties if available from the API
}

export const HolidaysStep = () => {
  const { holidays, setDetectedHolidays } = useHolidays();
  const { state: { selectedYear } } = useOptimizer();

  const [holidaysState, dispatch] = useReducer(holidaysReducer, initialState);
  const { selectedCountryCode } = holidaysState;

  const { data: holidaysData, refetch } = useHolidaysOfSL(selectedYear);

  useEffect(() => {
    const countryInfo = getStoredLocationData(selectedYear);
    if (countryInfo && countryInfo.countryCode === 'LK') { // Ensure it's for SL
      dispatch({ type: 'SET_COUNTRY_INFO', payload: countryInfo });
    } else {
      // If no stored data or not for SL, set to SL
      const defaultSLInfo: CountryInfo = { countryCode: 'LK' };
      storeLocationData(selectedYear, defaultSLInfo);
      dispatch({ type: 'SET_COUNTRY_INFO', payload: defaultSLInfo });
    }
  }, [selectedYear]);

  useEffect(() => {
    // Store SL as the country if not already set, or if changed
    if (selectedCountryCode !== 'LK') {
        const slInfo: CountryInfo = { countryCode: 'LK' };
        storeLocationData(selectedYear, slInfo);
        dispatch({ type: 'SET_COUNTRY_INFO', payload: slInfo });
    } else if (!getStoredLocationData(selectedYear)) {
        const slInfo: CountryInfo = { countryCode: 'LK' };
        storeLocationData(selectedYear, slInfo);
    }
  }, [selectedCountryCode, selectedYear]);

  // Process holidays when data changes
  useEffect(() => {
    if (!holidaysData) return;

    const processedHolidays = holidaysData.reduce((acc: Holiday[], holiday: Holiday) => {
      if (typeof holiday.date === 'string' && holiday.date.includes('-')) { // Basic check for string and format
        try {
          const displayDate = format(convertToDateObject(holiday.date), 'yyyy-MM-dd');
          acc.push({
            date: displayDate,
            name: holiday.name,
          });
        } catch (error) {
          console.error('Error processing holiday date:', holiday, error);
        }
      } else {
        console.error('Invalid or undefined holiday date:', holiday);
      }
      return acc;
    }, []);
    setDetectedHolidays(processedHolidays);
  }, [holidaysData]);

  const handleRefetch = () => refetch();

  const publicHolidaysTooltip = {
    title: 'About Public Holidays',
    description: 'Public holidays are already non-working days, so you don\'t need to use PTO for them. Adding them helps create an optimized schedule that accounts for these days when planning your time off.',
    ariaLabel: 'Why public holidays matter',
  };

  return (
    <FormSection colorScheme="amber" headingId="holidays-heading">
      <StepHeader
        number={3}
        title={<StepTitleWithInfo
          title="Public Holidays"
          badge={{ label: 'Required' }}
          colorScheme="amber"
          tooltip={publicHolidaysTooltip} />}
        // description={`Add public holidays for ${selectedYear} for Sri Lanka.`} // Description removed as it's not a valid prop
        colorScheme="amber"
        id="holidays-heading"
      />

      <fieldset className="space-y-4 border-0 m-0 p-0" aria-labelledby="holidays-heading">
        <legend className="sr-only">Public holidays for Sri Lanka</legend>

        <div className="space-y-3">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Public holidays for Sri Lanka ({selectedYear}) are listed below.
          </p>
        </div>

        <div className="space-y-6">
          <DateList title="Public Holidays for Sri Lanka" colorScheme="amber" />
        </div>
      </fieldset>
    </FormSection>
  );
};
