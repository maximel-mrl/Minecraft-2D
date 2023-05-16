# Minecraft 2D
Minecraft 2D is a procedurally generated 2D world using sinus curve with some **secondary** gameplay features.
## How it work
The terrain is generated using multiple sinusoidal functions. By adding multiple of these functions interferences are created, and so, a curve is formed that takes a long time to repeat and thus feels completely random.
### Example of interfering with five sinusoidal functions :
![](https://raw.githubusercontent.com/maxime-mrl/Minecraft-2D/master/assets/images/curve-illustration-trimed.gif)
### more info :
- The world is infinitely procedurally generated but will eventually repeat
- There are two biomes but nothing would prevent adding more
- Every generation uses the same random functions just with some multiplier so it's not all the same
- Monster are the exception, they only use `Math.random()`
- to obtain the "randomness" 7 curves are used
## Demo :
[projects.maxime-morel.xyz/minecraft-2d](https://projects.maxime-morel.xyz/minecraft-2d)