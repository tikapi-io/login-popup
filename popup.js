"use strict";
window.TikAPI = new function(){
	const config = {
		OAUTH_URL: 'https://tikapi.io/account/authorize',
		available_scopes:['VIEW_PROFILE','FOLLOW_ACTIONS','MEDIA_ACTIONS','VIEW_MESSAGES','EDIT_PROFILE', 'SEARCH', 'SEND_MESSAGES', 'LIVE']
	};

	this.callback = null;

	this.popup = function(options){

		if(!options){
			throw new Error("The client id is required.");
		}

		options = (options.constructor.name === "Object" || !(arguments.length > 1)) ?  {
			client_id: options.client_id,
			scope: options.scope,
			url: arguments[2]
		} : {
			client_id: arguments[0],
			scope: arguments[1],
			url: e.url
		};
	
		options.client_id = function(client){
			if(!/^c_[a-zA-Z0-9]{10,}$/.test(client)){
				throw new Error("The client id seems invalid.");
			}
			return client;
		}(options.client_id);
	
		options.scope = function(scopes){
			if(!scopes || scopes == ""){
				return false;
			}
			scopes = (typeof scopes === "string") ? decodeURIComponent(scopes).split(" ") : scopes;
		
		 	if(!scopes || !Array.isArray(scopes) || scopes.length == 0){
				alert("A valid scope array is required.")
				throw new Error("Invalid scopes");
			}
		
			var validScopes = scopes.map(function(s){
				if(!s || typeof s !== "string" || !config.available_scopes.includes(s.trim().toUpperCase())){ return false}
				return s.trim().toUpperCase();
			}).filter(function(s){
				return s;
			});
		
		
			if(validScopes.length !== scopes.length){
				alert("Some scopes are invalid.")
				throw new Error("Some scopes are invalid");
			}
			return validScopes;
		
		}(options.scope);
		
		options.is_popup = true;


		var urlQuery = new URLSearchParams();
		for(var option in options){
			if(!options[option]){
				continue;
			}
			urlQuery.append(option,options[option]);
		}
	
		var url = `${options.url || config.OAUTH_URL}?${urlQuery.toString()}`;
		var left = (window.screen.width/2)-(500/2);
		var top = (window.screen.height/2)-(500/2);
		var child = window.open(url,"Login with TikTok",`toolbar=no, width=500, height=500, top=${top}, left=${left}`);
	
		return url;
	}

	//Oauth Event Function Setter
	this.onLogin = function(callback){
		this.callback = callback;
	}

	//Oauth Event Handler
	window.addEventListener("message",(function(event){
		if(!event.data || !event.data._tikapi) return;
		if(typeof this.callback === "function"){
			return this.callback(event.data);
		}
	  }).bind(this), false);
  
	
	return this;

}();