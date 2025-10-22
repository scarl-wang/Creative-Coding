# Assignment 4: Donut Shop

In this assignment, I want to generate different flavors and sizes of donuts. I've created a class for the donut, with customizable variables such as its coordinates, diameter, and flavor.

There are 3 flavors:

- original glazed (plain)
- strawberry sprinkles (pink icing with random sprinkles)
- chocolate sprinkles (brown icing with random sprinkles)

In the first version of this assignment, I've randomized the parameters that the class takes and set the coordinates to the mouse position, so a donut of random size and flavor will appear where ever the user clicks.

In the process, I learned that in order to keep the randomly generated elements within a class static (as opposed to rerendering every frame), I need to generate the values in the constructor, which only runs once.

I then wanted to add more interactivity, so I decided to have users click the generated donuts to "eat" them. When there are no more donuts left, users can click to generate another batch.
