(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b,c){"use strict"
function generateAccessor(b0,b1,b2){var g=b0.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var a0
if(g.length>1)a0=true
else a0=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a1=d&3
var a2=d>>2
var a3=f=f.substring(0,e-1)
var a4=f.indexOf(":")
if(a4>0){a3=f.substring(0,a4)
f=f.substring(a4+1)}if(a1){var a5=a1&2?"r":""
var a6=a1&1?"this":"r"
var a7="return "+a6+"."+f
var a8=b2+".prototype.g"+a3+"="
var a9="function("+a5+"){"+a7+"}"
if(a0)b1.push(a8+"$reflectable("+a9+");\n")
else b1.push(a8+a9+";\n")}if(a2){var a5=a2&2?"r,v":"v"
var a6=a2&1?"this":"r"
var a7=a6+"."+f+"=v"
var a8=b2+".prototype.s"+a3+"="
var a9="function("+a5+"){"+a7+"}"
if(a0)b1.push(a8+"$reflectable("+a9+");\n")
else b1.push(a8+a9+";\n")}}return f}function defineClass(a4,a5){var g=[]
var f="function "+a4+"("
var e="",d=""
for(var a0=0;a0<a5.length;a0++){var a1=a5[a0]
if(a1.charCodeAt(0)==48){a1=a1.substring(1)
var a2=generateAccessor(a1,g,a4)
d+="this."+a2+" = null;\n"}else{var a2=generateAccessor(a1,g,a4)
var a3="p_"+a2
f+=e
e=", "
f+=a3
d+="this."+a2+" = "+a3+";\n"}}if(supportsDirectProtoAccess)d+="this."+"$deferredAction"+"();"
f+=") {\n"+d+"}\n"
f+=a4+".builtin$cls=\""+a4+"\";\n"
f+="$desc=$collectedClasses."+a4+"[1];\n"
f+=a4+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a4+".name=\""+a4+"\";\n"
f+=g.join("")
return f}var z=supportsDirectProtoAccess?function(d,e){var g=d.prototype
g.__proto__=e.prototype
g.constructor=d
g["$is"+d.name]=d
return convertToFastObject(g)}:function(){function tmp(){}return function(a1,a2){tmp.prototype=a2.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a1.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var a0=e[d]
g[a0]=f[a0]}g["$is"+a1.name]=a1
g.constructor=a1
a1.prototype=g
return g}}()
function finishClasses(a5){var g=init.allClasses
a5.combinedConstructorFunction+="return [\n"+a5.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a5.combinedConstructorFunction)(a5.collected)
a5.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var a0=d.name
var a1=a5.collected[a0]
var a2=a1[0]
a1=a1[1]
g[a0]=d
a2[a0]=d}f=null
var a3=init.finishedClasses
function finishClass(c2){if(a3[c2])return
a3[c2]=true
var a6=a5.pending[c2]
if(a6&&a6.indexOf("+")>0){var a7=a6.split("+")
a6=a7[0]
var a8=a7[1]
finishClass(a8)
var a9=g[a8]
var b0=a9.prototype
var b1=g[c2].prototype
var b2=Object.keys(b0)
for(var b3=0;b3<b2.length;b3++){var b4=b2[b3]
if(!u.call(b1,b4))b1[b4]=b0[b4]}}if(!a6||typeof a6!="string"){var b5=g[c2]
var b6=b5.prototype
b6.constructor=b5
b6.$isb=b5
b6.$deferredAction=function(){}
return}finishClass(a6)
var b7=g[a6]
if(!b7)b7=existingIsolateProperties[a6]
var b5=g[c2]
var b6=z(b5,b7)
if(b0)b6.$deferredAction=mixinDeferredActionHelper(b0,b6)
if(Object.prototype.hasOwnProperty.call(b6,"%")){var b8=b6["%"].split(";")
if(b8[0]){var b9=b8[0].split("|")
for(var b3=0;b3<b9.length;b3++){init.interceptorsByTag[b9[b3]]=b5
init.leafTags[b9[b3]]=true}}if(b8[1]){b9=b8[1].split("|")
if(b8[2]){var c0=b8[2].split("|")
for(var b3=0;b3<c0.length;b3++){var c1=g[c0[b3]]
c1.$nativeSuperclassTag=b9[0]}}for(b3=0;b3<b9.length;b3++){init.interceptorsByTag[b9[b3]]=b5
init.leafTags[b9[b3]]=false}}b6.$deferredAction()}if(b6.$ise)b6.$deferredAction()}var a4=Object.keys(a5.pending)
for(var e=0;e<a4.length;e++)finishClass(a4[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var a0=d.charCodeAt(0)
var a1
if(d!=="^"&&d!=="$reflectable"&&a0!==43&&a0!==42&&(a1=g[d])!=null&&a1.constructor===Array&&d!=="<>")addStubs(g,a1,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(d,e){var g
if(e.hasOwnProperty("$deferredAction"))g=e.$deferredAction
return function foo(){if(!supportsDirectProtoAccess)return
var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}d.$deferredAction()
f.$deferredAction()}}function processClassData(b2,b3,b4){b3=convertToSlowObject(b3)
var g
var f=Object.keys(b3)
var e=false
var d=supportsDirectProtoAccess&&b2!="b"
for(var a0=0;a0<f.length;a0++){var a1=f[a0]
var a2=a1.charCodeAt(0)
if(a1==="p"){processStatics(init.statics[b2]=b3.p,b4)
delete b3.p}else if(a2===43){w[g]=a1.substring(1)
var a3=b3[a1]
if(a3>0)b3[g].$reflectable=a3}else if(a2===42){b3[g].$D=b3[a1]
var a4=b3.$methodsWithOptionalArguments
if(!a4)b3.$methodsWithOptionalArguments=a4={}
a4[a1]=g}else{var a5=b3[a1]
if(a1!=="^"&&a5!=null&&a5.constructor===Array&&a1!=="<>")if(d)e=true
else addStubs(b3,a5,a1,false,[])
else g=a1}}if(e)b3.$deferredAction=finishAddStubsHelper
var a6=b3["^"],a7,a8,a9=a6
var b0=a9.split(";")
a9=b0[1]?b0[1].split(","):[]
a8=b0[0]
a7=a8.split(":")
if(a7.length==2){a8=a7[0]
var b1=a7[1]
if(b1)b3.$S=function(b5){return function(){return init.types[b5]}}(b1)}if(a8)b4.pending[b2]=a8
b4.combinedConstructorFunction+=defineClass(b2,a9)
b4.constructorsList.push(b2)
b4.collected[b2]=[m,b3]
i.push(b2)}function processStatics(a4,a5){var g=Object.keys(a4)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a4[e]
var a0=e.charCodeAt(0)
var a1
if(a0===43){v[a1]=e.substring(1)
var a2=a4[e]
if(a2>0)a4[a1].$reflectable=a2
if(d&&d.length)init.typeInformation[a1]=d}else if(a0===42){m[a1].$D=d
var a3=a4.$methodsWithOptionalArguments
if(!a3)a4.$methodsWithOptionalArguments=a3={}
a3[e]=a1}else if(typeof d==="function"){m[a1=e]=d
h.push(e)}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a1=e
processClassData(e,d,a5)}}}function addStubs(b6,b7,b8,b9,c0){var g=0,f=g,e=b7[g],d
if(typeof e=="string")d=b7[++g]
else{d=e
e=b8}if(typeof d=="number"){f=d
d=b7[++g]}b6[b8]=b6[e]=d
var a0=[d]
d.$stubName=b8
c0.push(b8)
for(g++;g<b7.length;g++){d=b7[g]
if(typeof d!="function")break
if(!b9)d.$stubName=b7[++g]
a0.push(d)
if(d.$stubName){b6[d.$stubName]=d
c0.push(d.$stubName)}}for(var a1=0;a1<a0.length;g++,a1++)a0[a1].$callName=b7[g]
var a2=b7[g]
b7=b7.slice(++g)
var a3=b7[0]
var a4=(a3&1)===1
a3=a3>>1
var a5=a3>>1
var a6=(a3&1)===1
var a7=a3===3
var a8=a3===1
var a9=b7[1]
var b0=a9>>1
var b1=(a9&1)===1
var b2=a5+b0
var b3=b7[2]
if(typeof b3=="number")b7[2]=b3+c
if(b>0){var b4=3
for(var a1=0;a1<b0;a1++){if(typeof b7[b4]=="number")b7[b4]=b7[b4]+b
b4++}for(var a1=0;a1<b2;a1++){b7[b4]=b7[b4]+b
b4++}}var b5=2*b0+a5+3
if(a2){d=tearOff(a0,f,b7,b9,b8,a4)
b6[b8].$getter=d
d.$getterStub=true
if(b9)c0.push(a2)
b6[a2]=d
a0.push(d)
d.$stubName=a2
d.$callName=null}}function tearOffGetter(d,e,f,g,a0){return a0?new Function("funcs","applyTrampolineIndex","reflectionInfo","name","H","c","return function tearOff_"+g+y+++"(receiver) {"+"if (c === null) c = "+"H.ca"+"("+"this, funcs, applyTrampolineIndex, reflectionInfo, false, true, name);"+"return new c(this, funcs[0], receiver, name);"+"}")(d,e,f,g,H,null):new Function("funcs","applyTrampolineIndex","reflectionInfo","name","H","c","return function tearOff_"+g+y+++"() {"+"if (c === null) c = "+"H.ca"+"("+"this, funcs, applyTrampolineIndex, reflectionInfo, false, false, name);"+"return new c(this, funcs[0], null, name);"+"}")(d,e,f,g,H,null)}function tearOff(d,e,f,a0,a1,a2){var g=null
return a0?function(){if(g===null)g=H.ca(this,d,e,f,true,false,a1).prototype
return g}:tearOffGetter(d,e,f,a1,a2)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.aW=function(){}
var dart=[["","",,H,{"^":"",ki:{"^":"b;a"}}],["","",,J,{"^":"",
ce:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
bG:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.cd==null){H.je()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.c(P.d5("Return interceptor for "+H.d(y(a,z))))}w=a.constructor
v=w==null?null:w[$.ch()]
if(v!=null)return v
v=H.jj(a)
if(v!=null)return v
if(typeof a=="function")return C.L
y=Object.getPrototypeOf(a)
if(y==null)return C.w
if(y===Object.prototype)return C.w
if(typeof w=="function"){Object.defineProperty(w,$.ch(),{value:C.r,enumerable:false,writable:true,configurable:true})
return C.r}return C.r},
e:{"^":"b;",
v:function(a,b){return a===b},
gt:function(a){return H.aL(a)},
k:["c_",function(a){return"Instance of '"+H.aM(a)+"'"}],
"%":"ANGLEInstancedArrays|ANGLE_instanced_arrays|AnimationEffectReadOnly|AnimationEffectTiming|AnimationEffectTimingReadOnly|AnimationTimeline|AnimationWorkletGlobalScope|ArrayBuffer|AudioListener|AudioParam|AudioTrack|AudioWorkletGlobalScope|AudioWorkletProcessor|AuthenticatorAssertionResponse|AuthenticatorAttestationResponse|AuthenticatorResponse|BackgroundFetchFetch|BackgroundFetchManager|BackgroundFetchSettledFetch|BarProp|BarcodeDetector|Bluetooth|BluetoothCharacteristicProperties|BluetoothRemoteGATTDescriptor|BluetoothRemoteGATTServer|BluetoothRemoteGATTService|BluetoothUUID|Body|BudgetService|BudgetState|CSS|CSSVariableReferenceValue|Cache|CacheStorage|CanvasPattern|Client|Clients|CookieStore|Coordinates|Credential|CredentialUserData|CredentialsContainer|Crypto|CryptoKey|CustomElementRegistry|DOMError|DOMFileSystem|DOMFileSystemSync|DOMImplementation|DOMMatrix|DOMMatrixReadOnly|DOMParser|DOMPoint|DOMPointReadOnly|DOMQuad|DOMStringMap|DataTransfer|DataTransferItem|Database|DeprecatedStorageInfo|DeprecatedStorageQuota|DeprecationReport|DetectedBarcode|DetectedFace|DetectedText|DeviceAcceleration|DeviceRotationRate|DirectoryEntry|DirectoryEntrySync|DirectoryReader|DirectoryReaderSync|DocumentOrShadowRoot|DocumentTimeline|EXTBlendMinMax|EXTColorBufferFloat|EXTColorBufferHalfFloat|EXTDisjointTimerQuery|EXTDisjointTimerQueryWebGL2|EXTFragDepth|EXTShaderTextureLOD|EXTTextureFilterAnisotropic|EXT_blend_minmax|EXT_frag_depth|EXT_sRGB|EXT_shader_texture_lod|EXT_texture_filter_anisotropic|EXTsRGB|Entry|EntrySync|External|FaceDetector|FederatedCredential|FileEntry|FileEntrySync|FileReaderSync|FileWriterSync|FontFace|FontFaceSource|FormData|GamepadButton|GamepadPose|Geolocation|HTMLAllCollection|HTMLHyperlinkElementUtils|Headers|IDBCursor|IDBCursorWithValue|IDBFactory|IDBIndex|IDBKeyRange|IDBObjectStore|IDBObservation|IDBObserver|IDBObserverChanges|IdleDeadline|ImageBitmapRenderingContext|ImageCapture|InputDeviceCapabilities|IntersectionObserver|IntersectionObserverEntry|InterventionReport|Iterator|KeyframeEffect|KeyframeEffectReadOnly|MediaCapabilities|MediaCapabilitiesInfo|MediaDeviceInfo|MediaError|MediaKeyStatusMap|MediaKeySystemAccess|MediaKeys|MediaKeysPolicy|MediaMetadata|MediaSession|MediaSettingsRange|MemoryInfo|MessageChannel|Metadata|Mojo|MojoHandle|MojoWatcher|MutationObserver|MutationRecord|NFC|NavigationPreloadManager|Navigator|NavigatorAutomationInformation|NavigatorConcurrentHardware|NavigatorCookies|NavigatorUserMediaError|NodeFilter|NodeIterator|NonDocumentTypeChildNode|NonElementParentNode|NoncedElement|OESElementIndexUint|OESStandardDerivatives|OESTextureFloat|OESTextureFloatLinear|OESTextureHalfFloat|OESTextureHalfFloatLinear|OESVertexArrayObject|OES_element_index_uint|OES_standard_derivatives|OES_texture_float|OES_texture_float_linear|OES_texture_half_float|OES_texture_half_float_linear|OES_vertex_array_object|OffscreenCanvasRenderingContext2D|OverconstrainedError|PagePopupController|PaintRenderingContext2D|PaintWorkletGlobalScope|PasswordCredential|Path2D|PaymentAddress|PaymentInstruments|PaymentManager|PaymentResponse|PerformanceEntry|PerformanceLongTaskTiming|PerformanceMark|PerformanceMeasure|PerformanceNavigation|PerformanceNavigationTiming|PerformanceObserver|PerformanceObserverEntryList|PerformancePaintTiming|PerformanceResourceTiming|PerformanceServerTiming|PerformanceTiming|PeriodicWave|Permissions|PhotoCapabilities|Position|PositionError|Presentation|PresentationReceiver|PublicKeyCredential|PushManager|PushMessageData|PushSubscription|PushSubscriptionOptions|RTCCertificate|RTCIceCandidate|RTCLegacyStatsReport|RTCRtpContributingSource|RTCRtpReceiver|RTCRtpSender|RTCSessionDescription|RTCStatsResponse|Range|RelatedApplication|Report|ReportBody|ReportingObserver|Request|ResizeObserver|ResizeObserverEntry|Response|SQLError|SQLResultSet|SQLTransaction|SVGAngle|SVGAnimatedAngle|SVGAnimatedBoolean|SVGAnimatedEnumeration|SVGAnimatedInteger|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedPreserveAspectRatio|SVGAnimatedRect|SVGAnimatedString|SVGAnimatedTransformList|SVGMatrix|SVGPoint|SVGPreserveAspectRatio|SVGUnitTypes|ScrollState|ScrollTimeline|Selection|SharedArrayBuffer|SpeechRecognitionAlternative|SpeechSynthesisVoice|StaticRange|StorageManager|StyleMedia|StylePropertyMap|StylePropertyMapReadonly|SubtleCrypto|SyncManager|TaskAttributionTiming|TextDetector|TrackDefault|TreeWalker|TrustedHTML|TrustedScriptURL|TrustedURL|URLSearchParams|USBAlternateInterface|USBConfiguration|USBDevice|USBEndpoint|USBInTransferResult|USBInterface|USBIsochronousInTransferPacket|USBIsochronousInTransferResult|USBIsochronousOutTransferPacket|USBIsochronousOutTransferResult|USBOutTransferResult|UnderlyingSourceBase|VRCoordinateSystem|VRDisplayCapabilities|VREyeParameters|VRFrameData|VRFrameOfReference|VRPose|VRStageBounds|VRStageBoundsPoint|VRStageParameters|ValidityState|VideoPlaybackQuality|VideoTrack|WEBGL_compressed_texture_atc|WEBGL_compressed_texture_etc1|WEBGL_compressed_texture_pvrtc|WEBGL_compressed_texture_s3tc|WEBGL_debug_renderer_info|WEBGL_debug_shaders|WEBGL_depth_texture|WEBGL_draw_buffers|WEBGL_lose_context|WebGL|WebGL2RenderingContextBase|WebGLActiveInfo|WebGLCanvas|WebGLColorBufferFloat|WebGLCompressedTextureASTC|WebGLCompressedTextureATC|WebGLCompressedTextureETC|WebGLCompressedTextureETC1|WebGLCompressedTexturePVRTC|WebGLCompressedTextureS3TC|WebGLCompressedTextureS3TCsRGB|WebGLDebugRendererInfo|WebGLDebugShaders|WebGLDepthTexture|WebGLDrawBuffers|WebGLExtensionLoseContext|WebGLFramebuffer|WebGLGetBufferSubDataAsync|WebGLLoseContext|WebGLQuery|WebGLRenderbuffer|WebGLSampler|WebGLShaderPrecisionFormat|WebGLSync|WebGLTimerQueryEXT|WebGLTransformFeedback|WebGLVertexArrayObjectOES|WebKitMutationObserver|WindowClient|WorkerLocation|WorkerNavigator|Worklet|WorkletAnimation|WorkletGlobalScope|XMLSerializer|XPathEvaluator|XPathExpression|XPathNSResolver|XPathResult|XSLTProcessor|mozRTCIceCandidate|mozRTCSessionDescription"},
fb:{"^":"e;",
k:function(a){return String(a)},
gt:function(a){return a?519018:218159},
$isc7:1},
cL:{"^":"e;",
v:function(a,b){return null==b},
k:function(a){return"null"},
gt:function(a){return 0},
$isF:1},
bZ:{"^":"e;",
gt:function(a){return 0},
k:["c0",function(a){return String(a)}]},
fH:{"^":"bZ;"},
aO:{"^":"bZ;"},
ba:{"^":"bZ;",
k:function(a){var z=a[$.dJ()]
if(z==null)return this.c0(a)
return"JavaScript function for "+H.d(J.bn(z))},
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}},
$isbW:1},
b7:{"^":"e;$ti",
l:function(a,b){H.v(b,H.o(a,0))
if(!!a.fixed$length)H.a7(P.w("add"))
a.push(b)},
cB:function(a,b){var z,y
H.x(b,"$isi",[H.o(a,0)],"$asi")
if(!!a.fixed$length)H.a7(P.w("addAll"))
for(z=b.length,y=0;y<b.length;b.length===z||(0,H.M)(b),++y)a.push(b[y])},
T:function(a,b){var z,y
z=new Array(a.length)
z.fixed$length=Array
for(y=0;y<a.length;++y)this.i(z,y,H.d(a[y]))
return z.join(b)},
bX:function(a,b){if(!!a.immutable$list)H.a7(P.w("sort"))
H.h3(a,J.iQ(),H.o(a,0))},
a3:function(a){return this.bX(a,null)},
k:function(a){return P.bX(a,"[","]")},
gw:function(a){return new J.ey(a,a.length,0,[H.o(a,0)])},
gt:function(a){return H.aL(a)},
gj:function(a){return a.length},
h:function(a,b){if(b>=a.length||b<0)throw H.c(H.aV(a,b))
return a[b]},
i:function(a,b,c){H.v(c,H.o(a,0))
if(!!a.immutable$list)H.a7(P.w("indexed set"))
if(b>=a.length||b<0)throw H.c(H.aV(a,b))
a[b]=c},
$isr:1,
$asr:I.aW,
$isi:1,
$isa:1,
p:{
fa:function(a,b){return J.bY(H.p(a,[b]))},
bY:function(a){H.bh(a)
a.fixed$length=Array
return a},
kg:[function(a,b){return J.e4(H.dC(a,"$isP"),H.dC(b,"$isP"))},"$2","iQ",8,0,23]}},
kh:{"^":"b7;$ti"},
ey:{"^":"b;a,b,c,0d,$ti",
saP:function(a){this.d=H.v(a,H.o(this,0))},
gB:function(a){return this.d},
u:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.c(H.M(z))
x=this.c
if(x>=y){this.saP(null)
return!1}this.saP(z[x]);++this.c
return!0}},
b8:{"^":"e;",
G:function(a,b){var z
H.cf(b)
if(typeof b!=="number")throw H.c(H.aT(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gal(b)
if(this.gal(a)===z)return 0
if(this.gal(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gal:function(a){return a===0?1/a<0:a<0},
bH:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.c(P.w(""+a+".toInt()"))},
cI:function(a,b,c){if(this.G(b,c)>0)throw H.c(H.aT(b))
if(this.G(a,b)<0)return b
if(this.G(a,c)>0)return c
return a},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gt:function(a){return a&0x1FFFFFFF},
c1:function(a,b){if((a|0)===a)if(b>=1||!1)return a/b|0
return this.b5(a,b)},
R:function(a,b){return(a|0)===a?a/b|0:this.b5(a,b)},
b5:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.c(P.w("Result of truncating division is "+H.d(z)+": "+H.d(a)+" ~/ "+b))},
b3:function(a,b){var z
if(a>0)z=this.cw(a,b)
else{z=b>31?31:b
z=a>>z>>>0}return z},
cw:function(a,b){return b>31?0:a>>>b},
K:function(a,b){if(typeof b!=="number")throw H.c(H.aT(b))
return a>b},
$isP:1,
$asP:function(){return[P.D]},
$isU:1,
$isD:1},
cK:{"^":"b8;",$isA:1},
fc:{"^":"b8;"},
b9:{"^":"e;",
a5:function(a,b){if(b>=a.length)throw H.c(H.aV(a,b))
return a.charCodeAt(b)},
D:function(a,b){H.y(b)
if(typeof b!=="string")throw H.c(P.cw(b,null,null))
return a+b},
bZ:function(a,b,c){if(c==null)c=a.length
if(b<0)throw H.c(P.bt(b,null,null))
if(b>c)throw H.c(P.bt(b,null,null))
if(c>a.length)throw H.c(P.bt(c,null,null))
return a.substring(b,c)},
bY:function(a,b){return this.bZ(a,b,null)},
cJ:function(a,b,c){if(c>a.length)throw H.c(P.fR(c,0,a.length,null,null))
return H.jp(a,b,c)},
G:function(a,b){var z
H.y(b)
if(typeof b!=="string")throw H.c(H.aT(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
k:function(a){return a},
gt:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gj:function(a){return a.length},
h:function(a,b){if(b>=a.length||!1)throw H.c(H.aV(a,b))
return a[b]},
$isr:1,
$asr:I.aW,
$isP:1,
$asP:function(){return[P.f]},
$isfE:1,
$isf:1}}],["","",,H,{"^":"",
h3:function(a,b,c){H.x(a,"$isa",[c],"$asa")
H.j(b,{func:1,ret:P.A,args:[c,c]})
H.bb(a,0,J.b3(a)-1,b,c)},
bb:function(a,b,c,d,e){H.x(a,"$isa",[e],"$asa")
H.j(d,{func:1,ret:P.A,args:[e,e]})
if(c-b<=32)H.h2(a,b,c,d,e)
else H.h1(a,b,c,d,e)},
h2:function(a,b,c,d,e){var z,y,x,w,v
H.x(a,"$isa",[e],"$asa")
H.j(d,{func:1,ret:P.A,args:[e,e]})
for(z=b+1,y=J.aX(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.a_(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.i(a,w,y.h(a,v))
w=v}y.i(a,w,x)}},
h1:function(a,b,a0,a1,a2){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c
H.x(a,"$isa",[a2],"$asa")
H.j(a1,{func:1,ret:P.A,args:[a2,a2]})
z=C.e.R(a0-b+1,6)
y=b+z
x=a0-z
w=C.e.R(b+a0,2)
v=w-z
u=w+z
t=J.aX(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.a_(a1.$2(s,r),0)){n=r
r=s
s=n}if(J.a_(a1.$2(p,o),0)){n=o
o=p
p=n}if(J.a_(a1.$2(s,q),0)){n=q
q=s
s=n}if(J.a_(a1.$2(r,q),0)){n=q
q=r
r=n}if(J.a_(a1.$2(s,p),0)){n=p
p=s
s=n}if(J.a_(a1.$2(q,p),0)){n=p
p=q
q=n}if(J.a_(a1.$2(r,o),0)){n=o
o=r
r=n}if(J.a_(a1.$2(r,q),0)){n=q
q=r
r=n}if(J.a_(a1.$2(p,o),0)){n=o
o=p
p=n}t.i(a,y,s)
t.i(a,w,q)
t.i(a,x,o)
t.i(a,v,t.h(a,b))
t.i(a,u,t.h(a,a0))
m=b+1
l=a0-1
if(J.aB(a1.$2(r,p),0)){for(k=m;k<=l;++k){j=t.h(a,k)
i=a1.$2(j,r)
if(i===0)continue
if(typeof i!=="number")return i.V()
if(i<0){if(k!==m){t.i(a,k,t.h(a,m))
t.i(a,m,j)}++m}else for(;!0;){i=a1.$2(t.h(a,l),r)
if(typeof i!=="number")return i.K()
if(i>0){--l
continue}else{h=l-1
if(i<0){t.i(a,k,t.h(a,m))
g=m+1
t.i(a,m,t.h(a,l))
t.i(a,l,j)
l=h
m=g
break}else{t.i(a,k,t.h(a,l))
t.i(a,l,j)
l=h
break}}}}f=!0}else{for(k=m;k<=l;++k){j=t.h(a,k)
e=a1.$2(j,r)
if(typeof e!=="number")return e.V()
if(e<0){if(k!==m){t.i(a,k,t.h(a,m))
t.i(a,m,j)}++m}else{d=a1.$2(j,p)
if(typeof d!=="number")return d.K()
if(d>0)for(;!0;){i=a1.$2(t.h(a,l),p)
if(typeof i!=="number")return i.K()
if(i>0){--l
if(l<k)break
continue}else{i=a1.$2(t.h(a,l),r)
if(typeof i!=="number")return i.V()
h=l-1
if(i<0){t.i(a,k,t.h(a,m))
g=m+1
t.i(a,m,t.h(a,l))
t.i(a,l,j)
m=g}else{t.i(a,k,t.h(a,l))
t.i(a,l,j)}l=h
break}}}}f=!1}c=m-1
t.i(a,b,t.h(a,c))
t.i(a,c,r)
c=l+1
t.i(a,a0,t.h(a,c))
t.i(a,c,p)
H.bb(a,b,m-2,a1,a2)
H.bb(a,l+2,a0,a1,a2)
if(f)return
if(m<y&&l>x){for(;J.aB(a1.$2(t.h(a,m),r),0);)++m
for(;J.aB(a1.$2(t.h(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.h(a,k)
if(a1.$2(j,r)===0){if(k!==m){t.i(a,k,t.h(a,m))
t.i(a,m,j)}++m}else if(a1.$2(j,p)===0)for(;!0;)if(a1.$2(t.h(a,l),p)===0){--l
if(l<k)break
continue}else{i=a1.$2(t.h(a,l),r)
if(typeof i!=="number")return i.V()
h=l-1
if(i<0){t.i(a,k,t.h(a,m))
g=m+1
t.i(a,m,t.h(a,l))
t.i(a,l,j)
m=g}else{t.i(a,k,t.h(a,l))
t.i(a,l,j)}l=h
break}}H.bb(a,m,l,a1,a2)}else H.bb(a,m,l,a1,a2)},
eX:{"^":"i;"},
fl:{"^":"b;a,b,c,0d,$ti",
saQ:function(a){this.d=H.v(a,H.o(this,0))},
gB:function(a){return this.d},
u:function(){var z,y,x,w
z=this.a
y=J.aX(z)
x=y.gj(z)
if(this.b!==x)throw H.c(P.aE(z))
w=this.c
if(w>=x){this.saQ(null)
return!1}this.saQ(y.q(z,w));++this.c
return!0}},
br:{"^":"b;$ti"}}],["","",,H,{"^":"",
at:function(a){var z,y
z=H.y(init.mangledGlobalNames[a])
if(typeof z==="string")return z
y="minified:"+a
return y},
j8:function(a){return init.types[H.K(a)]},
jh:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.B(a).$ist},
d:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.bn(a)
if(typeof z!=="string")throw H.c(H.aT(a))
return z},
aL:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
aM:function(a){return H.fI(a)+H.bA(H.ar(a),0,null)},
fI:function(a){var z,y,x,w,v,u,t,s,r
z=J.B(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
v=w==null
if(v||z===C.D||!!z.$isaO){u=C.v(a)
if(v)w=u
if(u==="Object"){t=a.constructor
if(typeof t=="function"){s=String(t).match(/^\s*function\s*([\w$]*)\s*\(/)
r=s==null?null:s[1]
if(typeof r==="string"&&/^\w+$/.test(r))w=r}}return w}w=w
return H.at(w.length>1&&C.i.a5(w,0)===36?C.i.bY(w,1):w)},
au:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
fP:function(a){var z=H.au(a).getFullYear()+0
return z},
fN:function(a){var z=H.au(a).getMonth()+1
return z},
fJ:function(a){var z=H.au(a).getDate()+0
return z},
fK:function(a){var z=H.au(a).getHours()+0
return z},
fM:function(a){var z=H.au(a).getMinutes()+0
return z},
fO:function(a){var z=H.au(a).getSeconds()+0
return z},
fL:function(a){var z=H.au(a).getMilliseconds()+0
return z},
bg:function(a){throw H.c(H.aT(a))},
k:function(a,b){if(a==null)J.b3(a)
throw H.c(H.aV(a,b))},
aV:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aC(!0,b,"index",null)
z=H.K(J.b3(a))
if(!(b<0)){if(typeof z!=="number")return H.bg(z)
y=b>=z}else y=!0
if(y)return P.E(b,a,"index",null,z)
return P.bt(b,"index",null)},
aT:function(a){return new P.aC(!0,a,null,null)},
c:function(a){var z
if(a==null)a=new P.cU()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.dF})
z.name=""}else z.toString=H.dF
return z},
dF:function(){return J.bn(this.dartException)},
a7:function(a){throw H.c(a)},
M:function(a){throw H.c(P.aE(a))},
b_:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.jr(a)
if(a==null)return
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.e.b3(x,16)&8191)===10)switch(w){case 438:return z.$1(H.c_(H.d(y)+" (Error "+w+")",null))
case 445:case 5007:return z.$1(H.cT(H.d(y)+" (Error "+w+")",null))}}if(a instanceof TypeError){v=$.dL()
u=$.dM()
t=$.dN()
s=$.dO()
r=$.dR()
q=$.dS()
p=$.dQ()
$.dP()
o=$.dU()
n=$.dT()
m=v.F(y)
if(m!=null)return z.$1(H.c_(H.y(y),m))
else{m=u.F(y)
if(m!=null){m.method="call"
return z.$1(H.c_(H.y(y),m))}else{m=t.F(y)
if(m==null){m=s.F(y)
if(m==null){m=r.F(y)
if(m==null){m=q.F(y)
if(m==null){m=p.F(y)
if(m==null){m=s.F(y)
if(m==null){m=o.F(y)
if(m==null){m=n.F(y)
l=m!=null}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0}else l=!0
if(l)return z.$1(H.cT(H.y(y),m))}}return z.$1(new H.hn(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.cX()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aC(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.cX()
return a},
aY:function(a){var z
if(a==null)return new H.dj(a)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.dj(a)},
j2:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.i(0,a[y],a[x])}return b},
jg:function(a,b,c,d,e,f){H.h(a,"$isbW")
switch(H.K(b)){case 0:return a.$0()
case 1:return a.$1(c)
case 2:return a.$2(c,d)
case 3:return a.$3(c,d,e)
case 4:return a.$4(c,d,e,f)}throw H.c(P.cH("Unsupported number of arguments for wrapped closure"))},
aU:function(a,b){var z
H.K(b)
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e){return function(f,g,h,i){return e(c,d,f,g,h,i)}}(a,b,H.jg)
a.$identity=z
return z},
eJ:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=b[0]
y=z.$callName
if(!!J.B(d).$isa){z.$reflectionInfo=d
x=H.fT(z).r}else x=d
w=e?Object.create(new H.h7().constructor.prototype):Object.create(new H.bR(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(e)v=function static_tear_off(){this.$initialize()}
else{u=$.a0
if(typeof u!=="number")return u.D()
$.a0=u+1
u=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")
v=u}w.constructor=v
v.prototype=w
if(!e){t=H.cA(a,z,f)
t.$reflectionInfo=d}else{w.$static_name=g
t=z}if(typeof x=="number")s=function(h,i){return function(){return h(i)}}(H.j8,x)
else if(typeof x=="function")if(e)s=x
else{r=f?H.cy:H.bS
s=function(h,i){return function(){return h.apply({$receiver:i(this)},arguments)}}(x,r)}else throw H.c("Error in reflectionInfo.")
w.$S=s
w[y]=t
for(q=t,p=1;p<b.length;++p){o=b[p]
n=o.$callName
if(n!=null){o=e?o:H.cA(a,o,f)
w[n]=o}if(p===c){o.$reflectionInfo=d
q=o}}w.$C=q
w.$R=z.$R
w.$D=z.$D
return v},
eG:function(a,b,c,d){var z=H.bS
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
cA:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.eI(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.eG(y,!w,z,b)
if(y===0){w=$.a0
if(typeof w!=="number")return w.D()
$.a0=w+1
u="self"+w
w="return function(){var "+u+" = this."
v=$.aD
if(v==null){v=H.bo("self")
$.aD=v}return new Function(w+H.d(v)+";return "+u+"."+H.d(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.a0
if(typeof w!=="number")return w.D()
$.a0=w+1
t+=w
w="return function("+t+"){return this."
v=$.aD
if(v==null){v=H.bo("self")
$.aD=v}return new Function(w+H.d(v)+"."+H.d(z)+"("+t+");}")()},
eH:function(a,b,c,d){var z,y
z=H.bS
y=H.cy
switch(b?-1:a){case 0:throw H.c(H.fX("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
eI:function(a,b){var z,y,x,w,v,u,t,s
z=$.aD
if(z==null){z=H.bo("self")
$.aD=z}y=$.cx
if(y==null){y=H.bo("receiver")
$.cx=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.eH(w,!u,x,b)
if(w===1){z="return function(){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+");"
y=$.a0
if(typeof y!=="number")return y.D()
$.a0=y+1
return new Function(z+y+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
z="return function("+s+"){return this."+H.d(z)+"."+H.d(x)+"(this."+H.d(y)+", "+s+");"
y=$.a0
if(typeof y!=="number")return y.D()
$.a0=y+1
return new Function(z+y+"}")()},
ca:function(a,b,c,d,e,f,g){return H.eJ(a,b,H.K(c),d,!!e,!!f,g)},
y:function(a){if(a==null)return a
if(typeof a==="string")return a
throw H.c(H.Y(a,"String"))},
dx:function(a){if(a==null)return a
if(typeof a==="number")return a
throw H.c(H.Y(a,"double"))},
cf:function(a){if(a==null)return a
if(typeof a==="number")return a
throw H.c(H.Y(a,"num"))},
c8:function(a){if(a==null)return a
if(typeof a==="boolean")return a
throw H.c(H.Y(a,"bool"))},
K:function(a){if(a==null)return a
if(typeof a==="number"&&Math.floor(a)===a)return a
throw H.c(H.Y(a,"int"))},
cg:function(a,b){throw H.c(H.Y(a,H.at(H.y(b).substring(3))))},
jn:function(a,b){throw H.c(H.cz(a,H.at(H.y(b).substring(3))))},
h:function(a,b){if(a==null)return a
if((typeof a==="object"||typeof a==="function")&&J.B(a)[b])return a
H.cg(a,b)},
a6:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.B(a)[b]
else z=!0
if(z)return a
H.jn(a,b)},
dC:function(a,b){if(a==null)return a
if(typeof a==="string")return a
if(typeof a==="number")return a
if(J.B(a)[b])return a
H.cg(a,b)},
bh:function(a){if(a==null)return a
if(!!J.B(a).$isa)return a
throw H.c(H.Y(a,"List<dynamic>"))},
ji:function(a,b){var z
if(a==null)return a
z=J.B(a)
if(!!z.$isa)return a
if(z[b])return a
H.cg(a,b)},
cb:function(a){var z
if("$S" in a){z=a.$S
if(typeof z=="number")return init.types[H.K(z)]
else return a.$S()}return},
be:function(a,b){var z
if(a==null)return!1
if(typeof a=="function")return!0
z=H.cb(J.B(a))
if(z==null)return!1
return H.dn(z,null,b,null)},
j:function(a,b){var z,y
if(a==null)return a
if($.c4)return a
$.c4=!0
try{if(H.be(a,b))return a
z=H.bi(b)
y=H.Y(a,z)
throw H.c(y)}finally{$.c4=!1}},
bE:function(a,b){if(a!=null&&!H.c9(a,b))H.a7(H.Y(a,H.bi(b)))
return a},
ds:function(a){var z,y
z=J.B(a)
if(!!z.$isn){y=H.cb(z)
if(y!=null)return H.bi(y)
return"Closure"}return H.aM(a)},
jq:function(a){throw H.c(new P.eO(H.y(a)))},
dy:function(a){return init.getIsolateTag(a)},
p:function(a,b){a.$ti=b
return a},
ar:function(a){if(a==null)return
return a.$ti},
lD:function(a,b,c){return H.aZ(a["$as"+H.d(c)],H.ar(b))},
bf:function(a,b,c,d){var z
H.y(c)
H.K(d)
z=H.aZ(a["$as"+H.d(c)],H.ar(b))
return z==null?null:z[d]},
o:function(a,b){var z
H.K(b)
z=H.ar(a)
return z==null?null:z[b]},
bi:function(a){return H.aq(a,null)},
aq:function(a,b){var z,y
H.x(b,"$isa",[P.f],"$asa")
if(a==null)return"dynamic"
if(a===-1)return"void"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return H.at(a[0].builtin$cls)+H.bA(a,1,b)
if(typeof a=="function")return H.at(a.builtin$cls)
if(a===-2)return"dynamic"
if(typeof a==="number"){H.K(a)
if(b==null||a<0||a>=b.length)return"unexpected-generic-index:"+a
z=b.length
y=z-a-1
if(y<0||y>=z)return H.k(b,y)
return H.d(b[y])}if('func' in a)return H.iP(a,b)
if('futureOr' in a)return"FutureOr<"+H.aq("type" in a?a.type:null,b)+">"
return"unknown-reified-type"},
iP:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h
z=[P.f]
H.x(b,"$isa",z,"$asa")
if("bounds" in a){y=a.bounds
if(b==null){b=H.p([],z)
x=null}else x=b.length
w=b.length
for(v=y.length,u=v;u>0;--u)C.a.l(b,"T"+(w+u))
for(t="<",s="",u=0;u<v;++u,s=", "){t+=s
z=b.length
r=z-u-1
if(r<0)return H.k(b,r)
t=C.i.D(t,b[r])
q=y[u]
if(q!=null&&q!==P.b)t+=" extends "+H.aq(q,b)}t+=">"}else{t=""
x=null}p=!!a.v?"void":H.aq(a.ret,b)
if("args" in a){o=a.args
for(z=o.length,n="",m="",l=0;l<z;++l,m=", "){k=o[l]
n=n+m+H.aq(k,b)}}else{n=""
m=""}if("opt" in a){j=a.opt
n+=m+"["
for(z=j.length,m="",l=0;l<z;++l,m=", "){k=j[l]
n=n+m+H.aq(k,b)}n+="]"}if("named" in a){i=a.named
n+=m+"{"
for(z=H.j1(i),r=z.length,m="",l=0;l<r;++l,m=", "){h=H.y(z[l])
n=n+m+H.aq(i[h],b)+(" "+H.d(h))}n+="}"}if(x!=null)b.length=x
return t+"("+n+") => "+p},
bA:function(a,b,c){var z,y,x,w,v,u
H.x(c,"$isa",[P.f],"$asa")
if(a==null)return""
z=new P.c1("")
for(y=b,x="",w=!0,v="";y<a.length;++y,x=", "){z.a=v+x
u=a[y]
if(u!=null)w=!1
v=z.a+=H.aq(u,c)}return"<"+z.k(0)+">"},
j7:function(a){var z,y,x,w
z=J.B(a)
if(!!z.$isn){y=H.cb(z)
if(y!=null)return y}x=z.constructor
if(a==null)return x
if(typeof a!="object")return x
w=H.ar(a)
if(w!=null){w=w.slice()
w.splice(0,0,x)
x=w}return x},
aZ:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
aA:function(a,b,c,d){var z,y
H.y(b)
H.bh(c)
H.y(d)
if(a==null)return!1
z=H.ar(a)
y=J.B(a)
if(y[b]==null)return!1
return H.dv(H.aZ(y[d],z),null,c,null)},
bj:function(a,b,c,d){H.y(b)
H.bh(c)
H.y(d)
if(a==null)return a
if(H.aA(a,b,c,d))return a
throw H.c(H.cz(a,function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(H.at(b.substring(3))+H.bA(c,0,null),init.mangledGlobalNames)))},
x:function(a,b,c,d){H.y(b)
H.bh(c)
H.y(d)
if(a==null)return a
if(H.aA(a,b,c,d))return a
throw H.c(H.Y(a,function(e,f){return e.replace(/[^<,> ]+/g,function(g){return f[g]||g})}(H.at(b.substring(3))+H.bA(c,0,null),init.mangledGlobalNames)))},
dv:function(a,b,c,d){var z,y
if(c==null)return!0
if(a==null){z=c.length
for(y=0;y<z;++y)if(!H.S(null,null,c[y],d))return!1
return!0}z=a.length
for(y=0;y<z;++y)if(!H.S(a[y],b,c[y],d))return!1
return!0},
lz:function(a,b,c){return a.apply(b,H.aZ(J.B(b)["$as"+H.d(c)],H.ar(b)))},
dA:function(a){var z
if(typeof a==="number")return!1
if('futureOr' in a){z="type" in a?a.type:null
return a==null||a.builtin$cls==="b"||a.builtin$cls==="F"||a===-1||a===-2||H.dA(z)}return!1},
c9:function(a,b){var z,y
if(a==null)return b==null||b.builtin$cls==="b"||b.builtin$cls==="F"||b===-1||b===-2||H.dA(b)
if(b==null||b===-1||b.builtin$cls==="b"||b===-2)return!0
if(typeof b=="object"){if('futureOr' in b)if(H.c9(a,"type" in b?b.type:null))return!0
if('func' in b)return H.be(a,b)}z=J.B(a).constructor
y=H.ar(a)
if(y!=null){y=y.slice()
y.splice(0,0,z)
z=y}return H.S(z,null,b,null)},
v:function(a,b){if(a!=null&&!H.c9(a,b))throw H.c(H.Y(a,H.bi(b)))
return a},
S:function(a,b,c,d){var z,y,x,w,v,u,t,s,r
if(a===c)return!0
if(c==null||c===-1||c.builtin$cls==="b"||c===-2)return!0
if(a===-2)return!0
if(a==null||a===-1||a.builtin$cls==="b"||a===-2){if(typeof c==="number")return!1
if('futureOr' in c)return H.S(a,b,"type" in c?c.type:null,d)
return!1}if(typeof a==="number")return!1
if(typeof c==="number")return!1
if(a.builtin$cls==="F")return!0
if('func' in c)return H.dn(a,b,c,d)
if('func' in a)return c.builtin$cls==="bW"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
if('futureOr' in c){x="type" in c?c.type:null
if('futureOr' in a)return H.S("type" in a?a.type:null,b,x,d)
else if(H.S(a,b,x,d))return!0
else{if(!('$is'+"aG" in y.prototype))return!1
w=y.prototype["$as"+"aG"]
v=H.aZ(w,z?a.slice(1):null)
return H.S(typeof v==="object"&&v!==null&&v.constructor===Array?v[0]:null,b,x,d)}}u=typeof c==="object"&&c!==null&&c.constructor===Array
t=u?c[0]:c
if(t!==y){s=t.builtin$cls
if(!('$is'+s in y.prototype))return!1
r=y.prototype["$as"+s]}else r=null
if(!u)return!0
z=z?a.slice(1):null
u=c.slice(1)
return H.dv(H.aZ(r,z),b,u,d)},
dn:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("bounds" in a){if(!("bounds" in c))return!1
z=a.bounds
y=c.bounds
if(z.length!==y.length)return!1}else if("bounds" in c)return!1
if(!H.S(a.ret,b,c.ret,d))return!1
x=a.args
w=c.args
v=a.opt
u=c.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
for(p=0;p<t;++p)if(!H.S(w[p],d,x[p],b))return!1
for(o=p,n=0;o<s;++n,++o)if(!H.S(w[o],d,v[n],b))return!1
for(o=0;o<q;++n,++o)if(!H.S(u[o],d,v[n],b))return!1
m=a.named
l=c.named
if(l==null)return!0
if(m==null)return!1
return H.jm(m,b,l,d)},
jm:function(a,b,c,d){var z,y,x,w
z=Object.getOwnPropertyNames(c)
for(y=z.length,x=0;x<y;++x){w=z[x]
if(!Object.hasOwnProperty.call(a,w))return!1
if(!H.S(c[w],d,a[w],b))return!1}return!0},
lA:function(a,b,c){Object.defineProperty(a,H.y(b),{value:c,enumerable:false,writable:true,configurable:true})},
jj:function(a){var z,y,x,w,v,u
z=H.y($.dz.$1(a))
y=$.bD[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bI[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=H.y($.du.$2(a,z))
if(z!=null){y=$.bD[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.bI[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.bJ(x)
$.bD[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.bI[z]=x
return x}if(v==="-"){u=H.bJ(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.dD(a,x)
if(v==="*")throw H.c(P.d5(z))
if(init.leafTags[z]===true){u=H.bJ(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.dD(a,x)},
dD:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.ce(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
bJ:function(a){return J.ce(a,!1,null,!!a.$ist)},
jl:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return H.bJ(z)
else return J.ce(z,c,null,null)},
je:function(){if(!0===$.cd)return
$.cd=!0
H.jf()},
jf:function(){var z,y,x,w,v,u,t,s
$.bD=Object.create(null)
$.bI=Object.create(null)
H.ja()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.dE.$1(v)
if(u!=null){t=H.jl(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
ja:function(){var z,y,x,w,v,u,t
z=C.I()
z=H.az(C.F,H.az(C.K,H.az(C.u,H.az(C.u,H.az(C.J,H.az(C.G,H.az(C.H(C.v),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.dz=new H.jb(v)
$.du=new H.jc(u)
$.dE=new H.jd(t)},
az:function(a,b){return a(b)||b},
jp:function(a,b,c){var z=a.indexOf(b,c)
return z>=0},
fS:{"^":"b;a,b,c,d,e,f,r,0x",p:{
fT:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z=J.bY(z)
y=z[0]
x=z[1]
return new H.fS(a,z,(y&2)===2,y>>2,x>>1,(x&1)===1,z[2])}}},
hi:{"^":"b;a,b,c,d,e,f",
F:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
p:{
a2:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=H.p([],[P.f])
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.hi(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
bv:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
d2:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
fB:{"^":"L;a,b",
k:function(a){var z=this.b
if(z==null)return"NoSuchMethodError: "+H.d(this.a)
return"NoSuchMethodError: method not found: '"+z+"' on null"},
p:{
cT:function(a,b){return new H.fB(a,b==null?null:b.method)}}},
fd:{"^":"L;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.d(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.d(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.d(this.a)+")"},
p:{
c_:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.fd(a,y,z?null:b.receiver)}}},
hn:{"^":"L;a",
k:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
jr:{"^":"n:5;a",
$1:function(a){if(!!J.B(a).$isL)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a}},
dj:{"^":"b;a,0b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z},
$isX:1},
n:{"^":"b;",
k:function(a){return"Closure '"+H.aM(this).trim()+"'"},
gbV:function(){return this},
$isbW:1,
gbV:function(){return this}},
cZ:{"^":"n;"},
h7:{"^":"cZ;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+H.at(z)+"'"}},
bR:{"^":"cZ;a,b,c,d",
v:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.bR))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gt:function(a){var z,y
z=this.c
if(z==null)y=H.aL(this.a)
else y=typeof z!=="object"?J.a8(z):H.aL(z)
return(y^H.aL(this.b))>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.d(this.d)+"' of "+("Instance of '"+H.aM(z)+"'")},
p:{
bS:function(a){return a.a},
cy:function(a){return a.c},
bo:function(a){var z,y,x,w,v
z=new H.bR("self","target","receiver","name")
y=J.bY(Object.getOwnPropertyNames(z))
for(x=y.length,w=0;w<x;++w){v=y[w]
if(z[v]===a)return v}}}},
hj:{"^":"L;a",
k:function(a){return this.a},
p:{
Y:function(a,b){return new H.hj("TypeError: "+P.bq(a)+": type '"+H.ds(a)+"' is not a subtype of type '"+b+"'")}}},
eE:{"^":"L;a",
k:function(a){return this.a},
p:{
cz:function(a,b){return new H.eE("CastError: "+P.bq(a)+": type '"+H.ds(a)+"' is not a subtype of type '"+b+"'")}}},
fW:{"^":"L;a",
k:function(a){return"RuntimeError: "+H.d(this.a)},
p:{
fX:function(a){return new H.fW(a)}}},
d3:{"^":"b;a,0b,0c,0d",
gY:function(){var z=this.b
if(z==null){z=H.bi(this.a)
this.b=z}return z},
k:function(a){return this.gY()},
gt:function(a){var z=this.d
if(z==null){z=C.i.gt(this.gY())
this.d=z}return z},
v:function(a,b){if(b==null)return!1
return b instanceof H.d3&&this.gY()===b.gY()}},
cM:{"^":"fm;a,0b,0c,0d,0e,0f,r,$ti",
gj:function(a){return this.a},
gI:function(a){return new H.ac(this,[H.o(this,0)])},
a0:function(a,b){var z,y
if(typeof b==="string"){z=this.b
if(z==null)return!1
return this.cl(z,b)}else{y=this.cS(b)
return y}},
cS:function(a){var z=this.d
if(z==null)return!1
return this.ak(this.ad(z,J.a8(a)&0x3ffffff),a)>=0},
h:function(a,b){var z,y,x,w
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.W(z,b)
x=y==null?null:y.b
return x}else if(typeof b==="number"&&(b&0x3ffffff)===b){w=this.c
if(w==null)return
y=this.W(w,b)
x=y==null?null:y.b
return x}else return this.cT(b)},
cT:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.ad(z,J.a8(a)&0x3ffffff)
x=this.ak(y,a)
if(x<0)return
return y[x].b},
i:function(a,b,c){var z,y,x,w,v,u
H.v(b,H.o(this,0))
H.v(c,H.o(this,1))
if(typeof b==="string"){z=this.b
if(z==null){z=this.ae()
this.b=z}this.aS(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.ae()
this.c=y}this.aS(y,b,c)}else{x=this.d
if(x==null){x=this.ae()
this.d=x}w=J.a8(b)&0x3ffffff
v=this.ad(x,w)
if(v==null)this.ah(x,w,[this.af(b,c)])
else{u=this.ak(v,b)
if(u>=0)v[u].b=c
else v.push(this.af(b,c))}}},
A:function(a,b){var z,y
H.j(b,{func:1,ret:-1,args:[H.o(this,0),H.o(this,1)]})
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.c(P.aE(this))
z=z.c}},
aS:function(a,b,c){var z
H.v(b,H.o(this,0))
H.v(c,H.o(this,1))
z=this.W(a,b)
if(z==null)this.ah(a,b,this.af(b,c))
else z.b=c},
b0:function(){this.r=this.r+1&67108863},
af:function(a,b){var z,y
z=new H.fi(H.v(a,H.o(this,0)),H.v(b,H.o(this,1)))
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.b0()
return z},
ak:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.aB(a[y].a,b))return y
return-1},
k:function(a){return P.cP(this)},
W:function(a,b){return a[b]},
ad:function(a,b){return a[b]},
ah:function(a,b,c){a[b]=c},
cm:function(a,b){delete a[b]},
cl:function(a,b){return this.W(a,b)!=null},
ae:function(){var z=Object.create(null)
this.ah(z,"<non-identifier-key>",z)
this.cm(z,"<non-identifier-key>")
return z},
$iscN:1},
fi:{"^":"b;a,b,0c,0d"},
ac:{"^":"eX;a,$ti",
gj:function(a){return this.a.a},
gw:function(a){var z,y
z=this.a
y=new H.fj(z,z.r,this.$ti)
y.c=z.e
return y}},
fj:{"^":"b;a,b,0c,0d,$ti",
saR:function(a){this.d=H.v(a,H.o(this,0))},
gB:function(a){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.c(P.aE(z))
else{z=this.c
if(z==null){this.saR(null)
return!1}else{this.saR(z.a)
this.c=this.c.c
return!0}}}},
jb:{"^":"n:5;a",
$1:function(a){return this.a(a)}},
jc:{"^":"n:10;a",
$2:function(a,b){return this.a(a,b)}},
jd:{"^":"n:11;a",
$1:function(a){return this.a(H.y(a))}}}],["","",,H,{"^":"",
j1:function(a){return J.fa(a?Object.keys(a):[],null)}}],["","",,H,{"^":"",
bK:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",
bz:function(a){var z,y
if(!!J.B(a).$isr)return a
z=new Array(a.length)
z.fixed$length=Array
for(y=0;y<a.length;++y)C.a.i(z,y,a[y])
return z},
a4:function(a,b,c){if(a>>>0!==a||a>=c)throw H.c(H.aV(b,a))},
fz:{"^":"e;",$ishk:1,"%":"DataView;ArrayBufferView;c0|dd|de|cS|df|dg|ag"},
c0:{"^":"fz;",
gj:function(a){return a.length},
$isr:1,
$asr:I.aW,
$ist:1,
$ast:I.aW},
cS:{"^":"de;",
h:function(a,b){H.a4(b,a,a.length)
return a[b]},
i:function(a,b,c){H.dx(c)
H.a4(b,a,a.length)
a[b]=c},
$asbr:function(){return[P.U]},
$asm:function(){return[P.U]},
$isi:1,
$asi:function(){return[P.U]},
$isa:1,
$asa:function(){return[P.U]},
"%":"Float64Array"},
ag:{"^":"dg;",
i:function(a,b,c){H.K(c)
H.a4(b,a,a.length)
a[b]=c},
$asbr:function(){return[P.A]},
$asm:function(){return[P.A]},
$isi:1,
$asi:function(){return[P.A]},
$isa:1,
$asa:function(){return[P.A]}},
fy:{"^":"cS;",$isa5:1,"%":"Float32Array"},
ks:{"^":"ag;",
h:function(a,b){H.a4(b,a,a.length)
return a[b]},
"%":"Int16Array"},
kt:{"^":"ag;",
h:function(a,b){H.a4(b,a,a.length)
return a[b]},
$isf8:1,
"%":"Int32Array"},
ku:{"^":"ag;",
h:function(a,b){H.a4(b,a,a.length)
return a[b]},
"%":"Int8Array"},
kv:{"^":"ag;",
h:function(a,b){H.a4(b,a,a.length)
return a[b]},
"%":"Uint16Array"},
fA:{"^":"ag;",
h:function(a,b){H.a4(b,a,a.length)
return a[b]},
$isld:1,
"%":"Uint32Array"},
kw:{"^":"ag;",
gj:function(a){return a.length},
h:function(a,b){H.a4(b,a,a.length)
return a[b]},
"%":"CanvasPixelArray|Uint8ClampedArray"},
kx:{"^":"ag;",
gj:function(a){return a.length},
h:function(a,b){H.a4(b,a,a.length)
return a[b]},
"%":";Uint8Array"},
dd:{"^":"c0+m;"},
de:{"^":"dd+br;"},
df:{"^":"c0+m;"},
dg:{"^":"df+br;"}}],["","",,P,{"^":"",
hu:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.iX()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.aU(new P.hw(z),1)).observe(y,{childList:true})
return new P.hv(z,y,x)}else if(self.setImmediate!=null)return P.iY()
return P.iZ()},
ln:[function(a){self.scheduleImmediate(H.aU(new P.hx(H.j(a,{func:1,ret:-1})),0))},"$1","iX",4,0,4],
lo:[function(a){self.setImmediate(H.aU(new P.hy(H.j(a,{func:1,ret:-1})),0))},"$1","iY",4,0,4],
lp:[function(a){H.j(a,{func:1,ret:-1})
P.iy(0,a)},"$1","iZ",4,0,4],
iT:function(a,b){if(H.be(a,{func:1,args:[P.b,P.X]}))return H.j(a,{func:1,ret:null,args:[P.b,P.X]})
if(H.be(a,{func:1,args:[P.b]}))return H.j(a,{func:1,ret:null,args:[P.b]})
throw H.c(P.cw(a,"onError","Error handler must accept one Object or one Object and a StackTrace as arguments, and return a a valid result"))},
iS:function(){var z,y
for(;z=$.ay,z!=null;){$.aS=null
y=z.b
$.ay=y
if(y==null)$.aR=null
z.a.$0()}},
lx:[function(){$.c5=!0
try{P.iS()}finally{$.aS=null
$.c5=!1
if($.ay!=null)$.ci().$1(P.dw())}},"$0","dw",0,0,1],
dr:function(a){var z=new P.d7(H.j(a,{func:1,ret:-1}))
if($.ay==null){$.aR=z
$.ay=z
if(!$.c5)$.ci().$1(P.dw())}else{$.aR.b=z
$.aR=z}},
iW:function(a){var z,y,x
H.j(a,{func:1,ret:-1})
z=$.ay
if(z==null){P.dr(a)
$.aS=$.aR
return}y=new P.d7(a)
x=$.aS
if(x==null){y.b=z
$.aS=y
$.ay=y}else{y.b=x.b
x.b=y
$.aS=y
if(y.b==null)$.aR=y}},
jo:function(a){var z,y
z={func:1,ret:-1}
H.j(a,z)
y=$.G
if(C.d===y){P.bC(null,null,C.d,a)
return}y.toString
P.bC(null,null,y,H.j(y.ba(a),z))},
bB:function(a,b,c,d,e){var z={}
z.a=d
P.iW(new P.iU(z,e))},
dp:function(a,b,c,d,e){var z,y
H.j(d,{func:1,ret:e})
y=$.G
if(y===c)return d.$0()
$.G=c
z=y
try{y=d.$0()
return y}finally{$.G=z}},
dq:function(a,b,c,d,e,f,g){var z,y
H.j(d,{func:1,ret:f,args:[g]})
H.v(e,g)
y=$.G
if(y===c)return d.$1(e)
$.G=c
z=y
try{y=d.$1(e)
return y}finally{$.G=z}},
iV:function(a,b,c,d,e,f,g,h,i){var z,y
H.j(d,{func:1,ret:g,args:[h,i]})
H.v(e,h)
H.v(f,i)
y=$.G
if(y===c)return d.$2(e,f)
$.G=c
z=y
try{y=d.$2(e,f)
return y}finally{$.G=z}},
bC:function(a,b,c,d){var z
H.j(d,{func:1,ret:-1})
z=C.d!==c
if(z)d=!(!z||!1)?c.ba(d):c.cF(d,-1)
P.dr(d)},
hw:{"^":"n:6;a",
$1:function(a){var z,y
z=this.a
y=z.a
z.a=null
y.$0()}},
hv:{"^":"n:12;a,b,c",
$1:function(a){var z,y
this.a.a=H.j(a,{func:1,ret:-1})
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)}},
hx:{"^":"n:0;a",
$0:function(){this.a.$0()}},
hy:{"^":"n:0;a",
$0:function(){this.a.$0()}},
ix:{"^":"b;a,0b,c",
cf:function(a,b){if(self.setTimeout!=null)this.b=self.setTimeout(H.aU(new P.iz(this,b),0),a)
else throw H.c(P.w("`setTimeout()` not found."))},
p:{
iy:function(a,b){var z=new P.ix(!0,0)
z.cf(a,b)
return z}}},
iz:{"^":"n:1;a,b",
$0:function(){var z=this.a
z.b=null
z.c=1
this.b.$0()}},
hA:{"^":"b;$ti"},
iu:{"^":"hA;a,$ti"},
ax:{"^":"b;0a,b,c,d,e,$ti",
cU:function(a){if(this.c!==6)return!0
return this.b.b.an(H.j(this.d,{func:1,ret:P.c7,args:[P.b]}),a.a,P.c7,P.b)},
cR:function(a){var z,y,x,w
z=this.e
y=P.b
x={futureOr:1,type:H.o(this,1)}
w=this.b.b
if(H.be(z,{func:1,args:[P.b,P.X]}))return H.bE(w.cZ(z,a.a,a.b,null,y,P.X),x)
else return H.bE(w.an(H.j(z,{func:1,args:[P.b]}),a.a,null,y),x)}},
a3:{"^":"b;b4:a<,b,0cv:c<,$ti",
bG:function(a,b,c){var z,y,x,w
z=H.o(this,0)
H.j(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
y=$.G
if(y!==C.d){y.toString
H.j(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
if(b!=null)b=P.iT(b,y)}H.j(a,{func:1,ret:{futureOr:1,type:c},args:[z]})
x=new P.a3(0,$.G,[c])
w=b==null?1:3
this.aT(new P.ax(x,w,a,b,[z,c]))
return x},
bF:function(a,b){return this.bG(a,null,b)},
aT:function(a){var z,y
z=this.a
if(z<=1){a.a=H.h(this.c,"$isax")
this.c=a}else{if(z===2){y=H.h(this.c,"$isa3")
z=y.a
if(z<4){y.aT(a)
return}this.a=z
this.c=y.c}z=this.b
z.toString
P.bC(null,null,z,H.j(new P.hN(this,a),{func:1,ret:-1}))}},
b1:function(a){var z,y,x,w,v,u
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=H.h(this.c,"$isax")
this.c=a
if(x!=null){for(w=a;v=w.a,v!=null;w=v);w.a=x}}else{if(y===2){u=H.h(this.c,"$isa3")
y=u.a
if(y<4){u.b1(a)
return}this.a=y
this.c=u.c}z.a=this.X(a)
y=this.b
y.toString
P.bC(null,null,y,H.j(new P.hS(z,this),{func:1,ret:-1}))}},
ag:function(){var z=H.h(this.c,"$isax")
this.c=null
return this.X(z)},
X:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.a
z.a=y}return y},
a8:function(a){var z,y,x
z=H.o(this,0)
H.bE(a,{futureOr:1,type:z})
y=this.$ti
if(H.aA(a,"$isaG",y,"$asaG"))if(H.aA(a,"$isa3",y,null))P.d9(a,this)
else P.hO(a,this)
else{x=this.ag()
H.v(a,z)
this.a=4
this.c=a
P.aQ(this,x)}},
aW:function(a,b){var z
H.h(b,"$isX")
z=this.ag()
this.a=8
this.c=new P.R(a,b)
P.aQ(this,z)},
$isaG:1,
p:{
hO:function(a,b){var z,y,x
b.a=1
try{a.bG(new P.hP(b),new P.hQ(b),null)}catch(x){z=H.b_(x)
y=H.aY(x)
P.jo(new P.hR(b,z,y))}},
d9:function(a,b){var z,y
for(;z=a.a,z===2;)a=H.h(a.c,"$isa3")
if(z>=4){y=b.ag()
b.a=a.a
b.c=a.c
P.aQ(b,y)}else{y=H.h(b.c,"$isax")
b.a=2
b.c=a
a.b1(y)}},
aQ:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z={}
z.a=a
for(y=a;!0;){x={}
w=y.a===8
if(b==null){if(w){v=H.h(y.c,"$isR")
y=y.b
u=v.a
t=v.b
y.toString
P.bB(null,null,y,u,t)}return}for(;s=b.a,s!=null;b=s){b.a=null
P.aQ(z.a,b)}y=z.a
r=y.c
x.a=w
x.b=r
u=!w
if(u){t=b.c
t=(t&1)!==0||t===8}else t=!0
if(t){t=b.b
q=t.b
if(w){p=y.b
p.toString
p=p==q
if(!p)q.toString
else p=!0
p=!p}else p=!1
if(p){H.h(r,"$isR")
y=y.b
u=r.a
t=r.b
y.toString
P.bB(null,null,y,u,t)
return}o=$.G
if(o!=q)$.G=q
else o=null
y=b.c
if(y===8)new P.hV(z,x,b,w).$0()
else if(u){if((y&1)!==0)new P.hU(x,b,r).$0()}else if((y&2)!==0)new P.hT(z,x,b).$0()
if(o!=null)$.G=o
y=x.b
if(!!J.B(y).$isaG){if(y.a>=4){n=H.h(t.c,"$isax")
t.c=null
b=t.X(n)
t.a=y.a
t.c=y.c
z.a=y
continue}else P.d9(y,t)
return}}m=b.b
n=H.h(m.c,"$isax")
m.c=null
b=m.X(n)
y=x.a
u=x.b
if(!y){H.v(u,H.o(m,0))
m.a=4
m.c=u}else{H.h(u,"$isR")
m.a=8
m.c=u}z.a=m
y=m}}}},
hN:{"^":"n:0;a,b",
$0:function(){P.aQ(this.a,this.b)}},
hS:{"^":"n:0;a,b",
$0:function(){P.aQ(this.b,this.a.a)}},
hP:{"^":"n:6;a",
$1:function(a){var z=this.a
z.a=0
z.a8(a)}},
hQ:{"^":"n:13;a",
$2:function(a,b){H.h(b,"$isX")
this.a.aW(a,b)},
$1:function(a){return this.$2(a,null)}},
hR:{"^":"n:0;a,b,c",
$0:function(){this.a.aW(this.b,this.c)}},
hV:{"^":"n:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{w=this.c
z=w.b.b.bC(H.j(w.d,{func:1}),null)}catch(v){y=H.b_(v)
x=H.aY(v)
if(this.d){w=H.h(this.a.a.c,"$isR").a
u=y
u=w==null?u==null:w===u
w=u}else w=!1
u=this.b
if(w)u.b=H.h(this.a.a.c,"$isR")
else u.b=new P.R(y,x)
u.a=!0
return}if(!!J.B(z).$isaG){if(z instanceof P.a3&&z.gb4()>=4){if(z.gb4()===8){w=this.b
w.b=H.h(z.gcv(),"$isR")
w.a=!0}return}t=this.a.a
w=this.b
w.b=z.bF(new P.hW(t),null)
w.a=!1}}},
hW:{"^":"n:14;a",
$1:function(a){return this.a}},
hU:{"^":"n:1;a,b,c",
$0:function(){var z,y,x,w,v,u,t
try{x=this.b
w=H.o(x,0)
v=H.v(this.c,w)
u=H.o(x,1)
this.a.b=x.b.b.an(H.j(x.d,{func:1,ret:{futureOr:1,type:u},args:[w]}),v,{futureOr:1,type:u},w)}catch(t){z=H.b_(t)
y=H.aY(t)
x=this.a
x.b=new P.R(z,y)
x.a=!0}}},
hT:{"^":"n:1;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=H.h(this.a.a.c,"$isR")
w=this.c
if(w.cU(z)&&w.e!=null){v=this.b
v.b=w.cR(z)
v.a=!1}}catch(u){y=H.b_(u)
x=H.aY(u)
w=H.h(this.a.a.c,"$isR")
v=w.a
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w
else s.b=new P.R(y,x)
s.a=!0}}},
d7:{"^":"b;a,0b"},
h9:{"^":"b;$ti",
gj:function(a){var z,y,x,w
z={}
y=new P.a3(0,$.G,[P.A])
z.a=0
x=H.o(this,0)
w=H.j(new P.hb(z,this),{func:1,ret:-1,args:[x]})
H.j(new P.hc(z,y),{func:1,ret:-1})
W.ap(this.a,this.b,w,!1,x)
return y}},
hb:{"^":"n;a,b",
$1:function(a){H.v(a,H.o(this.b,0));++this.a.a},
$S:function(){return{func:1,ret:P.F,args:[H.o(this.b,0)]}}},
hc:{"^":"n:0;a,b",
$0:function(){this.b.a8(this.a.a)}},
ha:{"^":"b;"},
R:{"^":"b;a,b",
k:function(a){return H.d(this.a)},
$isL:1},
iE:{"^":"b;",$isll:1},
iU:{"^":"n:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cU()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.c(z)
x=H.c(z)
x.stack=y.k(0)
throw x}},
ih:{"^":"iE;",
d_:function(a){var z,y,x
H.j(a,{func:1,ret:-1})
try{if(C.d===$.G){a.$0()
return}P.dp(null,null,this,a,-1)}catch(x){z=H.b_(x)
y=H.aY(x)
P.bB(null,null,this,z,H.h(y,"$isX"))}},
d0:function(a,b,c){var z,y,x
H.j(a,{func:1,ret:-1,args:[c]})
H.v(b,c)
try{if(C.d===$.G){a.$1(b)
return}P.dq(null,null,this,a,b,-1,c)}catch(x){z=H.b_(x)
y=H.aY(x)
P.bB(null,null,this,z,H.h(y,"$isX"))}},
cF:function(a,b){return new P.ij(this,H.j(a,{func:1,ret:b}),b)},
ba:function(a){return new P.ii(this,H.j(a,{func:1,ret:-1}))},
cG:function(a,b){return new P.ik(this,H.j(a,{func:1,ret:-1,args:[b]}),b)},
h:function(a,b){return},
bC:function(a,b){H.j(a,{func:1,ret:b})
if($.G===C.d)return a.$0()
return P.dp(null,null,this,a,b)},
an:function(a,b,c,d){H.j(a,{func:1,ret:c,args:[d]})
H.v(b,d)
if($.G===C.d)return a.$1(b)
return P.dq(null,null,this,a,b,c,d)},
cZ:function(a,b,c,d,e,f){H.j(a,{func:1,ret:d,args:[e,f]})
H.v(b,e)
H.v(c,f)
if($.G===C.d)return a.$2(b,c)
return P.iV(null,null,this,a,b,c,d,e,f)}},
ij:{"^":"n;a,b,c",
$0:function(){return this.a.bC(this.b,this.c)},
$S:function(){return{func:1,ret:this.c}}},
ii:{"^":"n:1;a,b",
$0:function(){return this.a.d_(this.b)}},
ik:{"^":"n;a,b,c",
$1:function(a){var z=this.c
return this.a.d0(this.b,H.v(a,z),z)},
$S:function(){return{func:1,ret:-1,args:[this.c]}}}}],["","",,P,{"^":"",
cO:function(a,b,c){H.bh(a)
return H.x(H.j2(a,new H.cM(0,0,[b,c])),"$iscN",[b,c],"$ascN")},
a1:function(a,b){return new H.cM(0,0,[a,b])},
ad:function(a,b,c,d){return new P.i3(0,0,[d])},
f9:function(a,b,c){var z,y
if(P.c6(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=H.p([],[P.f])
y=$.b0()
C.a.l(y,a)
try{P.iR(a,z)}finally{if(0>=y.length)return H.k(y,-1)
y.pop()}y=P.cY(b,H.ji(z,"$isi"),", ")+c
return y.charCodeAt(0)==0?y:y},
bX:function(a,b,c){var z,y,x
if(P.c6(a))return b+"..."+c
z=new P.c1(b)
y=$.b0()
C.a.l(y,a)
try{x=z
x.a=P.cY(x.gL(),a,", ")}finally{if(0>=y.length)return H.k(y,-1)
y.pop()}y=z
y.a=y.gL()+c
y=z.gL()
return y.charCodeAt(0)==0?y:y},
c6:function(a){var z,y
for(z=0;y=$.b0(),z<y.length;++z)if(a===y[z])return!0
return!1},
iR:function(a,b){var z,y,x,w,v,u,t,s,r,q
H.x(b,"$isa",[P.f],"$asa")
z=a.gw(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.u())return
w=H.d(z.gB(z))
C.a.l(b,w)
y+=w.length+2;++x}if(!z.u()){if(x<=5)return
if(0>=b.length)return H.k(b,-1)
v=b.pop()
if(0>=b.length)return H.k(b,-1)
u=b.pop()}else{t=z.gB(z);++x
if(!z.u()){if(x<=4){C.a.l(b,H.d(t))
return}v=H.d(t)
if(0>=b.length)return H.k(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gB(z);++x
for(;z.u();t=s,s=r){r=z.gB(z);++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.k(b,-1)
y-=b.pop().length+2;--x}C.a.l(b,"...")
return}}u=H.d(t)
v=H.d(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.k(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)C.a.l(b,q)
C.a.l(b,u)
C.a.l(b,v)},
fk:function(a,b){var z,y,x
z=P.ad(null,null,null,b)
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.M)(a),++x)z.l(0,H.v(a[x],b))
return z},
cP:function(a){var z,y,x
z={}
if(P.c6(a))return"{...}"
y=new P.c1("")
try{C.a.l($.b0(),a)
x=y
x.a=x.gL()+"{"
z.a=!0
J.ef(a,new P.fn(z,y))
z=y
z.a=z.gL()+"}"}finally{z=$.b0()
if(0>=z.length)return H.k(z,-1)
z.pop()}z=y.gL()
return z.charCodeAt(0)==0?z:z},
i3:{"^":"hY;a,0b,0c,0d,0e,0f,r,$ti",
gw:function(a){return P.dc(this,this.r,H.o(this,0))},
gj:function(a){return this.a},
E:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return H.h(z[b],"$isbd")!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return H.h(y[b],"$isbd")!=null}else return this.ck(b)},
ck:function(a){var z=this.d
if(z==null)return!1
return this.ac(this.aZ(z,a),a)>=0},
l:function(a,b){var z,y
H.v(b,H.o(this,0))
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){z=P.c3()
this.b=z}return this.aU(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=P.c3()
this.c=y}return this.aU(y,b)}else return this.cg(0,b)},
cg:function(a,b){var z,y,x
H.v(b,H.o(this,0))
z=this.d
if(z==null){z=P.c3()
this.d=z}y=this.aX(b)
x=z[y]
if(x==null)z[y]=[this.a7(b)]
else{if(this.ac(x,b)>=0)return!1
x.push(this.a7(b))}return!0},
bB:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.b2(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.b2(this.c,b)
else return this.ct(0,b)},
ct:function(a,b){var z,y,x
z=this.d
if(z==null)return!1
y=this.aZ(z,b)
x=this.ac(y,b)
if(x<0)return!1
this.b6(y.splice(x,1)[0])
return!0},
S:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.a6()}},
aU:function(a,b){H.v(b,H.o(this,0))
if(H.h(a[b],"$isbd")!=null)return!1
a[b]=this.a7(b)
return!0},
b2:function(a,b){var z
if(a==null)return!1
z=H.h(a[b],"$isbd")
if(z==null)return!1
this.b6(z)
delete a[b]
return!0},
a6:function(){this.r=this.r+1&67108863},
a7:function(a){var z,y
z=new P.bd(H.v(a,H.o(this,0)))
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.a6()
return z},
b6:function(a){var z,y
z=a.c
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.a6()},
aX:function(a){return J.a8(a)&0x3ffffff},
aZ:function(a,b){return a[this.aX(b)]},
ac:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.aB(a[y].a,b))return y
return-1},
p:{
c3:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
bd:{"^":"b;a,0b,0c"},
i4:{"^":"b;a,b,0c,0d,$ti",
saV:function(a){this.d=H.v(a,H.o(this,0))},
gB:function(a){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.c(P.aE(z))
else{z=this.c
if(z==null){this.saV(null)
return!1}else{this.saV(H.v(z.a,H.o(this,0)))
this.c=this.c.b
return!0}}},
p:{
dc:function(a,b,c){var z=new P.i4(a,b,[c])
z.c=a.e
return z}}},
hY:{"^":"fY;"},
m:{"^":"b;$ti",
gw:function(a){return new H.fl(a,this.gj(a),0,[H.bf(this,a,"m",0)])},
q:function(a,b){return this.h(a,b)},
cQ:function(a,b,c,d){var z,y,x
H.v(b,d)
H.j(c,{func:1,ret:d,args:[d,H.bf(this,a,"m",0)]})
z=this.gj(a)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.h(a,x))
if(z!==this.gj(a))throw H.c(P.aE(a))}return y},
k:function(a){return P.bX(a,"[","]")}},
fm:{"^":"Q;"},
fn:{"^":"n:7;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.a+=", "
z.a=!1
z=this.b
y=z.a+=H.d(a)
z.a=y+": "
z.a+=H.d(b)}},
Q:{"^":"b;$ti",
A:function(a,b){var z,y
H.j(b,{func:1,ret:-1,args:[H.bf(this,a,"Q",0),H.bf(this,a,"Q",1)]})
for(z=J.cn(this.gI(a));z.u();){y=z.gB(z)
b.$2(y,this.h(a,y))}},
gj:function(a){return J.b3(this.gI(a))},
k:function(a){return P.cP(a)},
$isJ:1},
fZ:{"^":"b;$ti",
k:function(a){return P.bX(this,"{","}")},
$isi:1,
$iskP:1},
fY:{"^":"fZ;"}}],["","",,P,{"^":"",
eY:function(a){if(a instanceof H.n)return a.k(0)
return"Instance of '"+H.aM(a)+"'"},
bq:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.bn(a)
if(typeof a==="string")return JSON.stringify(a)
return P.eY(a)},
cH:function(a){return new P.hK(a)},
as:function(a){H.bK(H.d(a))},
c7:{"^":"b;"},
"+bool":0,
bp:{"^":"b;a,b",
v:function(a,b){if(b==null)return!1
return b instanceof P.bp&&this.a===b.a&&!0},
G:function(a,b){return C.e.G(this.a,H.h(b,"$isbp").a)},
gt:function(a){var z=this.a
return(z^C.e.b3(z,30))&1073741823},
k:function(a){var z,y,x,w,v,u,t,s
z=P.eP(H.fP(this))
y=P.b4(H.fN(this))
x=P.b4(H.fJ(this))
w=P.b4(H.fK(this))
v=P.b4(H.fM(this))
u=P.b4(H.fO(this))
t=P.eQ(H.fL(this))
s=z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t
return s},
$isP:1,
$asP:function(){return[P.bp]},
p:{
eP:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+z
if(z>=10)return y+"00"+z
return y+"000"+z},
eQ:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
b4:function(a){if(a>=10)return""+a
return"0"+a}}},
U:{"^":"D;"},
"+double":0,
aF:{"^":"b;a",
K:function(a,b){return C.e.K(this.a,H.h(b,"$isaF").a)},
v:function(a,b){if(b==null)return!1
return b instanceof P.aF&&this.a===b.a},
gt:function(a){return this.a&0x1FFFFFFF},
G:function(a,b){return C.e.G(this.a,H.h(b,"$isaF").a)},
k:function(a){var z,y,x,w,v
z=new P.eW()
y=this.a
if(y<0)return"-"+new P.aF(0-y).k(0)
x=z.$1(C.e.R(y,6e7)%60)
w=z.$1(C.e.R(y,1e6)%60)
v=new P.eV().$1(y%1e6)
return""+C.e.R(y,36e8)+":"+H.d(x)+":"+H.d(w)+"."+H.d(v)},
$isP:1,
$asP:function(){return[P.aF]},
p:{
eU:function(a,b,c,d,e,f){return new P.aF(864e8*a+36e8*b+6e7*e+1e6*f+1000*d+c)}}},
eV:{"^":"n:8;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a}},
eW:{"^":"n:8;",
$1:function(a){if(a>=10)return""+a
return"0"+a}},
L:{"^":"b;"},
cU:{"^":"L;",
k:function(a){return"Throw of null."}},
aC:{"^":"L;a,b,c,d",
gaa:function(){return"Invalid argument"+(!this.a?"(s)":"")},
ga9:function(){return""},
k:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+z
w=this.gaa()+y+x
if(!this.a)return w
v=this.ga9()
u=P.bq(this.b)
return w+v+": "+u},
p:{
cw:function(a,b,c){return new P.aC(!0,a,b,c)}}},
cV:{"^":"aC;e,f,a,b,c,d",
gaa:function(){return"RangeError"},
ga9:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.d(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.d(z)
else if(x>z)y=": Not in range "+H.d(z)+".."+H.d(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.d(z)}return y},
p:{
bt:function(a,b,c){return new P.cV(null,null,!0,a,b,"Value not in range")},
fR:function(a,b,c,d,e){return new P.cV(b,c,!0,a,d,"Invalid value")}}},
f7:{"^":"aC;e,j:f>,a,b,c,d",
gaa:function(){return"RangeError"},
ga9:function(){var z,y
z=H.K(this.b)
if(typeof z!=="number")return z.V()
if(z<0)return": index must not be negative"
y=this.f
if(y===0)return": no indices are valid"
return": index should be less than "+H.d(y)},
p:{
E:function(a,b,c,d,e){var z=H.K(e==null?J.b3(b):e)
return new P.f7(b,z,!0,a,c,"Index out of range")}}},
ho:{"^":"L;a",
k:function(a){return"Unsupported operation: "+this.a},
p:{
w:function(a){return new P.ho(a)}}},
hm:{"^":"L;a",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+z:"UnimplementedError"},
p:{
d5:function(a){return new P.hm(a)}}},
h5:{"^":"L;a",
k:function(a){return"Bad state: "+this.a},
p:{
h6:function(a){return new P.h5(a)}}},
eK:{"^":"L;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+P.bq(z)+"."},
p:{
aE:function(a){return new P.eK(a)}}},
cX:{"^":"b;",
k:function(a){return"Stack Overflow"},
$isL:1},
eO:{"^":"L;a",
k:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+z+"' during its initialization"}},
hK:{"^":"b;a",
k:function(a){return"Exception: "+this.a}},
A:{"^":"D;"},
"+int":0,
i:{"^":"b;$ti",
gj:function(a){var z,y
z=this.gw(this)
for(y=0;z.u();)++y
return y},
k:function(a){return P.f9(this,"(",")")}},
a:{"^":"b;$ti",$isi:1},
"+List":0,
J:{"^":"b;$ti"},
F:{"^":"b;",
gt:function(a){return P.b.prototype.gt.call(this,this)},
k:function(a){return"null"}},
"+Null":0,
D:{"^":"b;",$isP:1,
$asP:function(){return[P.D]}},
"+num":0,
b:{"^":";",
v:function(a,b){return this===b},
gt:function(a){return H.aL(this)},
k:function(a){return"Instance of '"+H.aM(this)+"'"},
toString:function(){return this.k(this)}},
X:{"^":"b;"},
f:{"^":"b;",$isP:1,
$asP:function(){return[P.f]},
$isfE:1},
"+String":0,
c1:{"^":"b;L:a<",
gj:function(a){return this.a.length},
k:function(a){var z=this.a
return z.charCodeAt(0)==0?z:z},
p:{
cY:function(a,b,c){var z=J.cn(b)
if(!z.u())return a
if(c.length===0){do a+=H.d(z.gB(z))
while(z.u())}else{a+=H.d(z.gB(z))
for(;z.u();)a=a+c+H.d(z.gB(z))}return a}}}}],["","",,W,{"^":"",
cG:function(a){H.h(a,"$isI")
return"wheel"},
by:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
db:function(a,b,c,d){var z,y
z=W.by(W.by(W.by(W.by(0,a),b),c),d)
y=536870911&z+((67108863&z)<<3)
y^=y>>>11
return 536870911&y+((16383&y)<<15)},
dm:function(a){var z
if(a==null)return
if("postMessage" in a){z=W.hD(a)
if(!!J.B(z).$isI)return z
return}else return H.h(a,"$isI")},
dt:function(a,b){var z
H.j(a,{func:1,ret:-1,args:[b]})
z=$.G
if(z===C.d)return a
return z.cG(a,b)},
W:{"^":"b5;","%":"HTMLBRElement|HTMLBaseElement|HTMLBodyElement|HTMLButtonElement|HTMLContentElement|HTMLDListElement|HTMLDataElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFieldSetElement|HTMLFontElement|HTMLFrameElement|HTMLFrameSetElement|HTMLHRElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLLIElement|HTMLLabelElement|HTMLLegendElement|HTMLLinkElement|HTMLMapElement|HTMLMarqueeElement|HTMLMenuElement|HTMLMetaElement|HTMLMeterElement|HTMLModElement|HTMLOListElement|HTMLOptGroupElement|HTMLOptionElement|HTMLOutputElement|HTMLParagraphElement|HTMLParamElement|HTMLPictureElement|HTMLPreElement|HTMLProgressElement|HTMLQuoteElement|HTMLScriptElement|HTMLShadowElement|HTMLSlotElement|HTMLSourceElement|HTMLSpanElement|HTMLStyleElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTextAreaElement|HTMLTimeElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement;HTMLElement"},
js:{"^":"e;0j:length=","%":"AccessibleNodeList"},
jt:{"^":"W;",
k:function(a){return String(a)},
"%":"HTMLAnchorElement"},
ju:{"^":"W;",
k:function(a){return String(a)},
"%":"HTMLAreaElement"},
eB:{"^":"e;","%":";Blob"},
bT:{"^":"W;0n:height=,0m:width=",
ap:function(a,b,c){if(c!=null)return this.co(a,b,P.j_(c,null))
return this.cp(a,b)},
bW:function(a,b){return this.ap(a,b,null)},
co:function(a,b,c){return a.getContext(b,c)},
cp:function(a,b){return a.getContext(b)},
$isbT:1,
"%":"HTMLCanvasElement"},
eD:{"^":"e;",
Z:function(a,b,c){return a.addColorStop(b,c)},
"%":"CanvasGradient"},
bU:{"^":"e;",
bj:function(a,b,c,d,e,f,g){return a.createRadialGradient(b,c,d,e,f,g)},
cP:function(a,b,c,d,e){return a.fillRect(b,c,d,e)},
a2:function(a){return P.T(a.getContextAttributes())},
$isbU:1,
"%":"CanvasRenderingContext2D"},
jA:{"^":"C;0j:length=","%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
eL:{"^":"bV;",$iseL:1,"%":"CSSNumericValue|CSSUnitValue"},
jB:{"^":"eN;0j:length=","%":"CSSPerspective"},
a9:{"^":"e;",$isa9:1,"%":"CSSCharsetRule|CSSConditionRule|CSSFontFaceRule|CSSGroupingRule|CSSImportRule|CSSKeyframeRule|CSSKeyframesRule|CSSMediaRule|CSSNamespaceRule|CSSPageRule|CSSRule|CSSStyleRule|CSSSupportsRule|CSSViewportRule|MozCSSKeyframeRule|MozCSSKeyframesRule|WebKitCSSKeyframeRule|WebKitCSSKeyframesRule"},
jC:{"^":"hB;0j:length=",
au:function(a,b){var z=this.cq(a,this.cj(a,b))
return z==null?"":z},
cj:function(a,b){var z,y
z=$.dI()
y=z[b]
if(typeof y==="string")return y
y=this.cz(a,b)
z[b]=y
return y},
cz:function(a,b){var z
if(b.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,function(c,d){return d.toUpperCase()}) in a)return b
z=P.eR()+b
if(z in a)return z
return b},
cq:function(a,b){return a.getPropertyValue(b)},
gn:function(a){return a.height},
gm:function(a){return a.width},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
eM:{"^":"b;",
gn:function(a){return this.au(a,"height")},
gm:function(a){return this.au(a,"width")}},
bV:{"^":"e;","%":"CSSImageValue|CSSKeywordValue|CSSPositionValue|CSSResourceValue|CSSURLImageValue;CSSStyleValue"},
eN:{"^":"e;","%":"CSSMatrixComponent|CSSRotation|CSSScale|CSSSkew|CSSTranslation;CSSTransformComponent"},
jE:{"^":"bV;0j:length=","%":"CSSTransformValue"},
jF:{"^":"bV;0j:length=","%":"CSSUnparsedValue"},
jH:{"^":"e;0j:length=",
h:function(a,b){return a[b]},
"%":"DataTransferItemList"},
eS:{"^":"C;",
cW:function(a,b){return a.querySelector(b)},
gbw:function(a){return new W.bc(a,"mousedown",!1,[W.N])},
gbx:function(a){return new W.bc(a,"mousemove",!1,[W.N])},
gby:function(a){return new W.bc(a,"mouseup",!1,[W.N])},
gbz:function(a){return new W.bc(a,H.y(W.cG(a)),!1,[W.aw])},
"%":"XMLDocument;Document"},
jI:{"^":"e;",
k:function(a){return String(a)},
"%":"DOMException"},
jJ:{"^":"hF;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.E(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.x(c,"$isO",[P.D],"$asO")
throw H.c(P.w("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.k(a,b)
return a[b]},
$isr:1,
$asr:function(){return[[P.O,P.D]]},
$ist:1,
$ast:function(){return[[P.O,P.D]]},
$asm:function(){return[[P.O,P.D]]},
$isi:1,
$asi:function(){return[[P.O,P.D]]},
$isa:1,
$asa:function(){return[[P.O,P.D]]},
$asq:function(){return[[P.O,P.D]]},
"%":"ClientRectList|DOMRectList"},
eT:{"^":"e;",
k:function(a){return"Rectangle ("+H.d(a.left)+", "+H.d(a.top)+") "+H.d(this.gm(a))+" x "+H.d(this.gn(a))},
v:function(a,b){var z
if(b==null)return!1
if(!H.aA(b,"$isO",[P.D],"$asO"))return!1
if(a.left===b.left)if(a.top===b.top){z=J.l(b)
z=this.gm(a)===z.gm(b)&&this.gn(a)===z.gn(b)}else z=!1
else z=!1
return z},
gt:function(a){return W.db(a.left&0x1FFFFFFF,a.top&0x1FFFFFFF,this.gm(a)&0x1FFFFFFF,this.gn(a)&0x1FFFFFFF)},
gn:function(a){return a.height},
gm:function(a){return a.width},
$isO:1,
$asO:function(){return[P.D]},
"%":";DOMRectReadOnly"},
jK:{"^":"hH;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.E(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.y(c)
throw H.c(P.w("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.k(a,b)
return a[b]},
$isr:1,
$asr:function(){return[P.f]},
$ist:1,
$ast:function(){return[P.f]},
$asm:function(){return[P.f]},
$isi:1,
$asi:function(){return[P.f]},
$isa:1,
$asa:function(){return[P.f]},
$asq:function(){return[P.f]},
"%":"DOMStringList"},
jL:{"^":"e;0j:length=","%":"DOMTokenList"},
b5:{"^":"C;",
k:function(a){return a.localName},
gbw:function(a){return new W.bx(a,"mousedown",!1,[W.N])},
gbx:function(a){return new W.bx(a,"mousemove",!1,[W.N])},
gby:function(a){return new W.bx(a,"mouseup",!1,[W.N])},
gbz:function(a){return new W.bx(a,H.y(W.cG(a)),!1,[W.aw])},
$isb5:1,
"%":";Element"},
jN:{"^":"W;0n:height=,0m:width=","%":"HTMLEmbedElement"},
V:{"^":"e;",$isV:1,"%":"AbortPaymentEvent|AnimationEvent|AnimationPlaybackEvent|ApplicationCacheErrorEvent|AudioProcessingEvent|BackgroundFetchClickEvent|BackgroundFetchEvent|BackgroundFetchFailEvent|BackgroundFetchedEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|BlobEvent|CanMakePaymentEvent|ClipboardEvent|CloseEvent|CustomEvent|DeviceMotionEvent|DeviceOrientationEvent|ErrorEvent|ExtendableEvent|ExtendableMessageEvent|FetchEvent|FontFaceSetLoadEvent|ForeignFetchEvent|GamepadEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaKeyMessageEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|MojoInterfaceRequestEvent|MutationEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PaymentRequestEvent|PaymentRequestUpdateEvent|PopStateEvent|PresentationConnectionAvailableEvent|PresentationConnectionCloseEvent|ProgressEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCPeerConnectionIceEvent|RTCTrackEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|SensorErrorEvent|SpeechRecognitionError|SpeechRecognitionEvent|SpeechSynthesisEvent|StorageEvent|SyncEvent|TrackEvent|TransitionEvent|USBConnectionEvent|VRDeviceEvent|VRDisplayEvent|VRSessionEvent|WebGLContextEvent|WebKitTransitionEvent;Event|InputEvent"},
I:{"^":"e;",
cC:function(a,b,c,d){H.j(c,{func:1,args:[W.V]})
if(c!=null)this.ci(a,b,c,!1)},
ci:function(a,b,c,d){return a.addEventListener(b,H.aU(H.j(c,{func:1,args:[W.V]}),1),!1)},
$isI:1,
"%":"AbsoluteOrientationSensor|Accelerometer|AccessibleNode|AmbientLightSensor|AnalyserNode|Animation|ApplicationCache|AudioBufferSourceNode|AudioChannelMerger|AudioChannelSplitter|AudioDestinationNode|AudioGainNode|AudioNode|AudioPannerNode|AudioScheduledSourceNode|AudioWorkletNode|BackgroundFetchRegistration|BatteryManager|BiquadFilterNode|BluetoothDevice|BluetoothRemoteGATTCharacteristic|BroadcastChannel|CanvasCaptureMediaStreamTrack|ChannelMergerNode|ChannelSplitterNode|Clipboard|ConstantSourceNode|ConvolverNode|DOMApplicationCache|DataChannel|DedicatedWorkerGlobalScope|DelayNode|DynamicsCompressorNode|EventSource|FileReader|FontFaceSet|GainNode|Gyroscope|IDBDatabase|IDBOpenDBRequest|IDBRequest|IDBTransaction|IDBVersionChangeRequest|IIRFilterNode|JavaScriptAudioNode|LinearAccelerationSensor|MIDIAccess|MIDIInput|MIDIOutput|MIDIPort|Magnetometer|MediaDevices|MediaElementAudioSourceNode|MediaKeySession|MediaQueryList|MediaRecorder|MediaSource|MediaStream|MediaStreamAudioDestinationNode|MediaStreamAudioSourceNode|MediaStreamTrack|MessagePort|MojoInterfaceInterceptor|NetworkInformation|Notification|OfflineResourceList|OrientationSensor|Oscillator|OscillatorNode|PannerNode|PaymentRequest|Performance|PermissionStatus|PresentationAvailability|PresentationConnection|PresentationConnectionList|PresentationRequest|RTCDTMFSender|RTCDataChannel|RTCPeerConnection|RealtimeAnalyserNode|RelativeOrientationSensor|RemotePlayback|ScreenOrientation|ScriptProcessorNode|Sensor|ServiceWorker|ServiceWorkerContainer|ServiceWorkerGlobalScope|ServiceWorkerRegistration|SharedWorker|SharedWorkerGlobalScope|SpeechRecognition|SpeechSynthesis|SpeechSynthesisUtterance|StereoPannerNode|USB|VR|VRDevice|VRDisplay|VRSession|WaveShaperNode|WebSocket|Worker|WorkerGlobalScope|WorkerPerformance|XMLHttpRequest|XMLHttpRequestEventTarget|XMLHttpRequestUpload|mozRTCPeerConnection|webkitAudioPannerNode|webkitRTCPeerConnection;EventTarget;dh|di|dk|dl"},
aa:{"^":"eB;",$isaa:1,"%":"File"},
k3:{"^":"hM;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.E(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.h(c,"$isaa")
throw H.c(P.w("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.k(a,b)
return a[b]},
$isr:1,
$asr:function(){return[W.aa]},
$ist:1,
$ast:function(){return[W.aa]},
$asm:function(){return[W.aa]},
$isi:1,
$asi:function(){return[W.aa]},
$isa:1,
$asa:function(){return[W.aa]},
$asq:function(){return[W.aa]},
"%":"FileList"},
k4:{"^":"I;0j:length=","%":"FileWriter"},
k7:{"^":"W;0j:length=","%":"HTMLFormElement"},
ab:{"^":"e;",$isab:1,"%":"Gamepad"},
k8:{"^":"e;0j:length=","%":"History"},
k9:{"^":"i_;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.E(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.h(c,"$isC")
throw H.c(P.w("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.k(a,b)
return a[b]},
$isr:1,
$asr:function(){return[W.C]},
$ist:1,
$ast:function(){return[W.C]},
$asm:function(){return[W.C]},
$isi:1,
$asi:function(){return[W.C]},
$isa:1,
$asa:function(){return[W.C]},
$asq:function(){return[W.C]},
"%":"HTMLCollection|HTMLFormControlsCollection|HTMLOptionsCollection"},
f5:{"^":"eS;","%":"HTMLDocument"},
ka:{"^":"W;0n:height=,0m:width=","%":"HTMLIFrameElement"},
kb:{"^":"e;0n:height=,0m:width=","%":"ImageBitmap"},
kc:{"^":"e;0n:height=,0m:width=","%":"ImageData"},
kd:{"^":"W;0n:height=,0m:width=","%":"HTMLImageElement"},
kf:{"^":"W;0n:height=,0m:width=","%":"HTMLInputElement"},
aH:{"^":"d4;",$isaH:1,"%":"KeyboardEvent"},
kl:{"^":"e;",
k:function(a){return String(a)},
"%":"Location"},
fo:{"^":"W;","%":"HTMLAudioElement;HTMLMediaElement"},
ko:{"^":"e;0j:length=","%":"MediaList"},
kp:{"^":"i5;",
h:function(a,b){return P.T(a.get(H.y(b)))},
A:function(a,b){var z,y
H.j(b,{func:1,ret:-1,args:[P.f,,]})
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.T(y.value[1]))}},
gI:function(a){var z=H.p([],[P.f])
this.A(a,new W.fq(z))
return z},
gj:function(a){return a.size},
$asQ:function(){return[P.f,null]},
$isJ:1,
$asJ:function(){return[P.f,null]},
"%":"MIDIInputMap"},
fq:{"^":"n:2;a",
$2:function(a,b){return C.a.l(this.a,a)}},
kq:{"^":"i6;",
h:function(a,b){return P.T(a.get(H.y(b)))},
A:function(a,b){var z,y
H.j(b,{func:1,ret:-1,args:[P.f,,]})
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.T(y.value[1]))}},
gI:function(a){var z=H.p([],[P.f])
this.A(a,new W.fr(z))
return z},
gj:function(a){return a.size},
$asQ:function(){return[P.f,null]},
$isJ:1,
$asJ:function(){return[P.f,null]},
"%":"MIDIOutputMap"},
fr:{"^":"n:2;a",
$2:function(a,b){return C.a.l(this.a,a)}},
af:{"^":"e;",$isaf:1,"%":"MimeType"},
kr:{"^":"i8;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.E(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.h(c,"$isaf")
throw H.c(P.w("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.k(a,b)
return a[b]},
$isr:1,
$asr:function(){return[W.af]},
$ist:1,
$ast:function(){return[W.af]},
$asm:function(){return[W.af]},
$isi:1,
$asi:function(){return[W.af]},
$isa:1,
$asa:function(){return[W.af]},
$asq:function(){return[W.af]},
"%":"MimeTypeArray"},
N:{"^":"d4;",
gbv:function(a){var z,y,x,w,v,u
if(!!a.offsetX)return new P.aK(a.offsetX,a.offsetY,[P.D])
else{z=a.target
if(!J.B(W.dm(z)).$isb5)throw H.c(P.w("offsetX is only supported on elements"))
y=H.h(W.dm(z),"$isb5")
z=a.clientX
x=a.clientY
w=[P.D]
v=y.getBoundingClientRect()
u=v.left
v=v.top
H.x(new P.aK(u,v,w),"$isaK",w,"$asaK")
if(typeof z!=="number")return z.aC()
if(typeof x!=="number")return x.aC()
return new P.aK(C.q.bH(z-u),C.q.bH(x-v),w)}},
$isN:1,
"%":";DragEvent|MouseEvent"},
C:{"^":"I;",
k:function(a){var z=a.nodeValue
return z==null?this.c_(a):z},
$isC:1,
"%":"Attr|DocumentFragment|DocumentType|ShadowRoot;Node"},
ky:{"^":"ia;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.E(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.h(c,"$isC")
throw H.c(P.w("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.k(a,b)
return a[b]},
$isr:1,
$asr:function(){return[W.C]},
$ist:1,
$ast:function(){return[W.C]},
$asm:function(){return[W.C]},
$isi:1,
$asi:function(){return[W.C]},
$isa:1,
$asa:function(){return[W.C]},
$asq:function(){return[W.C]},
"%":"NodeList|RadioNodeList"},
kA:{"^":"W;0n:height=,0m:width=","%":"HTMLObjectElement"},
kC:{"^":"I;0n:height=,0m:width=","%":"OffscreenCanvas"},
kD:{"^":"e;0n:height=,0m:width=","%":"PaintSize"},
ah:{"^":"e;0j:length=",$isah:1,"%":"Plugin"},
kF:{"^":"ie;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.E(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.h(c,"$isah")
throw H.c(P.w("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.k(a,b)
return a[b]},
$isr:1,
$asr:function(){return[W.ah]},
$ist:1,
$ast:function(){return[W.ah]},
$asm:function(){return[W.ah]},
$isi:1,
$asi:function(){return[W.ah]},
$isa:1,
$asa:function(){return[W.ah]},
$asq:function(){return[W.ah]},
"%":"PluginArray"},
kH:{"^":"N;0n:height=,0m:width=","%":"PointerEvent"},
kM:{"^":"il;",
h:function(a,b){return P.T(a.get(H.y(b)))},
A:function(a,b){var z,y
H.j(b,{func:1,ret:-1,args:[P.f,,]})
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.T(y.value[1]))}},
gI:function(a){var z=H.p([],[P.f])
this.A(a,new W.fV(z))
return z},
gj:function(a){return a.size},
$asQ:function(){return[P.f,null]},
$isJ:1,
$asJ:function(){return[P.f,null]},
"%":"RTCStatsReport"},
fV:{"^":"n:2;a",
$2:function(a,b){return C.a.l(this.a,a)}},
kN:{"^":"e;0n:height=,0m:width=","%":"Screen"},
kO:{"^":"W;0j:length=","%":"HTMLSelectElement"},
ai:{"^":"I;",$isai:1,"%":"SourceBuffer"},
kQ:{"^":"di;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.E(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.h(c,"$isai")
throw H.c(P.w("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.k(a,b)
return a[b]},
$isr:1,
$asr:function(){return[W.ai]},
$ist:1,
$ast:function(){return[W.ai]},
$asm:function(){return[W.ai]},
$isi:1,
$asi:function(){return[W.ai]},
$isa:1,
$asa:function(){return[W.ai]},
$asq:function(){return[W.ai]},
"%":"SourceBufferList"},
aj:{"^":"e;",$isaj:1,"%":"SpeechGrammar"},
kR:{"^":"io;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.E(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.h(c,"$isaj")
throw H.c(P.w("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.k(a,b)
return a[b]},
$isr:1,
$asr:function(){return[W.aj]},
$ist:1,
$ast:function(){return[W.aj]},
$asm:function(){return[W.aj]},
$isi:1,
$asi:function(){return[W.aj]},
$isa:1,
$asa:function(){return[W.aj]},
$asq:function(){return[W.aj]},
"%":"SpeechGrammarList"},
ak:{"^":"e;0j:length=",$isak:1,"%":"SpeechRecognitionResult"},
kU:{"^":"ir;",
h:function(a,b){return this.b_(a,H.y(b))},
A:function(a,b){var z,y
H.j(b,{func:1,ret:-1,args:[P.f,P.f]})
for(z=0;!0;++z){y=this.cs(a,z)
if(y==null)return
b.$2(y,this.b_(a,y))}},
gI:function(a){var z=H.p([],[P.f])
this.A(a,new W.h8(z))
return z},
gj:function(a){return a.length},
b_:function(a,b){return a.getItem(b)},
cs:function(a,b){return a.key(b)},
$asQ:function(){return[P.f,P.f]},
$isJ:1,
$asJ:function(){return[P.f,P.f]},
"%":"Storage"},
h8:{"^":"n:15;a",
$2:function(a,b){return C.a.l(this.a,a)}},
al:{"^":"e;",$isal:1,"%":"CSSStyleSheet|StyleSheet"},
kX:{"^":"e;0m:width=","%":"TextMetrics"},
am:{"^":"I;",$isam:1,"%":"TextTrack"},
an:{"^":"I;",$isan:1,"%":"TextTrackCue|VTTCue"},
kY:{"^":"iw;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.E(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.h(c,"$isan")
throw H.c(P.w("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.k(a,b)
return a[b]},
$isr:1,
$asr:function(){return[W.an]},
$ist:1,
$ast:function(){return[W.an]},
$asm:function(){return[W.an]},
$isi:1,
$asi:function(){return[W.an]},
$isa:1,
$asa:function(){return[W.an]},
$asq:function(){return[W.an]},
"%":"TextTrackCueList"},
kZ:{"^":"dl;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.E(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.h(c,"$isam")
throw H.c(P.w("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.k(a,b)
return a[b]},
$isr:1,
$asr:function(){return[W.am]},
$ist:1,
$ast:function(){return[W.am]},
$asm:function(){return[W.am]},
$isi:1,
$asi:function(){return[W.am]},
$isa:1,
$asa:function(){return[W.am]},
$asq:function(){return[W.am]},
"%":"TextTrackList"},
l_:{"^":"e;0j:length=","%":"TimeRanges"},
ao:{"^":"e;",$isao:1,"%":"Touch"},
l0:{"^":"iB;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.E(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.h(c,"$isao")
throw H.c(P.w("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.k(a,b)
return a[b]},
$isr:1,
$asr:function(){return[W.ao]},
$ist:1,
$ast:function(){return[W.ao]},
$asm:function(){return[W.ao]},
$isi:1,
$asi:function(){return[W.ao]},
$isa:1,
$asa:function(){return[W.ao]},
$asq:function(){return[W.ao]},
"%":"TouchList"},
l1:{"^":"e;0j:length=","%":"TrackDefaultList"},
d4:{"^":"V;","%":"CompositionEvent|FocusEvent|TextEvent|TouchEvent;UIEvent"},
le:{"^":"e;",
k:function(a){return String(a)},
"%":"URL"},
lh:{"^":"fo;0n:height=,0m:width=","%":"HTMLVideoElement"},
li:{"^":"I;0j:length=","%":"VideoTrackList"},
lj:{"^":"I;0n:height=,0m:width=","%":"VisualViewport"},
lk:{"^":"e;0m:width=","%":"VTTRegion"},
aw:{"^":"N;",
gcL:function(a){if(a.deltaY!==undefined)return a.deltaY
throw H.c(P.w("deltaY is not supported"))},
$isaw:1,
"%":"WheelEvent"},
hr:{"^":"I;",
gcD:function(a){var z,y,x
z=P.D
y=new P.a3(0,$.G,[z])
x=H.j(new W.hs(new P.iu(y,[z])),{func:1,ret:-1,args:[P.D]})
this.cn(a)
this.cu(a,W.dt(x,z))
return y},
cu:function(a,b){return a.requestAnimationFrame(H.aU(H.j(b,{func:1,ret:-1,args:[P.D]}),1))},
cn:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
$isd6:1,
"%":"DOMWindow|Window"},
hs:{"^":"n:16;a",
$1:function(a){var z=this.a
a=H.bE(H.cf(a),{futureOr:1,type:H.o(z,0)})
z=z.a
if(z.a!==0)H.a7(P.h6("Future already completed"))
z.a8(a)}},
lq:{"^":"iG;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.E(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.h(c,"$isa9")
throw H.c(P.w("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.k(a,b)
return a[b]},
$isr:1,
$asr:function(){return[W.a9]},
$ist:1,
$ast:function(){return[W.a9]},
$asm:function(){return[W.a9]},
$isi:1,
$asi:function(){return[W.a9]},
$isa:1,
$asa:function(){return[W.a9]},
$asq:function(){return[W.a9]},
"%":"CSSRuleList"},
lr:{"^":"eT;",
k:function(a){return"Rectangle ("+H.d(a.left)+", "+H.d(a.top)+") "+H.d(a.width)+" x "+H.d(a.height)},
v:function(a,b){var z
if(b==null)return!1
if(!H.aA(b,"$isO",[P.D],"$asO"))return!1
if(a.left===b.left)if(a.top===b.top){z=J.l(b)
z=a.width===z.gm(b)&&a.height===z.gn(b)}else z=!1
else z=!1
return z},
gt:function(a){return W.db(a.left&0x1FFFFFFF,a.top&0x1FFFFFFF,a.width&0x1FFFFFFF,a.height&0x1FFFFFFF)},
gn:function(a){return a.height},
gm:function(a){return a.width},
"%":"ClientRect|DOMRect"},
ls:{"^":"iI;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.E(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.h(c,"$isab")
throw H.c(P.w("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.k(a,b)
return a[b]},
$isr:1,
$asr:function(){return[W.ab]},
$ist:1,
$ast:function(){return[W.ab]},
$asm:function(){return[W.ab]},
$isi:1,
$asi:function(){return[W.ab]},
$isa:1,
$asa:function(){return[W.ab]},
$asq:function(){return[W.ab]},
"%":"GamepadList"},
lt:{"^":"iK;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.E(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.h(c,"$isC")
throw H.c(P.w("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.k(a,b)
return a[b]},
$isr:1,
$asr:function(){return[W.C]},
$ist:1,
$ast:function(){return[W.C]},
$asm:function(){return[W.C]},
$isi:1,
$asi:function(){return[W.C]},
$isa:1,
$asa:function(){return[W.C]},
$asq:function(){return[W.C]},
"%":"MozNamedAttrMap|NamedNodeMap"},
lu:{"^":"iM;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.E(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.h(c,"$isak")
throw H.c(P.w("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.k(a,b)
return a[b]},
$isr:1,
$asr:function(){return[W.ak]},
$ist:1,
$ast:function(){return[W.ak]},
$asm:function(){return[W.ak]},
$isi:1,
$asi:function(){return[W.ak]},
$isa:1,
$asa:function(){return[W.ak]},
$asq:function(){return[W.ak]},
"%":"SpeechRecognitionResultList"},
lv:{"^":"iO;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.E(b,a,null,null,null))
return a[b]},
i:function(a,b,c){H.h(c,"$isal")
throw H.c(P.w("Cannot assign element of immutable List."))},
q:function(a,b){if(b<0||b>=a.length)return H.k(a,b)
return a[b]},
$isr:1,
$asr:function(){return[W.al]},
$ist:1,
$ast:function(){return[W.al]},
$asm:function(){return[W.al]},
$isi:1,
$asi:function(){return[W.al]},
$isa:1,
$asa:function(){return[W.al]},
$asq:function(){return[W.al]},
"%":"StyleSheetList"},
bc:{"^":"h9;a,b,c,$ti"},
bx:{"^":"bc;a,b,c,$ti"},
hI:{"^":"ha;a,b,c,d,e,$ti",p:{
ap:function(a,b,c,d,e){var z=W.dt(new W.hJ(c),W.V)
if(z!=null&&!0)J.e_(a,b,z,!1)
return new W.hI(0,a,b,z,!1,[e])}}},
hJ:{"^":"n:17;a",
$1:function(a){return this.a.$1(H.h(a,"$isV"))}},
q:{"^":"b;$ti",
gw:function(a){return new W.f_(a,this.gj(a),-1,[H.bf(this,a,"q",0)])}},
f_:{"^":"b;a,b,c,0d,$ti",
saY:function(a){this.d=H.v(a,H.o(this,0))},
u:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.saY(J.b1(this.a,z))
this.c=z
return!0}this.saY(null)
this.c=y
return!1},
gB:function(a){return this.d}},
hC:{"^":"b;a",$isI:1,$isd6:1,p:{
hD:function(a){if(a===window)return H.h(a,"$isd6")
else return new W.hC(a)}}},
hB:{"^":"e+eM;"},
hE:{"^":"e+m;"},
hF:{"^":"hE+q;"},
hG:{"^":"e+m;"},
hH:{"^":"hG+q;"},
hL:{"^":"e+m;"},
hM:{"^":"hL+q;"},
hZ:{"^":"e+m;"},
i_:{"^":"hZ+q;"},
i5:{"^":"e+Q;"},
i6:{"^":"e+Q;"},
i7:{"^":"e+m;"},
i8:{"^":"i7+q;"},
i9:{"^":"e+m;"},
ia:{"^":"i9+q;"},
id:{"^":"e+m;"},
ie:{"^":"id+q;"},
il:{"^":"e+Q;"},
dh:{"^":"I+m;"},
di:{"^":"dh+q;"},
im:{"^":"e+m;"},
io:{"^":"im+q;"},
ir:{"^":"e+Q;"},
iv:{"^":"e+m;"},
iw:{"^":"iv+q;"},
dk:{"^":"I+m;"},
dl:{"^":"dk+q;"},
iA:{"^":"e+m;"},
iB:{"^":"iA+q;"},
iF:{"^":"e+m;"},
iG:{"^":"iF+q;"},
iH:{"^":"e+m;"},
iI:{"^":"iH+q;"},
iJ:{"^":"e+m;"},
iK:{"^":"iJ+q;"},
iL:{"^":"e+m;"},
iM:{"^":"iL+q;"},
iN:{"^":"e+m;"},
iO:{"^":"iN+q;"}}],["","",,P,{"^":"",
T:function(a){var z,y,x,w,v
if(a==null)return
z=P.a1(P.f,null)
y=Object.getOwnPropertyNames(a)
for(x=y.length,w=0;w<y.length;y.length===x||(0,H.M)(y),++w){v=H.y(y[w])
z.i(0,v,a[v])}return z},
j_:function(a,b){var z={}
a.A(0,new P.j0(z))
return z},
cF:function(){var z=$.cE
if(z==null){z=J.bM(window.navigator.userAgent,"Opera",0)
$.cE=z}return z},
eR:function(){var z,y
z=$.cB
if(z!=null)return z
y=$.cC
if(y==null){y=J.bM(window.navigator.userAgent,"Firefox",0)
$.cC=y}if(y)z="-moz-"
else{y=$.cD
if(y==null){y=!P.cF()&&J.bM(window.navigator.userAgent,"Trident/",0)
$.cD=y}if(y)z="-ms-"
else z=P.cF()?"-o-":"-webkit-"}$.cB=z
return z},
j0:{"^":"n:7;a",
$2:function(a,b){this.a[a]=b}}}],["","",,P,{"^":""}],["","",,P,{"^":"",
da:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
i0:{"^":"b;",
cV:function(){return Math.random()}},
aK:{"^":"b;N:a>,J:b>,$ti",
k:function(a){return"Point("+H.d(this.a)+", "+H.d(this.b)+")"},
v:function(a,b){if(b==null)return!1
return H.aA(b,"$isaK",[P.D],null)&&this.a==J.bm(b)&&this.b==b.gJ(b)},
gt:function(a){var z,y,x
z=J.a8(this.a)
y=J.a8(this.b)
y=P.da(P.da(0,z),y)
x=536870911&y+((67108863&y)<<3)
x^=x>>>11
return 536870911&x+((16383&x)<<15)}},
ig:{"^":"b;"},
O:{"^":"ig;$ti"}}],["","",,P,{"^":"",ex:{"^":"e;",$isex:1,"%":"SVGAnimatedLength"},jO:{"^":"H;0n:height=,0m:width=","%":"SVGFEBlendElement"},jP:{"^":"H;0n:height=,0m:width=","%":"SVGFEColorMatrixElement"},jQ:{"^":"H;0n:height=,0m:width=","%":"SVGFEComponentTransferElement"},jR:{"^":"H;0n:height=,0m:width=","%":"SVGFECompositeElement"},jS:{"^":"H;0n:height=,0m:width=","%":"SVGFEConvolveMatrixElement"},jT:{"^":"H;0n:height=,0m:width=","%":"SVGFEDiffuseLightingElement"},jU:{"^":"H;0n:height=,0m:width=","%":"SVGFEDisplacementMapElement"},jV:{"^":"H;0n:height=,0m:width=","%":"SVGFEFloodElement"},jW:{"^":"H;0n:height=,0m:width=","%":"SVGFEGaussianBlurElement"},jX:{"^":"H;0n:height=,0m:width=","%":"SVGFEImageElement"},jY:{"^":"H;0n:height=,0m:width=","%":"SVGFEMergeElement"},jZ:{"^":"H;0n:height=,0m:width=","%":"SVGFEMorphologyElement"},k_:{"^":"H;0n:height=,0m:width=","%":"SVGFEOffsetElement"},k0:{"^":"H;0n:height=,0m:width=","%":"SVGFESpecularLightingElement"},k1:{"^":"H;0n:height=,0m:width=","%":"SVGFETileElement"},k2:{"^":"H;0n:height=,0m:width=","%":"SVGFETurbulenceElement"},k5:{"^":"H;0n:height=,0m:width=","%":"SVGFilterElement"},k6:{"^":"b6;0n:height=,0m:width=","%":"SVGForeignObjectElement"},f4:{"^":"b6;","%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},b6:{"^":"H;","%":"SVGAElement|SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement|SVGTSpanElement|SVGTextContentElement|SVGTextElement|SVGTextPathElement|SVGTextPositioningElement;SVGGraphicsElement"},ke:{"^":"b6;0n:height=,0m:width=","%":"SVGImageElement"},aI:{"^":"e;",$isaI:1,"%":"SVGLength"},kk:{"^":"i2;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.E(b,a,null,null,null))
return this.H(a,b)},
i:function(a,b,c){H.h(c,"$isaI")
throw H.c(P.w("Cannot assign element of immutable List."))},
q:function(a,b){return this.h(a,b)},
H:function(a,b){return a.getItem(b)},
$asm:function(){return[P.aI]},
$isi:1,
$asi:function(){return[P.aI]},
$isa:1,
$asa:function(){return[P.aI]},
$asq:function(){return[P.aI]},
"%":"SVGLengthList"},km:{"^":"H;0n:height=,0m:width=","%":"SVGMaskElement"},aJ:{"^":"e;",$isaJ:1,"%":"SVGNumber"},kz:{"^":"ic;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.E(b,a,null,null,null))
return this.H(a,b)},
i:function(a,b,c){H.h(c,"$isaJ")
throw H.c(P.w("Cannot assign element of immutable List."))},
q:function(a,b){return this.h(a,b)},
H:function(a,b){return a.getItem(b)},
$asm:function(){return[P.aJ]},
$isi:1,
$asi:function(){return[P.aJ]},
$isa:1,
$asa:function(){return[P.aJ]},
$asq:function(){return[P.aJ]},
"%":"SVGNumberList"},kE:{"^":"H;0n:height=,0m:width=","%":"SVGPatternElement"},kG:{"^":"e;0j:length=","%":"SVGPointList"},kI:{"^":"e;0n:height=,0m:width=","%":"SVGRect"},kJ:{"^":"f4;0n:height=,0m:width=","%":"SVGRectElement"},kV:{"^":"it;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.E(b,a,null,null,null))
return this.H(a,b)},
i:function(a,b,c){H.y(c)
throw H.c(P.w("Cannot assign element of immutable List."))},
q:function(a,b){return this.h(a,b)},
H:function(a,b){return a.getItem(b)},
$asm:function(){return[P.f]},
$isi:1,
$asi:function(){return[P.f]},
$isa:1,
$asa:function(){return[P.f]},
$asq:function(){return[P.f]},
"%":"SVGStringList"},H:{"^":"b5;","%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEDropShadowElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGFEPointLightElement|SVGFESpotLightElement|SVGGradientElement|SVGLinearGradientElement|SVGMPathElement|SVGMarkerElement|SVGMetadataElement|SVGRadialGradientElement|SVGScriptElement|SVGSetElement|SVGStopElement|SVGStyleElement|SVGSymbolElement|SVGTitleElement|SVGViewElement;SVGElement"},kW:{"^":"b6;0n:height=,0m:width=","%":"SVGSVGElement"},aN:{"^":"e;",$isaN:1,"%":"SVGTransform"},l2:{"^":"iD;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.E(b,a,null,null,null))
return this.H(a,b)},
i:function(a,b,c){H.h(c,"$isaN")
throw H.c(P.w("Cannot assign element of immutable List."))},
q:function(a,b){return this.h(a,b)},
H:function(a,b){return a.getItem(b)},
$asm:function(){return[P.aN]},
$isi:1,
$asi:function(){return[P.aN]},
$isa:1,
$asa:function(){return[P.aN]},
$asq:function(){return[P.aN]},
"%":"SVGTransformList"},lf:{"^":"b6;0n:height=,0m:width=","%":"SVGUseElement"},i1:{"^":"e+m;"},i2:{"^":"i1+q;"},ib:{"^":"e+m;"},ic:{"^":"ib+q;"},is:{"^":"e+m;"},it:{"^":"is+q;"},iC:{"^":"e+m;"},iD:{"^":"iC+q;"}}],["","",,P,{"^":"",a5:{"^":"b;",$isi:1,
$asi:function(){return[P.U]},
$isa:1,
$asa:function(){return[P.U]},
$ishk:1}}],["","",,P,{"^":"",jv:{"^":"e;0j:length=","%":"AudioBuffer"},jw:{"^":"hz;",
h:function(a,b){return P.T(a.get(H.y(b)))},
A:function(a,b){var z,y
H.j(b,{func:1,ret:-1,args:[P.f,,]})
z=a.entries()
for(;!0;){y=z.next()
if(y.done)return
b.$2(y.value[0],P.T(y.value[1]))}},
gI:function(a){var z=H.p([],[P.f])
this.A(a,new P.ez(z))
return z},
gj:function(a){return a.size},
$asQ:function(){return[P.f,null]},
$isJ:1,
$asJ:function(){return[P.f,null]},
"%":"AudioParamMap"},ez:{"^":"n:2;a",
$2:function(a,b){return C.a.l(this.a,a)}},jx:{"^":"I;0j:length=","%":"AudioTrackList"},eA:{"^":"I;","%":"AudioContext|webkitAudioContext;BaseAudioContext"},kB:{"^":"eA;0j:length=","%":"OfflineAudioContext"},hz:{"^":"e+Q;"}}],["","",,P,{"^":"",eC:{"^":"e;",$iseC:1,"%":"WebGLBuffer"},fQ:{"^":"e;",$isfQ:1,"%":"WebGLProgram"},kK:{"^":"e;",
b7:function(a,b){return a.activeTexture(b)},
b8:function(a,b,c){return a.attachShader(b,c)},
b9:function(a,b,c){return a.bindBuffer(b,c)},
bb:function(a,b,c){return a.bindTexture(b,c)},
bc:function(a,b){return a.blendEquation(b)},
bd:function(a,b,c){return a.blendFunc(b,c)},
be:function(a,b,c,d){return a.bufferData(b,c,d)},
bf:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
bg:function(a,b){return a.compileShader(b)},
bh:function(a){return a.createBuffer()},
bi:function(a){return a.createProgram()},
bk:function(a,b){return a.createShader(b)},
bl:function(a){return a.createTexture()},
bn:function(a,b){return a.depthMask(b)},
bo:function(a,b){return a.disable(b)},
bp:function(a,b,c,d){return a.drawArrays(b,c,d)},
bq:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
br:function(a,b){return a.enable(b)},
bs:function(a,b){return a.enableVertexAttribArray(b)},
a2:function(a){return P.T(a.getContextAttributes())},
aq:function(a){return a.getError()},
as:function(a,b){return a.getProgramInfoLog(b)},
at:function(a,b,c){return a.getProgramParameter(b,c)},
av:function(a,b){return a.getShaderInfoLog(b)},
aw:function(a,b,c){return a.getShaderParameter(b,c)},
ax:function(a,b,c){return a.getUniformLocation(b,c)},
bu:function(a,b){return a.linkProgram(b)},
bA:function(a,b,c){return a.pixelStorei(b,c)},
aA:function(a,b,c){return a.shaderSource(b,c)},
aB:function(a,b,c,d){return a.stencilFunc(b,c,d)},
ao:function(a,b,c,d,e,f,g,h,i,j){this.ai(a,b,c,d,e,f,g)
return},
bD:function(a,b,c,d,e,f,g){return this.ao(a,b,c,d,e,f,g,null,null,null)},
ai:function(a,b,c,d,e,f,g){return a.texImage2D(b,c,d,e,f,g)},
bE:function(a,b,c,d){return a.texParameteri(b,c,d)},
bI:function(a,b,c){return a.uniform1f(b,c)},
bJ:function(a,b,c){return a.uniform1fv(b,c)},
bK:function(a,b,c){return a.uniform1i(b,c)},
bL:function(a,b,c){return a.uniform1iv(b,c)},
bM:function(a,b,c){return a.uniform2fv(b,c)},
bN:function(a,b,c){return a.uniform3fv(b,c)},
bO:function(a,b,c){return a.uniform4fv(b,c)},
bP:function(a,b,c,d){return a.uniformMatrix3fv(b,!1,d)},
bQ:function(a,b,c,d){return a.uniformMatrix4fv(b,!1,d)},
bR:function(a,b){return a.useProgram(b)},
bS:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,!1,f,g)},
bU:function(a,b,c,d,e){return a.viewport(b,c,d,e)},
"%":"WebGLRenderingContext"},kL:{"^":"e;",
cE:function(a,b){return a.beginTransformFeedback(b)},
cH:function(a,b){return a.bindVertexArray(b)},
cK:function(a){return a.createVertexArray()},
cM:function(a,b,c,d,e){return a.drawArraysInstanced(b,c,d,e)},
cN:function(a,b,c,d,e,f){return a.drawElementsInstanced(b,c,d,e,f)},
cO:function(a){return a.endTransformFeedback()},
d1:function(a,b,c,d){this.cA(a,b,H.x(c,"$isa",[P.f],"$asa"),d)
return},
cA:function(a,b,c,d){return a.transformFeedbackVaryings(b,c,d)},
d2:function(a,b,c){return a.vertexAttribDivisor(b,c)},
b7:function(a,b){return a.activeTexture(b)},
b8:function(a,b,c){return a.attachShader(b,c)},
b9:function(a,b,c){return a.bindBuffer(b,c)},
bb:function(a,b,c){return a.bindTexture(b,c)},
bc:function(a,b){return a.blendEquation(b)},
bd:function(a,b,c){return a.blendFunc(b,c)},
be:function(a,b,c,d){return a.bufferData(b,c,d)},
bf:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
bg:function(a,b){return a.compileShader(b)},
bh:function(a){return a.createBuffer()},
bi:function(a){return a.createProgram()},
bk:function(a,b){return a.createShader(b)},
bl:function(a){return a.createTexture()},
bn:function(a,b){return a.depthMask(b)},
bo:function(a,b){return a.disable(b)},
bp:function(a,b,c,d){return a.drawArrays(b,c,d)},
bq:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
br:function(a,b){return a.enable(b)},
bs:function(a,b){return a.enableVertexAttribArray(b)},
a2:function(a){return P.T(a.getContextAttributes())},
aq:function(a){return a.getError()},
as:function(a,b){return a.getProgramInfoLog(b)},
at:function(a,b,c){return a.getProgramParameter(b,c)},
av:function(a,b){return a.getShaderInfoLog(b)},
aw:function(a,b,c){return a.getShaderParameter(b,c)},
ax:function(a,b,c){return a.getUniformLocation(b,c)},
bu:function(a,b){return a.linkProgram(b)},
bA:function(a,b,c){return a.pixelStorei(b,c)},
aA:function(a,b,c){return a.shaderSource(b,c)},
aB:function(a,b,c,d){return a.stencilFunc(b,c,d)},
ao:function(a,b,c,d,e,f,g,h,i,j){this.ai(a,b,c,d,e,f,g)
return},
bD:function(a,b,c,d,e,f,g){return this.ao(a,b,c,d,e,f,g,null,null,null)},
ai:function(a,b,c,d,e,f,g){return a.texImage2D(b,c,d,e,f,g)},
bE:function(a,b,c,d){return a.texParameteri(b,c,d)},
bI:function(a,b,c){return a.uniform1f(b,c)},
bJ:function(a,b,c){return a.uniform1fv(b,c)},
bK:function(a,b,c){return a.uniform1i(b,c)},
bL:function(a,b,c){return a.uniform1iv(b,c)},
bM:function(a,b,c){return a.uniform2fv(b,c)},
bN:function(a,b,c){return a.uniform3fv(b,c)},
bO:function(a,b,c){return a.uniform4fv(b,c)},
bP:function(a,b,c,d){return a.uniformMatrix3fv(b,!1,d)},
bQ:function(a,b,c,d){return a.uniformMatrix4fv(b,!1,d)},
bR:function(a,b){return a.useProgram(b)},
bS:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,!1,f,g)},
bU:function(a,b,c,d,e){return a.viewport(b,c,d,e)},
"%":"WebGL2RenderingContext"},h_:{"^":"e;",$ish_:1,"%":"WebGLShader"},hd:{"^":"e;",$ishd:1,"%":"WebGLTexture"},hl:{"^":"e;",$ishl:1,"%":"WebGLUniformLocation"},hq:{"^":"e;",$ishq:1,"%":"WebGLVertexArrayObject"}}],["","",,P,{"^":"",kS:{"^":"iq;",
gj:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.c(P.E(b,a,null,null,null))
return P.T(this.cr(a,b))},
i:function(a,b,c){H.h(c,"$isJ")
throw H.c(P.w("Cannot assign element of immutable List."))},
q:function(a,b){return this.h(a,b)},
cr:function(a,b){return a.item(b)},
$asm:function(){return[[P.J,,,]]},
$isi:1,
$asi:function(){return[[P.J,,,]]},
$isa:1,
$asa:function(){return[[P.J,,,]]},
$asq:function(){return[[P.J,,,]]},
"%":"SQLResultSetRowList"},ip:{"^":"e+m;"},iq:{"^":"ip+q;"}}],["","",,G,{"^":"",
ht:function(a){var z,y,x,w
z=H.p(a.split("\n"),[P.f])
for(y=0;y<z.length;y=x){x=y+1
w=""+x+": "
if(y>=z.length)return H.k(z,y)
C.a.i(z,y,w+H.d(z[y]))}return C.a.T(z,"\n")},
d8:function(a,b,c){var z,y,x,w
z=J.l(a)
y=z.bk(a,b)
z.aA(a,y,c)
z.bg(a,y)
x=H.c8(z.aw(a,y,35713))
if(x!=null&&!x){w=z.av(a,y)
P.as("E:Compilation failed:")
P.as("E:"+G.ht(c))
P.as("E:Failure:")
P.as(C.i.D("E:",w))
throw H.c(w)}return y},
cJ:function(a,b){var z,y,x
H.x(a,"$isa",[T.u],"$asa")
z=a.length
b=new Float32Array(z*3)
for(y=0;y<a.length;++y){z=y*3
C.h.i(b,z,J.bm(a[y]))
if(y>=a.length)return H.k(a,y)
C.h.i(b,z+1,J.bP(a[y]))
z+=2
if(y>=a.length)return H.k(a,y)
x=J.co(a[y])
if(z>=b.length)return H.k(b,z)
b[z]=x}return b},
f1:function(a,b){var z,y
H.x(a,"$isa",[T.av],"$asa")
z=a.length
b=new Float32Array(z*2)
for(y=0;y<a.length;++y){z=y*2
C.h.i(b,z,J.bm(a[y]))
if(y>=a.length)return H.k(a,y)
C.h.i(b,z+1,J.bP(a[y]))}return b},
f2:function(a,b){var z,y,x,w,v
H.x(a,"$isa",[T.aP],"$asa")
z=a.length
b=new Float32Array(z*4)
for(y=0;y<a.length;++y){z=y*4
C.h.i(b,z,J.bm(a[y]))
if(y>=a.length)return H.k(a,y)
C.h.i(b,z+1,J.bP(a[y]))
x=z+2
if(y>=a.length)return H.k(a,y)
w=J.co(a[y])
v=b.length
if(x>=v)return H.k(b,x)
b[x]=w
z+=3
if(y>=a.length)return H.k(a,y)
w=J.eg(a[y])
if(z>=v)return H.k(b,z)
b[z]=w}return b},
f0:function(a,b){var z,y
H.x(a,"$isa",[[P.a,P.A]],"$asa")
z=a.length
b=new Uint32Array(z*4)
for(y=0;y<a.length;++y){z=y*4
C.n.i(b,z,J.b1(a[y],0))
if(y>=a.length)return H.k(a,y)
C.n.i(b,z+1,J.b1(a[y],1))
if(y>=a.length)return H.k(a,y)
C.n.i(b,z+2,J.b1(a[y],2))
if(y>=a.length)return H.k(a,y)
C.n.i(b,z+3,J.b1(a[y],3))}return b},
hX:function(a,b){var z,y,x,w,v,u,t,s,r,q
for(z=a.e,y=new H.ac(z,[H.o(z,0)]),y=y.gw(y),x=b.x,w=[[P.a,P.A]],v=[P.U],u=[T.aP],t=[T.u],s=[T.av];y.u();){r=y.d
if(!x.a0(0,r)){r="Dropping unnecessary attribute: "+H.d(r)
if($.cc>0)H.bK("I: "+r)
continue}q=z.h(0,r)
switch($.Z().h(0,r).a){case"vec2":b.P(r,G.f1(H.bj(q,"$isa",s,"$asa"),null),2)
break
case"vec3":b.P(r,G.cJ(H.bj(q,"$isa",t,"$asa"),null),3)
break
case"vec4":b.P(r,G.f2(H.bj(q,"$isa",u,"$asa"),null),4)
break
case"float":b.P(r,new Float32Array(H.bz(H.bj(q,"$isa",v,"$asa"))),1)
break
case"uvec4":b.P(r,G.f0(H.bj(q,"$isa",w,"$asa"),null),4)
break}}},
bs:{"^":"b;"},
bw:{"^":"bs;",
aK:function(){return this.d},
k:function(a){var z,y,x,w
z=H.p(["{"+new H.d3(H.j7(this)).k(0)+"}["+this.a+"]"],[P.f])
for(y=this.d,x=new H.ac(y,[H.o(y,0)]),x=x.gw(x);x.u();){w=x.d
C.a.l(z,H.d(w)+": "+H.d(y.h(0,w)))}return C.a.T(z,"\n")}},
eF:{"^":"b;0a,b",
bt:function(a,b,c){J.ed(this.a,b)
if(c>0)J.eu(this.a,b,c)},
bT:function(a,b,c,d,e,f,g,h){J.bL(this.a,34962,b)
J.ev(this.a,c,d,e,!1,g,h)}},
eZ:{"^":"b;"},
cI:{"^":"b;a,b,c,d"},
f3:{"^":"b;a,b,c,d,e",
c4:function(){var z,y,x,w,v,u,t,s,r
z=this.c
y=new Array(z.length*6)
y.fixed$length=Array
x=H.p(y,[P.A])
for(y=this.b,w=0,v=0;!1;++v){if(v>=0)return H.k(y,v)
u=y[v]
C.a.i(x,w,u.gd6(u))
C.a.i(x,w+1,u.gd7(u))
C.a.i(x,w+2,u.gd8(u))
w+=3}for(y=z.length,v=0;v<z.length;z.length===y||(0,H.M)(z),++v){t=z[v]
s=t.a
C.a.i(x,w,s)
C.a.i(x,w+1,t.b)
r=t.c
C.a.i(x,w+2,r)
C.a.i(x,w+3,s)
C.a.i(x,w+4,r)
C.a.i(x,w+5,t.d)
w+=6}return x},
c6:function(a,b){var z,y,x,w,v,u,t
z=H.p([],[T.av])
this.e.i(0,"aTexUV",z)
for(y=b-1,x=a-1,w=0;w<b;++w)for(v=w/y,u=0;u<a;++u){t=new Float32Array(2)
t[0]=v
t[1]=u/x
C.a.l(z,new T.av(t))}},
c5:function(a,b,c){var z,y,x,w,v,u,t,s,r
z=this.c
y=a-1
x=b-1
w=0
while(!0){if(!(w<x))break
v=w*a
u=w+1
t=0
while(!0){if(!(t<y))break
s=t+1
r=u*a
C.a.l(z,new G.cI(v+s,r+s,r+t,v+t))
t=s}w=u}},
k:function(a){var z,y,x,w,v
z=H.p(["GB:","V["+this.d.length+"]","f3[0]","f4["+this.c.length+"]"],[P.f])
for(y=this.e,x=new H.ac(y,[H.o(y,0)]),x=x.gw(x);x.u();){w=x.d
v=$.Z().h(0,w).a
C.a.l(z,H.d(w)+"["+v+","+y.h(0,w).length+"]")}return C.a.T(z," ")}},
d1:{"^":"b;a,b,c"},
d_:{"^":"b;a,b,c",p:{
d0:function(a,b,c){return new G.d_(a,b,c)}}},
cQ:{"^":"bw;d,a,b,c"},
fp:{"^":"bs;d,e,f,r,x,0y,z,Q,0ch,0cx,cy,a,b,c",
sab:function(a){this.cx=H.x(a,"$isa",[P.A],"$asa")},
aH:function(a,b,c){var z,y
C.i.a5(a,0)
H.h(b,"$isa5")
this.cy.i(0,a,b)
z=this.d
y=this.r.h(0,a)
J.bL(z.a,34962,y)
J.cm(z.a,34962,b,35048)},
c7:function(){var z=this.cx
if(z!=null)return z.length
return this.ch.length/3|0},
P:function(a,b,c){var z,y,x,w,v
z=J.cj(a,0)===105
if(z&&this.z===0)this.z=C.e.c1(b.length,c)
y=this.r
x=this.d
y.i(0,a,J.bN(x.a))
this.aH(a,b,c)
w=$.Z().h(0,a)
if(w==null)throw H.c("Unknown canonical "+a)
v=this.x.h(0,a)
J.bk(x.a,this.e)
x.bt(0,v,z?1:0)
x.bT(0,y.h(0,a),v,w.aJ(),5126,!1,0,0)},
aG:function(a){var z,y,x,w
z=this.r
y=this.d
z.i(0,"aPosition",J.bN(y.a))
this.ch=a
this.aH("aPosition",a,3)
x=$.Z().h(0,"aPosition")
if(x==null)throw H.c("Unknown canonical aPosition")
w=this.x.h(0,"aPosition")
J.bk(y.a,this.e)
y.bt(0,w,0)
y.bT(0,z.h(0,"aPosition"),w,x.aJ(),5126,!1,0,0)},
k:function(a){var z,y,x,w
z=this.cx
y=H.p(["Faces:"+(z==null?0:z.length)],[P.f])
for(z=this.cy,x=new H.ac(z,[H.o(z,0)]),x=x.gw(x);x.u();){w=x.d
C.a.l(y,H.d(w)+":"+z.h(0,w).length)}return"MESH["+this.a+"] "+C.a.T(y,"  ")},
p:{
cR:function(a,b,c,d){var z=P.f
return new G.fp(b,J.e7(b.a),c,P.a1(z,P.b),d,0,-1,P.a1(z,P.a5),"meshdata:"+a,!1,!0)}}},
fF:{"^":"bw;",
c2:function(a,b){var z
if(typeof a!=="number")return a.d4()
if(typeof b!=="number")return H.bg(b)
z=a/b
if(this.z===z)return
this.z=z
this.aN()},
aN:function(){var z,y,x,w,v,u
z=this.z
y=this.Q
x=this.ch
w=Math.tan(this.y*3.141592653589793/180*0.5)
v=y-x
u=this.db.a
u[0]=0
u[1]=0
u[2]=0
u[3]=0
u[4]=0
u[5]=0
u[6]=0
u[7]=0
u[8]=0
u[9]=0
u[10]=0
u[11]=0
u[12]=0
u[13]=0
u[14]=0
u[15]=0
u[0]=1/(w*z)
u[5]=1/w
u[10]=(x+y)/v
u[11]=-1
u[14]=2*y*x/v},
aK:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0
z=this.x
y=this.d
y.i(0,"uEyePosition",z.ar())
x=this.cy
x.C(z.d)
z=this.cx
z.C(this.db)
w=z.a
v=w[0]
u=w[4]
t=w[8]
s=w[12]
r=w[1]
q=w[5]
p=w[9]
o=w[13]
n=w[2]
m=w[6]
l=w[10]
k=w[14]
j=w[3]
i=w[7]
h=w[11]
g=w[15]
f=x.a
e=f[0]
d=f[4]
c=f[8]
b=f[12]
a=f[1]
a0=f[5]
a1=f[9]
a2=f[13]
a3=f[2]
a4=f[6]
a5=f[10]
a6=f[14]
a7=f[3]
a8=f[7]
a9=f[11]
b0=f[15]
w[0]=v*e+u*a+t*a3+s*a7
w[4]=v*d+u*a0+t*a4+s*a8
w[8]=v*c+u*a1+t*a5+s*a9
w[12]=v*b+u*a2+t*a6+s*b0
w[1]=r*e+q*a+p*a3+o*a7
w[5]=r*d+q*a0+p*a4+o*a8
w[9]=r*c+q*a1+p*a5+o*a9
w[13]=r*b+q*a2+p*a6+o*b0
w[2]=n*e+m*a+l*a3+k*a7
w[6]=n*d+m*a0+l*a4+k*a8
w[10]=n*c+m*a1+l*a5+k*a9
w[14]=n*b+m*a2+l*a6+k*b0
w[3]=j*e+i*a+h*a3+g*a7
w[7]=j*d+i*a0+h*a4+g*a8
w[11]=j*c+i*a1+h*a5+g*a9
w[15]=j*b+i*a2+h*a6+g*b0
y.i(0,"uPerspectiveViewMatrix",z)
return y}},
jM:{"^":"b;"},
fU:{"^":"bs;d,e,f,r,x,y,z,Q,0ch,a,b,c",
ca:function(a,b,c,d){var z,y,x,w,v,u,t
for(z=this.e.d,y=z.length,x=this.y,w=this.d,v=this.r,u=0;u<z.length;z.length===y||(0,H.M)(z),++u){t=z[u]
x.i(0,t,J.cp(w.a,v,t))}for(z=this.f.d,y=z.length,u=0;u<z.length;z.length===y||(0,H.M)(z),++u){t=z[u]
x.i(0,t,J.cp(w.a,v,t))}},
cd:function(){var z,y,x,w
z=this.z
y=this.y
if(z.a===y.a&&this.Q.a===this.x.a)return H.p([],[P.f])
x=H.p([],[P.f])
for(y=new H.ac(y,[H.o(y,0)]),y=y.gw(y);y.u();){w=y.d
if(!z.a0(0,w))C.a.l(x,w)}for(z=this.x,z=P.dc(z,z.r,H.o(z,0)),y=this.Q;z.u();){w=z.d
if(!y.E(0,w))C.a.l(x,w)}return x},
ce:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
H.x(b,"$isJ",[P.f,P.b],"$asJ")
z=Date.now()
for(y=new H.ac(b,[H.o(b,0)]),y=y.gw(y),x=this.d,w=this.y,v=this.z,u=this.a,t=0;y.u();){s=y.d
switch(J.cj(s,0)){case 117:if(w.a0(0,s)){r=b.h(0,s)
if(v.a0(0,s))H.bK("E:"+(u+":  "+s+" : group ["+a+"] overwrites ["+s+"]"))
v.i(0,s,a)
q=$.Z().h(0,s)
if(q==null)H.a7("unknown "+s)
p=w.h(0,s)
s=q.a
switch(s){case"int":if(q.c===0){H.K(r)
J.bQ(x.a,p,r)}else if(!!J.B(r).$isf8)J.es(x.a,p,r)
break
case"float":if(q.c===0){H.dx(r)
J.eq(x.a,p,r)}else if(!!J.B(r).$isa5)J.er(x.a,p,r)
break
case"mat4":if(q.c===0){s=H.a6(r,"$isae").a
J.cv(x.a,p,!1,s)}else if(!!J.B(r).$isa5)J.cv(x.a,p,!1,r)
break
case"mat3":if(q.c===0){s=C.E.gd5(H.a6(r,"$iskn"))
J.cu(x.a,p,!1,s)}else if(!!J.B(r).$isa5)J.cu(x.a,p,!1,r)
break
case"vec4":s=q.c
o=x.a
if(s===0)J.ct(o,p,H.a6(r,"$isaP").a)
else J.ct(o,p,H.h(r,"$isa5"))
break
case"vec3":s=q.c
o=x.a
if(s===0)J.cs(o,p,H.a6(r,"$isu").a)
else J.cs(o,p,H.h(r,"$isa5"))
break
case"vec2":s=q.c
o=x.a
if(s===0)J.cr(o,p,H.a6(r,"$isav").a)
else J.cr(o,p,H.h(r,"$isa5"))
break
case"sampler2D":case"sampler2DShadow":s=this.ch
if(typeof s!=="number")return H.bg(s)
J.ck(x.a,33984+s)
s=H.a6(r,"$isc2").b
J.b2(x.a,3553,s)
s=this.ch
J.bQ(x.a,p,s)
s=this.ch
if(typeof s!=="number")return s.D()
this.ch=s+1
break
case"samplerCube":s=this.ch
if(typeof s!=="number")return H.bg(s)
J.ck(x.a,33984+s)
s=H.a6(r,"$isc2").b
J.b2(x.a,34067,s)
s=this.ch
J.bQ(x.a,p,s)
s=this.ch
if(typeof s!=="number")return s.D()
this.ch=s+1
break
default:H.bK("Error: unknow uniform type: "+s)}++t}break
case 99:r=b.h(0,s)
switch(s){case"cDepthTest":s=J.aB(r,!0)
o=x.a
if(s)J.bl(o,2929)
else J.bO(o,2929)
break
case"cStencilFunc":H.a6(r,"$isd1")
s=r.a
o=x.a
if(s===1281)J.bO(o,2960)
else{J.bl(o,2960)
o=r.b
n=r.c
J.en(x.a,s,o,n)}break
case"cDepthWrite":H.c8(r)
J.e8(x.a,r)
break
case"cBlendEquation":H.a6(r,"$isd_")
s=r.a
o=x.a
if(s===1281)J.bO(o,3042)
else{J.bl(o,3042)
o=r.b
n=r.c
J.e2(x.a,o,n)
J.e1(x.a,s)}break}++t
break}}m=P.eU(0,0,0,Date.now()-new P.bp(z,!1).a,0,0)
""+t
m.k(0)},
c3:function(a,b,c){var z,y,x,w,v,u,t,s,r,q
H.x(b,"$isa",[G.bw],"$asa")
Date.now()
z=this.d
J.et(z.a,this.r)
this.ch=0
y=this.z
if(y.a>0){y.f=null
y.e=null
y.d=null
y.c=null
y.b=null
y.a=0
y.b0()}for(x=0;x<2;++x){w=b[x]
this.ce(w.a,w.aK())}y=this.Q
y.S(0)
for(v=a.cy,v=new H.ac(v,[H.o(v,0)]),v=v.gw(v);v.u();)y.l(0,v.d)
u=this.cd()
if(u.length!==0)P.as("E:"+(this.a+" "+a.f+": uninitialized inputs: "+H.d(u)))
J.bk(a.d.a,a.e)
t=this.e.f.length>0
y=a.f
v=a.c7()
s=a.Q
r=a.z
if(t)J.e0(z.a,y)
if(s!==-1){q=z.a
if(r>1)J.ec(q,y,v,s,0,r)
else J.eb(q,y,v,s,0)}else{s=z.a
if(r>1)J.ea(s,y,0,v,r)
else J.e9(s,y,0,v)}if(t)J.ee(z.a)},
aI:function(a,b){return this.c3(a,b,null)},
p:{
cW:function(a,b,c,d){var z,y,x,w,v,u,t,s
z=P.f
y=P.ad(null,null,null,z)
x=c.b
w=d.b
v=H.x(c.f,"$isa",[z],"$asa")
u=J.e5(b.a)
t=G.d8(b.a,35633,x)
J.cl(b.a,u,t)
s=G.d8(b.a,35632,w)
J.cl(b.a,u,s)
if(v.length>0)J.ep(b.a,u,v,35980)
J.el(b.a,u)
if(!H.c8(J.ek(b.a,u,35714)))H.a7(J.ej(b.a,u))
z=new G.fU(b,c,d,u,P.fk(c.c,z),P.a1(z,P.b),P.a1(z,z),y,a,!1,!0)
z.ca(a,b,c,d)
return z}}},
z:{"^":"b;a,b,c",
aJ:function(){switch(this.a){case"float":return 1
case"vec2":return 2
case"vec3":case"uvec3":return 3
case"vec4":case"uvec4":return 4
default:return-1}}},
h0:{"^":"b;a,0b,c,d,e,f,r,x",
aE:function(a){var z,y,x,w
H.x(a,"$isa",[P.f],"$asa")
for(z=this.c,y=this.x,x=0;x<1;++x){w=a[x]
C.a.l(z,w)
y.i(0,w,this.r);++this.r}C.a.a3(z)},
a4:function(a){var z,y,x
H.x(a,"$isa",[P.f],"$asa")
for(z=a.length,y=this.d,x=0;x<a.length;a.length===z||(0,H.M)(a),++x)C.a.l(y,a[x])
C.a.a3(y)},
aF:function(a){var z,y
H.x(a,"$isa",[P.f],"$asa")
for(z=this.e,y=0;y<1;++y)C.a.l(z,a[y])
C.a.a3(z)},
cc:function(a,b){this.b=this.aO(!0,H.x(a,"$isa",[P.f],"$asa"),b)},
aM:function(a){return this.cc(a,null)},
cb:function(a,b){this.b=this.aO(!1,H.x(a,"$isa",[P.f],"$asa"),b)},
aL:function(a){return this.cb(a,null)},
aO:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p
z=[P.f]
H.x(b,"$isa",z,"$asa")
y=this.c
x=y.length===0
w=H.p(["#version 300 es","precision highp float;","precision highp sampler2DShadow;",""],z)
for(z=y.length,v=this.x,u=0;u<y.length;y.length===z||(0,H.M)(y),++u){t=y[u]
s=$.Z().h(0,t)
C.a.l(w,"layout (location="+H.d(v.h(0,t))+") in "+s.a+" "+H.d(t)+";")}C.a.l(w,"")
r=x?"in":"out"
if(x)C.a.l(w,"out vec4 oFragColor;")
for(z=this.e,y=z.length,u=0;u<z.length;z.length===y||(0,H.M)(z),++u){q=z[u]
s=$.Z().h(0,q)
C.a.l(w,r+" "+s.a+" "+H.d(q)+";")}for(z=this.f,y=z.length,u=0;u<z.length;z.length===y||(0,H.M)(z),++u){q=z[u]
s=$.Z().h(0,q)
C.a.l(w,r+" "+s.a+" "+H.d(q)+";")}C.a.l(w,"")
for(z=this.d,y=z.length,u=0;u<z.length;z.length===y||(0,H.M)(z),++u){q=z[u]
s=$.Z().h(0,q)
v=s.c
p=v===0?"":"["+v+"]"
C.a.l(w,"uniform "+s.a+" "+H.d(q)+p+";")}C.a.l(w,"")
if(a)C.a.l(w,"void main(void) {")
C.a.cB(w,b)
if(a)C.a.l(w,"}")
return C.a.T(w,"\n")},
p:{
bu:function(a){var z,y
z=P.f
y=[z]
return new G.h0(a,H.p([],y),H.p([],y),H.p([],y),H.p([],y),0,P.a1(z,P.A))}}},
h4:{"^":"bs;",
ar:function(){var z,y,x
z=this.e
y=this.d.a
x=z.a
x[0]=y[12]
x[1]=y[13]
x[2]=y[14]
return z}},
he:{"^":"b;a,b,c,d,e,f,r"},
c2:{"^":"b;",
k:function(a){return"Texture["+this.a+", "+this.c+"]"}},
f6:{"^":"c2;f,a,b,c,d,e"}}],["","",,R,{"^":"",
hp:function(a,b,c){var z,y,x,w,v,u
z="stars_"+b
y=b*3
x=new Float32Array(y)
for(w=x.length,v=0;v<y;++v){u=$.dV().cV()
if(v>=w)return H.k(x,v)
x[v]=(u-0.5)*c}y=G.cR(z,a.d,0,a.e.x)
y.aG(x)
return y},
fG:{"^":"fF;fy,go,x,y,z,Q,ch,cx,cy,db,d,a,b,c",
cY:[function(a){var z,y,x
z=this.fy
y=z.clientWidth
x=z.clientHeight
z.width=y
z.height=x
P.as("size change "+H.d(y)+" "+H.d(x))
this.c2(y,x)
J.ew(this.go.a,0,0,y,x)},"$1","gcX",4,0,18]}}],["","",,V,{}],["","",,B,{"^":"",
hf:function(a,b,c,d,e,f,g,h,i,j){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=B.fD(new B.hg(e,d,f,c),0,6.283185307179586,g,0.001,!0)
y=z.length
if(0>=y)return H.k(z,0)
C.a.l(z,z[0])
if(1>=z.length)return H.k(z,1)
C.a.l(z,z[1])
x=g+1
w=B.hh(z,h,i)
for(y=w.length,v=0;v<w.length;w.length===y||(0,H.M)(w),++v){u=w[v]
if(0>=u.length)return H.k(u,0)
C.a.l(u,u[0])
if(1>=u.length)return H.k(u,1)
C.a.l(u,u[1])}t=h+1
y=H.p([],[G.eZ])
s=H.p([],[G.cI])
r=[T.u]
q=H.p([],r)
p=new G.f3(!1,y,s,q,P.a1(P.f,[P.a,,]))
for(y=w.length,v=0;v<w.length;w.length===y||(0,H.M)(w),++v){o=w[v]
for(n=0;n<o.length;n+=2){s=H.h(o[n],"$isu")
s.toString
m=new T.u(new Float32Array(3))
m.C(s)
C.a.l(q,m)}}p.c5(t,x,!1)
p.c6(t,x)
l=$.Z().h(0,"aNormal")
switch(l.a){case"vec2":p.e.i(0,"aNormal",H.p([],[T.av]))
break
case"vec3":p.e.i(0,"aNormal",H.p([],r))
break
case"vec4":p.e.i(0,"aNormal",H.p([],[T.aP]))
break
case"float":p.e.i(0,"aNormal",H.p([],[P.U]))
break
case"uvec4":p.e.i(0,"aNormal",H.p([],[[P.a,P.A]]))
break}for(y=w.length,s=p.e,v=0;v<w.length;w.length===y||(0,H.M)(w),++v){o=w[v]
for(n=0;q=o.length,n<q;n+=2){m=n+1
if(m>=q)return H.k(o,m)
m=H.h(o[m],"$isu")
k=H.x(s.h(0,"aNormal"),"$isa",r,"$asa")
m.toString
q=new T.u(new Float32Array(3))
q.C(m);(k&&C.a).l(k,q)}}return p},
hh:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=[T.u]
H.x(a,"$isa",z,"$asa")
y=H.p([],[[P.a,T.u]])
x=new Float32Array(3)
w=new T.u(x)
v=new Float32Array(3)
u=new T.u(v)
t=new Float32Array(3)
s=new T.u(t)
for(r=0;q=a.length,r<q;r+=2){p=a[r]
o=r+1
if(o>=q)return H.k(a,o)
n=a[o]
m=H.p([],z)
C.a.l(y,m)
q=n.a
o=q[2]
if(Math.abs(o)>0.7071067811865476){l=q[1]
k=l*l+o*o
j=1/Math.sqrt(k)
v[0]=0
v[1]=-q[2]*j
v[2]=q[1]*j
t[0]=k*j
t[1]=-q[0]*(q[1]*j)
t[2]=q[0]*(-q[2]*j)}else{o=q[0]
l=q[1]
k=o*o+l*l
j=1/Math.sqrt(k)
v[0]=-q[1]*j
v[1]=q[0]*j
v[2]=0
t[0]=-q[2]*(q[0]*j)
t[1]=q[2]*(-q[1]*j)
t[2]=k*j}u.M(0)
s.M(0)
for(i=0;i<b;++i){h=i/b*2*3.141592653589793
g=c*Math.cos(h)
f=c*Math.sin(h)
w.C(p)
w.a_(u,g)
w.a_(s,f)
q=new T.u(new Float32Array(3))
q.C(w)
C.a.l(m,q)
x[2]=0
x[1]=0
x[0]=0
w.a_(u,g)
w.a_(s,f)
w.M(0)
q=new T.u(new Float32Array(3))
q.C(w)
C.a.l(m,q)}}return y},
fD:function(a,b,c,d,e,f){var z,y,x,w,v,u,t
H.j(a,{func:1,ret:-1,args:[P.U,T.u]})
z=H.p([],[T.u])
y=new T.u(new Float32Array(3))
x=new T.u(new Float32Array(3))
for(w=(c-b)/(d-0),v=0;v<d;++v){u=w*v+b
a.$2(u,y)
a.$2(u+e,x)
x.aD(0,y)
t=new T.u(new Float32Array(3))
t.C(y)
C.a.l(z,t)
t=new T.u(new Float32Array(3))
t.C(x)
C.a.l(z,t)}return z},
hg:{"^":"n:19;a,b,c,d",
$2:function(a,b){var z,y,x,w,v,u
z=this.c
y=this.a*a
x=Math.cos(y)
w=Math.sin(y)
y=this.b*a
v=Math.cos(y)
u=Math.sin(y)
y=z*(2+x)*0.5
b.sN(0,y*v)
b.sJ(0,y*u)
b.sa1(0,this.d*z*0.5*w)}}}],["","",,D,{"^":"",fe:{"^":"b;a,b,c",
c8:function(a){var z,y
a=document
z=W.aH
y={func:1,ret:-1,args:[z]}
W.ap(a,"keydown",H.j(new D.fg(this),y),!1,z)
W.ap(a,"keyup",H.j(new D.fh(this),y),!1,z)},
p:{
ff:function(a){var z=P.A
z=new D.fe(P.ad(null,null,null,z),P.ad(null,null,null,z),P.ad(null,null,null,z))
z.c8(a)
return z}}},fg:{"^":"n:9;a",
$1:function(a){var z
H.h(a,"$isaH")
z=this.a
z.a.l(0,a.which)
z.b.l(0,a.which)}},fh:{"^":"n:9;a",
$1:function(a){var z
H.h(a,"$isaH")
z=this.a
z.a.bB(0,a.which)
z.c.l(0,a.which)}},fs:{"^":"b;a,b,c,d,e,f,r,x",
c9:function(a){var z,y,x
if(a==null)a=document
z=J.l(a)
y=z.gbx(a)
x=H.o(y,0)
W.ap(y.a,y.b,H.j(new D.fu(this),{func:1,ret:-1,args:[x]}),!1,x)
x=z.gbw(a)
y=H.o(x,0)
W.ap(x.a,x.b,H.j(new D.fv(this),{func:1,ret:-1,args:[y]}),!1,y)
y=z.gby(a)
x=H.o(y,0)
W.ap(y.a,y.b,H.j(new D.fw(this),{func:1,ret:-1,args:[x]}),!1,x)
z=z.gbz(a)
x=H.o(z,0)
W.ap(z.a,z.b,H.j(new D.fx(this),{func:1,ret:-1,args:[x]}),!1,x)},
p:{
ft:function(a){var z=P.A
z=new D.fs(P.ad(null,null,null,z),P.ad(null,null,null,z),P.ad(null,null,null,z),0,0,0,0,0)
z.c9(a)
return z}}},fu:{"^":"n:3;a",
$1:function(a){var z,y
H.h(a,"$isN")
a.preventDefault()
z=this.a
y=J.l(a)
z.r=H.K(y.gbv(a).a)
z.x=H.K(y.gbv(a).b)
z.d=a.movementX
z.e=a.movementY}},fv:{"^":"n:3;a",
$1:function(a){var z
H.h(a,"$isN")
a.preventDefault()
P.as("BUTTON "+H.d(a.button))
z=this.a
z.a.l(0,a.button)
z.b.l(0,a.button)}},fw:{"^":"n:3;a",
$1:function(a){var z
H.h(a,"$isN")
a.preventDefault()
z=this.a
z.a.bB(0,a.button)
z.c.l(0,a.button)}},fx:{"^":"n:20;a",
$1:function(a){H.h(a,"$isaw")
a.preventDefault()
this.a.f=H.K(C.a1.gcL(a))}},fC:{"^":"h4;ch,cx,cy,db,dx,dy,fr,fx,d,e,f,r,x,a,b,c"}}],["","",,A,{"^":"",
bH:function(a){var z,y
z=C.h.cQ(H.x(a,"$isi",[P.b],"$asi"),0,new A.j9(),P.A)
if(typeof z!=="number")return H.bg(z)
y=536870911&z+((67108863&z)<<3)
y^=y>>>11
return 536870911&y+((16383&y)<<15)},
j9:{"^":"n:21;",
$2:function(a,b){var z,y
H.K(a)
z=J.a8(b)
if(typeof a!=="number")return a.D()
y=536870911&a+z
y=536870911&y+((524287&y)<<10)
return y^y>>>6}}}],["","",,T,{"^":"",ae:{"^":"b;a",
C:function(a){var z,y
z=a.a
y=this.a
y[15]=z[15]
y[14]=z[14]
y[13]=z[13]
y[12]=z[12]
y[11]=z[11]
y[10]=z[10]
y[9]=z[9]
y[8]=z[8]
y[7]=z[7]
y[6]=z[6]
y[5]=z[5]
y[4]=z[4]
y[3]=z[3]
y[2]=z[2]
y[1]=z[1]
y[0]=z[0]},
k:function(a){return"[0] "+this.U(0).k(0)+"\n[1] "+this.U(1).k(0)+"\n[2] "+this.U(2).k(0)+"\n[3] "+this.U(3).k(0)+"\n"},
h:function(a,b){var z=this.a
if(b>=16)return H.k(z,b)
return z[b]},
v:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.ae){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]&&z[4]===x[4]&&z[5]===x[5]&&z[6]===x[6]&&z[7]===x[7]&&z[8]===x[8]&&z[9]===x[9]&&z[10]===x[10]&&z[11]===x[11]&&z[12]===x[12]&&z[13]===x[13]&&z[14]===x[14]&&z[15]===x[15]}else z=!1
return z},
gt:function(a){return A.bH(this.a)},
U:function(a){var z,y,x
z=new Float32Array(4)
y=this.a
if(a>=16)return H.k(y,a)
z[0]=y[a]
x=4+a
if(x>=16)return H.k(y,x)
z[1]=y[x]
x=8+a
if(x>=16)return H.k(y,x)
z[2]=y[x]
x=12+a
if(x>=16)return H.k(y,x)
z[3]=y[x]
return new T.aP(z)},
O:function(){var z=this.a
z[0]=1
z[1]=0
z[2]=0
z[3]=0
z[4]=0
z[5]=1
z[6]=0
z[7]=0
z[8]=0
z[9]=0
z[10]=1
z[11]=0
z[12]=0
z[13]=0
z[14]=0
z[15]=1}},av:{"^":"b;a",
k:function(a){var z=this.a
return"["+H.d(z[0])+","+H.d(z[1])+"]"},
v:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.av){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]}else z=!1
return z},
gt:function(a){return A.bH(this.a)},
h:function(a,b){var z=this.a
if(b>=2)return H.k(z,b)
return z[b]},
gj:function(a){var z,y
z=this.a
y=z[0]
z=z[1]
return Math.sqrt(y*y+z*z)},
gN:function(a){return this.a[0]},
gJ:function(a){return this.a[1]}},u:{"^":"b;a",
az:function(a,b,c){var z=this.a
z[0]=a
z[1]=b
z[2]=c},
C:function(a){var z,y
z=a.a
y=this.a
y[0]=z[0]
y[1]=z[1]
y[2]=z[2]},
k:function(a){var z=this.a
return"["+H.d(z[0])+","+H.d(z[1])+","+H.d(z[2])+"]"},
v:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.u){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]}else z=!1
return z},
gt:function(a){return A.bH(this.a)},
h:function(a,b){var z=this.a
if(b>=3)return H.k(z,b)
return z[b]},
gj:function(a){return Math.sqrt(this.gam())},
gam:function(){var z,y,x
z=this.a
y=z[0]
x=z[1]
z=z[2]
return y*y+x*x+z*z},
M:function(a){var z,y,x
z=Math.sqrt(this.gam())
if(z===0)return 0
y=1/z
x=this.a
x[0]=x[0]*y
x[1]=x[1]*y
x[2]=x[2]*y
return z},
aj:function(a){var z,y
z=a.a
y=this.a
return y[0]*z[0]+y[1]*z[1]+y[2]*z[2]},
bm:function(a){var z,y,x,w,v,u,t,s
z=this.a
y=z[0]
x=z[1]
w=z[2]
v=a.a
u=v[0]
t=v[1]
s=v[2]
z=new T.u(new Float32Array(3))
z.az(x*s-w*t,w*u-y*s,y*t-x*u)
return z},
a_:function(a,b){var z,y
z=a.a
y=this.a
y[0]=y[0]+z[0]*b
y[1]=y[1]+z[1]*b
y[2]=y[2]+z[2]*b},
aD:function(a,b){var z,y
z=b.a
y=this.a
y[0]=y[0]-z[0]
y[1]=y[1]-z[1]
y[2]=y[2]-z[2]},
sN:function(a,b){this.a[0]=b
return b},
sJ:function(a,b){this.a[1]=b
return b},
sa1:function(a,b){this.a[2]=b
return b},
gN:function(a){return this.a[0]},
gJ:function(a){return this.a[1]},
ga1:function(a){return this.a[2]}},aP:{"^":"b;a",
k:function(a){var z=this.a
return H.d(z[0])+","+H.d(z[1])+","+H.d(z[2])+","+H.d(z[3])},
v:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.aP){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]}else z=!1
return z},
gt:function(a){return A.bH(this.a)},
h:function(a,b){var z=this.a
if(b>=4)return H.k(z,b)
return z[b]},
gj:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(y*y+x*x+w*w+z*z)},
gN:function(a){return this.a[0]},
gJ:function(a){return this.a[1]},
ga1:function(a){return this.a[2]},
gd3:function(a){return this.a[3]}}}],["","",,M,{"^":"",
dB:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d
z={}
y=document
x=H.h(C.C.cW(y,"#webgl-canvas"),"$isbT")
$.cc=1
w=new G.eF(x)
v=P.f
u=P.b
t=(x&&C.t).ap(x,"webgl2",P.cO(["alpha",!1,"depth",!0,"stencil",!0,"antialias",!0,"premultipliedAlpha",!0,"preserveDrawingBuffer",!1,"failIfMajorPerformanceCaveat",!1],v,u))
w.a=t
if(t==null)H.a7(P.cH('Calling canvas.getContext("webgl2") failed,\nmake sure you run on a computer that supports WebGL2.\n\nYou can test your browser\'s compatibility here: http://webglreport.com/\n\n(If you are using Dartium make sure you start it with the\noption: --enable-unsafe-es3-apis)\n'))
s="ChronosGL Config: "+H.d(J.eh(t))
if($.cc>0)P.as("I: "+s)
J.e3(t,0,0,0,1)
J.bl(t,2929)
t=y.body
s=new Float32Array(3)
r=D.ff(null)
t=D.ft(t)
q=new T.ae(new Float32Array(16))
q.O()
p=new Float32Array(3)
o=new Float32Array(3)
n=new Float32Array(3)
m=new D.fC(5,0,0,0,new T.u(s),-0.02,r,t,q,new T.u(p),new T.u(o),new T.u(n),new T.u(new Float32Array(3)),"camera:orbit",!1,!0)
t=new T.ae(new Float32Array(16))
t.O()
s=new T.ae(new Float32Array(16))
s.O()
l=new R.fG(x,w,m,50,1,0.1,1000,t,s,new T.ae(new Float32Array(16)),P.a1(v,u),"perspective",!1,!0)
l.aN()
l.cY(null)
t=W.V
W.ap(window,"resize",H.j(l.gcX(),{func:1,ret:-1,args:[t]}),!1,t)
k=G.cW("basic",w,$.dX(),$.dW())
t=P.a1(v,u)
t.i(0,"cDepthTest",!0)
t.i(0,"cDepthWrite",!0)
t.i(0,"cBlendEquation",$.dH())
s=$.dK()
t.i(0,"cStencilFunc",s)
r=new T.ae(new Float32Array(16))
r.O()
t.i(0,"uModelMatrix",r)
j=B.hf(!0,!0,1,2,3,1,128,16,0.4,!1)
i=G.cR("torusknot",k.d,4,k.e.x)
i.aG(G.cJ(j.d,null))
r=H.x(j.c4(),"$isa",[P.A],"$asa")
q=i.d
i.y=J.bN(q.a)
p=i.ch.length
if(p<768){i.sab(new Uint8Array(H.bz(r)))
i.Q=5121}else if(p<196608){i.sab(new Uint16Array(H.bz(r)))
i.Q=5123}else{i.sab(new Uint32Array(H.bz(r)))
i.Q=5125}J.bk(q.a,i.e)
r=i.y
p=i.cx
J.bL(q.a,34963,r)
J.cm(q.a,34963,p,35048)
G.hX(j,i)
h=G.cW("basic",w,$.dZ(),$.dY())
r=$.dG()
u=P.a1(v,u)
u.i(0,"cDepthTest",!0)
u.i(0,"cDepthWrite",!1)
u.i(0,"cBlendEquation",r)
u.i(0,"cStencilFunc",s)
g=y.createElement("canvas")
g.width=64
g.height=64
f=H.h(C.t.bW(g,"2d"),"$isbU")
e=(f&&C.p).bj(f,32,32,1,32,32,22);(e&&C.m).Z(e,0,"gray")
C.m.Z(e,1,"black")
f.fillStyle=e
C.p.cP(f,0,0,64,64)
e=C.p.bj(f,32,32,1,32,32,6);(e&&C.m).Z(e,0,"white")
C.m.Z(e,1,"gray")
f.globalAlpha=0.9
f.fillStyle=e
f.arc(32,32,4,0,6.283185307179586,!1)
f.fill()
y=J.e6(w.a)
J.b2(w.a,3553,y)
J.em(w.a,37440,1)
J.b2(w.a,3553,y)
J.eo(w.a,3553,0,6408,6408,5121,g)
J.cq(w.a,3553,10240,9729)
J.cq(w.a,3553,10241,9729)
J.ei(w.a)
J.b2(w.a,3553,null)
u.i(0,"uTexture",new G.f6(g,"Utils::Particles",y,3553,w,new G.he(!1,!1,!1,!0,1,9729,9729)))
u.i(0,"uPointSize",1000)
y=new T.ae(new Float32Array(16))
y.O()
u.i(0,"uModelMatrix",y)
d=R.hp(h,2000,100)
z.a=0
new M.jk(z,m,k,i,l,new G.cQ(t,"torus-mat",!1,!0),h,d,new G.cQ(u,"stars",!1,!0)).$1(0)},
jk:{"^":"n:22;a,b,c,d,e,f,r,x,y",
$1:function(a8){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7
H.cf(a8)
if(typeof a8!=="number")return a8.aC()
this.a.a=a8+0
z=this.b
z.cx+=0.003
y=z.fx
x=y.a
if(x.E(0,0)||x.E(0,1)){x=z.cx
w=y.d
if(typeof w!=="number")return w.ay()
z.cx=x+w*0.01
w=z.cy
x=y.e
if(typeof x!=="number")return x.ay()
z.cy=w+x*0.01}x=z.fr
w=x.a
if(w.E(0,37))z.cx+=0.03
else if(w.E(0,39))z.cx-=0.03
if(w.E(0,38))z.cy+=0.03
else if(w.E(0,40))z.cy-=0.03
if(w.E(0,33))z.ch*=0.99
else if(w.E(0,34))z.ch*=1.01
if(w.E(0,32)){z.cx=0
z.cy=0}w=y.f
if(typeof w!=="number")return w.ay()
w=z.ch-w*z.dy
if(w>0)z.ch=w
w=C.q.cI(z.cy,-1.4707963267948965,1.4707963267948965)
z.cy=w
v=z.ch
u=z.cx
t=v*Math.cos(w)
s=Math.cos(u)
w=Math.sin(w)
u=Math.sin(u)
r=z.d.a
r[12]=t*s
r[13]=v*w
r[14]=t*u
u=z.dx
w=u.a
r[12]=r[12]+w[0]
r[13]=r[13]+w[1]
r[14]=r[14]+w[2]
q=new T.u(new Float32Array(3))
q.az(0,1,0)
w=z.ar()
v=new Float32Array(3)
p=new T.u(v)
p.C(w)
p.aD(0,u)
p.M(0)
o=q.bm(p)
o.M(0)
n=p.bm(o)
n.M(0)
u=o.aj(w)
s=n.aj(w)
w=p.aj(w)
m=o.a
l=m[0]
k=n.a
j=k[0]
i=v[0]
h=m[1]
g=k[1]
f=v[1]
m=m[2]
k=k[2]
v=v[2]
r[15]=1
r[14]=-w
r[13]=-s
r[12]=-u
r[11]=0
r[10]=v
r[9]=k
r[8]=m
r[7]=0
r[6]=f
r[5]=g
r[4]=h
r[3]=0
r[2]=i
r[1]=j
r[0]=l
l=z.f
j=l.a
j[0]=r[2]
j[1]=r[6]
j[2]=r[10]
z=-z.db
e=Math.sqrt(l.gam())
o=j[0]/e
n=j[1]/e
p=j[2]/e
d=Math.cos(z)
c=Math.sin(z)
b=1-d
a=o*o*b+d
z=p*c
a0=o*n*b-z
j=n*c
a1=o*p*b+j
a2=n*o*b+z
a3=n*n*b+d
z=o*c
a4=n*p*b-z
a5=p*o*b-j
a6=p*n*b+z
a7=p*p*b+d
z=r[0]
j=r[4]
l=r[8]
i=r[1]
h=r[5]
g=r[9]
f=r[2]
m=r[6]
k=r[10]
v=r[3]
u=r[7]
s=r[11]
r[0]=z*a+j*a2+l*a5
r[1]=i*a+h*a2+g*a5
r[2]=f*a+m*a2+k*a5
r[3]=v*a+u*a2+s*a5
r[4]=z*a0+j*a3+l*a6
r[5]=i*a0+h*a3+g*a6
r[6]=f*a0+m*a3+k*a6
r[7]=v*a0+u*a3+s*a6
r[8]=z*a1+j*a4+l*a7
r[9]=i*a1+h*a4+g*a7
r[10]=f*a1+m*a4+k*a7
r[11]=v*a1+u*a4+s*a7
x.c.S(0)
x.b.S(0)
y.e=0
y.d=0
y.f=0
y.c.S(0)
y.b.S(0)
y=this.e
x=[G.bw]
this.c.aI(this.d,H.p([y,this.f],x))
this.r.aI(this.x,H.p([y,this.y],x))
C.a2.gcD(window).bF(this,-1)}}},1]]
setupProgram(dart,0,0)
J.B=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.cK.prototype
return J.fc.prototype}if(typeof a=="string")return J.b9.prototype
if(a==null)return J.cL.prototype
if(typeof a=="boolean")return J.fb.prototype
if(a.constructor==Array)return J.b7.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ba.prototype
return a}if(a instanceof P.b)return a
return J.bG(a)}
J.aX=function(a){if(typeof a=="string")return J.b9.prototype
if(a==null)return a
if(a.constructor==Array)return J.b7.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ba.prototype
return a}if(a instanceof P.b)return a
return J.bG(a)}
J.j3=function(a){if(a==null)return a
if(a.constructor==Array)return J.b7.prototype
if(typeof a!="object"){if(typeof a=="function")return J.ba.prototype
return a}if(a instanceof P.b)return a
return J.bG(a)}
J.j4=function(a){if(typeof a=="number")return J.b8.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.aO.prototype
return a}
J.j5=function(a){if(typeof a=="number")return J.b8.prototype
if(typeof a=="string")return J.b9.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.aO.prototype
return a}
J.j6=function(a){if(typeof a=="string")return J.b9.prototype
if(a==null)return a
if(!(a instanceof P.b))return J.aO.prototype
return a}
J.l=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.ba.prototype
return a}if(a instanceof P.b)return a
return J.bG(a)}
J.bF=function(a){if(a==null)return a
if(!(a instanceof P.b))return J.aO.prototype
return a}
J.aB=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.B(a).v(a,b)}
J.a_=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.j4(a).K(a,b)}
J.b1=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.jh(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.aX(a).h(a,b)}
J.cj=function(a,b){return J.j6(a).a5(a,b)}
J.ck=function(a,b){return J.l(a).b7(a,b)}
J.e_=function(a,b,c,d){return J.l(a).cC(a,b,c,d)}
J.cl=function(a,b,c){return J.l(a).b8(a,b,c)}
J.e0=function(a,b){return J.l(a).cE(a,b)}
J.bL=function(a,b,c){return J.l(a).b9(a,b,c)}
J.b2=function(a,b,c){return J.l(a).bb(a,b,c)}
J.bk=function(a,b){return J.l(a).cH(a,b)}
J.e1=function(a,b){return J.l(a).bc(a,b)}
J.e2=function(a,b,c){return J.l(a).bd(a,b,c)}
J.cm=function(a,b,c,d){return J.l(a).be(a,b,c,d)}
J.e3=function(a,b,c,d,e){return J.l(a).bf(a,b,c,d,e)}
J.e4=function(a,b){return J.j5(a).G(a,b)}
J.bM=function(a,b,c){return J.aX(a).cJ(a,b,c)}
J.bN=function(a){return J.l(a).bh(a)}
J.e5=function(a){return J.l(a).bi(a)}
J.e6=function(a){return J.l(a).bl(a)}
J.e7=function(a){return J.l(a).cK(a)}
J.e8=function(a,b){return J.l(a).bn(a,b)}
J.bO=function(a,b){return J.l(a).bo(a,b)}
J.e9=function(a,b,c,d){return J.l(a).bp(a,b,c,d)}
J.ea=function(a,b,c,d,e){return J.l(a).cM(a,b,c,d,e)}
J.eb=function(a,b,c,d,e){return J.l(a).bq(a,b,c,d,e)}
J.ec=function(a,b,c,d,e,f){return J.l(a).cN(a,b,c,d,e,f)}
J.bl=function(a,b){return J.l(a).br(a,b)}
J.ed=function(a,b){return J.l(a).bs(a,b)}
J.ee=function(a){return J.l(a).cO(a)}
J.ef=function(a,b){return J.l(a).A(a,b)}
J.a8=function(a){return J.B(a).gt(a)}
J.cn=function(a){return J.j3(a).gw(a)}
J.b3=function(a){return J.aX(a).gj(a)}
J.eg=function(a){return J.bF(a).gd3(a)}
J.bm=function(a){return J.bF(a).gN(a)}
J.bP=function(a){return J.bF(a).gJ(a)}
J.co=function(a){return J.bF(a).ga1(a)}
J.eh=function(a){return J.l(a).a2(a)}
J.ei=function(a){return J.l(a).aq(a)}
J.ej=function(a,b){return J.l(a).as(a,b)}
J.ek=function(a,b,c){return J.l(a).at(a,b,c)}
J.cp=function(a,b,c){return J.l(a).ax(a,b,c)}
J.el=function(a,b){return J.l(a).bu(a,b)}
J.em=function(a,b,c){return J.l(a).bA(a,b,c)}
J.en=function(a,b,c,d){return J.l(a).aB(a,b,c,d)}
J.eo=function(a,b,c,d,e,f,g){return J.l(a).bD(a,b,c,d,e,f,g)}
J.cq=function(a,b,c,d){return J.l(a).bE(a,b,c,d)}
J.bn=function(a){return J.B(a).k(a)}
J.ep=function(a,b,c,d){return J.l(a).d1(a,b,c,d)}
J.eq=function(a,b,c){return J.l(a).bI(a,b,c)}
J.er=function(a,b,c){return J.l(a).bJ(a,b,c)}
J.bQ=function(a,b,c){return J.l(a).bK(a,b,c)}
J.es=function(a,b,c){return J.l(a).bL(a,b,c)}
J.cr=function(a,b,c){return J.l(a).bM(a,b,c)}
J.cs=function(a,b,c){return J.l(a).bN(a,b,c)}
J.ct=function(a,b,c){return J.l(a).bO(a,b,c)}
J.cu=function(a,b,c,d){return J.l(a).bP(a,b,c,d)}
J.cv=function(a,b,c,d){return J.l(a).bQ(a,b,c,d)}
J.et=function(a,b){return J.l(a).bR(a,b)}
J.eu=function(a,b,c){return J.l(a).d2(a,b,c)}
J.ev=function(a,b,c,d,e,f,g){return J.l(a).bS(a,b,c,d,e,f,g)}
J.ew=function(a,b,c,d,e){return J.l(a).bU(a,b,c,d,e)}
var $=I.p
C.t=W.bT.prototype
C.m=W.eD.prototype
C.p=W.bU.prototype
C.C=W.f5.prototype
C.D=J.e.prototype
C.a=J.b7.prototype
C.e=J.cK.prototype
C.E=J.cL.prototype
C.q=J.b8.prototype
C.i=J.b9.prototype
C.L=J.ba.prototype
C.h=H.fy.prototype
C.n=H.fA.prototype
C.w=J.fH.prototype
C.r=J.aO.prototype
C.a1=W.aw.prototype
C.a2=W.hr.prototype
C.B=new P.i0()
C.d=new P.ih()
C.F=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.G=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
C.u=function(hooks) { return hooks; }

