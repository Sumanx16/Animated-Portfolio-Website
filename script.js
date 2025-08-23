var timeout;

const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 2,
      delay: -1,
      stagger: 0.2,
    })
    .from("#herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
}

function circleChaptaKaro() {
  // define default scale value
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollower(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    }, 100);
  });
}

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
  });
}

circleChaptaKaro();
circleMouseFollower();
// firstPageAnim();

// teeno element ko sleect karo, uske baad teeno par ek mousemove lagao, jab mousemove ho to ye pata karo ki mouse kaha par hai, jiska matlab hai mouse ki x and y position pata karo, ab mouse ki x y position ke badle us image ko show karo and us image ko move karo, move کرتے وقت rotate karo, and jaise jaise mouse tez chale waise waise rotation bhi tez ho jaye

document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
  });
});

// New code for the certificate image pop-up
const certLink = document.querySelector('[data-hover-img]');
let certImage = null;

certLink.addEventListener('mouseenter', function() {
    // Get the image source from the data attribute
    const imgSrc = certLink.getAttribute('data-hover-img');
    
    // Create a new image element
    certImage = document.createElement('img');
    certImage.src = imgSrc;
    certImage.style.position = 'absolute';
    certImage.style.pointerEvents = 'none';
    certImage.style.opacity = '0';
    certImage.style.zIndex = '999';
    certImage.style.height = '140%'; // Match the height of other project images
    
    document.body.appendChild(certImage);

    // Animate the image to fade in
    gsap.to(certImage, {
        opacity: 1,
        ease: "power3.easeOut",
        duration: 0.5
    });
});

certLink.addEventListener('mousemove', function(e) {
    if (certImage) {
        // Move the image with the cursor
        gsap.to(certImage, {
            x: e.clientX,
            y: e.clientY,
            ease: "power1.easeOut"
        });
    }
});

certLink.addEventListener('mouseleave', function() {
    if (certImage) {
        // Animate the image to fade out and then remove it
        gsap.to(certImage, {
            opacity: 0,
            ease: "power3.easeIn",
            duration: 0.5,
            onComplete: () => {
                if (certImage) {
                    certImage.remove();
                    certImage = null;
                }
            }
        });
    }
});

// New code to add scroll functionality to the circles
const circleButtons = document.querySelectorAll('#iconset .circle');

if (circleButtons.length > 0) {
    // First circle to scroll down
    circleButtons[0].addEventListener('click', () => {
        // Use Locomotive Scroll to scroll to the #second element
        scroll.scrollTo('#second');
    });

    // Second circle to scroll up
    circleButtons[1].addEventListener('click', () => {
        // Use Locomotive Scroll to scroll to the top of the page (hero section)
        scroll.scrollTo('#hero');
    });
}
