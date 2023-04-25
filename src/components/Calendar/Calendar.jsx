import React from "react";
import { Calendar } from 'antd';

const CalendarLayout = () => {
    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };
    return (
        <React.Fragment>
            <Calendar
                mode='moth'
                onPanelChange={onPanelChange}

            />;
        </React.Fragment>
    )
}
export default CalendarLayout;