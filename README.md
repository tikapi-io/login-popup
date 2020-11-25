# TikApi Login Javascript SDK
Once someone has clicked the Login button, and accepted the login dialog — completing the login flow — your app is given access to that account, you can use the access token to make API calls for that account.

##  Setup

Firstly, include the [tikapi sdk script](https://tikapi.io/assets/js/sdk.js) before the end of the html body.
```html
<script src="https://tikapi.io/assets/js/sdk.js"></script>
```

To display the login button you must add an element with class `tikapi` and you must set the `data-client_id` attribute (You can find your client id at [Developer Settings](https://tikapi.io/developer/settings)).


```html
<button class="tikapi" data-client_id="c_1234567890" data-scope="VIEW_PROFILE">
</button>
```

Or you can open the OAuth window directly by calling the function like this,
```javascript
TikApi.oauth({
	client_id: "c_1234567890",
	scope: 'VIEW_PROFILE',
});
```

Now you're all set, you can now listen to user login events and get the user info like this
```javascript
TikApi.onLogin(function(data){
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