import { test } from "vitest";
import { NotificationData, NotificationType } from "./Notifications";
import { fireEvent, render } from "@testing-library/react";
import Notification from "./Notification";

test('<Notification>', () => {
    let deleteNotification = (index : number) => {};
    const title = "Test";
    let notification : NotificationData = new NotificationData(title, NotificationType.Normal);
    const wrapper = render(<Notification key={0} index={0} notification={notification} deleteNotification={deleteNotification}/>)
    
    let element = wrapper.container.querySelector("div");
    expect(element?.className).toBe("notification normal");
    expect(element?.childNodes[0].textContent).toBe(title);

    const button = wrapper.container.querySelector('.button');
    expect(button).not.toBeNull();
    if(button !== null)
    {
        fireEvent.click(button);
    }
});
