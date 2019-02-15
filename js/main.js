//
//
const app = function () {		
	const page = {
		body: null,
		itemtree: null
	};
  
  const hierarchy = [
      {
        name: 'projectroot', id: 0,
        children: [
          { name: 'index.html', id: 1 },
          { name: 'otherpage.html', id: 2 },
          
          { 
            name: 'images', id: 30,
            children: [
              { name: 'mypony.png', id: 31 },
              { name: 'coolcar.jpg', id: 32 }
            ]
          },
            
          { 
            name: 'documents', id: 40,
            children: [
              { 
                name: 'news', id: 41,
                children: [
                  { name: 'fire.pdf', id: 411 },
                  { name: 'flood.pdf', id: 412 },
                  { name: 'tornado.pdf', id: 413 }
                ]
              },
              { 
                name: 'reports', id: 42,
                children: [
                  { name: 'monthly.pdf', id: 421 },
                  { name: 'yearly.pdf', id: 422 }
                ]
              },
            ]                    
          },
            
          { 
            name: 'css', id: 50,
            children: [
              { name: 'main.css', id: 51 },
              { name: 'secondary.css', id: 52}
            ]            
          }
        ]
      }
    ];
		
	//---------------------------------------
	// get things going
	//----------------------------------------
	function init () {
		page.body = document.getElementsByTagName('body')[0];
		page.itemtree = $('#tree1');
    	
		if (_initializeSettings()) {
      document.getElementById('test').addEventListener('click', doTest, false);
      _renderPage();
      _adjustH5Pstyle();
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
    $('#tree1').tree({data: hierarchy});
	}	
  
  function doTest() {
    _adjustH5Pstyle();
  }
  
  function iframeRef( frameRef ) {
    console.log(frameRef.id);
      return frameRef.contentWindow
          ? frameRef.contentWindow.document
          : frameRef.contentDocument
  }

  function _adjustH5Pstyle() {
    var inside = iframeRef( document.getElementById('iframeH5P') ); 
    /*
    var elemIframe = document.getElementById('iframeH5P');
    console.log('id=' + elemIframe.id);
    console.log(elemIframe.contenDocument);
    var y = (elemIframe.contentWindow || elemIframe.contentDocument);
    if (y.document)y = y.document;
    y.body.style.backgroundColor = "red";
    */
  }
  
	return {
		init: init
 	};
}();