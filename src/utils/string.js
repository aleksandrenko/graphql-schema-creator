String.prototype.toCamelCase = function () {
    return this.replace(/\b(\w+)/g, function (m, p) {
        return p[0].toUpperCase() + p.substr(1).toLowerCase();
    });
};