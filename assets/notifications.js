// HTML Notifications Pure JS
class Notifications {
    NotificationsArray = [];
    LastNotifications = [];
    NotificationTimeShow = 8;
    displayNotifications = true;
    temporaryNotificationsOff = false;
    showLastNotificationstmp = 0;
    temporaryTime = 0;

    constructor(NotificationTimeShow) {
        if (NotificationTimeShow != undefined) {
            this.NotificationTimeShow = NotificationTimeShow;
        }
    };

    // Find ID
    getIndexOfK(arr, k) {
        for (var i = 0; i < arr.length; i++) {
            if(arr[i][0] == k) {
                return i;
            }
        }
        return -1;
    };

    // Get Date (format YYYY-MM-DD HH:MM:SS)
    getDate() {
        var xDate = new Date();
        var sM = "00" + (xDate.getMonth() + 1);
        var sD = "00" + xDate.getDate();
        var sh = "00" + xDate.getHours();
        var sm = "00" + xDate.getMinutes();
        var ss = "00" + xDate.getSeconds();
        return xDate.getFullYear() + "-" + sM.slice(-2) + "-" + sD.slice(-2) + " " + sh.slice(-2) + ":" + sm.slice(-2) + ":" + ss.slice(-2);
    };

    // Set Show/Hide Notifications
    stateNotifications(state) {
        this.displayNotifications = state;
    };

    // Cancel setTemporaryOff
    cancelTemporaryOff() {
        this.temporaryNotificationsOff = false;
    };

    // Temporary off Display Notification
    setTemporaryOff() {
        this.temporaryNotificationsOff = true;
    };

    // Create/Update LastNotifications Array
    processLastNotificationsArray(NotificationID, NotificationType, NotificationText) {
        // Notification History
        var indexLast = this.getIndexOfK(this.LastNotifications, NotificationID);
        if (indexLast > -1) { // only splice array when item is found
            this.LastNotifications[indexLast][1] = NotificationType;
            this.LastNotifications[indexLast][2] = NotificationText;
            this.LastNotifications[indexLast][3] = this.getDate();
        } else {
            if (this.LastNotifications.length >= 25) {
                this.LastNotifications.splice(0, 1);
            }
            this.LastNotifications.push([NotificationID, NotificationType, NotificationText, this.getDate()]);
        }
        this.updateLastNotifications();
    };

    // Add New Notification (If ID exists, will be automatically redirected to the update)
    addNotification(NotificationID, NotificationType, NotificationText, NotificationTime) {
        var xTmp = document.getElementById("_Lastnotif_");
        if (this.displayNotifications && xTmp == undefined && !this.temporaryNotificationsOff) {
            if (NotificationTime == undefined) {
                NotificationTime = this.NotificationTimeShow;
            }
            // Verify id Notification Exist
            var index = this.getIndexOfK(this.NotificationsArray, NotificationID);
            if (index > -1) { // only splice array when item is found
                // Exist Only Update
                this.updateNotification(NotificationID, NotificationType, NotificationText, NotificationTime);
                return
            }
            // Verify if need delete first notification
            if (((this.NotificationsArray.length + 1) * 80) + 55 > document.documentElement.clientHeight) {
                this.delNotification(this.NotificationsArray[0][0]);
            }
            // Change Position of All Notifications
            for (var i = 0; i < this.NotificationsArray.length; i++) {
                var xBt = (55 + ((this.NotificationsArray.length - i) * 80)) + 'px';
                document.getElementById("notify_" + this.NotificationsArray[i][0]).style.bottom = xBt;
            }
            // Create New Notification
            let div = document.createElement("div");
            div.id = "notify_" + NotificationID;
            div.className = "notification notification" + NotificationType;
            div.style = "bottom: 55px;";
            div.innerHTML = "<div class=\"notificationIcon\"><i class=\"" + this.getNotificationIcon(NotificationType) + "\"></i></div><div class=\"notificationText\">" + NotificationText + "</div>";
            div.classList.add('notificationOpen');
            document.body.appendChild(div);
            document.getElementById("notify_" + NotificationID).onclick = () => { this.delNotification(NotificationID);}

            var timer = 0;
            if (NotificationTime > 0) {
                timer = setTimeout(() => {this.delNotification(NotificationID);}, (NotificationTime * 1000));
            }
            this.NotificationsArray.push([NotificationID, timer, NotificationType]);
        }
        // Create LastNotifications Array
        this.processLastNotificationsArray(NotificationID, NotificationType, NotificationText);
    };

