render('homeView');


function render(viewId){
    [...document.querySelectorAll('section')].map(s=>s.style.display = 'none');
    document.getElementById(viewId).style.display = 'block';

}