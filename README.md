# TikAPI OAuth Popup

The authorization process is done through browser events, and the events are posted directly on your website.
<p align="center"><img src="https://i.imgur.com/JS1dycX.gif"></p>

##  Setup
Firstly, include the [Popup script](https://tikapi.io/assets/js/popup.js) before the end of the html body.
```html
<script src="https://tikapi.io/assets/js/popup.js"></script>
```

You can open the OAuth window by calling the function like this:
```javascript
TikAPI.popup({
	client_id: "c_1234567890",
	//scope: ['VIEW_PROFILE', 'USER_MESSAGES'], (optional)
});
```

Now you're all set, you can now listen to user login events and get the user info like this
```javascript
TikAPI.onLogin(function(data){
	console.log(data);
});
```

A successful example
```javascript
{
	access_token: "C5BGTXRtQs7jiy4CNURuwLXbDxRl2VIk"
	client_id: "c_1234567890"
	message: "Authorization has been completed successfully."
	scope: ["VIEW_PROFILE"]
	state: undefined
	type: "success"
	userInfo: {
		avatar: "https://uploads.tikapi.io/avatars/c8f3f02070fc613e0b663b2d33b366f9.jpeg?v=1606338347"
		birthday: ""
		followers_count: 0
		followings_count: 0
		gender: 0
		id: "6845742198232105989"
		nickname: "user9155470419087"
		sec_user_id: "MS4wLjABAAAA77cXhkB15fV7rqAAMI0zGK_R1OaW8NjnVoO8ZIg8qfUm0d_XUs31QqEql3WVsDc8"
		user_verified: false
		username: "demoapi"
	}
}
```

Failure example
```javascript
{
	client_id: "c_1234567890"
	message: "Authorization has been canceled by user."
	type: "error"
}
```