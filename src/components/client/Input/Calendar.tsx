import React from "react";

type CalendarProps = {
  dateRange: {
    startDate: string;
    endDate: string;
  };
  onChange: (value: { startDate: string; endDate: string }) => void;
};

const Calendar = ({ dateRange, onChange }: CalendarProps) => {
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    onChange({
      ...dateRange,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-wrap w-full">
      <div className="w-full pr-1 sm:w-1/2">
        <div className="mb-5">
          <label
            htmlFor="startDate"
            className="mb-3 block text-base font-medium text-textLight dark:text-textDark"
          >
            Ngày nhận
          </label>
          <input
            min={dateRange.startDate}
            type="date"
            name="startDate"
            id="startDate"
            value={dateRange.startDate}
            onChange={handleDateChange}
            className="w-full rounded-md border border-divideLight dark:border-divideDark bg-light dark:bg-dark py-3 px-6 text-base font-medium text-textLight2nd dark:text-textDark2nd outline-none focus:shadow-md dark:focus:shadow-md dark:focus:shadow-dark"
          />
        </div>
      </div>

      <div className="w-full pl-1 sm:w-1/2">
        <div className="mb-5">
          <label
            htmlFor="endDate"
            className="mb-3 block text-base font-medium text-textLight dark:text-textDark"
          >
            Ngày trả
          </label>
          <input
            min={dateRange.startDate}
            type="date"
            name="endDate"
            id="endDate"
            value={dateRange.endDate}
            onChange={handleDateChange}
            className="w-full rounded-md border border-divideLight dark:border-divideDark bg-light dark:bg-dark py-3 px-6 text-base font-medium text-textLight2nd dark:text-textDark2nd outline-none focus:shadow-md dark:focus:shadow-md dark:focus:shadow-dark"
          />
        </div>
      </div>
    </div>
  );
};

export default Calendar;
