import { SPHttpClient } from '@microsoft/sp-http';
var SharepointProvider = (function () {
    function SharepointProvider(_context) {
        this._webPartContext = _context;
        this._webAbsoluteUrl = _context.pageContext.web.absoluteUrl;
    }
    SharepointProvider.prototype.getAllLists = function () {
        var _items;
        return this._webPartContext.spHttpClient.get(this._webAbsoluteUrl + "/_api/web/lists", SPHttpClient.configurations.v1).then(function (response) {
            //If RESt API returns the value, send the json to then. Otherwise returns to catch
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            else {
                return Promise.reject(new Error(JSON.stringify(response)));
            }
        }).then(function (data) {
            //Add Each list to _items array from retrived json
            _items = [];
            if (data) {
                for (var i = 0; i < data.value.length; i++) {
                    var item = data.value[i];
                    var lst = {
                        CaseType: item.Title
                    };
                    _items.push(lst);
                }
            }
            return _items;
        }).catch(function (ex) {
            console.log("Error in retrieving List from site");
            throw ex;
        });
    };
    return SharepointProvider;
}());
export default SharepointProvider;
//# sourceMappingURL=Methods.js.map