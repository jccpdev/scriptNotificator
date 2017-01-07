#Script Notificator

A tool to send a PushBullet notification when a script is done running.

## Installation

I am not ready to publish this on npm so for now you will need to clone it
 
 ```
 git clone git@github.com:jccpdev/scriptNotificator.git
 ```
 
 In project directory run the following command to install the package globaly 
 
 ```
 npm install -g .
 ```
 
Make sure you created an account in Push Bullet and you have an API key and run
 ```
 notify
 ```
Now you should get a prompt for an api key that looks like this.

```
jccp@Juans-MacBook-Pro-2 ~/D/scriptNotificator> notify
Please set a PushBullet Key: key:  

```
Enter the key and press enter.

## Usage
Send a push notification to all of your devices
```
echo "The Message" | notify
```
Send a push notification to only one device
```
echo "The Message" | notify <device nickname>
```
Send a push notification to all devices with special title
```
echo "The Message" | notify {} "Special Title"
```

This is a work in progress.