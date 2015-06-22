# JSON Form

AngularJS + Bootstrap forms generated from a JSON. 

[Live Demo](http://mulesoft-labs.github.io/json-form)

##Installation

Install json-form from bower:

```
bower install json-form --save
```

Make sure you include **json-form**, **bootstrap.ui** and **ngFileUpload** in your angular module:

```javascript
angular.module('myApp', ['json-form', 'ui.bootstrap', 'ngFileUpload'])
```

##Usage

Use the **json-form** directive to generate forms

```html
<json-form form-schema="mySchema" ng-model="myModel"></json-form>
```

All the settings for the form can be provided as attributes:
  
- `ng-model` The object that will hold the data that the user enters in the form. **This is mandatory**.

- `form-schema` An array with all the fields of the form and their definitions. **This is mandatory**.

- `form-valid` This attribute is optional. The variable passed in this attribute will be true or false, either if the form is valid or not. This is useful for easily disabling a button if a form is incomplete/invalid, for example:
```html
<json-form
form-schema="mySchema"
ng-model="myModel"
form-valid="isValid"
></json-form>
<button ng-disabled="!isValid">Submit</button>
```

- `form-ctrl` This attribute is optional. The variable passed in this attribute will be bound to AngularJS's **FormCtrl** instance, which is useful for creating custom or complex behaviours.

##Schema Options

Here is a list of all the available options for the fields defined in the **schema**

- `type` defines the type of field, this is **mandatory**. The available types are:

  * title

  * text

  * number

  * checkbox

  * select

  * file

  * password

  * password-show

  * password-generate

  * date

  * datetime-local

  * time

  * week

  * month

  * url

  * email

- `name` this will be used as the key to store the value of the field in the **model**. If not provided, the default name will be the **label** in *snake_case*

- `label` this will be used as the label of the field in hte form. If not provided, the **name** will be used, capitalized.

- `default` a default value for this field in the form.

- `order` if provided, the fields will be sorted using the value of this property. Otherwise, they will be sorted in the order they are placed in the array.

- `visible` sets the visibility of the field. Can be bound to the value of a checkbox or a select, or simply a literal (true/false)

- `enabled` sets the field to be enabled/disabled. Can be bound to the value of a checkbox or a select, or simply a literal (true/false)

- `required` sets the field to be required or not. Can be bound to the value of a checkbox or a select, or simply a literal (true/false)

- `pattern` a regular expression to validate the value of the field.

- `feedback` if true, the field will display a tick when valid, a cross when invalid, and a spinner when pending (this last one is only for fields that use a **validationUrl**)

- `validationUrl` a url where the value of the field will be POST'd. 

  * The value will be sent in the following way: `{ validate: fieldValue }`

  * The response must be a json with the following format: `{ data: { valid: true/false } }`

- `placeholder` a placeholder for the field.

- `minLength` a number indicating the minimum permitted length for the field. Only for string-like fields.

- `maxLength` a number indicating the maximum permitted length for the field. Only for string-like fields.

- `min` a number indicating the minumum value permitted for the field. Only for numeric fields.

- `max` a number indicating the maximum value permitted for the field. Only for numeric fields.

- `accept` a string with the accepted file formats, i.e. ".jpg, .png, .gif". Only for **file** fields.

- `options` An object that will generate the options of a **select**.

- `typeahead` An array of strings, or a string of comma separated values that will be passed to the typeahead directive.

- `rows` The number of rows. Only for **text area** fields.

- `classes` a string containing classes that will be applied to the field DOM element.

- `helpMessage` a meesage that will be displayed in a tooltip when the user focuses on the field.

- `errorMessage` an error message to be displayed under the field when its value is invalid. If an object is provided, the type of error will be mapped to the corresponding key in that object, allowing to have multiple error messages for different errors. The types of errors are AngularJS's [FormCtrl.$error](https://docs.angularjs.org/api/ng/type/form.FormController).

- `debounce` the ammount of debounce to be used when updating the model (in milliseconds).

- `updateOn` the event which the model will be updated on (`'immediate'`, `'blur'`, etc;).

##Angular Service

This library includes an angular service that helps to easily create modal forms or prompts.

```javascript
angular.module('myApp')
.controller('MainCtrl', function ($scope, jsonForm) {

  var schema = [
    { type: "text", label: "First Name"},
    { type: "text", label: "Last Name"}
  ];

  var modalOptions = {
    text: {
      header: "What's your name?"
    }
  };

  var promise = jsonForm.open(schema, modalOptions);

  promise.then(function(data){
    $scope.greeting = "Hello, " + data.first_name + " " + data.last_name + "!";
  });
});
```

The method `jsonForm.open()` takes a **schema** and an **options object** for the modal, and returns a **promise**. The options for the modal are all the available Angular UI's [modal options](https://angular-ui.github.io/bootstrap/#/modal), plus a `text` propery with an object containing a `header` text, an `ok` text for the submit button, and a `cancel` text for the dismiss button.

##Collaborate

1) clone repo: `git clone https://github.com/mulesoft-labs/json-form.git`

2) install dependencies: `npm install && bower install`

3) compile and bundle dist files before submitting PR: `npm run build`
