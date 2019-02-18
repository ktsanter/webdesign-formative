//
//
const app = function () {		
	const page = {
		body: null,
	};

  const settings = {
    imageurls: [
      "images/penguin.jpg",
      "images/mountain.jpg",
      "images/eiffeltower.jpg"
    ]
  };

  //---------------------------------------
	// get things going
	//----------------------------------------
	function init () {
		page.body = document.getElementsByTagName('body')[0];
    page.imageelement = document.getElementById('image');
    page.imagebutton = [];
    for (var i = 0; i < 3; i++) {
      page.imagebutton.push(document.getElementById('image_select' + i));
    }
    	
		if (_initializeSettings()) {
      _renderPage();
      
		}
	}
	
	//-------------------------------------------------------------------------------------
	// query params:
	//-------------------------------------------------------------------------------------
	function _initializeSettings() {
		return true;
	}
	
	//-----------------------------------------------------------------------------
	// page rendering
	//-----------------------------------------------------------------------------
	function _renderPage() {
    for (var i = 0; i < page.imagebutton.length; i++) {
      page.imagebutton[i].addEventListener('change', function(e) {
        _handleImageSelection(e);
      });
    }
    page.imagebutton[0].click();
  }	
  
  function _loadImage(n) {
    page.imageelement.src = settings.imageurls[n];
  }
    
	//------------------------------------------------------------------
	// handlers
	//------------------------------------------------------------------
  function _handleImageSelection(e) {
    console.log('image selection: ' + e.target.value);
    _loadImage(e.target.value);
  }
  
	//------------------------------------------------------------------
	// utility functions
	//------------------------------------------------------------------
  
	//------------------------------------------------------------------
	// return for wrapper function
	//------------------------------------------------------------------
    
	return {
		init: init
 	};
}();