export function selectTab(tabId) {
    return {
        type: 'TAB_SELECTED',
        payload: tabId
    }
}

export function showTabs(...tabIds) {
    const tabsToShow = {}
    tabIds.forEach(e => tabsToShow[e] = true) 
    return {
        type: 'TAB_SHOWED',
        payload: tabsToShow
    }

    //OBS: tabsToShow é um objeto, mas podemos aplicar algum valor em forma de array. Por exemplo: ao fazer tabToShow['tabList'] = true, é a mesma coisa que fazer isso: tabToShow = { tabList: true }
}