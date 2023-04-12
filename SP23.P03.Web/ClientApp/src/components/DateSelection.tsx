import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'; //formats the date picker --otherwise it looks BAD
import { Input } from 'semantic-ui-react';

export function DateSelection() {
    const [date, setDate] = useState<Date | null>(new Date());

    const handleCalendarClose = () => console.log("Calendar closed");
    const handleCalendarOpen = () => console.log("Calendar opened");

    return (
        <div>
            <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                minDate={new Date()}
                //showTimeSelect
                //dateFormat="MMMM d, yyyy h:mm aa"
                onCalendarClose={handleCalendarClose}
                onCalendarOpen={handleCalendarOpen}
                customInput={<Input />} /* this gives it a better look than before */
            />
        </div>
    );
}