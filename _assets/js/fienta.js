function d(e){debug&&console.log(e)}if(void 0===debug)var debug=!1;var piletimasin=piletimasin||{version:"2018-08-06",thirdPartyCookiesEnabled:!1,defaults:{link_selector:'a[href*="piletimasin.ee"], a[href*="fienta."]',ref:"homepage",background:"rgba(164, 58, 90, 0.5)",fienta_host:"https://fienta.com"},settings:{},is_ios:/(iPad|iPhone|iPod)/gi.test(navigator.userAgent)&&!window.MSStream,is_fb_app:navigator.userAgent.indexOf("FBAN")>-1||navigator.userAgent.indexOf("FBAV")>-1,is_safari:/^((?!chrome|android).)*safari/i.test(navigator.userAgent),fientaPopup:null,iframe_src:"",clickedEventURL:"",clickedEventPath:"",iframeLoadedPath:"",overflow_html:"",overflow_body:"",init:function(){d("init()"),window.jQuery?this.run():this.load_jquery()},run:function(){d("RUN"),piletimasin.compile_settings(),jQuery(document).ready(function(){piletimasin.append_iframe(),piletimasin.listen_messages(),piletimasin.thirdPartyCookieCheck(),piletimasin.set_click_handler(),piletimasin.openEmbed(),piletimasin.updateTicketsAvailable()})},load_jquery:function(){d("load_jquery()");var e=document.createElement("script");e.type="text/javascript",e.src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js",e.onload=piletimasin.run;var i=document.getElementsByTagName("head")[0];i.appendChild(e)},compile_settings:function(){d("compile_settings()"),this.settings=jQuery.extend({},piletimasin.defaults,window.piletimasinSettings,window.fientaSettings),d(this.settings)},queryString:function(e){if(d("init queryString("+e+")"),""==e)return{};for(var i={},t=0;t<e.length;++t){var n=e[t].split("=",2);i[n[0]]=2==n.length?decodeURIComponent(n[1].replace(/\+/g," ")):""}return d(i),i}(window.location.search.substr(1).split("&")),append_iframe:function(){var e={position:piletimasin.is_ios?"relative":"fixed",top:"0px",left:"0px",display:"block",margin:"0px",padding:"0px",border:"none",height:"100vh",width:"100vw","z-index":"2147483647",display:"none",background:piletimasin.settings.background};jQuery("<iframe>",{id:"piletimasin_iframe",frameborder:0}).css(e).appendTo("body")},thirdPartyCookieCheck:function(){return this.queryString.openEmbed?void d("thirdPartyCookieCheck: openEmbed present, skip check"):void(this.queryString.skipCookieCheck?(d("skipCookieCheck => dont check cookie in iframe"),this.thirdPartyCookiesEnabled=!0):(piletimasin.iframe_src=piletimasin.settings.fienta_host+"/cookie_set",d("thirdPartyCookieCheck: setting iframe src to: "+piletimasin.iframe_src),jQuery("#piletimasin_iframe").prop("src",piletimasin.iframe_src)))},set_click_handler:function(){jQuery("body").on("click",piletimasin.settings.link_selector,function(e){var i=jQuery(this).prop("href");d("parent clicked on: "+i),i&&(e.preventDefault(),piletimasin.open_in_iframe(i))})},open_in_iframe:function(e){d("open_in_iframe("+e+")");var i=piletimasin.parseURL(e);d("pathname: "+i.pathname);var t=i.pathname.replace(/^\/+/,"").replace(/\/+$/,"");if(d("path: "+t),!t)return d("klikk avalehel, avame tavaliselt"),location.href=e,!0;var n=i.hostname;n.indexOf("piletimasin.ee")!==-1&&(n=n.replace(/piletimasin.ee/gi,"fienta.com"),d("replaced hostname in clicked URL: "+i.hostname+" --> "+n)),d("protocol: "+i.protocol+", hostname: "+n+", path: "+t+", search: "+i.search);var a=t.split("/");return"cart"==a[a.length-1]&&(d("path removed: cart"),a.pop()),d("storing clickedEventPath: "+a.join("/")),piletimasin.clickedEventPath=a.join("/"),piletimasin.clickedEventURL=i.protocol+"//"+n+"/"+piletimasin.clickedEventPath+i.search,piletimasin.iframe_src=piletimasin.clickedEventURL+(i.search.length>0?"&":"?")+"embed=1"+(piletimasin.settings.ref?"&ref="+piletimasin.settings.ref:"")+(void 0!==piletimasin.settings.border_radius?"&border-radius="+piletimasin.settings.border_radius:""),piletimasin.is_ios?(d("iOS => redirect window instead of iframe"),location.href=piletimasin.iframe_src,!0):piletimasin.is_safari?(d("Safari => window.open popup instead of iframe"),(null===piletimasin.fientaPopup||piletimasin.fientaPopup.closed)&&(piletimasin.fientaPopup=this.openPopupCenter(piletimasin.iframe_src,"fientaPopup","768","700")),void piletimasin.fientaPopup.focus()):(this.thirdPartyCookiesEnabled||(d("thirdPartyCookies DISABLED, start handling it.."),d("1) open event in iframe+embedmode, add ?framebust=1 to trigger framebusting"),piletimasin.iframe_src+="&framebust=1"),void(piletimasin.clickedEventPath==piletimasin.iframeLoadedPath?(d('clickedEventPath "'+piletimasin.clickedEventPath+'" already loaded, show iframe'),document.getElementById("piletimasin_iframe").contentWindow.postMessage("init_back_handler","*"),piletimasin.iframe_show()):(d("replacing iframe location to: "+piletimasin.iframe_src),document.getElementById("piletimasin_iframe").contentWindow.location.replace(piletimasin.iframe_src),piletimasin.iframe_show())))},listen_messages:function(){window.addEventListener("message",function(e){var i=e.data.op?e.data.op:e.data;"hide_piletimasin_iframe"==i?piletimasin.iframe_hide(e.data.slug):"show_piletimasin_iframe"==i?piletimasin.iframe_show():"MM:3PCsupported"==i?(piletimasin.thirdPartyCookiesEnabled=!0,d("thirdPartyCookiesEnabled: true")):"MM:3PCunsupported"==i?(piletimasin.thirdPartyCookiesEnabled=!1,d("thirdPartyCookiesEnabled: false")):"iframe_loaded_path"==i&&void 0!==e.data.path?(d("storing iframeLoadedPath: "+e.data.path),piletimasin.iframeLoadedPath=e.data.path):d(void 0!==e.data.href?"got href: "+e.data.href:e.data)},!1)},openEmbed:function(){if("undefined"!=typeof this.queryString&&"undefined"!=typeof this.queryString.openEmbed){var e=this.queryString.openEmbed;d("openEmbed("+e+")"),piletimasin.open_in_iframe(e),delete this.queryString.openEmbed,delete this.queryString.skipCookieCheck;var i=[location.protocol,"//",location.host,location.pathname].join(""),t=jQuery.param(this.queryString);t.length>0&&(t="?"+t),d("removed openEmbed & skipCookieCheck fom url, new url for history.replaceState(): "+i+t),history.replaceState({},"",i+t)}},iframe_show:function(){this.overflow_html=jQuery("html").css("overflow"),this.overflow_body=jQuery("body").css("overflow"),jQuery("html,body").css("overflow","hidden"),this.is_ios&&jQuery("head").append('<style id="piletimasinCSS">body > *:not(#piletimasin-iframe) { display: none; } body {margin: 0; padding: 0;}</style>'),jQuery("#piletimasin_iframe").show()},iframe_hide:function(e){this.is_ios&&jQuery("#piletimasinCSS").remove(),jQuery("#piletimasin_iframe").hide(),jQuery("html").css("overflow",this.overflow_html),jQuery("body").css("overflow",this.overflow_body),this.updateTicketsAvailable(e)},updateTicketsAvailable:function(e){return"function"!=typeof piletimasin.settings.onTicketsAvailableReady?void d("onTicketsAvailableReady() not defined, skip API calls"):(d("updateTicketsAvailable("+e+")"),d("link_selector "+piletimasin.settings.link_selector+" elements found: "+jQuery(piletimasin.settings.link_selector).length),void jQuery(piletimasin.settings.link_selector).each(function(){var i,t=jQuery(this);if(void 0!==t.data("event")?i=t.data("event"):void 0!==t.prop("href")&&(i=piletimasin.parseEventURL(t.prop("href"),"slug")),i&&(!e||i==e)){var n=piletimasin.settings.fienta_host+"/api/v1/"+i+"/tickets-available";jQuery.get(n,function(e){d("api: "+n+" => "+e),t.data("tickets-available",e),piletimasin.settings.onTicketsAvailableReady(t,e)})}}))},update_tickets:function(e){d("update_tickets("+e+")");var i=this;jQuery(i.settings.tickets_available_selector).each(function(){var t=jQuery(this),n=t.data("event");if(n&&(!e||e==n)){var a=i.settings.fienta_host+"/api/"+n+"/tickets_available";jQuery.get(a,function(e){d("API url: "+a+": "+e),t.html(i.ticket_text(e)),e||i.disable_links_to(n)})}})},ticket_text:function(e){if(d("ticket_text("+e+")"),!this.settings.ticket_texts)return e.toString();for(var i=0;i<this.settings.ticket_texts.length;i++)if(element=this.settings.ticket_texts[i],e===!1&&element.value===!1||e===!0&&element.value===!0||e!==!0&&element.value!==!0&&element.value!==!1&&e<=element.value)return element.text.replace(/%count%/gi,e);return e.toString()},disable_links_to:function(e){d("piletimasin.disable_links_to("+e+")");var i=jQuery(this.settings.link_selector).filter('[href*="'+e+'"]').filter(function(){var i=piletimasin.parseURL(jQuery(this).prop("href")),t=i.pathname.replace(/^\/+/,"").replace(/\/+$/,""),n=t.split("/");return d('is "'+e+'" found in segments? '+JSON.stringify(n)+" => "+(jQuery.inArray(e,n)>=0?"Y":"N")),jQuery.inArray(e,n)>=0});i.length&&(jQuery.map(i,function(e){d("disabling: "+jQuery(e).prop("href"))}),this.settings.on_sale_closed(i))},parseURL:function(e){var i=document.createElement("a");return i.href=e,i},parseEventURL:function(e,i){var t=function(){};t("parseEventURL("+e+")");var n=piletimasin.parseURL(e);t("pathname: "+n.pathname);var a=n.pathname.replace(/^\/+/,"").replace(/\/+$/,"");if(t("path: "+a),!a)return t("empty path, no event url found"),!1;var r=n.hostname;r.indexOf("piletimasin.ee")!==-1&&(r=r.replace(/piletimasin.ee/gi,"fienta.com"),t("replaced hostname: "+n.hostname+" --> "+r));var s=a.split("/");"cart"==s[s.length-1]&&(t("path removed: cart"),s.pop());var a=s.join("/"),o=s[s.length-1];if("slug"==i)return o;var l=n.protocol+"//"+r+"/"+a+n.search;return t("parsed eventURL: "+l),l},openPopupCenter:function(e,i,t,n){var a=void 0!=window.screenLeft?window.screenLeft:screen.left,r=void 0!=window.screenTop?window.screenTop:screen.top,s=window.innerWidth?window.innerWidth:document.documentElement.clientWidth?document.documentElement.clientWidth:screen.width,o=window.innerHeight?window.innerHeight:document.documentElement.clientHeight?document.documentElement.clientHeight:screen.height,l=s/2-t/2+a,d=o/2-n/2+r,p=window.open(e,i,"resizable=yes, scrollbars=yes, width="+t+", height="+n+", top="+d+", left="+l);return window.focus&&p&&p.focus(),p}};piletimasin.init();