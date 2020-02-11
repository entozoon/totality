"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Totality = (function () {
    function Totality(props) {
        var _this = this;
        this.parseMoney = function (string) {
            return Number(string.replace(/[^0-9.-]+/g, ""));
        };
        this.humanMoney = function (number) {
            return "" + _this.currency + (Math.round(number * 100) / 100).toFixed(2);
        };
        this.subscriber = function (mutationEvents) {
            mutationEvents.forEach(function (m) {
                _this.update();
            });
        };
        this.update = function () {
            _this.calcTotal();
            _this.updateTotal(_this.total);
        };
        this.calcTotal = function () {
            if (_this.subTotals) {
                _this.total = 0;
                _this.subTotals.forEach(function (t) {
                    var subTotal = _this.parseMoney(t.innerHTML);
                    if (subTotal) {
                        _this.total += subTotal;
                    }
                });
            }
            return _this.total;
        };
        this.updateTotal = function (total) {
            _this.element.innerHTML = _this.humanMoney(total);
        };
        Object.assign(this, props);
        this.total = 0;
        var selector = this.element.getAttribute("data-totality");
        if (!selector) {
            return;
        }
        this.subTotals = document.querySelectorAll(selector);
        this.observer = new MutationObserver(this.subscriber);
        this.subTotals.forEach(function (s) {
            _this.observer.observe(s, {
                childList: true,
                subtree: true
            });
        });
        this.update();
    }
    return Totality;
}());
exports.Totality = Totality;
