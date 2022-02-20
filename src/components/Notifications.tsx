import React from "react";
import Notification from "./Notification";

export enum NotificationType {
    Normal = "normal",
    Error = "error",
    Success = "success"
}

export class NotificationData {
    message : string;
    type : NotificationType;

    constructor(message : string, type : NotificationType) {
        this.message = message;
        this.type = type;
    }
}

interface IProps {
    notifications : NotificationData[];
    deleteNotification : (index : number) => void;
}

class Notifications extends React.Component<IProps> {
    render(): React.ReactNode {
        return <div className="notifications">
            {this.props.notifications.map((element, index) => {
                return <Notification key={index} index={index} notification={element} deleteNotification={this.props.deleteNotification}/>
            })}
        </div>
    }
}

export default Notifications;