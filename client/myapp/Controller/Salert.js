Meteor.startup(function () {

    sAlert.config({
        effect: 'scale',
        //position: 'bottom-right',
        timeout: 5000,
        html: true,
        onRouteClose: true,
        stack: true,
        // or you can pass an object:
        stack: {
            spacing: '10px', // in px
            limit: 1 // when fourth alert appears all previous ones are cleared
        },
        //offset: '200px', // in px - will be added to first alert (bottom or top - depends of the position in config)
        beep: true
        // examples:
        // beep: '/beep.mp3'  // or you can pass an object:
        // beep: {
        //     info: '/beep-info.mp3',
        //     error: '/beep-error.mp3',
        //     success: '/beep-success.mp3',
        //     warning: '/beep-warning.mp3'
        // }
    });

});