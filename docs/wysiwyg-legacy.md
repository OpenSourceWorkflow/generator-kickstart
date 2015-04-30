## WYSIWYG CMS

Kickstart will add this snippet to your ```sandbox.html``` if you need additional JavaScript or CSS for your backend.
This might be the case when your CMS uses front-end-editing and you need to only adjust this view.

```HTML
<!-- front-end only: -->
<script data-main="assets/js/<%= ProjectName %>" src="assets/js/libs/require.js"></script>

<!-- used in wysiwyg CMS:
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

This setup assumes a deferred component named 'backend' (```yo kickstart:addcomponent backend```) where you can make changes only for your CMS.

The CMS then has to use the lower part of the snippet and include the backend component.

## Legacy Browsers

During the setup of a new project kickstart will ask you if you want to support legacy IE (<9). Here is what happens if you choose to support legacy IE.

* Conditional comments are added to the html tag with IE classes
* RespondJS is added to bower.json to polyfill mediaqueries
* shiv and printshiv is included in the modernizr build
* jQuery is included as 1.x.x
* a link to browsehappy.com will be inserted with a conditional comment
