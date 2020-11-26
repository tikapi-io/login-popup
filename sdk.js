"use strict";
window.TikApi = new function(){
	const config = {
		OAUTH_URL: 'https://tikapi.io/account/authorize',
		available_scopes:['VIEW_PROFILE','FOLLOW_ACTIONS','MEDIA_ACTIONS','SEARCH']
	};
	console.log(this);
	this.loginEvent = null;

	this.oauth = function(options){
		options = (options.constructor.name === "Object" || !(arguments.length > 1)) ?  {
			client_id: options.client_id,
			scope: options.scope,
		} : {
			client_id: arguments[0],
			scope: arguments[1],
		};
	
		options.client_id = function(client){
			if(!/^c_[a-zA-Z0-9]{10,}$/.test(client)){
				alert("The client id seems invalid.")
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
	
		var urlQuery = new URLSearchParams();
		for(var option in options){
			if(!options[option]){
				continue;
			}
			urlQuery.append(option,options[option]);
		}
	
		var url = `${config.OAUTH_URL}?${urlQuery.toString()}`;
		var left = (window.screen.width/2)-(500/2);
		var top = (window.screen.height/2)-(500/2);
		var child = window.open(url,"Login with TikTok",`toolbar=no, width=500, height=500, top=${top}, left=${left}`);
	
		return url;
	}


	//Oauth Event Function Setter
	this.onLogin = function(callback){
		this.loginEvent = callback;
	}

	//Oauth Event Handler
	window.addEventListener("message",(function(event){
		if(!event.data || !event.data._tikapi) return;
		if(typeof this.loginEvent === "function"){
			return this.loginEvent(event.data);
		}
	  }).bind(this), false);
  
	const oauther = this.oauth;
	this.Button = function(){
		const buttonId = ".tikapi";
		const css = `
			${buttonId}{
				border: none;
				cursor: pointer;
				padding: 15px 20px;
				border-radius: 0.25rem;
				background: linear-gradient(60deg, #361f4c 40%, #e072d0 41% 60%, #0ad6d6 61%);
				background-size: 100%;
				color: rgba(255,255,255,1);
				box-shadow: inset 6px -3px 12px rgba(0, 0, 0, 0.08), inset 12px -20px 20px 5px rgb(0 0 0 / 30%);
				font-weight: bold;
				text-shadow: 1px -1px 8px rgba(0,0,0,0.5);
			}
			${buttonId}:active{
				box-shadow: inset 6px -3px 20px 14px rgba(0, 0, 0, 0.12), inset 12px -20px 20px 5px rgba(0,0,0,0.3);
			}
		`;
		
		const handleButton = function(e){
			if(!e.target.dataset || !e.target.dataset.client_id){
				throw new Error("You must include data-client_id and data-scope.");
			}
			return oauther({
				client_id: e.target.dataset.client_id,
				scope: e.target.dataset.scope,
			});
		}
	
		const insertStyle = function(){
			return document.head.insertAdjacentHTML("beforeend",`<style>${css}</style>`);
		}();
	
		window.addEventListener('load',function(){
			var button = document.querySelector(buttonId);
			if (!button) return;
			button.innerHTML = "Continue with TikTok";
			return button.addEventListener('click',handleButton);
		});
	}();

	return this;

}();