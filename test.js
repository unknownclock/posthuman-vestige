
let split = new SplitText(".line", { type: "words, chars" }),
    lineChars = split.chars,
    lineCharsShuffled = gsap.utils.shuffle(lineChars); 


gsap.to(lineCharsShuffled, { 
  rotationX: 360*3, rotationY: 360*2, // more turns
  opacity:0,
  motionPath:{
    path:[ {x:400, y:-100}, {x:500, y:0}], 
    curviness:0.5
  },
  stagger: 
    function(index, target, list) {
    // Return the delay from the start (not between each)
    return index * 0.15;
  },
  duration: 5,  ease: "power2.in",
  repeat:6
});

                          
