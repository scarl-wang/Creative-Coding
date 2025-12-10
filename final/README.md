# Final Project

I want to create an interactive, meditative experience that blends storytelling and self-reflection. The piece will begin as a short “choose your own adventure” style story. The user will make simple selections, similar to an online personality quiz, which subtly reveal aspects of their mindset or emotional state. At the end of the story, there will be a “mirror” component that uses the webcam to reflect the user’s image. Based on their story choices, the mirror will generate abstract visuals around their reflection, like a field of shifting colors or shapes that represent their inner state and emotions.

Inputs: webcam (for live video feed), user selections (via mouse clicks or keyboard input)

Outputs: visual feedback on the canvas (text, patterns, colors), maybe sound if I have time

Methods for building the project:

Interactive story: tracking user selection with arrays and buttons
Visualization (mirror): createCapture(VIDEO) for webcam, blend modes, and perlin noise for randomizing colors

I feel really inspired by this tutorial and want to make the final screen to project different variations of supertoroids as the head of the user based on their selections.
https://www.youtube.com/watch?v=p0uKK2jv_m0
https://en.wikipedia.org/wiki/Supertoroid

For the torus, I reference this formula:
![Torus formula](image-1.png)
and these formula for the supertorus:
![supertorus1](image.png)
![supertorus2](image-2.png)

Reference for adding text in WEBGL mode:
https://github.com/processing/p5.js/wiki/Getting-started-with-WebGL-in-p5#text

# Key - Parameters for the donuts

1: r1 & r2

- to remember : r1=60 r2=90
- to forget: r1=90 r2=60

2: speed

- more: 0.003
- less: 0.001

3: spacing

- a little at a time: 20
- all at once: 10

4: t & s

- fight it t=2.5 s=2.5
- let it be: t=1 s=1
