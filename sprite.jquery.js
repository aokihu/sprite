/*
 * sprite.jquery.js
 * Just another jQuery plug
 * use to layout HTML like desktop application
 * 
 *  author: Hu. Jianan(aokihu)
 *   email: aokihu@gmail.com
 * version: $Id$
*/

(function($){
	$.fn.sprite = function(settings){
		
		/*
		 * set sprite
		 */
		var kConfig = {
			parent:null,	// the parent element
			top:null,			// top spacing size
			right:null,		// right spacing size
			bottom:null,		// bottom spacing size
			left:null,			// left spacing size
		};
		
		if(settings) $.extend(kConfig, settings);
		
		/*
		 * main function
		 */
		this.each(function(){
			
			var $this = $(this);
			var parent = !kConfig.parent ? this.offsetParent : kConfig.parent.indexOf("#") != -1 ?  document.getElementById(kConfig.parent.substr(1)) : document.getElementById(kConfig.parent);
			
			//console.log(parent);
			
			// 1. set the element position style to absolute
			$this.css("position","absolute");
			
			// 2. compute the position
			// 2.1 get parent size and position
			var parent_rect = getRect(parent);
			
			// 2.2 compute the current position an size
			var this_rect = getRect(this); 
			                               
			var computed_rect = {          
				// width					  
				w:(function(l,r){  
					
					var w = this_rect.w;   
					if(l != null && r !== null)
						w = parent_rect.w - l - r;
					return w;
					
				})(kConfig.left,kConfig.left),				
				//height
				h:(function(t,b){
					
					var h = this_rect.h;   
					if(t != null && b !== null)
						h = parent_rect.h - t - b;
					return h;
					
				})(kConfig.top,kConfig.bottom),
				//left
				x:(function(l,r){
					
					if(l == null && r == null)
						return this_rect.l;
					else if(l != null && r == null)
						return parent_rect.x + l;
					else if(l != null && r != null)
						return parent_rect.x + l;
					else
						return parent_rect.w - this_rect.w - r;
					
				})(kConfig.left,kConfig.right),
				//top
				y:(function(t,b){
					
					if(t == null && b == null)
						return this_rect.t;
					else if(t != null && b == null)
						return parent_rect.y + t;
					else if(t != null && b != null)
						return parent_rect.y + t;
					else
						return parent_rect.h - this_rect.h - b;
					
				})(kConfig.top,kConfig.bottom)
			}
			
			// 3. set the position	
			setRect(this, computed_rect);
			console.log(parent_rect);	
			console.log(computed_rect);

		});// @end this.each
		
		return this;
		
	}// @end $.fn.sprite
	
	/*
	 * @return {x,y,w,h}
	 */
	function getRect(element)
	{
		var x=y=w=h=0;
		w = element.offsetWidth;
		h = element.offsetHeight;
		x = element.offsetLeft;
		y = element.offsetTop;
		
		if(element.offsetParent)
		{
			element = element.offsetParent;
			x += element.offsetLeft;
			y += element.offsetTop;
		}
		
		return {x:x,y:y,w:w,h:h};
	}
	
	/*
	 * @param element
	 * @param {x,y,w,h}
	 */
	function setRect(element,rect)
	{
		element.style.width  = rect.w + "px";
		element.style.height = rect.h + "px";
		element.style.left   = rect.x + "px";
		element.style.top    = rect.y + "px";
	}
	
})(jQuery);