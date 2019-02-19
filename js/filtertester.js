//
// TODO: add titles for controls
// TODO: build default vals into control objects for filtersettings and bordersettings
// TODO: move image selection above settings text
// TODO: handle border radius vs border
//
const app = function () {		
	const page = {
		body: null,
    contents: null
	};

  const settings = {
    imageurls: [
      {url: "images/penguin.jpg", width: 100},
      { url: "images/mountain.jpg", width: 310},
      {url: "images/eiffeltower.jpg", width: 240}
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
    ], 
        
    bordersettings: [
      { 
        name: "border", 
        params: [
          {val: 1, suffix: "px", minval: 0, maxval: 10, title: "border width"},
            // need dropdown for "solid", dashed, etc.
          {val: "#000000", suffix: "", color: true, title: "border color"}
        ],                
      },
      
      {
        name: "radius",
        params: [
          {val: 0, suffix: "px", minval: 0, maxval: 20, title: "radius size"}
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
    page.contents.appendChild(_makeBorderTextContainer());
    
    page.contents.appendChild(_makeFilterContainer());
    page.contents.appendChild(_makeBorderContainer());

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
    
  function _makeFilterTextContainer() {
    var elemContainer = _makeDiv('filter-text-container', ['text-container']);
       
    var elemContainerTitle = _makeSpan('filter-text-container-title', ['text-container-title']);
    elemContainerTitle.innerHTML = 'filter settings: ';
    elemContainer.appendChild(elemContainerTitle);

    var elemContainerContents = _makeSpan('filter-text-container-contents', []);
    page.filtertext = elemContainerContents;
    elemContainer.appendChild(elemContainerContents);
    
    settings.filtertextcontainer = elemContainer;
   
    return elemContainer;
  }
    
  function _makeBorderTextContainer() {
    var elemContainer = _makeDiv('border-text-container', ["text-container"]);
       
    var elemContainerTitle = _makeSpan('border-text-container-title', ["text-container-title"]);
    elemContainerTitle.innerHTML = 'border settings: ';
    elemContainer.appendChild(elemContainerTitle);

    var elemContainerContents = _makeSpan('border-text-container-contents', []);
    page.bordertext = elemContainerContents;
    elemContainer.appendChild(elemContainerContents);
    
    settings.bordertextcontainer = elemContainer;
   
    return elemContainer;
  }  

  function _makeFilterContainer() {
    var elemContainer = _makeDiv('filter-container', []);
    
    var elemTitle = _makeSpan('filter-container-title', []);
    elemTitle.innerHTML = 'filters';
    elemContainer.appendChild(elemTitle);
    
    var elemDefaultsButton = _makeButton('btnFilterDefaults', ['control-button'], 'defaults', 'set filters to default values', _handleFilterDefaultsButton); 
    elemContainer.appendChild(elemDefaultsButton);    
    
    var elemTable = document.createElement('table');
    elemContainer.appendChild(elemTable);
    
    for (var i = 0; i < settings.filtersettings.length; i++) {
      elemTable.appendChild(_makeSelectionRow(settings.filtersettings[i], i, 'filter'));
      var params = settings.filtersettings[i].params;
    }

    return elemContainer;
  }
      
  function _makeBorderContainer() {
    var elemContainer = _makeDiv('border-container', []);
    
    var elemTitle = _makeSpan('border-container-title', []);
    elemTitle.innerHTML = 'borders';
    elemContainer.appendChild(elemTitle);
    
    var elemDefaultsButton = _makeButton('btnBorderDefaults', ['control-button'], 'defaults', 'set borders to default values', _handleBorderDefaultsButton); 
    elemContainer.appendChild(elemDefaultsButton);    
    
    var elemTable = document.createElement('table');
    elemContainer.appendChild(elemTable);
    
    for (var i = 0; i < settings.bordersettings.length; i++) {
      elemTable.appendChild(_makeSelectionRow(settings.bordersettings[i], i, 'border'));
      var params = settings.bordersettings[i].params;
    }
    
    return elemContainer;
  }  
  
  function _makeSelectionRow(setting, index, rowtype) {
    var elemRow = document.createElement('tr');
 
    var elemCell = document.createElement('td');
    if (rowtype == 'filter') {
      var elemCheckbox = _makeCheckbox('filter_select' + ('00' + index).slice(-2), ['filter-select'], 'filter', index);
      elemCheckbox.addEventListener('change', function(e) { _handleFilterSelection(e); });
    } else {
      var elemCheckbox = _makeCheckbox('border_select' + ('00' + index).slice(-2), ['border-select'], 'border', index);
      elemCheckbox.addEventListener('change', function(e) { _handleBorderSelection(e); });
    }
    elemCell.appendChild(elemCheckbox);
    
    var elemSpan = _makeSpan('', []);
    elemSpan.innerHTML = setting.name;
    elemCell.appendChild(elemSpan);
    elemRow.appendChild(elemCell);
    
    for (var i = 0; i < setting.params.length; i++) {
      var param = setting.params[i];
      elemCell = document.createElement('td');
      
      var idPrefix = 'filter_paramcontrol';
      if (rowtype == 'border') idPrefix = 'border_paramcontrol';
      var rId = idPrefix + ('00' + index).slice(-2) + '_' + ('00' + i).slice(-2);
      
      if (param.color) {
        var elemColor = _makeColorSelector(rId, [], param.title, rId, param.val);
        elemColor.oninput = function() { _handleColorChange(this); };
        if (rowtype == 'filter') {
          settings.filtersettings[index].params[i].controlElement = elemColor;
        } else {
          settings.bordersettings[index].params[i].controlElement = elemColor;
        }
        elemCell.appendChild(elemColor);
        
      } else {  
        var elemRange = _makeRange(rId, [], param.title  , param.minval, param.maxval, param.val);
        elemRange.oninput = function() { _handleRangeChange(this); };
        if (rowtype == 'filter') {
          settings.filtersettings[index].params[i].controlElement = elemRange;
        } else {
          settings.bordersettings[index].params[i].controlElement = elemRange;
        }
        elemCell.appendChild(elemRange);
      }

      elemRow.appendChild(elemCell);
    }    
    
    return elemRow;
  }  
  
  //---------------------------------------------------------------
  // image and filtering functions 
  //---------------------------------------------------------------
  function _loadImage(n) {
    page.imageelement.src = settings.imageurls[n].url;
    settings.filtertextcontainer.style.marginLeft = settings.imageurls[n].width + 'px';
    settings.bordertextcontainer.style.marginLeft = settings.imageurls[n].width + 'px';
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
  
  function _setDefaultBorderValues() {
    console.log('set default border values');
  }
  
  function _applySelections() {
    _applySelectedFilters();
    _applySelectedBorders();
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
  
  function _applySelectedBorders() {
    var borderString = '';
    var elems = document.getElementsByClassName('border-select');
    
    for (var i = 0; i < elems.length; i++) {
      if (elems[i].checked) {
        borderString += _buildBorderString(settings.bordersettings[i]) + ' ';
      }
    }
    
    if (borderString ==  '') {
      borderString = 'none';
    } else {
      borderString += 'solid';
    }
    page.bordertext.innerHTML = borderString;
    
    page.imageelement.style.border = borderString;
  }
  
  function _buildBorderString(borderSetting) {
    var borderString = '';
    var params = borderSetting.params;
    
    for (var i = 0; i < params.length; i++) {
      borderString += params[i].val + params[i].suffix + ' ';
    }
    
    return borderString;
  }  
  
	//------------------------------------------------------------------
	// handlers
	//------------------------------------------------------------------
  function _handleImageSelection(e) {
    _loadImage(e.target.value);
    _applySelections();
  }
  
  function _handleFilterSelection(e) {
    _applySelections();
  }
  
  function _handleBorderSelection(e) {
    _applySelections();
  }
  
  function _handleRangeChange(elem) {
    var indexInfo = elem.id.slice(-5);
    var filterIndex = indexInfo.slice(0,2) * 1;
    var paramIndex = indexInfo.slice(-2) * 1;

    if (elem.id.indexOf('filter') == 0) {
      settings.filtersettings[filterIndex].params[paramIndex].val = elem.value;
    } else {
      settings.bordersettings[filterIndex].params[paramIndex].val = elem.value;
    }
    _applySelections();
  }
  
  function _handleColorChange(elem) {
    console.log(elem.id + ' ' + elem.value);
    _handleRangeChange(elem);
  }
   
  function _handleFilterDefaultsButton() {
    _setDefaultFilterValues();
    _applySelections();
  }
  
  function _handleBorderDefaultsButton() {
    _setDefaultBorderValues();
    _applySelections();
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