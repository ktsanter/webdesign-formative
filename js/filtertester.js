//
// TODO: handle color selection
//
const app = function () {		
	const page = {
		body: null,
    contents: null
	};

  const settings = {
    imageurls: [
      {url: "images/penguin.jpg", width: 210},
      { url: "images/mountain.jpg", width: 400},
      {url: "images/eiffeltower.jpg", width: 310}
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
      { 
        name: "blur", 
        params: [
          {val: 3, suffix: "px", minval: 0, maxval: 20, title: "add title"}
        ] 
      },
      
      { 
        name: "hue-rotate", 
        params: [
          {val: 90, suffix: "deg", minval: 0, maxval: 360, title: "add title"}
        ]
      },
      
      { 
        name: "opacity", 
        params: [
          {val: 25, suffix: "%", minval: 0, maxval: 100, title: "add title"}
        ]
      },
      
      { 
        name: "brightness", 
        params: [
          {val: 50, suffix: "%", minval: 0, maxval: 200, title: "add title"}
        ]
      },
      
      { 
        name: "contrast", 
        params: [
          {val: 150, suffix: "%", minval: 0, maxval: 200, title: "add title"}
        ]
      },
      
      { 
        name: "saturate", 
        params: [
          {val: 50, suffix: "%", minval: 0, maxval: 200, title: "add title"}
        ]
      },
      
      {  
        name: "drop-shadow", 
        params: [
          {val: -5, suffix: "px", minval: -10, maxval: 10, title: "add title"}, 
          {val: -5, suffix: "px", minval: -10, maxval: 10, title: "add title"},
          {val: 5, suffix: "px", minval: -10, maxval: 10, title: "add title"},
          {val: "#000000", suffix: "", color: true, title: "add title"}
        ]
      },
      
      { 
        name: "grayscale", 
        params: [
          {val: 100, suffix: "%", minval: 0, maxval: 100, title: "add title"}
        ]
      },
      
      { 
        name: "invert", 
        params: [
          {val: 100, suffix: "%", minval: 0, maxval: 100, title: "add title"}
        ]
      },
      
      { 
        name: "sepia", 
        params: [
          {val: 100, suffix: "%", minval: 0, maxval: 100, title: "add title"}
        ]
      }
    ]
  };

  //---------------------------------------
	// get things going
	//----------------------------------------
	function init () {
		page.body = document.getElementsByTagName('body')[0];
    page.contents = document.getElementById('contents');
        
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
    page.contents.appendChild(_makeImageContainer());
    page.contents.appendChild(_makeFilterTextContainer());
    page.contents.appendChild(_makeFilterContainer());

    _setDefaultFilterValues();
    page.imagebutton[0].click();  // trigger loading of image
  }	
  
  function _makeImageContainer() {
    var elemContainer = _makeDiv('image-container', []);
    var elemDiv = _makeDiv('',[]);
    var elemImage = _makeImg('image', []);
    
    elemDiv.appendChild(elemImage);
    page.imageelement = elemImage; 
    elemContainer.appendChild(elemDiv);    
    
    elemDiv = _makeDiv('', []);
    page.imagebutton = [];
    for (var i = 0; i < 3; i++) {
      var id = 'image_select' + i;
      var elemLabel = _makeLabel('', ['image-select-label']);
      
      var elemRadio = _makeRadio(id, ['image-select'], 'image_select', i);
      elemRadio.addEventListener('change', function (e) { _handleImageSelection(e); });
      page.imagebutton.push(elemRadio);
      
      var elemSpan = _makeSpan('', []);
      elemSpan.innerHTML = 'image ' + (i + 1);
      elemLabel.appendChild(elemRadio);
      elemLabel.appendChild(elemSpan);
      elemDiv.appendChild(elemLabel);
    }
    elemContainer.appendChild(elemDiv);
    
    settings.imagecontainer = elemContainer;
        
    return elemContainer;
  }
    
  function _makeFilterContainer() {
    var elemContainer = _makeDiv('filter-container', []);
 
    var elemTable = document.createElement('table');
    elemContainer.appendChild(elemTable);
    
    for (var i = 0; i < settings.filtersettings.length; i++) {
      elemTable.appendChild(_makeFilterSelectionRow(settings.filtersettings[i], i));
      var params = settings.filtersettings[i].params;
    }
    
    var elemDefaultsButton = _makeButton('btnDefaults', ['control-button'], 'defaults', 'set filters to default values', _handleDefaultsButton); 
    elemContainer.appendChild(elemDefaultsButton);    

    return elemContainer;
  }

  function _makeFilterSelectionRow(filterSetting, index) {
    var elemRow = document.createElement('tr');
 
    var elemCell = document.createElement('td');
    var elemCheckbox = _makeCheckbox('filter_select' + ('00' + index).slice(-2), ['filter-select'], 'filter', index);
    elemCheckbox.addEventListener('change', function(e) { _handleFilterSelection(e); });
    elemCell.appendChild(elemCheckbox);
    
    var elemSpan = _makeSpan('', []);
    elemSpan.innerHTML = filterSetting.name;
    elemCell.appendChild(elemSpan);
    elemRow.appendChild(elemCell);
    
    for (var i = 0; i < filterSetting.params.length; i++) {
      var param = filterSetting.params[i];
      elemCell = document.createElement('td');
      var rId = 'filter_paramcontrol' + ('00' + index).slice(-2) + '_' + ('00' + i).slice(-2);
      if (param.color) {
        var elemColor = _makeColorSelector(rId, [], param.title, rId, param.val);
        elemColor.oninput = function() { _handleColorChange(this); };
        settings.filtersettings[index].params[i].controlElement = elemColor;
        elemCell.appendChild(elemColor);
        
      } else {  
        var elemRange = _makeRange(rId, [], param.title  , param.minval, param.maxval, param.val);
        elemRange.oninput = function() { _handleRangeChange(this); };
        settings.filtersettings[index].params[i].controlElement = elemRange;
        elemCell.appendChild(elemRange);
      }

      elemRow.appendChild(elemCell);
    }    
    
    return elemRow;
  }
  
  function _makeFilterTextContainer() {
    var elemContainer = _makeDiv('filter-text-container', []);
       
    var elemContainerTitle = _makeSpan('filter-text-container-title', []);
    elemContainerTitle.innerHTML = 'filter settings: ';
    elemContainer.appendChild(elemContainerTitle);

    var elemContainerContents = _makeSpan('filter-text-container-contents', []);
    page.filtertext = elemContainerContents;
    elemContainer.appendChild(elemContainerContents);
    
    settings.filtertextcontainer = elemContainer;
   
    return elemContainer;
  }
  
  //---------------------------------------------------------------
  // image and filtering functions 
  //---------------------------------------------------------------
  function _loadImage(n) {
    page.imageelement.src = settings.imageurls[n].url;
    settings.filtertextcontainer.style.marginLeft = settings.imageurls[n].width + 'px';
  }

  function _setDefaultFilterValues() {
    for (var i = 0; i < settings.filtersettings.length; i++) {
      var name = settings.filtersettings[i].name;
      var params = settings.filtersettings[i].params;
      switch (name) {
        case 'blur':
          params[0].val = 0;  // no blur
          break;
        case 'brightness':
          params[0].val = 100;  // no adjustment
          break;
        case 'contrast':
          params[0].val = 100;  // no adjustment
          break;
        case 'drop-shadow':
          params[0].val = 0;  // no horizontal shadow
          params[1].val = 0;  // no vertical shadow
          params[2].val = 0;  // no blur effect
          params[3].val = "#000000" // black
          break;
        case 'grayscale':
          params[0].val = 0;  // no effect
          break;
        case 'hue-rotate':
          params[0].val = 0;  // no effect
          break;
        case 'invert':
          params[0].val = 0; // no effect
          break;
        case 'opacity':
          params[0].val = 100; // no transparency
          break;
        case 'saturate':
          params[0].val = 100; // no effect
          break;
        case 'sepia':
          params[0].val = 0;  // no effect;
          break;
      }
      
      for (var j=0; j < params.length; j++) {
        params[j].controlElement.value = params[j].val;
      }
    }
  }
  
  function _applySelectedFilters() {
    var filterString = '';
    var elems = document.getElementsByClassName('filter-select');
    
    for (var i = 0; i < elems.length; i++) {
      if (elems[i].checked) {
        filterString += _buildFilterString(settings.filtersettings[i]) + ' ';
      }
    }
    
    if (filterString ==  '') filterString = 'initial';
    page.filtertext.innerHTML = filterString;
    
    page.imageelement.style.filter = filterString;
    page.imageelement.style.WebkitFilter = filterString;
  }
  
  function _buildFilterString(filterSetting) {
    var filterString = filterSetting.name;
    var params = filterSetting.params;
    
    filterString += '(';
    for (var i = 0; i < params.length; i++) {
      filterString += params[i].val + params[i].suffix + ' ';
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
  
  function _handleRangeChange(elem) {
    var indexInfo = elem.id.slice(-5);
    var filterIndex = indexInfo.slice(0,2) * 1;
    var paramIndex = indexInfo.slice(-2) * 1;
    settings.filtersettings[filterIndex].params[paramIndex].val = elem.value;
    _applySelectedFilters();
  }
  
  function _handleColorChange(elem) {
    _handleRangeChange(elem);
  }
   
  function _handleDefaultsButton() {
    _setDefaultFilterValues();
    _applySelectedFilters();
  }
  
	//------------------------------------------------------------------
	// utility functions
	//------------------------------------------------------------------
  
  function _makeDiv(id, classList) {
    var elemDiv = document.createElement('div');
    if (id && id != '') elemDiv.id = id;
    _addClassListToElement(elemDiv, classList);

    return elemDiv;
  }
  
  function _makeSpan(id, classList) {
    var elemSpan = document.createElement('span');
    if (id && id != '') elemSpan.id = id;
    _addClassListToElement(elemSpan, classList);
    
    return elemSpan;
  }

  function _makeImg(id, classList) {
    var elemImg = document.createElement('img');
    if (id && id != '') elemImg.id = id;
    _addClassListToElement(elemImg, classList);
    
    return elemImg;
  }

  function _makeLabel(id, classList) {
    var elemLabel = document.createElement('label');
    if (id && id != '') elemLabel.id = id;
    _addClassListToElement(elemLabel, classList);
    
    return elemLabel;
  }
  
  function _makeRadio(id, classList, name, value) {
    var elemRadio = document.createElement('input');
    if (id && id != '') elemRadio.id = id;
    _addClassListToElement(elemRadio, classList);
    elemRadio.type = 'radio';
    elemRadio.name = name;
    elemRadio.value = value;
    
    return elemRadio;
  }
  
  function _makeCheckbox(id, classList, name, value) {
    var elemCheckbox = document.createElement('input');
    if (id && id != '') elemCheckbox.id = id;
    _addClassListToElement(elemCheckbox, classList);
    elemCheckbox.type = 'checkbox';
    elemCheckbox.name = name;
    elemCheckbox.value = value;
    
    return elemCheckbox;
  }

  function _makeRange(id, classList, title, minval, maxval, value) {
    var elemRange = document.createElement('input');
    if (id && id != '') elemRange.id = id;
    _addClassListToElement(elemRange, classList);
    elemRange.type = 'range';
    elemRange.title = title;
    elemRange.min = minval;
    elemRange.max = maxval;
    elemRange.value = value;
    
    return elemRange;
  }
  
  function _makeColorSelector(id, classList, title, name, value) {
    var elemColor = document.createElement('input');
    if (id && id != '') elemColor.id = id;
    _addClassListToElement(elemColor, classList);
    elemColor.type = 'color';
    elemColor.title = title;
    elemColor.name = name;
    elemColor.value = value;
    
    return elemColor;
  }

  function _makeButton(id, classList, label, title, listener) {
		var btn = document.createElement('button');
		btn.id = id;
		_addClassListToElement(btn, classList)
		btn.innerHTML = label;
		btn.title = title;
		btn.addEventListener('click', listener, false);
		return btn;
	}
  
  function _addClassListToElement(elem, classList) {
    for (var i = 0; i < classList.length; i++) {
      elem.classList.add(classList[i]);
    }
  }

	//------------------------------------------------------------------
	// return for wrapper function
	//------------------------------------------------------------------
    
	return {
		init: init
 	};
}();