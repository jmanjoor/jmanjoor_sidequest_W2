GBDA302 Week 2: Panic & Mischief Redesign
Student Information
Name: Jowan Manjooran Jomon

Student ID: 21105035

Email: jmanjoor@uwaterloo.ca

Project Title
GBDA302 Week 2: Emotional Expression & Mischief Mechanic (Panic)

Description
This project is a redesign of the standard AABB platformer example. The goal was to transform the blob’s movement and the environment to express the emotion of Panic, while implementing a Mischief mechanic where the blob steals and stacks objects.

1. Emotional Expression: Panic

To convey panic, the following changes were made to the blob’s physics and visuals:

Hyperventilation: The tSpeed (breathing animation) was increased significantly to simulate rapid panting.

High-Stress Physics: Acceleration and maximum speed were boosted, making the movement feel frantic and harder to control.

Jitter: A random noise factor was added to the blob’s vertex drawing and horizontal velocity, creating a constant "shiver" or "tremble."

Environment: The background was changed to a subtle red tint to increase the sense of urgency/stress.

2. Mischief Mechanic: The Loot Stack

Stealing: Three gold cubes are placed throughout the map. When the blob overlaps with them, they are "stolen."

Stacking: Stolen items are dynamically pinned to the top of the blob. As the player collects more, they stack vertically on the blob's head.

Reset Logic: Once the blob collects 3 items, the items reset to their original positions on the map, allowing for continuous gameplay.

Score Counter: A total score tracks how many items have been stolen across all resets.

Controls
A / Left Arrow: Move Left

D / Right Arrow: Move Right

W / Space / Up Arrow: Jump

GenAI Attribution
The original platforming base code was provided by Dr. Karen Cochrane and David Han. The redesign logic, including the panic-based physics tuning, the item stacking coordinate math, and the reset logic, was developed with assistance from Gemini (GenAI) to ensure efficient implementation of the mischief mechanics and boundary bug fixes.
