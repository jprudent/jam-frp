
!function(){var a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W=[].slice,X={}.hasOwnProperty,Y=function(a,b){function c(){this.constructor=a}for(var d in b)X.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a},Z=function(a,b){return function(){return a.apply(b,arguments)}};a={},a.fromBinder=function(b,c){return null==c&&(c=S.id),new h(function(d){var e;return e=b(function(){var b,f,h,i,j,k;for(b=1<=arguments.length?W.call(arguments,0):[],i=c.apply(null,b),i instanceof Array&&S.last(i)instanceof g||(i=[i]),h=a.more,j=0,k=i.length;k>j;j++)if(f=i[j],h=d(f=M(f)),h===a.noMore||f.isEnd())return null!=e?e():a.scheduler.setTimeout(function(){return e()},0),h;return h})})},a.$={asEventStream:function(b,c,d){var e,f=this;return A(c)&&(e=[c,null],d=e[0],c=e[1]),a.fromBinder(function(a){return f.on(b,c,a),function(){return f.off(b,c,a)}},d)}},null!=(T="undefined"!=typeof jQuery&&null!==jQuery?jQuery:"undefined"!=typeof Zepto&&null!==Zepto?Zepto:null)&&(T.fn.asEventStream=a.$.asEventStream),a.fromEventTarget=function(b,c,d){var e,f,g,h,i,j;return e=null!=(g=b.addEventListener)?g:null!=(h=b.addListener)?h:b.bind,f=null!=(i=b.removeEventListener)?i:null!=(j=b.removeListener)?j:b.unbind,a.fromBinder(function(a){return e.call(b,c,a),function(){return f.call(b,c,a)}},d)},a.fromPromise=function(b,c){return a.fromBinder(function(a){return b.then(a,function(b){return a(new f(b))}),function(){return c?"function"==typeof b.abort?b.abort():void 0:void 0}},function(a){return[a,v()]})},a.noMore=["<no-more>"],a.more=["<more>"],a.later=function(b,c){return a.sequentially(b,[c])},a.sequentially=function(b,c){var d;return d=0,a.fromPoll(b,function(){var a;return a=c[d++],d<c.length?a:d===c.length?[a,v()]:v()})},a.repeatedly=function(b,c){var d;return d=0,a.fromPoll(b,function(){return c[d++%c.length]})},R=function(a){return function(){var b,c,d,e;return d=arguments[0],b=2<=arguments.length?W.call(arguments,1):[],"object"==typeof d&&b.length&&(c=d,e=b[0],d=function(){return c[e].apply(c,arguments)},b=b.slice(1)),a.apply(null,[d].concat(W.call(b)))}},C=function(b){return R(function(){var c,d,e;return d=arguments[0],c=2<=arguments.length?W.call(arguments,1):[],e=J(b,[function(a,b){return d.apply(null,W.call(a).concat([b]))}]),a.combineAsArray(c).flatMap(e)})},a.fromCallback=C(function(){var b,c;return c=arguments[0],b=2<=arguments.length?W.call(arguments,1):[],a.fromBinder(function(a){return D(c,b)(a),I},function(a){return[a,v()]})}),a.fromNodeCallback=C(function(){var b,c;return c=arguments[0],b=2<=arguments.length?W.call(arguments,1):[],a.fromBinder(function(a){return D(c,b)(a),I},function(a,b){return a?[new f(a),v()]:[b,v()]})}),a.fromPoll=function(b,c){return a.fromBinder(function(c){var d;return d=a.scheduler.setInterval(c,b),function(){return a.scheduler.clearInterval(d)}},c)},a.interval=function(b,c){return null==c&&(c={}),a.fromPoll(b,function(){return H(c)})},a.constant=function(a){return new m(K([a],y),!0)},a.never=function(){return a.fromArray([])},a.once=function(b){return a.fromArray([b])},a.fromArray=function(a){return new h(K(a,M))},K=function(a,b){return function(c){var d,e,f;for(e=0,f=a.length;f>e;e++)d=a[e],c(b(d));return c(v()),I}},a.mergeAll=function(){var b;return b=1<=arguments.length?W.call(arguments,0):[],b[0]instanceof Array&&(b=b[0]),S.fold(b,a.never(),function(a,b){return a.merge(b)})},a.zipAsArray=function(){var b;return b=1<=arguments.length?W.call(arguments,0):[],b[0]instanceof Array&&(b=b[0]),a.zipWith(b,function(){var a;return a=1<=arguments.length?W.call(arguments,0):[]})},a.zipWith=function(){var b,c,d;return b=arguments[0],c=2<=arguments.length?W.call(arguments,1):[],A(b)||(d=[b,c[0]],c=d[0],b=d[1]),a.when(c,b)},a.combineAsArray=function(){var b,c,d,e,f,g,h;for(f=1<=arguments.length?W.call(arguments,0):[],1===f.length&&f[0]instanceof Array&&(f=f[0]),b=g=0,h=f.length;h>g;b=++g)e=f[b],e instanceof l||(f[b]=a.constant(e));return f.length?(d=function(){var a,b,d;for(d=[],a=0,b=f.length;b>a;a++)c=f[a],d.push(new q(c,!0,!1,c.subscribeInternal));return d}(),a.when(d,function(){var a;return a=1<=arguments.length?W.call(arguments,0):[]}).toProperty()):a.constant([])},a.onValues=function(){var b,c,d;return c=2<=arguments.length?W.call(arguments,0,d=arguments.length-1):(d=0,[]),b=arguments[d++],a.combineAsArray(c).onValues(b)},a.combineWith=function(){var b,c;return b=arguments[0],c=2<=arguments.length?W.call(arguments,1):[],a.combineAsArray(c).map(function(a){return b.apply(null,a)})},a.combineTemplate=function(b){var c,d,e,f,g,h,i,j,k,m;return i=[],m=[],h=function(a){return a[a.length-1]},k=function(a,b,c){return h(a)[b]=c},c=function(a,b){return function(c,d){return k(c,a,d[b])}},g=function(a,b){return function(c){return k(c,a,b)}},j=function(a){return a instanceof Array?[]:{}},e=function(a,b){var d,e;return b instanceof l?(m.push(b),i.push(c(a,m.length-1))):b===Object(b)&&"function"!=typeof b?(e=function(a){return function(c){var d;return d=j(b),k(c,a,d),c.push(d)}},d=function(a){return a.pop()},i.push(e(a)),f(b),i.push(d)):i.push(g(a,b))},f=function(a){return S.each(a,e)},f(b),d=function(a){var c,d,e,f,g;for(e=j(b),c=[e],f=0,g=i.length;g>f;f++)d=i[f],d(c,a);return e},a.combineAsArray(m).map(d)},g=function(){function a(){}return a.prototype.isEvent=function(){return!0},a.prototype.isEnd=function(){return!1},a.prototype.isInitial=function(){return!1},a.prototype.isNext=function(){return!1},a.prototype.isError=function(){return!1},a.prototype.hasValue=function(){return!1},a.prototype.filter=function(){return!0},a}(),j=function(a){function b(a){this.value=A(a)?S.cached(a):S.always(a)}return Y(b,a),b.prototype.isNext=function(){return!0},b.prototype.hasValue=function(){return!0},b.prototype.fmap=function(a){var b=this;return this.apply(function(){return a(b.value())})},b.prototype.apply=function(a){return new b(a)},b.prototype.filter=function(a){return a(this.value())},b.prototype.describe=function(){return this.value()},b}(g),i=function(a){function b(){return U=b.__super__.constructor.apply(this,arguments)}return Y(b,a),b.prototype.isInitial=function(){return!0},b.prototype.isNext=function(){return!1},b.prototype.apply=function(a){return new b(a)},b.prototype.toNext=function(){return new j(this.value)},b}(j),e=function(a){function b(){return V=b.__super__.constructor.apply(this,arguments)}return Y(b,a),b.prototype.isEnd=function(){return!0},b.prototype.fmap=function(){return this},b.prototype.apply=function(){return this},b.prototype.describe=function(){return"<end>"},b}(g),f=function(a){function b(a){this.error=a}return Y(b,a),b.prototype.isError=function(){return!0},b.prototype.fmap=function(){return this},b.prototype.apply=function(){return this},b.prototype.describe=function(){return"<error> "+this.error},b}(g),l=function(){function b(){this.combine=Z(this.combine,this),this.flatMapLatest=Z(this.flatMapLatest,this),this.fold=Z(this.fold,this),this.scan=Z(this.scan,this),this.assign=this.onValue}return b.prototype.onValue=function(){var a;return a=E(arguments),this.subscribe(function(b){return b.hasValue()?a(b.value()):void 0})},b.prototype.onValues=function(a){return this.onValue(function(b){return a.apply(null,b)})},b.prototype.onError=function(){var a;return a=E(arguments),this.subscribe(function(b){return b.isError()?a(b.error):void 0})},b.prototype.onEnd=function(){var a;return a=E(arguments),this.subscribe(function(b){return b.isEnd()?a():void 0})},b.prototype.errors=function(){return this.filter(function(){return!1})},b.prototype.filter=function(){var b,c;return c=arguments[0],b=2<=arguments.length?W.call(arguments,1):[],u(this,c,b,function(b){return this.withHandler(function(c){return c.filter(b)?this.push(c):a.more})})},b.prototype.takeWhile=function(){var b,c;return c=arguments[0],b=2<=arguments.length?W.call(arguments,1):[],u(this,c,b,function(b){return this.withHandler(function(c){return c.filter(b)?this.push(c):(this.push(v()),a.noMore)})})},b.prototype.endOnError=function(){var a,b;return b=arguments[0],a=2<=arguments.length?W.call(arguments,1):[],null==b&&(b=!0),u(this,b,a,function(a){return this.withHandler(function(b){return b.isError()&&a(b.error)?(this.push(b),this.push(v())):this.push(b)})})},b.prototype.take=function(b){return 0>=b?a.never():this.withHandler(function(c){return c.hasValue()?(b--,b>0?this.push(c):(0===b&&this.push(c),this.push(v()),a.noMore)):this.push(c)})},b.prototype.map=function(){var a,b;return b=arguments[0],a=2<=arguments.length?W.call(arguments,1):[],b instanceof m?b.sampledBy(this,w):u(this,b,a,function(a){return this.withHandler(function(b){return this.push(b.fmap(a))})})},b.prototype.mapError=function(){var a;return a=E(arguments),this.withHandler(function(b){return b.isError()?this.push(H(a(b.error))):this.push(b)})},b.prototype.mapEnd=function(){var b;return b=E(arguments),this.withHandler(function(c){return c.isEnd()?(this.push(H(b(c))),this.push(v()),a.noMore):this.push(c)})},b.prototype.doAction=function(){var a;return a=E(arguments),this.withHandler(function(b){return b.hasValue()&&a(b.value()),this.push(b)})},b.prototype.skip=function(b){return this.withHandler(function(c){return c.hasValue()?b>0?(b--,a.more):this.push(c):this.push(c)})},b.prototype.skipDuplicates=function(a){return null==a&&(a=function(a,b){return a===b}),this.withStateMachine(k,function(b,c){return c.hasValue()?c.isInitial()||b===k||!a(b.get(),c.value())?[new p(c.value()),[c]]:[b,[]]:[b,[c]]})},b.prototype.skipErrors=function(){return this.withHandler(function(b){return b.isError()?a.more:this.push(b)})},b.prototype.withStateMachine=function(b,c){var d;return d=b,this.withHandler(function(b){var e,f,g,h,i,j,k;for(e=c(d,b),f=e[0],h=e[1],d=f,i=a.more,j=0,k=h.length;k>j;j++)if(g=h[j],i=this.push(g),i===a.noMore)return i;return i})},b.prototype.scan=function(b,c,d){var e,f,g,h=this;return f=L(c),c=d?f:function(a,b){return f(a(),b())},e=P(b).map(function(a){return S.always(a)}),g=function(b){var d,f,g,j;return d=!1,j=I,f=a.more,g=function(){return d?void 0:(d=!0,e.forEach(function(c){return f=b(new i(c)),f===a.noMore?(j(),j=I):void 0}))},j=h.subscribe(function(h){var i,j;return h.hasValue()?d&&h.isInitial()?a.more:(h.isInitial()||g(),d=!0,j=e.getOrElse(function(){return void 0}),i=S.cached(function(){return c(j,h.value)}),e=new p(i),b(h.apply(i))):(h.isEnd()&&(f=g()),f!==a.noMore?b(h):void 0)}),g(),j},new m(g)},b.prototype.fold=function(a,b){return this.scan(a,b).sampledBy(this.filter(!1).mapEnd().toProperty())},b.prototype.zip=function(b,c){return null==c&&(c=Array),a.zipWith([this,b],c)},b.prototype.diff=function(a,b){return b=L(b),this.scan([a],function(a,c){return[c,b(a[0],c)]}).filter(function(a){return 2===a.length}).map(function(a){return a[1]})},b.prototype.flatMap=function(d,e){var f;return d=G(d),f=this,new h(function(g){var h,j;return j=new c,h=function(a){return a(),j.empty()?g(v()):void 0},j.add(function(c,k){return f.subscribe(function(c){var f;return c.isEnd()?h(k):c.isError()?g(c):e&&j.count()>1?a.more:j.unsubscribed?a.noMore:(f=d(c.value()),f instanceof b||(f=a.once(f)),j.add(function(b,c){return f.subscribe(function(d){var e;return d.isEnd()?(h(c),a.noMore):(d instanceof i&&(d=d.toNext()),e=g(d),e===a.noMore&&b(),e)})}))})}),j.unsubscribe})},b.prototype.flatMapFirst=function(a){return this.flatMap(a,!0)},b.prototype.flatMapLatest=function(a){var b;return a=G(a),b=this.toEventStream(),b.flatMap(function(c){return a(c).takeUntil(b)})},b.prototype.not=function(){return this.map(function(a){return!a})},b.prototype.log=function(){var a;return a=1<=arguments.length?W.call(arguments,0):[],this.subscribe(function(b){return"undefined"!=typeof console&&null!==console?"function"==typeof console.log?console.log.apply(console,W.call(a).concat([b.describe()])):void 0:void 0}),this},b.prototype.slidingWindow=function(a,b){return null==b&&(b=0),this.scan([],function(b,c){return b.concat([c]).slice(-a)}).filter(function(a){return a.length>=b})},b.prototype.combine=function(b,c){var d;return d=L(c),a.combineAsArray(this,b).map(function(a){return d(a[0],a[1])})},b.prototype.decode=function(b){return this.combine(a.combineTemplate(b),function(a,b){return b[a]})},b.prototype.awaiting=function(a){return this.toEventStream().map(!0).merge(a.toEventStream().map(!1)).toProperty(!1)},b}(),l.prototype.reduce=l.prototype.fold,h=function(b){function c(a){this.takeUntil=Z(this.takeUntil,this),this.sampledBy=Z(this.sampledBy,this);var b;c.__super__.constructor.call(this),b=new d(a),this.subscribe=b.subscribe,this.subscribeInternal=this.subscribe,this.hasSubscribers=b.hasSubscribers}return Y(c,b),c.prototype.delay=function(b){return this.flatMap(function(c){return a.later(b,c)})},c.prototype.debounce=function(b){return this.flatMapLatest(function(c){return a.later(b,c)})},c.prototype.debounceImmediate=function(b){return this.flatMapFirst(function(c){return a.once(c).concat(a.later(b).filter(!1))})},c.prototype.throttle=function(a){return this.bufferWithTime(a).map(function(a){return a[a.length-1]})},c.prototype.bufferWithTime=function(a){return this.bufferWithTimeOrCount(a,Number.MAX_VALUE)},c.prototype.bufferWithCount=function(a){return this.bufferWithTimeOrCount(void 0,a)},c.prototype.bufferWithTimeOrCount=function(a,b){var c;return c=function(c){return c.values.length===b?c.flush():void 0!==a?c.schedule():void 0},this.buffer(a,c,c)},c.prototype.buffer=function(b,c,d){var e,f,g;return null==c&&(c=function(){}),null==d&&(d=function(){}),e={scheduled:!1,end:null,values:[],flush:function(){var b;if(this.scheduled=!1,this.values.length>0){if(b=this.push(H(this.values)),this.values=[],null!=this.end)return this.push(this.end);if(b!==a.noMore)return d(this)}else if(null!=this.end)return this.push(this.end)},schedule:function(){var a=this;return this.scheduled?void 0:(this.scheduled=!0,b(function(){return a.flush()}))}},g=a.more,A(b)||(f=b,b=function(b){return a.scheduler.setTimeout(b,f)}),this.withHandler(function(a){return e.push=this.push,a.isError()?g=this.push(a):a.isEnd()?(e.end=a,e.scheduled||e.flush()):(e.values.push(a.value()),c(e)),g})},c.prototype.merge=function(b){var d;return d=this,new c(function(c){var e,f;return e=0,f=function(b){return function(d){return b.subscribe(function(b){var f;return b.isEnd()?(e++,2===e?c(v()):a.more):(f=c(b),f===a.noMore&&d(),f)})}},t(f(d),f(b))})},c.prototype.toProperty=function(a){return 0===arguments.length&&(a=k),this.scan(a,B,!0)},c.prototype.toEventStream=function(){return this},c.prototype.sampledBy=function(a,b){return this.toProperty().sampledBy(a,b)},c.prototype.concat=function(a){var b;return b=this,new c(function(c){var d;return d=b.subscribe(function(b){return b.isEnd()?d=a.subscribe(c):c(b)}),function(){return d()}})},c.prototype.takeUntil=function(b){var d;return d=this,new c(function(c){var e,f;return f=function(d){return b.onValue(function(){return c(v()),d(),a.noMore})},e=function(b){return d.subscribe(function(d){var e;return e=c(d),(d.isEnd()||e===a.noMore)&&b(),e})},t(f,e)})},c.prototype.skipUntil=function(a){var b;return b=a.take(1).map(!0).toProperty(!1),this.filter(b)},c.prototype.skipWhile=function(){var b,c,d;return c=arguments[0],b=2<=arguments.length?W.call(arguments,1):[],d=!1,u(this,c,b,function(b){return this.withHandler(function(c){return!d&&c.hasValue()&&b(c.value())?a.more:(c.hasValue()&&(d=!0),this.push(c))})})},c.prototype.startWith=function(b){return a.once(b).concat(this)},c.prototype.withHandler=function(a){var b;return b=new d(this.subscribe,a),new c(b.subscribe)},c.prototype.withSubscribe=function(a){return new c(a)},c}(l),m=function(b){function c(b,d){this.toEventStream=Z(this.toEventStream,this),this.toProperty=Z(this.toProperty,this),this.changes=Z(this.changes,this),this.sample=Z(this.sample,this);var e=this;c.__super__.constructor.call(this),this.subscribeInternal=d===!0?b:new n(b,d).subscribe,this.sampledBy=function(b,d){var f,g,h,i;return null!=d?d=L(d):(f=!0,d=function(a){return a()}),i=new q(e,!1,!1,e.subscribeInternal,f),g=new q(b,!0,!1,b.subscribe,f),h=a.when([i,g],d),b instanceof c?h.toProperty():h},this.subscribe=function(b){var c,d,f,g,h;return f=a.more,c=function(){function c(){}return c.prototype.set=function(a){return this.event=a},c.prototype.send=function(){var c;return c=this.event,this.event=null,null!=c&&f!==a.noMore&&(f=b(c),f===a.noMore)?g():void 0},c}(),h=new c,d=new c,g=I,g=e.subscribeInternal(function(c){return c.isError()?f!==a.noMore&&(f=b(c)):(c.hasValue()?h.set(c):c.isEnd()&&d.set(c),o.onDone(function(){return h.send(),d.send()})),f}),function(){return f=a.noMore,g()}}}return Y(c,b),c.prototype.sample=function(b){return this.sampledBy(a.interval(b,{}))},c.prototype.changes=function(){var a=this;return new h(function(b){return a.subscribe(function(a){return a.isInitial()?void 0:b(a)})})},c.prototype.withHandler=function(a){return new c(this.subscribeInternal,a)},c.prototype.withSubscribe=function(a){return new c(a)},c.prototype.toProperty=function(){return this},c.prototype.toEventStream=function(){var a=this;return new h(function(b){return a.subscribe(function(a){return a.isInitial()&&(a=a.toNext()),b(a)})})},c.prototype.and=function(a){return this.combine(a,function(a,b){return a&&b})},c.prototype.or=function(a){return this.combine(a,function(a,b){return a||b})},c.prototype.delay=function(a){return this.delayChanges(function(b){return b.delay(a)})},c.prototype.debounce=function(a){return this.delayChanges(function(b){return b.debounce(a)})},c.prototype.throttle=function(a){return this.delayChanges(function(b){return b.throttle(a)})},c.prototype.delayChanges=function(a){return r(this,a(this.changes()))},c.prototype.takeUntil=function(a){var b;return b=this.changes().takeUntil(a),r(this,b)},c.prototype.startWith=function(a){return this.scan(a,function(a,b){return b})},c}(l),u=function(a,b,c,d){var e;return b instanceof m?(e=b.sampledBy(a,function(a,b){return[a,b]}),d.apply(e,[function(a){var b,c;return b=a[0],c=a[1],b}]).map(function(a){var b,c;return b=a[0],c=a[1]})):(b=D(b,c),d.apply(a,[b]))},r=function(b,c){var d;return d=function(b){var c;return c=k,b.subscribe(function(b){return b.hasValue()&&(c=new p(b.value())),a.noMore}),c},c.toProperty(d(b))},d=function(){function b(b,c){var d,e,f,g,h,i,j,k,l,m=this;null==b&&(b=function(){return I}),j=[],h=null,g=!1,e=!1,this.hasSubscribers=function(){return j.length>0},f=null,k=I,i=function(a){return j=S.without(a,j)},l=null,d=function(){var a,b,c,d,e;if(null!=l){for(b=l,l=null,e=[],c=0,d=b.length;d>c;c++)a=b[c],e.push(a());return e}},this.push=function(b){var c,e,k,l,n,o;if(g)return h=(h||[]).concat([b]),a.more;if(b!==f){b.isError()&&(f=b),k=!1;try{for(g=!0,l=j,n=0,o=l.length;o>n;n++)e=l[n],c=e.sink(b),(c===a.noMore||b.isEnd())&&i(e);k=!0}finally{g=!1,k||(h=null)}for(k=!0;null!=h?h.length:void 0;)b=S.head(h),h=S.tail(h),m.push(b);return d(b),m.hasSubscribers()?a.more:a.noMore}},null==c&&(c=function(a){return this.push(a)}),this.handleEvent=function(a){return a.isEnd()&&(e=!0),c.apply(m,[a])},this.subscribe=function(a){var c;return e?(a(v()),I):(c={sink:a},j=j.concat(c),1===j.length&&(k=b(m.handleEvent)),function(){return i(c),m.hasSubscribers()?void 0:k()})}}return b}(),n=function(b){function c(b,d){var e,f,g,h=this;c.__super__.constructor.call(this,b,d),e=k,g=this.push,b=this.subscribe,f=!1,this.push=function(a){return a.isEnd()&&(f=!0),a.hasValue()&&(e=new p(a.value)),o.inTransaction(function(){return g.apply(h,[a])})},this.subscribe=function(c){var d,g,i;return d=!1,i=function(){return h.hasSubscribers()||f},g=e.filter(i).map(function(a){return c(y(a()))}),g.getOrElse(a.more)===a.noMore?I:f?(c(v()),I):b.apply(h,[c])}}return Y(c,b),c}(d),o=function(){var a,b,c,d;return d=[],c=!1,b=function(a){return c?d.push(a):a()},a=function(a){var b,e,f,g,h;if(c)return a();c=!0;try{f=a()}finally{c=!1}for(e=d,d=[],g=0,h=e.length;h>g;g++)b=e[g],b();return f},{onDone:b,inTransaction:a}}(),b=function(b){function c(){var b,d,e,g,h,i,j,k;e=void 0,i=[],b=!1,d=function(b){return function(c){return c.isEnd()?(k(b),a.noMore):e(c)}},j=function(){var a,b,c,d;for(d=[],b=0,c=i.length;c>b;b++)a=i[b],d.push("function"==typeof a.unsub?a.unsub():void 0);return d},h=function(a){return a.unsub=a.input.subscribe(d(a.input))},k=function(a){var b,c,d,e;for(b=d=0,e=i.length;e>d;b=++d)if(c=i[b],c.input===a)return"function"==typeof c.unsub&&c.unsub(),i.splice(b,1),void 0},g=function(a){var b,c,d,f;for(e=a,f=s(i),c=0,d=f.length;d>c;c++)b=f[c],h(b);return j},c.__super__.constructor.call(this,g),this.plug=function(a){var c;if(!b)return c={input:a},i.push(c),null!=e&&h(c),function(){return k(a)}},this.push=function(a){return"function"==typeof e?e(H(a)):void 0},this.error=function(a){return"function"==typeof e?e(new f(a)):void 0},this.end=function(){return b=!0,j(),"function"==typeof e?e(v()):void 0}}return Y(c,b),c}(h),q=function(){function a(a,b,c,d,e){var f,g;this.sync=b,this.subscribe=d,null==e&&(e=!1),g=[],f=e?S.id:function(a){return a()},null==this.subscribe&&(this.subscribe=a.subscribe),this.markEnded=function(){return this.ended=!0},c?(this.consume=function(){return f(g.shift())},this.push=function(a){return g.push(a)},this.mayHave=function(a){return!this.ended||g.length>=a},this.hasAtLeast=function(a){return g.length>=a}):(this.consume=function(){return f(g[0])},this.push=function(a){return g=[a]},this.mayHave=function(){return!0},this.hasAtLeast=function(){return g.length})}return a}(),q.fromObservable=function(a){return a instanceof q?a:a instanceof m?new q(a,!1,!1):new q(a,!0,!0)},a.when=function(){var b,c,d,e,f,g,i,j,k,l,m,n,o,p,r,s,u;if(k=1<=arguments.length?W.call(arguments,0):[],0===k.length)return a.never();for(f=k.length,n="when: expecting arguments in the form (Observable+,function)+",m=[],j=[],c=0;f>c;){for(i=S.toArray(k[c]),b=k[c+1],g={f:A(b)?b:function(){return b},ixs:[]},o=0,r=i.length;r>o;o++){for(l=i[o],d=m.indexOf(l),0>d&&(m.push(l),d=m.length-1),u=g.ixs,p=0,s=u.length;s>p;p++)e=u[p],e.index===d&&e.count++;g.ixs.push({index:d,count:1})}i.length>0&&j.push(g),c+=2}return m.length?(m=S.map(q.fromObservable,m),new h(function(b){var d,e,f,g;return f=function(a){return S.all(a.ixs,function(a){return m[a.index].hasAtLeast(a.count)})},e=function(a){return!a.sync||a.ended},d=function(a){return S.any(a.ixs,function(a){return!m[a.index].mayHave(a.count)})},g=function(g){return function(h){return g.subscribe(function(i){var k,l,n,o,p;if(i.isEnd())g.markEnded(),(S.all(m,e)||S.all(j,d))&&(l=a.noMore,b(v()));else if(i.isError())l=b(i);else if(g.push(i.value),g.sync)for(o=0,p=j.length;p>o;o++)if(k=j[o],f(k)){n=function(){return k.f.apply(k,function(){var a,b,d,e;for(d=k.ixs,e=[],a=0,b=d.length;b>a;a++)c=d[a],e.push(m[c.index].consume());return e}())},l=b(i.apply(n));break}return l===a.noMore&&h(),l||a.more})}},t.apply(null,function(){var a,b,d;for(d=[],c=a=0,b=m.length;b>a;c=++a)l=m[c],d.push(g(l,c));return d}())})):a.never()},a.update=function(){var b,c,d,e;for(c=arguments[0],e=2<=arguments.length?W.call(arguments,1):[],d=function(a){return function(){var b;return b=1<=arguments.length?W.call(arguments,0):[],function(c){return a.apply(null,[c].concat(b))}}},b=e.length-1;b>0;)e[b]instanceof Function||(e[b]=function(a){return function(){return a}}(e[b])),e[b]=d(e[b]),b-=2;return a.when.apply(a,e).scan(c,function(a,b){return b(a)})},t=function(){var a;return a=1<=arguments.length?W.call(arguments,0):[],new c(a).unsubscribe},c=function(){function a(a){var b,c,d;for(null==a&&(a=[]),this.empty=Z(this.empty,this),this.count=Z(this.count,this),this.unsubscribe=Z(this.unsubscribe,this),this.add=Z(this.add,this),this.unsubscribed=!1,this.subscriptions=[],this.starting=[],c=0,d=a.length;d>c;c++)b=a[c],this.add(b)}return a.prototype.add=function(a){var b,c,d,e=this;if(!this.unsubscribed)return b=!1,c=I,this.starting.push(a),d=function(){return e.unsubscribed?void 0:(c(),b=!0,e.remove(c),S.remove(a,e.starting))},c=a(this.unsubscribe,d),this.unsubscribed||b||this.subscriptions.push(c),S.remove(a,this.starting),c},a.prototype.remove=function(a){return this.unsubscribed?void 0:S.remove(a,this.subscriptions)},a.prototype.unsubscribe=function(){var a,b,c,d;if(!this.unsubscribed){for(this.unsubscribed=!0,d=this.subscriptions,b=0,c=d.length;c>b;b++)a=d[b],a();return this.subscriptions=[],this.starting=[]}},a.prototype.count=function(){return this.unsubscribed?0:this.subscriptions.length+this.starting.length},a.prototype.empty=function(){return 0===this.count()},a}(),p=function(){function a(a){this.value=a}return a.prototype.getOrElse=function(){return this.value},a.prototype.get=function(){return this.value},a.prototype.filter=function(b){return b(this.value)?new a(this.value):k},a.prototype.map=function(b){return new a(b(this.value))},a.prototype.forEach=function(a){return a(this.value)},a.prototype.isDefined=!0,a.prototype.toArray=function(){return[this.value]},a}(),k={getOrElse:function(a){return a},filter:function(){return k},map:function(){return k},forEach:function(){},isDefined:!1,toArray:function(){return[]}},a.EventStream=h,a.Property=m,a.Observable=l,a.Bus=b,a.Initial=i,a.Next=j,a.End=e,a.Error=f,I=function(){},B=function(a,b){return b()},w=function(a){return a},y=function(a){return new i(S.always(a))},H=function(a){return new j(S.always(a))},v=function(){return new e},M=function(a){return a instanceof g?a:H(a)},s=function(a){return a.slice(0)},x=Array.prototype.indexOf?function(a,b){return a.indexOf(b)}:function(a,b){var c,d,e,f;for(c=e=0,f=a.length;f>e;c=++e)if(d=a[c],b===d)return c;return-1},A=function(a){return"function"==typeof a},J=function(a,b){return function(){var c;return c=1<=arguments.length?W.call(arguments,0):[],a.apply(null,b.concat(c))}},G=function(a){return a instanceof l&&(a=S.always(a)),a},E=function(a){return a=Array.prototype.slice.call(a),F.apply(null,a)},F=R(function(){var a,b;return b=arguments[0],a=2<=arguments.length?W.call(arguments,1):[],A(b)?a.length?J(b,a):b:z(b)?N(b,a):S.always(b)}),D=function(a,b){return F.apply(null,[a].concat(W.call(b)))},z=function(a){return"string"==typeof a&&a.length>1&&"."===a.charAt(0)},a.isFieldKey=z,N=function(a,b){var c,d;return d=a.slice(1).split("."),c=S.map(Q(b),d),function(b){var d,e;for(d=0,e=c.length;e>d;d++)a=c[d],b=a(b);return b}},Q=function(a){return function(b){return function(c){var d;return null==c?void 0:(d=c[b],A(d)?d.apply(c,a):d)}}},O=function(a){return a.slice(1)},L=function(a){var b;return A(a)?a:z(a)?(b=O(a),function(a,c){return a[b](c)}):void 0},P=function(a){return a instanceof p||a===k?a:new p(a)},S={head:function(a){return a[0]},always:function(a){return function(){return a}},negate:function(a){return function(b){return!a(b)}},empty:function(a){return 0===a.length},tail:function(a){return a.slice(1,a.length)},filter:function(a,b){var c,d,e,f;for(c=[],e=0,f=b.length;f>e;e++)d=b[e],a(d)&&c.push(d);return c},map:function(a,b){var c,d,e,f;for(f=[],d=0,e=b.length;e>d;d++)c=b[d],f.push(a(c));return f},each:function(a,b){var c,d,e;e=[];for(c in a)d=a[c],e.push(b(c,d));return e},toArray:function(a){return a instanceof Array?a:[a]},contains:function(a,b){return-1!==x(a,b)},id:function(a){return a},last:function(a){return a[a.length-1]},all:function(a,b){var c,d,e;for(null==b&&(b=S.id),d=0,e=a.length;e>d;d++)if(c=a[d],!b(c))return!1;return!0},any:function(a,b){var c,d,e;for(null==b&&(b=S.id),d=0,e=a.length;e>d;d++)if(c=a[d],b(c))return!0;return!1},without:function(a,b){return S.filter(function(b){return b!==a},b)},remove:function(a,b){var c;return c=x(b,a),c>=0?b.splice(c,1):void 0},fold:function(a,b,c){var d,e,f;for(e=0,f=a.length;f>e;e++)d=a[e],b=c(b,d);return b},cached:function(a){var b;return b=k,function(){return b===k&&(b=a(),a=null),b}}},a._=S,a.scheduler={setTimeout:function(a,b){return setTimeout(a,b)},setInterval:function(a,b){return setInterval(a,b)},clearInterval:function(a){return clearInterval(a)},now:function(){return(new Date).getTime()}},"undefined"!=typeof module&&null!==module?(module.exports=a,a.Bacon=a):("undefined"!=typeof define&&null!==define&&null!=define.amd&&define([],function(){return a}),this.Bacon=a)}.call(this);
