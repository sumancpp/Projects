let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');

}

// window.onscroll = () =>{
//     menu.classList.toggle('bx-x');
//     navbar.classList.toggle('active');
// }

// typing code

const typed = new Typed('.multiple-text', {
    strings: ['Physical Fitness', 'Weight Gain','Strength Training', 'Fat Lose', 'Weight Lifting', 'Running' ],
    typeSpeed : 60,
    backSpeed : 60,
    backDelay : 1000,
    loop : true,
  });
