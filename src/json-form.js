angular.module('json-form', ['json-form.template'])
.directive('validationFile', function() {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$validators.file = function(modelValue) {
        return modelValue == null;
      }
    }
  }
})
.directive('validationUrl', ['$http', '$q', function($http, $q) {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, element, attrs, ngModel) {
      if (attrs.validationUrl && attrs.validationUrl.length > 0){
        ngModel.$asyncValidators.validationurl = function(modelValue, viewValue) {
          return $http.post(attrs.validationUrl, { validate: viewValue }).then(
            function(response) {
                if (!response.data.data.valid) {
                    return $q.reject(response.data.message);
                }
                return true;
            });
        }
      }
    }
  }
}])
.directive('jsonForm', function() {
	return {
		restrict: 'E',
    require: 'ngModel',
		templateUrl: 'src/json-form.html',
		scope: {
      ngModel: '=',
			schema: '=formSchema',
      valid: '=?formValid',
			jsonForm: '=?formCtrl',
			readOnly: '@?msReadonly'
		},
		link: function(scope, element, attributes, ctrl) {
      // shortcuts
      var model = scope.ngModel;

      // auxiliars
      scope.focus = {};
      scope.disabled = {};
      scope.visible = {};
      scope.required = {};

      // checks if a property is undefined or null, and fills it with a default value
      var defaults = function(item, prop, val){
      	if (item[prop] == null || typeof item[prop] == 'undefined')
      		item[prop] = val;
      }

      var bindingValue = function(prop){
        var refRegex = /(.*)\[/;
        var valRegex = /\[(.*)\]$/;
        if (refRegex.test(prop) && valRegex.test(prop)) {
          var reference = refRegex.exec(prop)
          var value = valRegex.exec(prop);
          if (reference.length > 1 && value.length > 1) {
            var refValue = scope.ngModel[reference[1]];
            value = value[1];
            if (typeof refValue != 'undefined' && typeof value != 'undefined') {
              return value == refValue;
            }
          }
        }
        return scope.ngModel[prop];
      }

      // initialize all the items
      var initSchema = function(){
        _.each(scope.schema, function(item, index) {

          // Get label from item name if not defined
          if (typeof item.name == 'undefined' && typeof item.label == 'undefined')
          {
            throw "Neither 'name' nor 'label' are defined in one of the items";
          }

          if (typeof item.name == 'undefined')
          {
            item.name = item.label.toLowerCase().split(' ').join('_');
          }

          if (typeof item.label == 'undefined')
          {
            item.label = item.name[0].toUpperCase() + item.name.slice(1);
          }

          if (item.updateOn == 'immediate')
          {
            item.updateOn = 'default';
          }

          // fill undefined or null properties with default configuration
          defaults (item, 'order', index);
          defaults (item, 'visible', true);
          defaults (item, 'enabled', true);
          defaults (item, 'required', false);
          defaults (item, 'pattern', /(.*)$/);
          defaults (item, 'feedback', false);
          defaults (item, 'validationUrl', '');
          defaults (item, 'placeholder', item.type == 'file' ? 'No file chosen...' : '');
          defaults (item, 'minLength', '');
          defaults (item, 'maxLength', '');
          defaults (item, 'min', '');
          defaults (item, 'max', '');
          defaults (item, 'accept', '*');
          defaults (item, 'options', null);
          defaults (item, 'typeahead', []);
          defaults (item, 'default', item.type == 'checkbox' ? false : null);
          defaults (item, 'rows', 5);
          defaults (item, 'classes', null);
          defaults (item, 'helpMessage', '');
          defaults (item, 'errorMessage', null);
          defaults (item, 'debounce', item.validationUrl.length > 0 ? 200 : 0);
          defaults (item, 'updateOn', 'default');

          // fix wrong types
          item.visible = item.visible === "true" ? true : item.visible === "false" ? false : item.visible;
          item.enabled = item.enabled === "true" ? true : item.enabled === "false" ? false : item.enabled;
          item.required = item.required === "true" ? true : item.required === "false" ? false : item.required;
          item.pattern = new RegExp(item.pattern);
          try {
            item.errorMessage = JSON.parse(item.errorMessage);
          } catch (e) {}
          try {
            if (typeof item.options == 'string')
            {
              item.options = JSON.parse(item.options);
            }
          } catch (e) {
            item.options = null;
          }
          try {
            if (typeof item.typeahead == 'string')
            {
              item.typeahead = item.typeahead.split(',');
            }
          } catch (e) {
            item.typeahead = [];
          }
          try {
            if (typeof item.validators == 'string')
            {
              item.validators = JSON.parse(validators);
            }
          } catch (e) {
            item.validators = {};
          }

          // fill default values
          if (typeof scope.ngModel[item.name] == 'undefined' && item.default != null)
          {
            scope.ngModel[item.name] = item.default;
          }
        });
      }
      initSchema();
	
			// Generates a random passoword
      scope.generatePassword = function(item){
      	for(var password = "", chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; 
        		password.length < 10; 
        		password += chars.charAt(Math.floor(Math.random() * chars.length)));
        scope.ngModel[item.name] = password;
      }

      // Returns whether an item should be disabled or not
      scope.isDisabled = function(item){

      	var prev = typeof scope.disabled[item.name] == 'undefined' ? item.disabled : !!scope.disabled[item.name];
        var disabled = scope.disabled[item.name] = item.enabled == false || typeof item.enabled == "string" && !bindingValue(item.enabled);

        if (disabled)
        {
          delete scope.ngModel[item.name];
        } else if (prev != disabled){
          if (item.default != null) {
          	scope.ngModel[item.name] = item.default;
          }
          scope.jsonForm[item.name].$setPristine();
        }

        return scope.disabled[item.name];
      }

      // Returns whether an item should be visible or not
      scope.isVisible = function(item){

      	var prev = typeof scope.visible[item.name] == 'undefined' ? item.visible : !!scope.visible[item.name];
        var visible = scope.visible[item.name] = item.visible == true || typeof item.visible == "string" && bindingValue(item.visible);

        if (!visible)
        {
          delete scope.ngModel[item.name];
        } else if (prev != visible) {
          if (item.default != null) {
        	   scope.ngModel[item.name] = item.default;
          }
          scope.jsonForm[item.name].$setPristine();
        }

        return scope.visible[item.name];
      }

      // Returns whether an item should be required or not
      scope.isRequired = function(item){
        
        var prev = typeof scope.required[item.name] == 'undefined' ? item.required : !!scope.required[item.name];
        var required = scope.required[item.name] = item.required == true || typeof item.required == "string" && bindingValue(item.required);

        if (required && prev != required) {
          scope.jsonForm[item.name].$setDirty();
        }

        return required;
      }

      // Check if item is an <input>
      scope.isInput = function(item){
      	return  item.type == 'text' ||
                item.type == 'password' ||
                item.type == 'password-show' ||
                item.type == 'password-generate' ||
                item.type == 'number' ||
                item.type == 'date' ||
                item.type == 'datetime-local' ||
                item.type == 'time' ||
                item.type == 'week' ||
                item.type == 'month' ||
                item.type == 'url' ||
                item.type == 'email';

      }

      scope.getType = function(item) {
        var type = item.type == 'password-show' || item.type == 'password-generate' ? 'password' : item.type;
        if (item.showPassword && type == 'password')
          return 'text';
        return type;
      }

      // Get all the classes for an item
      scope.getClass = function(item){

        if (scope.readOnly)
          return '';

      	// array of classes to apply to this item
      	var classes = [];

      	// default item classes
      	if (typeof item.classes == 'string' && item.classes.length > 0)
      	{
      		classes.push(item.classes);
      	}

      	// item has an error
      	if (scope.jsonForm[item.name].$invalid && scope.jsonForm[item.name].$dirty && !scope.focus[item.name] && item.type != 'file')//!scope.jsonForm[item.name].$valid && !scope.focus[item.name])
      	{
          if (scope.isRequired(item))
          {
            classes.push('has-error');
          } else {
            classes.push('has-warning');
          }
      	}

        if (scope.jsonForm[item.name].$pending && scope.jsonForm[item.name].$dirty)
        {
          classes.push('is-pending');
        }

        if (scope.focus[item.name])
        {
          classes.push('has-focus');
        }

      	// return all the applicable classes for this item
      	return classes.join(' ');
      }

      // Get error related to an item
      scope.getError = function(item) {

      	// there is not predefined error message
      	if (item.errorMessage === null)
      	{
      		return '';
      	}

      	// there's only one error message
      	if (typeof item.errorMessage == 'string') {
      		return item.errorMessage;
      	}

      	// there are several error messages
      	if (typeof item.errorMessage == 'object') {

      		// get map of errors
      		var errors = scope.jsonForm[item.name].$error;

      		// iterate over the errors
      		for (var error in errors)
      		{
      			// if theres a message for one of the errors, return it
      			if (error in item.errorMessage)
      				return item.errorMessage[error];
      		}
      	}

        return '';
      }

      // make sure readOnly flag is a boolean
      scope.readOnly = scope.readOnly == "true" || scope.readOnly == true;

      // File utils
      scope.files = {};
      scope.resetFile = function(item) {
        delete scope.ngModel[item.name];
      }
      scope.hasFile = function(item) {
        return typeof scope.ngModel[item.name] != 'undefined';
      }
      scope.onFileSelect = function(item, $files) {
        if ($files.length > 0){
          var file = $files[0];
          scope.ngModel[item.name] = file;
        }
      }
      scope.getFileName = function(item) {
        var file = scope.ngModel[item.name];

        if (typeof file == 'string')
        {
          return file;
        } else if (typeof file == 'object' && file != null)
        {
          return file.name || '';
        }
        return item.placeholder || '';
      }

      // validate form
      var oldSchema = null;
      scope.$watch(function(){
        if (oldSchema !== scope.schema) {
          initSchema();
        }
        if (scope.schema) {
          scope.valid = true;
          Object.keys(scope.schema)
          .forEach(function(key){
            var item = scope.schema[key];
            var form = scope.jsonForm[item.name];
            if(scope.isRequired(item) && !scope.isDisabled(item) && scope.isVisible(item) && typeof form != 'undefined' && form.$invalid || form.$pending){
              scope.valid = false;
            }
          });
        }
        oldSchema = scope.schema;
      })
    }
	}
})
.service('jsonForm', ['$modal', function($modal){
  return {
    open: function(schema, modalOptions){

      if (typeof schema != 'object')
        throw 'Invalid schema!';

      var options = modalOptions || {};

      if (!options.text)
        options.text = {};

      options.template = "<div class=\"modal-header\" ng-if=\"header\"><h2 class=\"modal-title\">{{ header }}</h2></div><div class=\"modal-body\"><json-form ng-model=\"model\" form-schema=\"schema\" form-valid=\"isValid\"></json-form></div><div class=\"modal-footer\"><button class=\"btn btn-primary\" ng-disabled=\"!isValid\" ng-click=\"$close(model)\" tabindex=\"100\">{{ ok }}</button><button class=\"btn btn-default\" ng-click=\"$dismiss()\" tabindex=\"101\">{{ cancel }}</button></div>";
      options.controller = ['$scope', function($scope) {
        $scope.schema = schema;
        $scope.model = {};
        $scope.ok = options.text.ok || "Ok";
        $scope.cancel = options.text.cancel || "Cancel";
        $scope.header = options.text.header || "";
      }];

      return $modal.open(options).result;
    }
  }
}]);