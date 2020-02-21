$(function() {
    $('#submit').click(function() {
        let username = $('#username').val();
        let password = $('#password').val();

        console.log(username + ' ' + password);

        $.ajax('/login', {
            method: 'POST',
            data: { username, password },
        });
        console.log('Clicked');
    });
});