    // Delete Notification from Screen 
    delNotification(NotificationID) {
        if (NotificationID != undefined) {
            // Delete Notification
            var xTmp = document.getElementById("notify_" + NotificationID);
            if (xTmp != undefined) {
                //xTmp.classList.remove('notificationOpen');
                xTmp.remove();
                var index = this.getIndexOfK(this.NotificationsArray, NotificationID);
                if (index > -1) { // only splice array when item is found
                    if (this.NotificationsArray[index][1] > 0) {
                        clearTimeout(this.NotificationsArray[index][1]);
                    }
                    this.NotificationsArray.splice(index, 1); // 2nd parameter means remove one item only
                    if (this.NotificationsArray.length > 0) {
                        // Change Position off Other Notifications
                        for (var i = 0; i < this.NotificationsArray.length; i++) {
                            var xBt = (55 + ((this.NotificationsArray.length - i - 1) * 80)) + 'px';
                            document.getElementById("notify_" + this.NotificationsArray[i][0]).style.bottom = xBt;
                        }
                    }
                }
            }
        }
    };

    // Change/Update Exist Notification
    updateNotification(NotificationID, NotificationType, NotificationText, NotificationTime) {
        var index = this.getIndexOfK(this.NotificationsArray, NotificationID);
        if (index > -1) { // only splice array when item is found
            if (this.NotificationsArray[index][1] > 0) {
                clearTimeout(this.NotificationsArray[index][1]);
            }
            // Verify if need Change Type
            if (NotificationType != this.NotificationsArray[index][2]) {
                // Remove old Class Type
                document.getElementById("notify_" + NotificationID).classList.remove("notification" + this.NotificationsArray[index][2]);
                // Add New Class Type
                document.getElementById("notify_" + NotificationID).classList.add("notification" + NotificationType);
                // Update Array
                this.NotificationsArray[index][1] = NotificationType;
            }
            // Update Div Element
            document.getElementById("notify_" + NotificationID).innerHTML = "<div class=\"notificationIcon\"><i class=\"" + this.getNotificationIcon(NotificationType) + "\"></i></div><div class=\"notificationText\">" + NotificationText + "</div>";
            var timer = 0;
            if (NotificationTime > 0) {
                timer = setTimeout(() => {this.delNotification(NotificationID);}, (NotificationTime * 1000));
            }
            this.NotificationsArray[index][1] = timer;
        }
        // Update LastNotifications array
        this.processLastNotificationsArray(NotificationID, NotificationType, NotificationText);
    };

    // Set Timer to Notification
    setNotificationTimeOut(NotificationID, NotificationTime) {
        var index = this.getIndexOfK(this.NotificationsArray, NotificationID);
        if (index > -1) { // only splice array when item is found
            if (this.NotificationsArray[index][1] > 0) {
                clearTimeout(this.NotificationsArray[index][1]);
            }
            var timer = 0;
            if (NotificationTime > 0) {
                timer = setTimeout(() => {this.delNotification(NotificationID);}, (NotificationTime * 1000));
            }
            this.NotificationsArray[index][1] = timer;
        }
    };

    // Delete All Notifications
    delallNotifications() {
        for (var i = this.NotificationsArray.length - 1; i > -1; i--) {
            this.delNotification(this.NotificationsArray[i][0]);
        }
    };

    // Get Icon Notification Type
    getNotificationIcon(NotificationType) {
        if (NotificationType == "Alert") {
            return "fas fa-exclamation-triangle"
        } else if (NotificationType == "Info") {
            return "fas fa-info-circle"
        } else if (NotificationType == "Warning") {
            return "fas fa-skull-crossbones"
        } else if (NotificationType == "OK") {
            return "far fa-check-circle"
        }
    };

