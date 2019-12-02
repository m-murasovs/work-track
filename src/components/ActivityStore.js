import React from 'react';
import AddToCalendar from 'react-add-to-calendar';

const ActivityStore = (props) => {
    let date = new Date();

    let event = {
        title: `Activity: ${props.act}; Time: ${props.item.time}`,
        startTime: date,
    }

    let icon = { textOnly: 'none' };

    let items = [
        { google: 'Google' },
        { apple: 'Apple Calendar' },
        { outlook: 'Outlook' },
        { yahoo: 'Yahoo' }
    ]

    return (
        <div className="act-done">
            <div className="display-acts-col">
                <p>Activity: {props.act}</p>
                <p>Time: {props.item.time}</p>
                <p>Date: {props.item.date}</p>
            </div>
            
            <div className="add-cal-cont">
                <AddToCalendar
                    event={event}
                    listItems={items}
                    buttonTemplate={icon}
                    displayItemIcons={false}
                    rootClass="add-to-cal"  />
            </div>
        </div>
    )
}

export default ActivityStore;