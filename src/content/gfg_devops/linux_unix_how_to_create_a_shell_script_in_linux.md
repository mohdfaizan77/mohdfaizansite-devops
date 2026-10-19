# Writing and executing shell scripts

Source: https://www.geeksforgeeks.org/linux-unix/how-to-create-a-shell-script-in-linux/

A shell script is a collection of commands written in a scripting language that is interpreted by a shell in an operating system such as Linux. The shell acts as a command-line interface (CLI), allowing users to interact with the operating system by executing commands.
Shell scripts are commonly used to:
- Automate repetitive tasks
- Execute a sequence of commands
- Simplify system administration
- Improve efficiency and consistency

## Writing Your First Shell Script

### Step 1: Choose a Text Editor
Before you start writing your shell script, you need a text editor. Popular choices include Nano, Vim, and Emacs. For beginners, Nano is user-friendly and easy to use.
Command:

```
nano myscript.sh
```

### Step 2: Write Your Script
Let's create a simple script that prints "Hello, World!" to the terminal.
Script:

```
#!/bin/bash
# This is a simple shell script

echo "Hello, World!"
```
Explanation:
- The first line (#!/bin/bash) is called the shebang. It specifies the shell that should be used to interpret the script.
- Lines starting with # are comments. They are ignored by the shell and help improve readability.
- The echo command prints text to the terminal.

### Step 3: Save and Exit
Save the script in Nano editor by pressing Ctrl + O, then Enter to confirm, and finally Ctrl + X to exit.

### Step 4: Make the Script Executable
To run the script, you need to make it executable:

```
chmod +x myscript.sh
```

## Executing Shell Scripts

### Running the Script
Now that your script is executable, you can run it by typing.
Command:

```
./myscript.sh
```
- The ./ indicates that the script is located in the current directory.
Output:
Alternative Method (Without Changing Permissions)
A script can also be executed by explicitly specifying the interpreter:
Command:

```
bash myscript.sh
```
- In this case, execute permission is not required.

## Variables and Input
Shell scripts can use variables to store and manipulate data. Here's an example:
Script:

```
#!/bin/bash

# Get user input
echo "Enter your name:"
read name

# Print a greeting
echo "Hello, $name!"
```
- read: Stores user input in the variable name
- $name retrieves the value of the variable
- Run the script, and it will prompt you to enter your name.
Output:

### Control Flow
Shell scripts support basic control flow structures like if statements, case statements, and loops.
Example:
This script checks whether the entered number is even or odd.
Script:

```
#!/bin/bash

echo "Enter a number:"
read num

if [ $((num % 2)) -eq 0 ]; then
  echo "$num is even."
else
  echo "$num is odd."
fi
```
Output:
