"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Contact = /** @class */ (function () {
    function Contact(source) {
        if (source != null)
            Object.assign(this, source);
    }
    Object.defineProperty(Contact.prototype, "fullName", {
        get: function () { return this.lastName + ", " + this.firstName; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Contact.prototype, "label", {
        get: function () { return this.lastName.substring(0, 1) + this.firstName.substring(0, 1); },
        enumerable: true,
        configurable: true
    });
    return Contact;
}());
exports.Contact = Contact;
//# sourceMappingURL=contact.model.js.map