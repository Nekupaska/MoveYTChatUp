// ==UserScript==
// @name         Move YT Chat Up
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Move YT Chat Up
// @author       Nekupaska
// @match        http://www.youtube.com/watch?*
// @match        https://www.youtube.com/watch?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

const chatLoadDelay=5000; //Delay after the chat box loads
//5000 is 5 seconds, 1000 is 1 second, so adjust accordingly to your needs

(function() {
    'use strict';
    try{
        function waitForElm(selector) {
            return new Promise(resolve => {
                if (document.querySelector(selector)) {
                    return resolve(document.querySelector(selector));
                }

                const observer = new MutationObserver(mutations => {
                    if (document.querySelector(selector)) {
                        resolve(document.querySelector(selector));
                        observer.disconnect();
                    }
                });

                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });
            });
        }
		
        waitForElm('#chatframe').then((elm) => {
            //console.log("chat iframe loaded");

            setTimeout(function() {

                console.log("chat input loaded");

                let iframedoc = document.getElementById("chatframe").contentDocument; //finds chat iframe
                //console.log(iframedoc);

                iframedoc.getElementById('chat-messages').prepend(
                    iframedoc.getElementById('panel-pages')
                ); //Moves the chat input to the start of the chat box
            }, chatLoadDelay);
            //});
        });
    }catch(error){
        console.log(error);
    }

})();