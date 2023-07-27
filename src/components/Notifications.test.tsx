import { test } from "vitest";
import Notifications, { NotificationData, NotificationType } from "./Notifications";
import { render } from "@testing-library/react";

let title : string = "Test";
let type : NotificationType = NotificationType.Normal;

test('NotificationData Constructor', () => {

    let notification : NotificationData = new NotificationData(title, type);

    expect(notification.message).toBe(title);
    expect(notification.type).toBe(type);
});

test('Notifications', () => {
    const deleteNotification = (index : number) => {};
    const notifications : NotificationData[] = [];
    notifications.push(new NotificationData(title, type));

    const wrapper = render(<Notifications notifications={notifications} deleteNotification={deleteNotification}/>)

    expect(wrapper.container.querySelector(".notifications")?.childNodes.length).toBe(1);
});