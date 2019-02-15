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
    $('#hierarchy').tree({data: hierarchy});
	}	

	return {
		init: init
 	};
}();