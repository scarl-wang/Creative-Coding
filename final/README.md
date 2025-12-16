# What's going on in your head?

## Idea

This project is a play on popular online psychological tests that psychoanalyzes you based on a set of random, often arbitrary answers. At the same time, I wanted it to be an interactive, meditative experience that invites self-reflection. The piece will begin as a short “choose your own adventure” style story. The user will make simple selections between four pairs of obscure options, which subtly reveal aspects of their mindset or emotional state. At the end of the story, there will be a “mirror” component that uses the webcam to reflect the user’s image. Based on their story choices, the mirror will generate abstract visuals that represent their inner state and emotions.

I wanted the final image to be an abstract representation of "what's going on in your head" that also responds to the user selections. I looked for different geometric patterns that have the potential to generate dynamic animations and also have three-dimensionality, as they will be generated where the user's head is. I was very lucky to find this tutorial on creating supertorus in p5, as the plotting of the dots remembles a mini orbiting galaxy that reponds to the "turning gears" in ones's head and thought it'd be a fun representation of the "what's going on in your head".
https://www.youtube.com/watch?v=p0uKK2jv_m0
https://en.wikipedia.org/wiki/Supertoroid

## Process

### Part 1

I broke the project down into two parts and started with the user selection first. I wanted the experience to be obscure but also hint at self-reflection, so instead of including guiding questions, I asked to users to select between two options, such as "to remember" and "to forget", with no context at all. I thought trying to decypher what the questions is asking for and where they lead is a part of the experience, as the context would be their own interpretation, hence "what's going on in your head". Though I didn't yet know what exactly the parameters would be, I wanted each answer to determine a certain aspect of the final image that's generated, as a way of "reflecting" the truth of the user through the mirror component.

I created a class to generate flickering stars for the background, which sets up the galactic theme. The first version tracks user selections with mouse clicks by calculating whether their mouse is within a set distance of the answer, which was something we learned in class. I added a hover state for the options to indicate their interactivity. To test if the selections were working stored each selection, I stored the selections in an array to display at the end.

### Part 2

The second part was me trying to create a animated supertoroid that follows the head of the users. I reference the tutorials listed above, as well as the formulas in the wikipedia pages for Torus and Supertorus. After trying both faceMesh and bodyPose from the ml5 library - I decided to use bodyPose at this stage as I wanted the shoulder points to create a neck-shoulder-chest area for the supertoroid to "float" on.

I worked off of the ml5 starter files and mainly followed the tutorial to create the "donut". The 3D animation requires the WEBGL setup, so I had to play around with a series of transformations to make sure the image appear in frame and mirror where the user is. I also experimented with the parameters for the animation of the donut. I wanted the shape and size to be responsive to the headsize of the user in frame, so I calculated the headsize of the user using the distance between keypoints like ears and nose and mapped the size of the donut to it to make it more responsive.

For the torus, I reference this formula:
![Torus formula](image-1.png)
and these formula for the supertorus:
![supertorus1](image.png)
![supertorus2](image-2.png)

### Part 3

This is where I combined the user selection screens with generating the "donut". I received feedback in class to try out differnt forms of selection, such as eyeblinks instead of mouse clicks, as it's not only more interactive but also more aligned with the reflective theme. This is where I switched to faceMesh and mapped out the outlines of the eyes. I originally calculated the blinks using the distance between the top and bottom points of the eyes, but there was too much error and didn't account for the distance between the user and the screen. After some research, I found out about the EAR (Eye Aspect Ratio), which compares the vertical and horizontal length of the eyes. By setting a threshold for when eyes are closed and comparing the EAR to that threshold, an eye blink is detected. This method is way more responsive to different eye shapes and positions and improved the detection accuracy by a lot.

References for blink detection:
https://medium.com/the-web-tub/recognising-eye-blinking-with-tensorflow-js-3c02b738850d
https://www.youtube.com/watch?v=br0eUIBROjo

There were two other challenges with using eye blink for selection. First, blinks were being consecutively detected every frame when the eye is closed. This is why I had to set up the "eyesAreClosed" and "eyesWereClosed" variables - the former is whether eyes are closed at the present moment, and the latter is whether eyes were closed previously. Blink are only detected at the moment of change, when eyes ARE closed now and NOT closed previously. Second, when users are within a selection area, every blink gets registered as a selection, which lead to then accidentally selecting the next option in the same area. To prevent this from happening, I set up "readyForSelection", which resets to true only when users exit a selection area (NOT "inAnyZone"). Selections by eye blinks won't be detected unless BOTH "readyForSelection" and "blinkJustHappened" is true.

I also noticed my text setup didn't work with WEBGL, especially hover states. With the new selection method, I decided to redo them by adding a larger ring around the options to indicate the selection area. When a user's nose enter a set distance of the option, the circle lights up, indicating that the option is ready to be selected. I thought this worked better UX wise with the head selection.

Reference for setting up text in WEBGL mode:
https://github.com/processing/p5.js/wiki/Getting-started-with-WebGL-in-p5#text

### Key: Parameters for the supertorus

Here's how each selection determines the shape of the supertorus.

1: controls the radii of the larger & smaller circles. When r2>r1, the overlap creates a tube/core in the middle. When r1>r2, the middle is hollow like the hole in the donut. Choosing to remember makes the smaller pieces overlap and generates a core; choosing to forget creates hollowness.

- to remember : r1 = 60; r2 = 90
- to forget: r1 = 90; r2 = 60

2: controls the rotation speed of the supertoroid. More is faster; less is slower.

- more: speed = 0.003
- less: speed = 0.001

3: controls the spacing of the smaller circles. A little at a time gives more spacing between the smaller pieces; all at once packs the smaller pieces tightly together.

- a little at a time: spacing = 20
- all at once: spacing = 10

4: controls the \shape of the supertoroid. Fight it creates sharp edges; let it be creates rounded, circular shapes.

- fight it t = 2.5; s = 2.5
- let it be: t = 1; s = 1

## Next Steps

I'm happy with how this project turned out and learned a lot during the process. From the feedback I got, I agree that some of the intended obscurity might be confusing to some users. If I were to improve or expand on it, I would add more instructional and interpretational texts, maybe an intro paragraph as well as an analysis of the final shape to better explain the connection between one's choices and the results. It might also be interesting to see how the shape changes in real time as selections are being made. Adding a responsive sound component would also add to the immersiveness.
