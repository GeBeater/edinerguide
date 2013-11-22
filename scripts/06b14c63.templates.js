Ember.TEMPLATES.application=Ember.Handlebars.template(function(a,b,c,d,e){this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var f,g,h="",i=this.escapeExpression;return e.buffer.push('<nav class="navbar navbar-fixed-top navbar-inverse" role="navigation">\n    <div class="container">\n        <div class="navbar-header">\n            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-ex1-collapse">\n                <span class="sr-only">Toggle navigation</span>\n                <span class="icon-bar"></span>\n                <span class="icon-bar"></span>\n                <span class="icon-bar"></span>\n            </button>\n            <a class="navbar-brand" href="index.html">eDinerGuide</a>\n        </div>\n\n        <!-- Collect the nav links, forms, and other content for toggling -->\n        <div class="collapse navbar-collapse navbar-ex1-collapse">\n            <ul class="nav navbar-nav">\n                <li><a href="#about">About</a></li>\n                <li><a href="#services">Services</a></li>\n                <li><a href="#contact">Contact</a></li>\n            </ul>\n        </div><!-- /.navbar-collapse -->\n    </div><!-- /.container -->\n</nav>\n\n<div class="header">\n\n    <div class="container">\n\n        <div class="row">\n            <div class="col-lg-12">\n                <!-- The background image is set in the custom CSS -->\n                <h1 class="tagline">An Informative Tagline Goes Here</h1>\n            </div>\n        </div>\n\n    </div>\n\n</div>\n\n<div class="container">\n\n    <hr>\n\n    '),f={},g={},e.buffer.push(i(c._triageMustache.call(b,"outlet",{hash:{},contexts:[b],types:["ID"],hashContexts:g,hashTypes:f,data:e}))),e.buffer.push('\n\n    <hr>\n\n    <footer>\n        <div class="row">\n            <div class="col-lg-12">\n                <p>Copyright &copy; Andreas, André and Bernd 2013</p>\n            </div>\n        </div>\n    </footer>\n\n</div>'),h}),Ember.TEMPLATES.index=Ember.Handlebars.template(function(a,b,c,d,e){this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var f,g,h,i,j="",k=this.escapeExpression,l=c.helperMissing;return e.buffer.push('<div class="row">\n    <div class="col-lg-6 col-sm-6">\n        <h2>Where are you?</h2>\n        <p>Do not waste your time for decisions.</p>\n        <p>latitude: '),g={},h={},e.buffer.push(k(c._triageMustache.call(b,"latitude",{hash:{},contexts:[b],types:["ID"],hashContexts:h,hashTypes:g,data:e}))),e.buffer.push("</p>\n        <p>longitude: "),g={},h={},e.buffer.push(k(c._triageMustache.call(b,"longitude",{hash:{},contexts:[b],types:["ID"],hashContexts:h,hashTypes:g,data:e}))),e.buffer.push('</p>\n        <form role="form" '),h={on:b},g={on:"STRING"},e.buffer.push(k(c.action.call(b,"submitLocation","location","false",{hash:{on:"submit"},contexts:[b,b,b],types:["STRING","ID","STRING"],hashContexts:h,hashTypes:g,data:e}))),e.buffer.push('>\n            <div class="form-group">\n                <label '),h={"for":b},g={"for":"STRING"},e.buffer.push(k(c.bindAttr.call(b,{hash:{"for":"view.locationTextField.elementId"},contexts:[],types:[],hashContexts:h,hashTypes:g,data:e}))),e.buffer.push(">Location</label>\n                "),h={valueBinding:b,viewName:b,classNames:b,placeholder:b},g={valueBinding:"STRING",viewName:"STRING",classNames:"STRING",placeholder:"STRING"},e.buffer.push(k(c.view.call(b,"Ember.TextField",{hash:{valueBinding:"location",viewName:"locationTextField",classNames:"form-control",placeholder:"Enter a city or zipcode"},contexts:[b],types:["ID"],hashContexts:h,hashTypes:g,data:e}))),e.buffer.push("\n            </div>\n            <a "),g={},h={},e.buffer.push(k(c.action.call(b,"detectPosition",{hash:{},contexts:[b],types:["STRING"],hashContexts:h,hashTypes:g,data:e}))),e.buffer.push(' role="button" class="btn btn-default">use current location</a>\n            <button type="button" class="btn btn-default" disabled="disabled">reset</button>\n            <button type="submit" class="btn btn-default">submit</button>\n        </form>\n    </div>\n    <div class="col-lg-6 col-sm-6">\n        '),g={},h={},i={hash:{},contexts:[b],types:["STRING"],hashContexts:h,hashTypes:g,data:e},e.buffer.push(k((f=c.render||b.render,f?f.call(b,"restaurant",i):l.call(b,"render","restaurant",i)))),e.buffer.push("\n    </div>\n</div>\n"),j}),Ember.TEMPLATES.restaurant=Ember.Handlebars.template(function(a,b,c,d,e){this.compilerInfo=[4,">= 1.0.0"],c=this.merge(c,Ember.Handlebars.helpers),e=e||{};var f,g,h="",i=this.escapeExpression;return e.buffer.push("<h3>Restaurant</h3>\n<p>"),f={},g={},e.buffer.push(i(c._triageMustache.call(b,"restaurant.categories.0.name",{hash:{},contexts:[b],types:["ID"],hashContexts:g,hashTypes:f,data:e}))),e.buffer.push("</p>\n<address>\n    <strong>"),f={},g={},e.buffer.push(i(c._triageMustache.call(b,"restaurant.name",{hash:{},contexts:[b],types:["ID"],hashContexts:g,hashTypes:f,data:e}))),e.buffer.push("</strong><br>\n    "),f={},g={},e.buffer.push(i(c._triageMustache.call(b,"restaurant.location.address",{hash:{},contexts:[b],types:["ID"],hashContexts:g,hashTypes:f,data:e}))),e.buffer.push("<br>\n    "),f={},g={},e.buffer.push(i(c._triageMustache.call(b,"restaurant.location.postalCode",{hash:{},contexts:[b],types:["ID"],hashContexts:g,hashTypes:f,data:e}))),e.buffer.push(" "),f={},g={},e.buffer.push(i(c._triageMustache.call(b,"restaurant.location.city",{hash:{},contexts:[b],types:["ID"],hashContexts:g,hashTypes:f,data:e}))),e.buffer.push("<br>\n    "),f={},g={},e.buffer.push(i(c._triageMustache.call(b,"restaurant.location.country",{hash:{},contexts:[b],types:["ID"],hashContexts:g,hashTypes:f,data:e}))),e.buffer.push('<br>\n</address>\n<address>\n    <abbr title="Phone">P:</abbr> '),f={},g={},e.buffer.push(i(c._triageMustache.call(b,"restaurant.contact.phone",{hash:{},contexts:[b],types:["ID"],hashContexts:g,hashTypes:f,data:e}))),e.buffer.push('<br>\n    <abbr title="Website">W:</abbr> <a '),g={href:b},f={href:"STRING"},e.buffer.push(i(c.bindAttr.call(b,{hash:{href:"restaurant.url"},contexts:[],types:[],hashContexts:g,hashTypes:f,data:e}))),e.buffer.push(' target="_blank">'),f={},g={},e.buffer.push(i(c._triageMustache.call(b,"restaurant.url",{hash:{},contexts:[b],types:["ID"],hashContexts:g,hashTypes:f,data:e}))),e.buffer.push("</a>\n</address>"),h});