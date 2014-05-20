"use_strict";

startNavigationsMonitor();

function startNavigationsMonitor () {
	var currentTabUrl = null;
	var newLoadedUrl = null;

	var newTabsMap = {};
	var lastSetActiveTabId = null;

	chrome.tabs.onCreated.addListener(function (tab) {
		if(isServiseUrl(tab.url) == false) {
			newTabsMap[tab.id] = null;
			chrome.tabs.get(tab.openerTabId, function (openerTab) {
				newTabsMap[tab.id] = openerTab.url;
			});
		}
	});

	chrome.tabs.onActivated.addListener(function(activeInfo) {
		currentTabUrl = null;
		lastSetActiveTabId = activeInfo.tabId;
		chrome.tabs.get(lastSetActiveTabId, function (activatedTab) {
			if(typeof activatedTab.url != "undefined" && activatedTab.url != null && 
			   activatedTab.url !== "" && isServiseUrl(activatedTab.url) == false) 
			{
				currentTabUrl = activatedTab.url;
			}
		});
	});

	chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
		if(tabId == lastSetActiveTabId && currentTabUrl == null && changeInfo.status === "complete" && 
		   isServiseUrl(tab.url) == false && tab.url !== "")
		{
			currentTabUrl = tab.url;
		} else if(changeInfo.status === "complete" && isServiseUrl(tab.url) == false && tab.url !== "") {
			newLoadedUrl = tab.url;
			if(tab.id in newTabsMap) {
				handleNewTabCreation(tab.id);
			} else if(newLoadedUrl == currentTabUrl) {
				handleReloadPage();
			} else {
				handleNewPageOpened();			
			}
		}
	});

	function handleNewTabCreation(newTabId) {
		var openerTabUrl = newTabsMap[newTabId];
		if(openerTabUrl === newLoadedUrl) {
			logMsg("WARNING new tab url equals to openerTab url! Tree may be incorrect!");
		} else {
			chrome.history.getVisits({'url' : newLoadedUrl}, function (childVisitItems) {
				var i = childVisitItems.length - 1;
				if(i >= 0) {
					var newLoadedPageVisitId = childVisitItems[i].visitId;
					chrome.history.getVisits({'url' : openerTabUrl}, function (parentVisitItems) {
						var j = parentVisitItems.length - 1;
						if(j >= 0) {
							var parentVisitId = parentVisitItems[j].visitId;
							addToLocalStorage(newLoadedPageVisitId, parentVisitId);
						} else {
							logMsg("ERROR handleNewTabCreation: parentVisitItems list is empty");
						}
						removeTabIdFromMapIfNeeded(newTabId);
					});
				} else {
					logMsg("ERROR handleNewTabCreation: childVisitItems list is empty");
					removeTabIdFromMapIfNeeded(newTabId);
				}
			});
		}
	}

	function handleNewPageOpened() {
		chrome.history.getVisits({'url' : newLoadedUrl}, function (childVisitItems) {
			var i = childVisitItems.length - 1;
			if(i >= 0) {
				var newLoadedPageVisitId = childVisitItems[i].visitId;
				if(currentTabUrl != null) {
					chrome.history.getVisits({'url' : currentTabUrl}, function (parentVisitItems) {
						var j = parentVisitItems.length - 1;
						if(j >= 0) {
							var parentVisitId = parentVisitItems[j].visitId;
							addToLocalStorage(newLoadedPageVisitId, parentVisitId);
							currentTabUrl = newLoadedUrl;
						} else {
							logMsg("ERROR handleNewPageOpened: parentVisitItems list is empty, currentTabUrl: " + currentTabUrl);
						}
					});
				} else {
					addToLocalStorage(newLoadedPageVisitId, null);
					currentTabUrl = newLoadedUrl;
				}
			} else {
				logMsg("ERROR handleNewPageOpened: childVisitItems list is empty");
			}
		});
	}

	function handleReloadPage() {
		chrome.history.getVisits({ 'url' : newLoadedUrl }, function (newUrlVisitItems) {
			var i = newUrlVisitItems.length - 1;
			if(i < 1) {
				logMsg("ERROR handleReloadPage: newUrlVisitItems list size < 2");
			} else {
				var childPageVisitId = newUrlVisitItems[i].visitId;
				var parentPageVisitId = newUrlVisitItems[i - 1].visitId;
				addToLocalStorage(childPageVisitId, parentPageVisitId);
			}
		});
	}

	function addToLocalStorage(key, value) {
		window.localStorage[key] = value;
		logMsg("parent: " + currentTabUrl + " parentId: " + value + "\nchild: " + newLoadedUrl + " childId: " + key);
		logMsg(window.localStorage);
	}

	function logMsg (msg) {
		chrome.extension.getBackgroundPage().console.log(msg);
	}

	function isServiseUrl(url) {
		return url.indexOf("chrome://") != -1 || url.indexOf("chrome-devtools://") != -1;
	}

	function removeTabIdFromMapIfNeeded(tabId) {
		if(tabId in newTabsMap) {
			delete newTabsMap[tabId];
		}
	}
}