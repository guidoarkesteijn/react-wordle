import React from "react";
import { NotificationData } from "./Notifications";

interface IProps {
    notification : NotificationData;
    index : number;
    deleteNotification : (index : number) => void;
}

class Notification extends React.Component<IProps> {
    
    render(): React.ReactNode { 
        return <div className={"notification " + this.props.notification.type}>
            {this.props.notification.message}
            <div className="button" onClick={() => this.props.deleteNotification(this.props.index)}>X</div>
        </div>
    }
}

export default Notification;