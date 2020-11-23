import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function Calendar() {
    
    const [date,setDate] =useState(null);

    return(
        <div>
            <DatePicker
                selected={date}
                onChange={date => setDate(date)}
                dateFormat='dd/MM/yyyy'
                //   minDate={new Date()}
                maxDate={new Date()}
                // filterDate = { date => date.getDay() != 6 && date.getDay()!= 0}
                //Exclude sat and sundays
                isClearable
                showYearDropdown
                scrollableMonthYearDropdown
            />

        </div>
    )
} 


export default Calendar;
