let trigger = document.getElementById('d-triggerer');

document.addEventListener('DOMContentLoaded', () => {
    if (checkCookie('d-enabled')){
        optimizesited(true);
    }
})

trigger.addEventListener('click', () => {
        if (!checkCookie('d-enabled')){
            swal({
                title: 'Dyslexia Friendly Mode activated',
                icon: 'info',
            });
            console.log('Dyslexia Friendly Mode activated');
            createCookie('d-enabled', true, 360);
            optimizesited(true);
        } else {
            swal({
                title: 'Dyslexia Friendly Mode disactivated',
                icon: 'info',
            });
            console.log('Dyslexia Friendly Mode disactivated');
            deleteCookie('d-enabled');
            optimizesited(false);
        }
});

function optimizesited(enabled){
    if (enabled){
        const stylesheet = ":root{ --font-family: 'OpenDyslexic', 'Comic Sans MS', 'Verdana', ui-sans-serif, sans-serif, 'Noto Emoji' !important; --background-color: wheat !important;} h1,h2,h3,h4,h5,h6,p,button,div,:root,html,body{--color: black !important;}";
        setStyleTag(stylesheet, 'd-style__');
        document.body.dataset.theme = "light"
    } else {
        document.body.removeAttribute('data-theme');
        document.getElementById("d-style__").remove();
    }
}