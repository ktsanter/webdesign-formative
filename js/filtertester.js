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
    ],
    
    filterclasses: [
      "filter-blur",
      "filter-hue-rotate",
      "filter-opacity",
      "filter-brightness",
      "filter-contrast",
      "filter-saturate",
      "filter-drop-shadow",
      "filter-grayscale",
      "filter-invert",
      "filter-sepia"
    ],
    
    filtersettings: [
      { name: "blur", params: ["3px"] },
      { name: "hue-rotate", params: ["90deg"]},
      { name: "opacity", params: ["25%"]},
      { name: "brightness", params: ["50%"]},
      { name: "contrast", params: ["150%"]},
      { name: "saturate", params: ["50%"]},
      { name: "drop-shadow", params: ["-5px", "-5px", "5px", "#000000"]},
      { name: "grayscale", params: ["100%"]},
      { name: "invert", params: ["100%"]},
      { name: "sepia", params: ["100%"]}
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

    for (var i = 0; i < settings.filterclasses.length; i++) {
      var elemFilterSelect = document.getElementById('filter_select' + ('00' + i).slice(-2));
      elemFilterSelect.addEventListener('change', function(e) {
        _handleFilterSelection(e);
      });
    }
  }	
  
  function _loadImage(n) {
    page.imageelement.src = settings.imageurls[n];
  }

  function _applySelectedFilters() {
    var filterString = '';
    var elems = document.getElementsByClassName('filter-select');
    
    for (var i = 0; i < elems.length; i++) {
      if (elems[i].checked) {
        filterString += _buildFilterString(settings.filtersettings[i]) + ' ';
      }
    }
    
    if (filterString ==  '') filterString = 'none';
    console.log('final filter string=' + filterString);
    
    page.imageelement.style.filter = filterString;
    page.imageelement.style.WebkitFilter = filterString;
  }
  
  function _buildFilterString(filterSetting) {
    var filterString = filterSetting.name;
    var params = filterSetting.params;
    
    filterString += '(';
    for (var i = 0; i < params.length; i++) {
      filterString += params[i] + ' ';
    }
    filterString += ')'
    
    return filterString;
  }
  
	//------------------------------------------------------------------
	// handlers
	//------------------------------------------------------------------
  function _handleImageSelection(e) {
    _loadImage(e.target.value);
    _applySelectedFilters();
  }
  
  function _handleFilterSelection(e) {
    _applySelectedFilters();
  }
  
	//------------------------------------------------------------------
	// utility functions
	//------------------------------------------------------------------
  
  function _addClass(elem, className) {
    console.log('adding ' + className);
    elem.classList.add(className);
  }
  
  function _removeClass(elem, className) {
    console.log('removing ' + className);
    if (elem.classList.contains(className)) {
      elem.classList.remove(className);
    }
  }
  
	//------------------------------------------------------------------
	// return for wrapper function
	//------------------------------------------------------------------
    
	return {
		init: init
 	};
}();