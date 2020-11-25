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
	userInfo: { ... }
	state: undefined
	type: "success"
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