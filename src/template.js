(function(module) {
try { module = angular.module("json-form.template"); }
catch(err) { module = angular.module("json-form.template", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("src/json-form.html",
    "<!-- Form -->\n" +
    "<form name=\"jsonForm\" class=\"jsonForm container-fluid\" novalidate>\n" +
    "\n" +
    "  <ng-form ng-repeat=\"item in schema | orderBy:'order'\" ng-class=\"getClass(item)\" name=\"{{item.name}}\">\n" +
    "    <div style=\"display: block\" class=\"form-group row has-feedback\" ng-class=\"{ 'is-centered': item.type != 'textarea' && item.type != 'radio'}\" ng-show=\"isVisible(item)\">\n" +
    "      <!-- Label -->\n" +
    "      <label\n" +
    "        ng-if=\"item.type != 'checkbox'\"\n" +
    "        ng-class=\"{ 'text-muted' : isDisabled(item) && !readOnly, 'col-sm-12': item.type == 'title', 'col-sm-4': item.type != 'title', 'has-options': item.type == 'password-show' || item.type == 'password-generate' }\"\n" +
    "        >\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h4 class=\"text-muted\" ng-if=\"item.type == 'title'\">{{item.label}}\n" +
    "          <i  class=\"fa fa-question-circle text-info\"\n" +
    "              ng-if=\"!!item.helpMessage\"\n" +
    "              popover=\"{{ item.helpMessage }}\"\n" +
    "              popover-trigger=\"mouseenter\"\n" +
    "              popover-placement=\"right\"\n" +
    "              popover-append-to-body=\"true\">\n" +
    "          </i>\n" +
    "        </h4>\n" +
    "\n" +
    "        <!-- Field label -->\n" +
    "        <span ng-if=\"item.type != 'title' && item.type != 'checkbox'\" ng-class=\"{ 'required' : isRequired(item) }\">{{item.label}}</span>\n" +
    "\n" +
    "      </label>\n" +
    "\n" +
    "      <!-- Field input -->\n" +
    "      <div class=\"col-sm-8\" ng-if=\"item.type != 'title'\" ng-class=\"{ 'col-sm-offset-4': item.type == 'checkbox' }\">\n" +
    "\n" +
    "        <!-- Text, Password and Number -->\n" +
    "        <div class=\"row\" ng-if=\"isInput(item)\">\n" +
    "          <div ng-class=\"{ 'col-xs-10 col-sm-9': item.type == 'password-generate', 'col-sm-12': item.type != 'password-generate' }\">\n" +
    "            <div class=\"is-relative\">\n" +
    "              <input\n" +
    "\n" +
    "                type=\"{{ getType(item) }}\"\n" +
    "                class=\"form-control\"\n" +
    "                placeholder=\"{{ readOnly ? '' : item.placeholder }}\"\n" +
    "\n" +
    "                popover=\"{{ item.helpMessage }}\"\n" +
    "                popover-trigger=\"focus\"\n" +
    "                popover-placement=\"right\"\n" +
    "                popover-append-to-body=\"true\"\n" +
    "\n" +
    "                validation-url=\"{{ item.validationUrl }}\"\n" +
    "\n" +
    "                typeahead=\"t for t in item.typeahead | filter:$viewValue | limitTo:8\"\n" +
    "\n" +
    "                ng-model=\"ngModel[item.name]\"\n" +
    "                ng-model-options=\"{ updateOn: item.updateOn, debounce: item.debounce }\"\n" +
    "                ng-focus=\"focus[item.name] = true; jsonForm[item.name].$setDirty();\"\n" +
    "                ng-blur=\"focus[item.name] = false\"\n" +
    "\n" +
    "                ng-required=\"isRequired(item)\"\n" +
    "                minlength=\"{{ item.minLength }}\"\n" +
    "                maxlength=\"{{ item.maxLength }}\"\n" +
    "                ng-min=\"{{ item.min }}\"\n" +
    "                ng-max=\"{{ item.max }}\"\n" +
    "                ng-pattern=\"item.pattern\"\n" +
    "                ng-trim=\"true\"\n" +
    "\n" +
    "                ng-pattern=\"item.pattern\"\n" +
    "                ng-disabled=\"isDisabled(item)\"\n" +
    "\n" +
    "                tabindex=\"{{ $index + 1 }}\"\n" +
    "              />\n" +
    "\n" +
    "              <!-- Validation feedback -->\n" +
    "              <span\n" +
    "                ng-if=\"item.feedback\"\n" +
    "                ng-show=\"!jsonForm[item.name].$pending && jsonForm[item.name].$valid && jsonForm[item.name].$dirty\"\n" +
    "                class=\"form-control-feedback text-muted\"\n" +
    "                ><i class=\"fa fa-check\"></i>\n" +
    "              </span>\n" +
    "              <span\n" +
    "                ng-if=\"item.feedback\"\n" +
    "                ng-show=\"jsonForm[item.name].$pending && jsonForm[item.name].$dirty\"\n" +
    "                class=\"form-control-feedback text-muted\"\n" +
    "              ><i class=\"fa fa-refresh fa-spin\"></i></span>\n" +
    "              <span\n" +
    "                ng-if=\"item.feedback\"\n" +
    "                ng-show=\"!jsonForm[item.name].$pending && jsonForm[item.name].$invalid && jsonForm[item.name].$dirty\"\n" +
    "                class=\"form-control-feedback text-muted\"\n" +
    "              ><i class=\"fa fa-times\"></i></span>\n" +
    "\n" +
    "              <!-- Show Passwords -->\n" +
    "              <span\n" +
    "                ng-if=\"item.type == 'password-show' || item.type == 'password-generate'\"\n" +
    "                ng-click=\"togglePassword(item)\"\n" +
    "                class=\"form-control-feedback\"\n" +
    "                style=\"cursor:pointer;  pointer-events: auto;\"\n" +
    "                ng-class=\" { 'text-muted': !item.showPassword }\"\n" +
    "                ><i class=\"fa fa-eye\" tooltip=\"{{ item.showPassword ? 'Hide Password' : 'Show Password' }}\" tooltip-append-to-body=\"true\"></i>\n" +
    "              </span>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <!-- Generate Password -->\n" +
    "          <div ng-if=\"item.type == 'password-generate'\" class=\"col-xs-2 col-sm-3\">\n" +
    "              <button ng-disabled=\"isDisabled(item)\" class=\"btn btn-default pull-right\" ng-click=\"generatePassword(item)\" ng-if=\"item.type == 'password-generate'\">Generate</button>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Text Area -->\n" +
    "        <div ng-if=\"item.type == 'textarea'\">\n" +
    "        <textarea\n" +
    "\n" +
    "          class=\"form-control\"\n" +
    "          rows = \"{{ item.rows }}\"\n" +
    "          minlength=\"{{ item.minLength }}\"\n" +
    "          maxlength=\"{{ item.maxLength }}\"\n" +
    "\n" +
    "          ng-model=\"ngModel[item.name]\"\n" +
    "          ng-model-options=\"{ updateOn: item.updateOn, debounce: item.debounce }\"\n" +
    "          ng-focus=\"focus[item.name] = true; jsonForm[item.name].$setDirty();\"\n" +
    "          ng-blur=\"focus[item.name] = false\"\n" +
    "\n" +
    "          ng-required=\"isRequired(item)\"\n" +
    "          ng-pattern=\"item.pattern\"\n" +
    "          ng-trim=\"true\"\n" +
    "\n" +
    "          ng-pattern=\"item.pattern\"\n" +
    "          ng-disabled=\"isDisabled(item)\"\n" +
    "\n" +
    "          tabindex=\"{{ $index + 1 }}\"\n" +
    "\n" +
    "        ></textarea>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Checkbox -->\n" +
    "        <div ng-if=\"item.type == 'checkbox'\" class=\"checkbox\">\n" +
    "          <input\n" +
    "\n" +
    "            id=\"checkbox-{{item.name}}\"\n" +
    "            ng-model=\"ngModel[item.name]\"\n" +
    "            type=\"checkbox\"\n" +
    "            tabindex=\"{{ $index + 1 }}\"\n" +
    "            ng-disabled=\"isDisabled(item)\"\n" +
    "          />\n" +
    "          <label for=\"checkbox-{{item.name}}\"\n" +
    "          popover-trigger=\"mouseenter\"\n" +
    "          popover=\"{{ item.helpMessage }}\"\n" +
    "          popover-append-to-body=\"true\"\n" +
    "          popover-placement=\"right\">\n" +
    "          {{item.label}}\n" +
    "        </label>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Select -->\n" +
    "        <select\n" +
    "\n" +
    "          class=\"form-control\"\n" +
    "\n" +
    "          ng-if=\"item.type == 'select'\"\n" +
    "          ng-model=\"ngModel[item.name]\"\n" +
    "          ng-options=\"key as value for (key, value) in item.options\"\n" +
    "\n" +
    "          popover-trigger=\"mouseenter\"\n" +
    "          popover=\"{{ item.helpMessage }}\"\n" +
    "          popover-append-to-body=\"true\"\n" +
    "          popover-placement=\"right\"\n" +
    "\n" +
    "          ng-required=\"isRequired(item)\"\n" +
    "          ng-disabled=\"isDisabled(item)\"\n" +
    "\n" +
    "          tabindex=\"{{ $index + 1 }}\"\n" +
    "\n" +
    "        >\n" +
    "        </select>\n" +
    "\n" +
    "        <!--Radio Buttons-->\n" +
    "        <div class=\"radio-container\" ng-if=\"item.type=='radio'\" ng-repeat=\"(key, value) in item.options\">\n" +
    "          <div class=\"radio\">\n" +
    "            <input\n" +
    "              id=\"radio-{{key}}\"\n" +
    "              type=\"radio\"\n" +
    "              name=\"radio-{{key}}\"\n" +
    "              ng-model=\"ngModel[item.name]\"\n" +
    "              ng-value=\"key\"\n" +
    "              ng-required=\"isRequired(item)\"\n" +
    "              ng-disabled=\"isDisabled(item)\"\n" +
    "              tabindex=\"{{ $index + 1 }}\">\n" +
    "            <label for=\"radio-{{key}}\"\n" +
    "              popover-trigger=\"mouseenter\"\n" +
    "              popover=\"{{ item.helpMessage }}\"\n" +
    "              popover-append-to-body=\"true\"\n" +
    "              popover-placement=\"right\">\n" +
    "              {{value}}\n" +
    "            </label>\n" +
    "          </div><br>\n" +
    "         </div>\n" +
    "\n" +
    "        <!-- Files -->\n" +
    "        <!-- already has file, we show the name and reset button -->\n" +
    "        <div class=\"input-group col-sm-12\" ng-if=\"item.type == 'file' &&  hasFile(item)\">\n" +
    "          <input type=\"text\" class=\"form-control input\" value=\"{{ getFileName(item) }}\" disabled>\n" +
    "          <span class=\"input-group-btn\">\n" +
    "            <button ng-click=\"resetFile(item)\" class=\"btn btn-default pull-right\" tabindex=\"{{ $index + 1 }}\"><i class=\"fa fa-times\"></i></button>\n" +
    "          </span>\n" +
    "        </div>\n" +
    "        <!-- user hasn't selected file yet -->\n" +
    "        <div class=\"input-group col-sm-12\" ng-if=\"item.type === 'file' && !hasFile(item)\">\n" +
    "          <input type=\"text\" class=\"form-control input\" value=\"{{ item.placeholder }}\" disabled>\n" +
    "          <span class=\"input-group-btn\">\n" +
    "            <div\n" +
    "\n" +
    "              class=\"btn btn-default pull-right\"\n" +
    "              accept=\"{{ item.accept }}\"\n" +
    "              type=\"file\"\n" +
    "              id=\"file-{{item.name}}\"\n" +
    "\n" +
    "              ngf-select\n" +
    "              ng-model=\"files[item.name]\"\n" +
    "              ngf-change = \"onFileSelect(item, $files)\"\n" +
    "\n" +
    "              ng-required=\"isRequired(item)\"\n" +
    "              ng-disabled=\"isDisabled(item)\"\n" +
    "\n" +
    "              validation-file\n" +
    "\n" +
    "              tabindex=\"{{ $index + 1 }}\"\n" +
    "\n" +
    "            ><i class=\"fa fa-upload\"></i></div>\n" +
    "          </span>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Invalid input -->\n" +
    "        <p ng-show=\"!focus[item.name] && jsonForm[item.name].$dirty && jsonForm[item.name].$invalid && item.errorMessage != null\" class=\"error-message\" ng-class=\"isRequired(item) ? 'text-danger' : 'text-warning'\">{{ getError(item) }}</p>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </ng-form>\n" +
    "</form>\n" +
    "");
}]);
})();
