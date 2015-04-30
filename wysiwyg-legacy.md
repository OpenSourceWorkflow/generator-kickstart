## WYSIWYG CMS

If you have CMS that uses some sort of front-end editing Kickstart will add this to enable deferred modules for your backend only.

```HTML
<!-- wysiwyg:
<link rel="stylesheet" href="assets/css/backend.css">
<script src="assets/js/libs/require.js"></script>
<script charset="utf-8">
  require(['assets/js/projectName'], function() {
    require(['assets/js/deferred/backend'], function(Backend) {
      Backend.init();
    });
  });
</script>
-->
```

All you have to do is add a deferred component with the name 'backend': ```yo kickstart:addcomponent backend```

## Legacy Browsers

During the setup of a new project kickstart will ask you if you want to support legacy IE (<9). Here is what happens if you choose to support legacy IE.

* Conditional comments are added to the html tag with IE classes
* RespondJS is added to bower.json to polyfill mediaqueries
* shiv and printshiv is included in the modernizr build
* jQuery is included as 1.x.x
* a link to browsehappy.com will be inserted with a conditional comment
