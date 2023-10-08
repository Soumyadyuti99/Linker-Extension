//console.log('Hi')

function processing_tabs(){
    
    this.processing_elements = {};
    
    this.processed_elements = [];
    let _linker_length = 0;
    Object.defineProperties(this.processed_elements.length,{
        get: function getterForProcessedElement(){
            return _linker_length;
        }
        ,
        set: function setterForProcessedElement(value){
            if(_linker_length>10){
                let sendToAPI = this.processed_elements.slice(0, 10)
                this.processed_elements = this.processed_elements.slice(10);
                
            }
        }
    })
    this.add_first = function(details){
        //add elements when the extension reloads
        //console.log(details)
        if(!details || !details.tab || !details.tabId){
            return;
        }
        let obj = {
            url: details.pending_url + details.url,
            timeStamp: details.timeStamp,
            id: details.tab.id,
            startTime: new Date().toLocaleDateString()
        };
        this.processing_elements[details.tab.id] = obj;
    }
    this.add = function(details){
        //console.log(details)
        if(!details || !details.tabId || (details.frameId != 0) ){

            return;
        }
        //console.log('22')
        //console.log(details)

        this.processed_elements[details.tabId] = {...this.processed_elements[details.tabId], completionTime: new Date().toLocaleDateString()}
        this.processed_elements.push(this.processed_elements[details.tabId]);
        delete this.processing_elements[details.tabId];
        
        let obj = {
            url: details.url,
            timeStamp: details.timeStamp,
            id: details.tabId,
            startTime: new Date().toLocaleDateString()
        }
        this.processing_elements[details.tabId] = obj
    }
    this.close = function(id){
        //console.log('30')
        
        this.processed_elements[id] = {...this.processed_elements[id], completionTime: new Date().toLocaleDateString()}
        this.processed_elements.push(this.processed_elements[id]);
        delete this.processing_elements[id]
    }

}
const pt = new processing_tabs();
chrome.windows.getAll((window) => {
    chrome.tabs.query({currentWindow: window.id},(details)=>{
        pt.add_first(details);
    })
})
chrome.webNavigation.onCompleted.addListener((details) => {
    pt.add(details);
});
chrome.tabs.onRemoved.addListener((tabId,details)=>{
    pt.close(tabId);
})
//console.log('57');