var recognition;

$(document).ready(function(){
    onDeviceReady();
})

function onDeviceReady(){
    //Building Speech Recognition object
    recognition = new SpeechRecognition();
    recognition.onresult = function(event) {
        if (event.results.length > 0) {
            console.log("event.results[0][0].transcript: "+event.results[0][0].transcript);
            q.value = event.results[0][0].transcript;
            q.form.submit();
        }
    }

    //Checking if user has logged in before
    CardController()

    //###############
    //Event Handlers
    //###############

    //Event handler for About button
    $('.aboutmodal').click(function(){
        $('#AboutModal').addClass('active');
    });

    //Event handler for Settings button
    $('.settingsmodal').click(function(){
        $('#SettingsModal').addClass('active');

        $('#settings-apikey').val(window.localStorage.getItem("APIKey"));
        $('#settings-serverurl').val(window.localStorage.getItem("ServerURL"));
    });

    //Event handler for about modal close button
    $('.close-about').click(function(){
        $('.modal').removeClass('active');
    });

    //Event handler for GitHub button
    $('.btn-github').click(function(){
        url = "https://github.com/tscrip";
        target = "_self";
        var ref = cordova.InAppBrowser.open(url, target);
    });

    //Event handler for Twitter button
    $('.btn-twitter').click(function(){
        url = "https://twitter.com/thetscrip";
        target = "_self";
        var ref = cordova.InAppBrowser.open(url, target);
    });

    //Event handler for settings modal close button
    $('.close-settings').click(function(){
        NewServerURL = $('#settings-serverurl').val();
        NewAPIKey = $('#settings-apikey').val();

        window.localStorage.setItem('APIKey', NewAPIKey);
        window.localStorage.setItem('ServerURL', NewServerURL);

        $('.modal').removeClass('active');

        //Checking if settings were inserted
        CardController()

    });   
}

function CardController(){

    //Checking if user has entered ServerURL and APIKey
    var CurAPIKey = window.localStorage.getItem("APIKey");
    var CurServerURL = window.localStorage.getItem("ServerURL");

    //Hiding ALL modals
    $('.firstvisit').addClass('hidden');
    $('.speechbtn').addClass('hidden');

    //Checking values
    if (CurServerURL == null  || typeof CurServerURL === 'undefined' || CurAPIKey == null || typeof CurAPIKey === 'undefined'){
        //User has not entered ServerURL and APIKey
        $('.firstvisit').removeClass('hidden');
    } 
    else{
        //User has entered ServerURL and APIKey
        $('.speechbtn').removeClass('hidden');
    }
}
