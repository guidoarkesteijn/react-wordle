import { test } from "vitest";
import { NotificationData, NotificationType } from "./Notifications";

test('NotificationData Constructor', () => {
    let title : string = "Test";
    let type : NotificationType = NotificationType.Normal;

    let notification : NotificationData = new NotificationData(title, type);

    expect(notification.message).toBe(title);
    expect(notification.type).toBe(type);
});