C.H=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
C.I=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
C.J=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
C.K=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
C.v=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.M=new G.z("vec3","vertex btangents",0)
C.c=new G.z("vec3","",0)
C.N=new G.z("vec4","delta from light",0)
C.o=new G.z("","",0)
C.x=new G.z("vec3","vertex coordinates",0)
C.O=new G.z("vec3","vertex binormals",0)
C.y=new G.z("vec4","for wireframe",0)
C.P=new G.z("vec4","per vertex color",0)
C.Q=new G.z("float","for normal maps",0)
C.j=new G.z("mat4","",0)
C.S=new G.z("mat4","",4)
C.R=new G.z("mat4","",128)
C.b=new G.z("float","",0)
C.T=new G.z("float","",4)
C.U=new G.z("float","depth for shadowmaps",0)
C.f=new G.z("sampler2D","",0)
C.V=new G.z("float","for bump maps",0)
C.W=new G.z("vec2","texture uvs",0)
C.X=new G.z("float","time since program start in sec",0)
C.k=new G.z("vec2","",0)
C.Y=new G.z("samplerCube","",0)
C.l=new G.z("vec4","",0)
C.Z=new G.z("vec3","vertex normals",0)
C.a_=new G.z("sampler2DShadow","",0)
C.z=new G.z("vec3","per vertex color",0)
C.A=new G.z("mat3","",0)
C.a0=new G.z("vec3","vertex tangents",0)
$.a0=0
$.aD=null
$.cx=null
$.c4=!1
$.dz=null
$.du=null
$.dE=null
$.bD=null
$.bI=null
$.cd=null
$.ay=null
$.aR=null
$.aS=null
$.c5=!1
$.G=C.d
$.cE=null
$.cD=null
$.cC=null
$.cB=null
$.cc=0
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){var z=$dart_deferred_initializers$[a]
if(z==null)throw"DeferredLoading state error: code with hash '"+a+"' was not loaded"
z($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryParts={}
init.deferredPartUris=[]
init.deferredPartHashes=[];(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["jG","dJ",function(){return H.dy("_$dart_dartClosure")},"kj","ch",function(){return H.dy("_$dart_js")},"l3","dL",function(){return H.a2(H.bv({
toString:function(){return"$receiver$"}}))},"l4","dM",function(){return H.a2(H.bv({$method$:null,
toString:function(){return"$receiver$"}}))},"l5","dN",function(){return H.a2(H.bv(null))},"l6","dO",function(){return H.a2(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"l9","dR",function(){return H.a2(H.bv(void 0))},"la","dS",function(){return H.a2(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"l8","dQ",function(){return H.a2(H.d2(null))},"l7","dP",function(){return H.a2(function(){try{null.$method$}catch(z){return z.message}}())},"lc","dU",function(){return H.a2(H.d2(void 0))},"lb","dT",function(){return H.a2(function(){try{(void 0).$method$}catch(z){return z.message}}())},"lm","ci",function(){return P.hu()},"ly","b0",function(){return[]},"jD","dI",function(){return{}},"kT","dK",function(){return new G.d1(1281,0,4294967295)},"jz","dH",function(){return G.d0(1281,1281,1281)},"jy","dG",function(){return G.d0(32774,770,769)},"lw","Z",function(){return P.cO(["cBlendEquation",C.o,"cDepthWrite",C.o,"cDepthTest",C.o,"cStencilFunc",C.o,"tPosition",C.c,"tSpeed",C.c,"tForce",C.c,"aColor",C.z,"aColorAlpha",C.P,"aPosition",C.x,"aTexUV",C.W,"aNormal",C.Z,"aBinormal",C.O,"aCenter",C.y,"aPointSize",C.b,"aBoneIndex",C.l,"aBoneWeight",C.l,"aTangent",C.a0,"aBitangent",C.M,"iaRotation",C.l,"iaTranslation",C.c,"iaScale",C.b,"iaColor",C.c,"vColor",C.z,"vTexUV",C.k,"vLightWeighting",C.c,"vNormal",C.c,"vPosition",C.x,"vPositionFromLight",C.N,"vCenter",C.y,"vDepth",C.U,"uTransformationMatrix",C.j,"uModelMatrix",C.j,"uNormalMatrix",C.A,"uConvolutionMatrix",C.A,"uPerspectiveViewMatrix",C.j,"uLightPerspectiveViewMatrix",C.j,"uShadowMap",C.a_,"uTexture",C.f,"uTexture2",C.f,"uTexture3",C.f,"uTexture4",C.f,"uSpecularMap",C.f,"uNormalMap",C.f,"uBumpMap",C.f,"uDepthMap",C.f,"uCubeTexture",C.Y,"uAnimationTable",C.f,"uTime",C.X,"uCameraNear",C.b,"uCameraFar",C.b,"uFogNear",C.b,"uFogFar",C.b,"uPointSize",C.b,"uScale",C.b,"uAngle",C.b,"uCanvasSize",C.k,"uCenter2",C.k,"uCutOff",C.b,"uShininess",C.b,"uShadowBias",C.b,"uOpacity",C.b,"uColor",C.c,"uAmbientDiffuse",C.c,"uColorEmissive",C.c,"uColorSpecular",C.c,"uColorDiffuse",C.c,"uColorAlpha",C.l,"uColorAlpha2",C.l,"uEyePosition",C.c,"uMaterial",C.j,"uRange",C.k,"uDirection",C.k,"uBoneMatrices",C.R,"uLightDescs",C.S,"uLightCount",C.b,"uLightTypes",C.T,"uBumpScale",C.V,"uNormalScale",C.Q],P.f,G.z)},"lg","dV",function(){return C.B},"lF","dZ",function(){var z,y
z=G.bu("PointSpritesV")
y=[P.f]
z.aE(H.p(["aPosition"],y))
z.a4(H.p(["uPerspectiveViewMatrix","uModelMatrix","uPointSize"],y))
z.aM(H.p(["gl_Position = uPerspectiveViewMatrix * uModelMatrix * vec4(aPosition, 1.0);","gl_PointSize = uPointSize/gl_Position.z;"],y))
return z},"lE","dY",function(){var z,y
z=G.bu("PointSpritesF")
y=[P.f]
z.a4(H.p(["uTexture"],y))
z.aM(H.p(["oFragColor = texture( uTexture,  gl_PointCoord);"],y))
return z},"lC","dX",function(){var z,y
z=G.bu("demoVertexShader")
y=[P.f]
z.aE(H.p(["aPosition"],y))
z.aF(H.p(["vColor"],y))
z.a4(H.p(["uPerspectiveViewMatrix","uModelMatrix"],y))
z.aL(H.p(["void main() {\n    gl_Position = uPerspectiveViewMatrix *\n                  uModelMatrix *\n                  vec4(aPosition, 1.0);\n    vColor.r = sin(aPosition.x)/2.0+0.5;\n    vColor.g = cos(aPosition.y)/2.0+0.5;\n    vColor.b = sin(aPosition.z)/2.0+0.5;\n}\n"],y))
return z},"lB","dW",function(){var z,y
z=G.bu("demoFragmentShader")
y=[P.f]
z.aF(H.p(["vColor"],y))
z.aL(H.p(["void main() {\n    oFragColor.rgb = vColor;\n}\n    "],y))
return z}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[]
init.types=[{func:1,ret:P.F},{func:1,ret:-1},{func:1,ret:-1,args:[P.f,,]},{func:1,ret:P.F,args:[W.N]},{func:1,ret:-1,args:[{func:1,ret:-1}]},{func:1,args:[,]},{func:1,ret:P.F,args:[,]},{func:1,ret:P.F,args:[,,]},{func:1,ret:P.f,args:[P.A]},{func:1,ret:P.F,args:[W.aH]},{func:1,args:[,P.f]},{func:1,args:[P.f]},{func:1,ret:P.F,args:[{func:1,ret:-1}]},{func:1,ret:P.F,args:[,],opt:[P.X]},{func:1,ret:[P.a3,,],args:[,]},{func:1,ret:-1,args:[P.f,P.f]},{func:1,ret:P.F,args:[P.D]},{func:1,args:[W.V]},{func:1,ret:-1,args:[W.V]},{func:1,ret:-1,args:[P.U,T.u]},{func:1,ret:P.F,args:[W.aw]},{func:1,ret:P.A,args:[P.A,P.b]},{func:1,ret:-1,args:[P.D]},{func:1,ret:P.A,args:[,,]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
if(x==y)H.jq(d||a)
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.aW=a.aW
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(M.dB,[])
else M.dB([])})})()
//# sourceMappingURL=simple.dart.js.map
