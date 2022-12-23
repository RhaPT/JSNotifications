# JSNotifications

![JSNotifications](https://img.shields.io/badge/JSNotifications-V0.0.1-g)

Html notifications pure javascript.

- [Add html Code](#add-html-code)
- [Init Notifications](#init-notifications)
- [Notification Types](#notification-types)
- [Notifications Methods](#all-notifications-methods)
    - [stateNotifications](#statenotificationstruefalse)
    - [getStateNotifications](#getStateNotifications)
    - [setTemporaryOff](#setTemporaryOff)
    - [getTemporaryState](#getTemporaryState)
    - [cancelTemporaryOff](#cancelTemporaryOff)
    - [addNotification](#addnotificationnotification-id-notification-type-message-time-shows-message)
    - [updateNotification](#updatenotificationnotification-id-notification-type-message-time-shows-message)
    - [setNotificationTimeOut](#setnotificationtimeoutnotification-id-time-in-seconds)
    - [delNotification](#delnotificationnotification-id)
    - [delallNotifications](#delallnotifications)
- [Notification history Window](#notification-history-window-last-25-notifications)
    - [showLastNotifications](#showlastnotifications)
    - [closeLastNotifications](#closelastnotifications)
    - [delLastNotifications](#dellastnotifications)
- [Example Html Code](notifications.html)


## Add Html Code

```html
<script src="assets/notifications.min.js" type="text/javascript"></script>
```

Find example in [notifications.html](notifications.html)

## Init Notifications

Notification(Time shows message in seconds)

**_<sub>Example :</sub>_**

```javascript
Notify = new Notification()
```

_Use default time shows message (8 seconds)_

```javascript
Notify = new Notification(4)
```

_Set default time shows message (4 seconds)_

```javascript
Notify = new Notification(0)
```

_Disabble time (allways on screen)_

> **_Note:_**
To close any notification, just click on the notification

## Notification Types

* Warning
* Info
* Alert
* OK

## All Notifications Methods

#### stateNotifications(true|false)

_Show/Hide Notifications. Default is true_

**_<sub>Example :</sub>_**

```javascript
Notify.stateNotifications(true)
```

<sub>Show Notifications</sub>

```javascript
Notify.stateNotifications(false)
```

<sub>Dont Show Notifications</sub>

***

#### getStateNotification()

Get Notifications state, return true or false

***

#### setTemporaryOff()

_Hide (Temporary) Notifications_

***

#### getTemporaryStateNotification()

Get Temporary Notifications state, return true or false

***

#### cancelTemporaryOff()

_Cancel setTemporaryOff_

***

#### addNotification(Notification ID, Notification Type, Message, Time shows message)

_Add/Show Notification (If the id already exists an update will be made)_

**_<sub>Example :</sub>_**

```javascript
Notify.addNotification("01", "Alert", "Notification 01");
```

<sub>Use default time shows message</sub>

```javascript
Notify.addNotification("01", "Alert", "Notification 01", 10);
```

<sub>Sets 10 seconds for the time it shows message for this notification</sub>

```javascript
Notify.addNotification("01", "Alert", "Notification 01", 0);
```

<sub>Shows the notification until the [delNotification](#delnotificationnotification-id) or [delallNotifications](#delallNotifications) method is called or the notification is clicked</sub>

***

#### updateNotification(Notification ID, Notification Type, Message, Time shows message)

_Update/Change Notification_

***

#### setNotificationTimeOut(Notification ID, time in seconds)

_Set time shows notification message_

**_<sub>Example :</sub>_**

```javascript
Notify.setNotificationTimeOut("01", 4);
```

<sub>Set 4 seconds time shows message for notification with id "01"</sub>

***

#### delNotification(Notification ID)

_Delete/Remove Notification from screen_

**_<sub>Example :</sub>_**

```javascript
Notify.delNotification("01")
```

***

#### delallNotifications()

_Delete all notification_


## Notification history Window (last 25 notifications)

#### showLastNotifications()

_Show notification history_

***

#### closeLastNotifications()

_Close notification history_

***

#### delLastNotifications()

_Delete all notification history_
