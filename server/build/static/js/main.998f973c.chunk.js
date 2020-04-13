(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{117:function(e,t,a){e.exports=a.p+"static/media/ff-logo.b514f7a5.svg"},284:function(e,t,a){e.exports=a(552)},415:function(e,t,a){e.exports=a.p+"static/media/eggs.0f62ec0d.jpg"},454:function(e,t,a){e.exports=a.p+"static/media/map.abe22478.png"},545:function(e){e.exports=JSON.parse("{}")},546:function(e,t,a){e.exports=a.p+"static/media/two-women.bf825e80.jpg"},548:function(e,t,a){},549:function(e,t,a){},550:function(e,t,a){},552:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(27),i=a.n(l),o=a(165),c=a(54),s=a(117),u=a.n(s),m=a(566),d=a(559),h=a(275),p=a(51),E=a(42),f=a(52),v=a(53),g=a(122),y=a(168),w=a(92),C={position:"absolute",width:"100vw",height:"385px"},b=function(e){Object(v.a)(a,e);var t=Object(f.a)(a);function a(e){var n;Object(p.a)(this,a);var r=(n=t.call(this,e)).props.initialCenter,l=r.lat,i=r.lng;return n.state={currentLocation:{lat:l,lng:i}},n}return Object(E.a)(a,[{key:"componentDidUpdate",value:function(e,t){e.google!==this.props.google&&this.loadMap(),t.currentLocation!==this.state.currentLocation&&this.recenterMap()}},{key:"recenterMap",value:function(){var e=this.map,t=this.state.currentLocation,a=this.props.google.maps;if(e){var n=new a.LatLng(t.lat,t.lng);e.panTo(n)}}},{key:"componentDidMount",value:function(){var e=this;this.props.centerAroundCurrentLocation&&navigator&&navigator.geolocation&&navigator.geolocation.getCurrentPosition((function(t){var a=t.coords;e.setState({currentLocation:{lat:a.latitude,lng:a.longitude}})})),this.loadMap()}},{key:"loadMap",value:function(){if(this.props&&this.props.google){var e=this.props.google.maps,t=this.refs.map,a=i.a.findDOMNode(t),n=this.props.zoom,r=this.state.currentLocation,l=r.lat,o=r.lng,c=new e.LatLng(l,o),s=Object.assign({},{center:c,zoom:n});this.map=new e.Map(a,s)}}},{key:"renderChildren",value:function(){var e=this,t=this.props.children;if(t)return r.a.Children.map(t,(function(t){if(t)return r.a.cloneElement(t,{map:e.map,google:e.props.google,mapCenter:e.state.currentLocation})}))}}]),Object(E.a)(a,[{key:"render",value:function(){var e=Object.assign({},C);return r.a.createElement("div",null,r.a.createElement("div",{style:e,ref:"map"},"Loading map..."),this.renderChildren())}}]),a}(r.a.Component),k=b;b.defaultProps={zoom:14,initialCenter:{lat:-1.2884,lng:36.8233},centerAroundCurrentLocation:!1,visible:!0};var M=a(560),O=a(565),j=a(567),L=a(44),S=a(562),R=a(553),W=a(563),A=a(564),I=(a(415),function(e){Object(v.a)(a,e);var t=Object(f.a)(a);function a(e){var n;return Object(p.a)(this,a),(n=t.call(this,e)).onMarkerClick=function(e,t,a){return n.setState({selectedPlace:e,activeMarker:t,showingInfoWindow:!0})},n.onClose=function(e){n.state.showingInfoWindow&&n.setState({showingInfoWindow:!1,activeMarker:null})},n.getRestaurants=function(e){fetch("/restaurants").then((function(e){return e.json()})).then((function(e){return n.setState({restaurants:e.data})})).catch((function(e){return console.error(e)}))},n.getHours=function(e){fetch("/hours").then((function(e){return e.json()})).then((function(e){return n.setState({hours:e.data})})).catch((function(e){return console.error(e)}))},n.state={restaurants:[],hours:[],search:"",showingInfoWindow:!1,activeMarker:{},selectedPlace:{}},n.searchHandler=n.searchHandler.bind(Object(g.a)(n)),n}return Object(E.a)(a,[{key:"componentDidMount",value:function(){this.getRestaurants(),this.getHours()}},{key:"searchHandler",value:function(e){this.setState({search:e.target.value});var t=new this.props.google.maps.LatLng({lat:parseFloat(this.state.restaurants.Latitude),lng:parseFloat(this.state.restaurants.Longitude)});(new this.props.google.maps).panTo(t)}},{key:"render",value:function(){var e=this;function t(e){return function(t){return t.Name.toLowerCase().includes(e.toLowerCase())||!e}}for(var a=new this.props.google.maps.LatLngBounds,n=0;n<this.state.restaurants.length;n++)a.extend({lat:parseFloat(this.state.restaurants.Latitude),lng:parseFloat(this.state.restaurants.Longitude)});return r.a.createElement("div",{id:"mainPage"},r.a.createElement("div",{id:"nav"},r.a.createElement(m.a,{fixed:"top",inverted:!0,id:"navBar"},r.a.createElement(d.a,null,r.a.createElement(h.a,{size:"mini",src:u.a,style:{marginRight:"1.5em"},id:"logo-image"}),r.a.createElement(M.a,{icon:"search",onChange:this.searchHandler,value:this.state.search,id:"search-bar"})))),r.a.createElement("div",{id:"map"},r.a.createElement(k,{centerAroundCurrentLocation:!0,google:this.props.google,bounds:a},r.a.createElement(w.Marker,{onClick:this.onMarkerClick,name:"current location"}),this.state.restaurants.filter(t(this.state.search)).map((function(t){return r.a.createElement(w.Marker,{onClick:e.onMarkerClick,key:t.RestrntID,name:t.Name,position:{lat:parseFloat(t.Latitude),lng:parseFloat(t.Longitude)}})})),r.a.createElement(w.InfoWindow,{marker:this.state.activeMarker,visible:this.state.showingInfoWindow,onClose:this.onClose},r.a.createElement("div",null,r.a.createElement("h4",null,this.state.selectedPlace.name))))),r.a.createElement("div",{id:"search-cards"},r.a.createElement("div",{id:"cards-outer"},r.a.createElement("div",{id:"cards"},this.state.restaurants.filter(t(this.state.search)).map((function(e){return r.a.createElement("div",{key:e.RestrntID,id:"card"},r.a.createElement(O.a.Content,{id:"cardSection1"},r.a.createElement(h.a,{id:"rImage",floated:"right",size:"medium",src:window.location.origin+"/images/"+e.RestrntID+".jpg",rounded:!0,width:"250px",height:"250px"})),r.a.createElement(O.a.Content,{id:"cardSection2"},r.a.createElement(j.a,{id:"cardHeader"},e.Name),r.a.createElement(O.a.Meta,null,r.a.createElement("span",null,"Takeout:"," ",r.a.createElement(L.a,{name:"Y"==e.OnlineOrders?"check":"close"})),r.a.createElement("span",null,"Delivery:"," ",r.a.createElement(L.a,{name:"Y"==e.DeliveryOrders?"check":"close"})),r.a.createElement("span",null,"Open Now: Y"))),r.a.createElement(O.a.Content,{id:"cardSection3"},r.a.createElement(y.Accordion,null,[1].map((function(t){return r.a.createElement(y.AccordionItem,{title:"More Information  \u2190",expanded:2===t},r.a.createElement("div",null,r.a.createElement(r.a.Fragment,null,r.a.createElement(S.a,{trigger:r.a.createElement(R.a,{basic:!0,fluid:!0},"Hours of Operation"),content:r.a.createElement(W.a,{basic:"very",celled:!0,collapsing:!0},r.a.createElement(W.a.Body,null,r.a.createElement(W.a.Row,null,r.a.createElement(W.a.Cell,null,"Mon: 11AM-10PM")),r.a.createElement(W.a.Row,null,r.a.createElement(W.a.Cell,null,"Tues: 11AM-10PM")),r.a.createElement(W.a.Row,null,r.a.createElement(W.a.Cell,null,"Wed: 11AM-10PM")),r.a.createElement(W.a.Row,null,r.a.createElement(W.a.Cell,null,"Thurs: 11AM-10PM")),r.a.createElement(W.a.Row,null,r.a.createElement(W.a.Cell,null,"Fri: 11AM-10PM")),r.a.createElement(W.a.Row,null,r.a.createElement(W.a.Cell,null,"Sat: 11AM-10PM")),r.a.createElement(W.a.Row,null,r.a.createElement(W.a.Cell,null,"Sun: 11AM-10PM")))),on:"click",wide:!0,hideOnScroll:!0,position:"right center"})),r.a.createElement(O.a.Description,null,r.a.createElement(R.a.Group,{fluid:!0},r.a.createElement("a",{href:e.DeliveryWebsite,id:"deliveryBtn"},r.a.createElement(R.a,{basic:!0,compact:!0,color:"orange",id:"deliveryBtn"},"Delivery")),r.a.createElement("a",{href:e.OrderWebsite,id:"takeoutBtn"},r.a.createElement(R.a,{basic:!0,compact:!0,color:"yellow",id:"takeoutBtn"},"Takeout")))),r.a.createElement(A.a,null,r.a.createElement(A.a.Item,{icon:"marker",content:e.Address+", "+e.City+", "+e.State+" "+e.Zipcode}))))})))),r.a.createElement(O.a.Content,{extra:!0,id:"cardSection4"},r.a.createElement("div",{className:"ui two buttons"},r.a.createElement("a",{href:"tel:"+e.Phone,className:"callBtn"},r.a.createElement(R.a,{color:"green",id:"call-btn",fluid:!0},r.a.createElement(L.a,{flipped:"horizontally",name:"call",id:"call"}))),r.a.createElement("a",{href:e.Website,className:"websiteBtn"},r.a.createElement(R.a,{color:"blue",id:"website-btn",fluid:!0,basic:!0},"Website")))))}))))))}}]),a}(n.Component)),z=Object(w.GoogleApiWrapper)({apiKey:"AIzaSyCjjSs6symeoHC50P2kpo-vWn2Pow0YvYI&"})(I),x=(a(454),a(455),a(545),function(e){Object(v.a)(a,e);var t=Object(f.a)(a);function a(){return Object(p.a)(this,a),t.apply(this,arguments)}return Object(E.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{id:"restaurant-list"},r.a.createElement(z,null))}}]),a}(n.Component)),P=(a(546),function(e){Object(v.a)(a,e);var t=Object(f.a)(a);function a(){var e;Object(p.a)(this,a);for(var n=arguments.length,l=new Array(n),i=0;i<n;i++)l[i]=arguments[i];return(e=t.call.apply(t,[this].concat(l))).state={restaurants:[],color:""},e.getRestaurants=function(t){fetch("/server").then((function(e){return e.json()})).then((function(t){return e.setState({restaurants:t.data})})).catch((function(e){return console.error(e)}))},e.renderRestaurant=function(t){var a=t.RestrntID,n=t.City;return r.a.createElement("div",{key:a,onLoad:e.colorChanger},r.a.createElement("a",{href:"/list"},r.a.createElement(R.a,{size:"massive"},n)))},e}return Object(E.a)(a,[{key:"componentDidMount",value:function(){this.getRestaurants()}},{key:"render",value:function(){var e=this.state.restaurants;return r.a.createElement("div",{id:"home"},r.a.createElement("header",null,r.a.createElement(j.a,{id:"main-header",as:"h1",textAlign:"right"},r.a.createElement("div",{id:"inner-header"},r.a.createElement(L.a,{name:"street view"}),r.a.createElement(j.a.Content,null,"Welcome to Fortisure Foods")))),r.a.createElement("h3",null,"This our site to show you our favorite restaurants"),r.a.createElement("p",null,"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto."),r.a.createElement("h3",null,"Find your City!"),r.a.createElement("div",{id:"cities"},r.a.createElement("div",null,r.a.createElement("a",{href:"/list",key:"1",onLoad:""},r.a.createElement(R.a,{size:"massive"},"Sample City"))),r.a.createElement("div",null,r.a.createElement("a",{href:"/list",key:"2"},r.a.createElement(R.a,{size:"massive"},"Sample City"))),r.a.createElement("div",null,r.a.createElement("a",{href:"/list",key:"3"},r.a.createElement(R.a,{size:"massive"},"Sample City"))),r.a.createElement("div",null,r.a.createElement("a",{href:"/list",key:"4"},r.a.createElement(R.a,{size:"massive"},"Sample City"))),r.a.createElement("div",null,r.a.createElement("a",{href:"/list"},r.a.createElement(R.a,{size:"massive"},"Sample City"))),r.a.createElement("div",null,r.a.createElement("a",{href:"/list"},r.a.createElement(R.a,{size:"massive"},"Sample City"))),r.a.createElement("div",null,r.a.createElement("a",{href:"/list"},r.a.createElement(R.a,{size:"massive"},"Sample City"))),r.a.createElement("div",null,r.a.createElement("a",{href:"/list"},r.a.createElement(R.a,{size:"massive"},"Sample City"))),r.a.createElement("div",null,r.a.createElement("a",{href:"/list"},r.a.createElement(R.a,{size:"massive"},"Sample City"))),e.map(this.renderRestaurant)))}}]),a}(n.Component)),D=a(568),F=function(){return r.a.createElement("div",{id:"footer"},r.a.createElement(D.a,{color:"black"},r.a.createElement("div",{id:"inner-footer"},r.a.createElement("h5",null,r.a.createElement("a",{href:"https://fortisureit.com/"},"Fortisure IT")),r.a.createElement("h5",null,r.a.createElement("a",{href:"https://fortisureit.com/#contact"},"Work With Us")),r.a.createElement("p",null,"Why we do it"),r.a.createElement("p",null,"\xa9 2020 fortisurefoods.com All Rights Reserved"))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(547),a(548),a(549),a(550);i.a.render(r.a.createElement(o.a,null,r.a.createElement("div",{id:"index"},r.a.createElement(c.c,null,r.a.createElement(c.a,{path:"/home",component:P,exact:!0}),r.a.createElement(c.a,{path:"/",component:x})),r.a.createElement(F,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[284,1,2]]]);
//# sourceMappingURL=main.998f973c.chunk.js.map