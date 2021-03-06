// JavaScript Document
if (typeof( window['gjScripts'] ) == "undefined") {
	var scripts= document.getElementsByTagName('script');
	var JVERSION = scripts[scripts.length-1].src.split('.js?v=')[1];

	window.addEvent('domready', function() {
		gjScripts = new gjScripts();
	});

	var gjScripts = new Class({
		initialize: function () {
			var self = this;
			if (JVERSION>='3.0') {//J3+
				self.cleanEmptyControlGroups();
			}
			else {//2.5
				self.cleanEmptyLists();
			}
		},
		moveElementOneNodeUp: function  (element) {
			if (!element) {return;}
			var current = element;
			var levelUpOne = element.parentNode;
			var levelUpTwo = element.parentNode.parentNode;
			current.removeAttribute("style","");
			levelUpTwo.removeChild(levelUpOne);
			levelUpTwo.appendChild(current);

			return;
		},
		cleanEmptyControlGroups: function (element) {
			var self = this;
			var lists = document.getElements('div.control-group');
			Array.each(lists,function(list) {

				var lis = list.getChildren('div');

				Array.each(lis,function(el) {
					if(el.innerHTML.trim() == '') {el.parentNode.removeChild(el);}
				});
				var a = list.innerHTML.trim();
				a = a.replace(/\<!--(.*)-\>/gi, "").trim();

				if(a == '' ) {list.parentNode.removeChild(list);}
				//else if(list.textContent.trim() == '') {list.parentNode.removeChild(list);}
			});
		},
		cleanEmptyLists: function (element) {
			var lists = document.getElements('.pane-slider.content fieldset.panelform ul.adminformlist');
			Array.each(lists,function(list) {
				var lis = list.getChildren('li');
				Array.each(lis,function(li) {
					if(li.innerHTML.trim() == '') {li.parentNode.removeChild(li);}

				});
			});
		},
		/**
		* Getting the closest parent with the given tag name.
		*/
		getParentByTagName: function (obj, tag) {
			var self = this;
			var obj_parent = obj.parentNode;
			if (!obj_parent) return false;
			if (obj_parent.tagName.toLowerCase() == tag) return obj_parent;
			else {
					return self.getParentByTagName(obj_parent, tag);

				}
		},

	});

}
