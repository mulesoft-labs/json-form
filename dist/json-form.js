function validationFile(){return{require:"ngModel",restrict:"A",link:function(e,n,t,i){i.$validators.file=function(e){return null==e}}}}function validationUrl(e,n){return{require:"ngModel",restrict:"A",link:function(t,i,a,r){a.validationUrl&&a.validationUrl.length>0&&(r.$asyncValidators.validationurl=function(t,i){return e.post(a.validationUrl,{validate:i}).then(function(e){return e.data.data.valid?!0:n.reject(e.data.message)})})}}}function JSONForm(){return{restrict:"E",require:"ngModel",templateUrl:"src/json-form.html",scope:{ngModel:"=",schema:"=formSchema",valid:"=?formValid",jsonForm:"=?formCtrl",readOnly:"@?formReadonly"},link:function(e,n,t,i){e.ngModel;e.focus={},e.disabled={},e.visible={},e.required={},e.readOnly="true"===e.readOnly?!0:!1;var a=function(e,n,t){(null==e[n]||"undefined"==typeof e[n])&&(e[n]=t)},r=function(n){var t=/(.*)\[/,i=/\[(.*)\]$/,a=/^!(.*)$/,r=!1;if(t.test(n)&&i.test(n)){var o=t.exec(n),s=i.exec(n);if(o.length>1&&s.length>1){var l=o[1];a.test(l)&&(r=!0,l=a.exec(l)[1]);var d=e.ngModel[l];if(s=s[1],"undefined"!=typeof d&&"undefined"!=typeof s){var m=s==d;return r?!m:m}}}if(a.test(n)){var p=a.exec(n)[1];return!e.ngModel[p]}return e.ngModel[n]},o=function(){e.schema.forEach(function(n,t){if("undefined"==typeof n.name&&"undefined"==typeof n.label)throw"Neither 'name' nor 'label' are defined in one of the items";"undefined"==typeof n.name&&(n.name=n.label.toLowerCase().split(" ").join("_")),"undefined"==typeof n.label&&(n.label=n.name[0].toUpperCase()+n.name.slice(1)),"immediate"==n.updateOn&&(n.updateOn="default"),"radio"==n.type&&(e.ngModel[n.name]=n["default"]?n["default"]:Object.keys(n.options)[0]),a(n,"order",t),a(n,"visible",!0),a(n,"enabled",!0),a(n,"required",!1),a(n,"pattern",/(.*)$/),a(n,"feedback",!1),a(n,"validationUrl",""),a(n,"placeholder","file"==n.type?"No file chosen...":""),a(n,"minLength",""),a(n,"maxLength",""),a(n,"min",""),a(n,"max",""),a(n,"accept","*"),a(n,"options",null),a(n,"typeahead",[]),a(n,"default","checkbox"==n.type?!1:null),a(n,"rows",5),a(n,"classes",null),a(n,"helpMessage",""),a(n,"errorMessage",null),a(n,"debounce",n.validationUrl.length>0?200:0),a(n,"updateOn","default"),n["default"]=""===n["default"]?null:n["default"],n.visible="true"===n.visible?!0:"false"===n.visible?!1:n.visible,n.enabled="true"===n.enabled?!0:"false"===n.enabled?!1:n.enabled,n.required="true"===n.required?!0:"false"===n.required?!1:n.required,n.pattern=new RegExp(n.pattern);try{n.errorMessage=JSON.parse(n.errorMessage)}catch(i){}try{"string"==typeof n.options&&(n.options=JSON.parse(n.options))}catch(i){n.options=null}try{"string"==typeof n.typeahead&&(n.typeahead=n.typeahead.split(","))}catch(i){n.typeahead=[]}try{"string"==typeof n.validators&&(n.validators=JSON.parse(validators))}catch(i){n.validators={}}"undefined"==typeof e.ngModel[n.name]&&null!=n["default"]&&(e.ngModel[n.name]=n["default"])})};o(),e.generatePassword=function(n){for(var t="",i="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";t.length<10;t+=i.charAt(Math.floor(Math.random()*i.length)));e.ngModel[n.name]=t},e.togglePassword=function(e){e.showPassword=!e.showPassword},e.isDisabled=function(n){if("true"!==e.readOnly&&e.readOnly!==!0&&(e.readOnly=!1),e.readOnly)return!0;var t="undefined"==typeof e.disabled[n.name]?!n.enabled:!!e.disabled[n.name],i=e.disabled[n.name]=0==n.enabled||"string"==typeof n.enabled&&!r(n.enabled);return i?delete e.ngModel[n.name]:t!=i&&(null!=n["default"]&&(e.ngModel[n.name]=n["default"]),e.jsonForm[n.name].$setPristine()),e.disabled[n.name]},e.isVisible=function(n){var t="undefined"==typeof e.visible[n.name]?n.visible:!!e.visible[n.name],i=e.visible[n.name]=1==n.visible||"string"==typeof n.visible&&r(n.visible);return i?t!=i&&(null!=n["default"]&&(e.ngModel[n.name]=n["default"]),e.jsonForm[n.name].$setPristine()):delete e.ngModel[n.name],e.visible[n.name]},e.isRequired=function(n){var t="undefined"==typeof e.required[n.name]?n.required:!!e.required[n.name],i=e.required[n.name]=1==n.required||"string"==typeof n.required&&r(n.required);return i&&t!=i&&e.jsonForm[n.name].$setDirty(),i},e.isInput=function(e){return"text"==e.type||"password"==e.type||"password-show"==e.type||"password-generate"==e.type||"number"==e.type||"date"==e.type||"datetime-local"==e.type||"time"==e.type||"week"==e.type||"month"==e.type||"url"==e.type||"email"==e.type},e.getType=function(e){var n="password-show"==e.type||"password-generate"==e.type?"password":e.type;return e.showPassword&&"password"==n?"text":n},e.getClass=function(n){if(e.readOnly)return"";var t=[];return"string"==typeof n.classes&&n.classes.length>0&&t.push(n.classes),e.jsonForm[n.name].$invalid&&e.jsonForm[n.name].$dirty&&!e.focus[n.name]&&"file"!=n.type&&t.push(e.isRequired(n)?"has-error":"has-warning"),e.jsonForm[n.name].$pending&&e.jsonForm[n.name].$dirty&&t.push("is-pending"),e.focus[n.name]&&t.push("has-focus"),t.join(" ")},e.getError=function(n){if(null===n.errorMessage)return"";if("string"==typeof n.errorMessage)return n.errorMessage;if("object"==typeof n.errorMessage){var t=e.jsonForm[n.name].$error;for(var i in t)if(i in n.errorMessage)return n.errorMessage[i]}return""},e.readOnly="true"==e.readOnly||1==e.readOnly,e.files={},e.resetFile=function(n){delete e.ngModel[n.name]},e.hasFile=function(n){return"undefined"!=typeof e.ngModel[n.name]},e.onFileSelect=function(n,t){if(t.length>0){var i=t[0];e.ngModel[n.name]=i}},e.getFileName=function(n){var t=e.ngModel[n.name];return"string"==typeof t?t:"object"==typeof t&&null!=t?t.name||"":n.placeholder||""};var s=null;e.$watch(function(){s!==e.schema&&o(),e.schema&&(e.valid=!0,Object.keys(e.schema).forEach(function(n){var t=e.schema[n],i=e.jsonForm[t.name];(e.isRequired(t)&&!e.isDisabled(t)&&e.isVisible(t)&&"undefined"!=typeof i&&i.$invalid||i.$pending)&&(e.valid=!1)})),s=e.schema})}}}function JSONFormService(e){return{open:function(n,t){if("object"!=typeof n)throw"Invalid schema!";var i=t||{};return i.text||(i.text={}),i.template='<div class="modal-header" ng-if="header"><h2 class="modal-title">{{ header }}</h2></div><div class="modal-body"><json-form ng-model="model" form-schema="schema" form-valid="isValid"></json-form></div><div class="modal-footer"><button class="btn btn-primary" ng-disabled="!isValid" ng-click="$close(model)" tabindex="100">{{ ok }}</button><button class="btn btn-default" ng-click="$dismiss()" tabindex="101">{{ cancel }}</button></div>',i.controller=["$scope",function(e){e.schema=n,e.model={},e.ok=i.text.ok||"Ok",e.cancel=i.text.cancel||"Cancel",e.header=i.text.header||""}],e.open(i).result}}}!function(e){try{e=angular.module("json-form.template")}catch(n){e=angular.module("json-form.template",[])}e.run(["$templateCache",function(e){e.put("src/json-form.html",'<!-- Form -->\n<form name="jsonForm" class="jsonForm container-fluid" novalidate>\n\n  <ng-form ng-repeat="item in schema | orderBy:\'order\'" ng-class="getClass(item)" name="{{item.name}}">\n    <div class="form-group row has-feedback" ng-class="{ \'is-centered\': item.type != \'textarea\' }" ng-show="isVisible(item)">\n      <!-- Label -->\n      <label\n        ng-if="item.type != \'checkbox\'"\n        ng-class="{ \'text-muted\' : isDisabled(item) && !readOnly, \'col-sm-12\': item.type == \'title\', \'col-sm-4\': item.type != \'title\', \'has-options\': item.type == \'password-show\' || item.type == \'password-generate\' }"\n        >\n\n        <!-- Title -->\n        <h4 class="text-muted" ng-if="item.type == \'title\'">{{item.label}}\n          <i  class="fa fa-question-circle text-info"\n              ng-if="!!item.helpMessage"\n              popover="{{ item.helpMessage }}"\n              popover-trigger="mouseenter"\n              popover-placement="right"\n              popover-append-to-body="true">\n          </i>\n        </h4>\n\n        <!-- Field label -->\n        <span ng-if="item.type != \'title\' && item.type != \'checkbox\'" ng-class="{ \'required\' : isRequired(item) }">{{item.label}}</span>\n\n      </label>\n\n      <!-- Field input -->\n      <div class="col-sm-8" ng-if="item.type != \'title\'" ng-class="{ \'col-sm-offset-4\': item.type == \'checkbox\' }">\n\n        <!-- Text, Password and Number -->\n        <div class="row" ng-if="isInput(item)">\n          <div ng-class="{ \'col-sm-9\': item.type == \'password-generate\', \'col-sm-12\': item.type != \'password-generate\' }">\n            <div class="is-relative">\n              <input\n\n                type="{{ getType(item) }}"\n                class="form-control"\n                placeholder="{{ readOnly ? \'\' : item.placeholder }}"\n\n                popover="{{ item.helpMessage }}"\n                popover-trigger="focus"\n                popover-placement="right"\n                popover-append-to-body="true"\n\n                validation-url="{{ item.validationUrl }}"\n\n                typeahead="t for t in item.typeahead | filter:$viewValue | limitTo:8"\n\n                ng-model="ngModel[item.name]"\n                ng-model-options="{ updateOn: item.updateOn, debounce: item.debounce }"\n                ng-focus="focus[item.name] = true; jsonForm[item.name].$setDirty();"\n                ng-blur="focus[item.name] = false"\n\n                ng-required="isRequired(item)"\n                minlength="{{ item.minLength }}"\n                maxlength="{{ item.maxLength }}"\n                ng-min="{{ item.min }}"\n                ng-max="{{ item.max }}"\n                ng-pattern="item.pattern"\n                ng-trim="true"\n\n                ng-pattern="item.pattern"\n                ng-disabled="isDisabled(item)"\n\n                tabindex="{{ $index + 1 }}"\n              />\n\n              <!-- Validation feedback -->\n              <span\n                ng-if="item.feedback"\n                ng-show="!jsonForm[item.name].$pending && jsonForm[item.name].$valid && jsonForm[item.name].$dirty"\n                class="form-control-feedback text-muted"\n                ><i class="fa fa-check"></i>\n              </span>\n              <span\n                ng-if="item.feedback"\n                ng-show="jsonForm[item.name].$pending && jsonForm[item.name].$dirty"\n                class="form-control-feedback text-muted"\n              ><i class="fa fa-refresh fa-spin"></i></span>\n              <span\n                ng-if="item.feedback"\n                ng-show="!jsonForm[item.name].$pending && jsonForm[item.name].$invalid && jsonForm[item.name].$dirty"\n                class="form-control-feedback text-muted"\n              ><i class="fa fa-times"></i></span>\n\n              <!-- Show Passwords -->\n              <span\n                ng-if="item.type == \'password-show\' || item.type == \'password-generate\'"\n                ng-click="togglePassword(item)"\n                class="form-control-feedback"\n                style="cursor:pointer;  pointer-events: auto;"\n                ng-class=" { \'text-muted\': !item.showPassword }"\n                ><i class="fa fa-eye" tooltip="{{ item.showPassword ? \'Hide Password\' : \'Show Password\' }}" tooltip-append-to-body="true"></i>\n              </span>\n            </div>\n          </div>\n          <!-- Generate Password -->\n          <div ng-if="item.type == \'password-generate\'" class="col-md-3">\n              <button ng-disabled="isDisabled(item)" class="btn btn-default pull-right" ng-click="generatePassword(item)" ng-if="item.type == \'password-generate\'">Generate</button>\n          </div>\n        </div>\n\n        <!-- Text Area -->\n        <div ng-if="item.type == \'textarea\'">\n        <textarea\n\n          class="form-control"\n          rows = "{{ item.rows }}"\n          minlength="{{ item.minLength }}"\n          maxlength="{{ item.maxLength }}"\n\n          ng-model="ngModel[item.name]"\n          ng-model-options="{ updateOn: item.updateOn, debounce: item.debounce }"\n          ng-focus="focus[item.name] = true; jsonForm[item.name].$setDirty();"\n          ng-blur="focus[item.name] = false"\n\n          ng-required="isRequired(item)"\n          ng-pattern="item.pattern"\n          ng-trim="true"\n\n          ng-pattern="item.pattern"\n          ng-disabled="isDisabled(item)"\n\n          tabindex="{{ $index + 1 }}"\n\n        ></textarea>\n        </div>\n\n        <!-- Checkbox -->\n        <div ng-if="item.type == \'checkbox\'" class="checkbox">\n          <input\n\n            id="checkbox-{{item.name}}"\n            ng-model="ngModel[item.name]"\n            type="checkbox"\n            tabindex="{{ $index + 1 }}"\n            ng-disabled="isDisabled(item)"\n          />\n          <label for="checkbox-{{item.name}}"\n          popover-trigger="mouseenter"\n          popover="{{ item.helpMessage }}"\n          popover-append-to-body="true"\n          popover-placement="right">\n          {{item.label}}\n        </label>\n        </div>\n\n        <!-- Select -->\n        <select\n\n          class="form-control"\n\n          ng-if="item.type == \'select\'"\n          ng-model="ngModel[item.name]"\n          ng-options="key as value for (key, value) in item.options"\n\n          popover-trigger="mouseenter"\n          popover="{{ item.helpMessage }}"\n          popover-append-to-body="true"\n          popover-placement="right"\n\n          ng-required="isRequired(item)"\n          ng-disabled="isDisabled(item)"\n\n          tabindex="{{ $index + 1 }}"\n\n        >\n        </select>\n\n        <!--Radio Buttons-->\n        <div class="radio" ng-if="item.type==\'radio\'" ng-repeat="(key, value) in item.options">\n          <input\n            id="radio-{{key}}"\n            type="radio"\n            name="radio-{{key}}"\n            ng-model="ngModel[item.name]"\n            ng-value="key"\n            ng-required="isRequired(item)"\n            ng-disabled="isDisabled(item)"\n            tabindex="{{ $index + 1 }}">\n          <label for="radio-{{key}}"\n            popover-trigger="mouseenter"\n            popover="{{ item.helpMessage }}"\n            popover-append-to-body="true"\n            popover-placement="right">\n            {{value}}\n          </label>\n         </div>\n\n        <!-- Files -->\n        <!-- already has file, we show the name and reset button -->\n        <div class="input-group col-sm-12" ng-if="item.type == \'file\' &&  hasFile(item)">\n          <input type="text" class="form-control input" value="{{ getFileName(item) }}" disabled>\n          <span class="input-group-btn">\n            <button ng-click="resetFile(item)" class="btn btn-default pull-right" tabindex="{{ $index + 1 }}"><i class="fa fa-times"></i></button>\n          </span>\n        </div>\n        <!-- user hasn\'t selected file yet -->\n        <div class="input-group col-sm-12" ng-if="item.type === \'file\' && !hasFile(item)">\n          <input type="text" class="form-control input" value="{{ item.placeholder }}" disabled>\n          <span class="input-group-btn">\n            <div\n\n              class="btn btn-default pull-right"\n              accept="{{ item.accept }}"\n              type="file"\n              id="file-{{item.name}}"\n\n              ngf-select\n              ng-model="files[item.name]"\n              ngf-change = "onFileSelect(item, $files)"\n\n              ng-required="isRequired(item)"\n              ng-disabled="isDisabled(item)"\n\n              validation-file\n\n              tabindex="{{ $index + 1 }}"\n\n            ><i class="fa fa-upload"></i></div>\n          </span>\n        </div>\n\n        <!-- Invalid input -->\n        <p ng-show="!focus[item.name] && jsonForm[item.name].$dirty && jsonForm[item.name].$invalid && item.errorMessage != null" class="error-message" ng-class="isRequired(item) ? \'text-danger\' : \'text-warning\'">{{ getError(item) }}</p>\n      </div>\n    </div>\n  </ng-form>\n</form>\n')}])}();var module=angular.module("json-form",["json-form.template"]);module.directive("validationFile",validationFile),module.directive("validationUrl",["$http","$q",validationUrl]),module.directive("jsonForm",JSONForm),module.service("jsonForm",["$modal",JSONFormService]);