    // Get Last Notifications
    showLastNotifications() {
        var xTmp = document.getElementById("_Lastnotif_");
        if (xTmp == undefined) {
            this.delallNotifications();
            let div = document.createElement("div");
            div.id = "_Lastnotif_";
            div.className = "lastnotifications";
            document.body.appendChild(div);
            if (this.LastNotifications.length > 0) {
                var xD = "";
                for (var i = 0; i < this.LastNotifications.length; i++) {
                    xD = xD + "<div class=\"lastnotificationDataInfo\"><div id=\"lastnotify_" + this.LastNotifications[i][0] + "\" class=\"lastnotificationData\"><div class=\"lastnotificationDataTime\">" + this.LastNotifications[i][3] + "</div></div><div class=\"lastnotificationData\"><div><i class=\"" + this.getNotificationIcon(this.LastNotifications[i][1]) + "\"></i></div><div>" + this.LastNotifications[i][2] + "</div></div></div>";
                }
                document.getElementById("_Lastnotif_").innerHTML = "<div id=\"_LastnotifData_\" class=\"LastnotifData\">" + xD + "</div><div class=\"lastnotificationsTopTitle\"><div class=\"lastnotificationsTitle\"><i class=\"far fa-bell\"></i>Notifications</div><div class=\"lastnotificationClose\"><i id=\"clearlastnotification\" class=\"fas fa-trash-alt\" title=\"Clear Notification History\"></i>&nbsp;<i id=\"closeLastNotifications\" class=\"far fa-times-circle\" title=\"Close Notification History\"></i></div></div>";
                document.getElementById("closeLastNotifications").onclick= () => {this.closeLastNotifications();}
                document.getElementById("clearlastnotification").onclick= () => {this.delLastNotifications();}
            } else {
                document.getElementById("_Lastnotif_").classList.add('lastnotificationsCenter');
                document.getElementById("_Lastnotif_").onclick = () => { this.closeLastNotifications(); };
                document.getElementById("_Lastnotif_").innerHTML = "<div><i class=\"fas fa-info-circle\"></i></div><div>There are no notifications</div>";
                this.showLastNotificationstmp = setTimeout(() => {this.closeLastNotifications();}, 5000);
            }
            document.getElementById("_Lastnotif_").classList.add('lastnotificationsOpen');
        }
    };

    // Update Last Notifications (div)
    updateLastNotifications() {
        var xTmp = document.getElementById("_LastnotifData_");
        if (xTmp != undefined) {
            if (this.LastNotifications.length > 0) {
                var xD = "";
                for (var i = 0; i < this.LastNotifications.length; i++) {
                    xD = xD + "<div class=\"lastnotificationDataInfo\"><div id=\"lastnotify_" + this.LastNotifications[i][0] + "\" class=\"lastnotificationData\"><div class=\"lastnotificationDataTime\">" + this.LastNotifications[i][3] + "</div></div><div class=\"lastnotificationData\"><div><i class=\"" + this.getNotificationIcon(this.LastNotifications[i][1]) + "\"></i></div><div>" + this.LastNotifications[i][2] + "</div></div></div>";
                }
                document.getElementById("_Lastnotif_").innerHTML = "<div id=\"_LastnotifData_\" class=\"LastnotifData\">" + xD + "</div><div class=\"lastnotificationsTopTitle\"><div class=\"lastnotificationsTitle\"><i class=\"far fa-bell\"></i>Notifications</div><div class=\"lastnotificationClose\"><i id=\"clearlastnotification\" class=\"fas fa-trash-alt\" title=\"Clear Notification History\"></i>&nbsp;<i id=\"closeLastNotifications\" class=\"far fa-times-circle\" title=\"Close Notification History\"></i></div></div>";
                document.getElementById("closeLastNotifications").onclick= () => {this.closeLastNotifications();}
                document.getElementById("clearlastnotification").onclick= () => {this.delLastNotifications();}
            } else {
                document.getElementById("_Lastnotif_").classList.add('lastnotificationsCenter');
                document.getElementById("_Lastnotif_").onclick = () => { this.closeLastNotifications(); };
                document.getElementById("_Lastnotif_").innerHTML = "<div><i class=\"fas fa-info-circle\"></i></div><div>There are no notifications</div>";
                this.showLastNotificationstmp = setTimeout(() => {this.closeLastNotifications();}, 5000);
            }
        }
    };

    // Close Last Notifications
    closeLastNotifications() {
        if (this.showLastNotificationstmp != 0) {
            clearTimeout(this.showLastNotificationstmp);
            this.showLastNotificationstmp = 0;
        }
        var xTmp = document.getElementById("_Lastnotif_");
        if (xTmp != undefined) {
            xTmp.remove();
        }
    };

    // Delete Last Notifications
    delLastNotifications() {
        this.LastNotifications = [];
        this.closeLastNotifications();
    };
};