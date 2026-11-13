'use strict';

/* ============ ENGLISH CONTENT ============
   Mirrors the structure of Data.js. Lessons are matched by index,
   the quiz is matched by index too (lang / answer index come from Data.js). */
const EN = {};

/* ---------- Courses ---------- */
EN.COURSES = {
  py: {
    desc: 'Python is a language with a simple syntax. Great for getting started, data analysis, automation and backend.',
    lessons: [
      {
        title: 'First program and variables',
        text: `<p>A Python program runs from top to bottom. Use the <code>print()</code> function to output text.</p>
<p>A <b>variable</b> is a name under which a value is stored. The type is detected automatically: number, string, fraction, etc.</p>
<ul><li>Use Latin letters and no spaces in names: <code>user_name</code></li><li>Case matters: <code>age</code> and <code>Age</code> are different variables</li><li>Strings go in quotes, f-strings let you insert values: <code>f"{age}"</code></li></ul>`,
        code: String.raw`# Print to the screen
print("Hello, world!")

# Variables
name = "Anna"
age = 17
height = 1.65

print("My name is", name)
print(f"I am {age} years old, {height} m tall")`,
        task: 'Create variables with your name and city and print the phrase "I live in ...".',
        tasks: [
          'Create variables with your name and city and print the phrase "I live in ...".',
          'Create variables for your birth year and the current year and print your age.',
          'Print three lines: first name, last name and grade (or job) — each on a new line.',
          'Create two variables a and b and swap their values without a third variable.',
          'Calculate the area and perimeter of a rectangle from variables width and height and print them with labels.',
          'Use an f-string to print: "Item: apples, price: 2.5, quantity: 4, total: 10.0".',
          'Store your name in a variable and print it reversed, along with its length.',
          'Convert a temperature from Celsius to Fahrenheit using F = C * 9 / 5 + 32.'
        ]
      },
      {
        title: 'Data types and operations',
        text: `<p>Main types: <code>int</code> (integers), <code>float</code> (fractions), <code>str</code> (strings), <code>bool</code> (True/False).</p>
<p>The <code>input()</code> function always returns a string, so a number has to be converted: <code>int(...)</code> or <code>float(...)</code>.</p>`,
        code: String.raw`a = 10
b = 3
print(a + b)    # 13
print(a / b)    # 3.333...
print(a // b)   # 3 — integer division
print(a % b)    # 1 — remainder
print(a ** b)   # 1000 — power

text = "Python"
print(text.upper(), len(text))
print(text[0], text[-1])

x = input("Enter a number: ")
print(int(x) * 2)`,
        task: 'Ask the user for two numbers and print their sum, difference and product.',
        tasks: [
          'Ask the user for two numbers and print their sum, difference and product.',
          'Ask for a circle radius and print the circumference and area (π = 3.14159).',
          'Enter a number of seconds and print how many hours, minutes and seconds it is (use // and %).',
          'Enter a three-digit number and print the sum of its digits.',
          'Ask for a name and print it in upper case, lower case and its first letter separately.',
          'Enter two numbers and print the division result, the integer part and the remainder.',
          'Print the type of the values 5, 5.0, "5" and True using type().',
          'Enter a price and a discount in percent, print the final price rounded to 2 decimals (round).'
        ]
      },
      {
        title: 'Conditions',
        text: `<p>A conditional statement chooses which code to run. In Python a block of code is marked by <b>indentation</b> (4 spaces).</p>
<p>Comparisons: <code>==</code>, <code>!=</code>, <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>. Logic: <code>and</code>, <code>or</code>, <code>not</code>.</p>`,
        code: String.raw`score = int(input("Score: "))

if score >= 90:
    print("Excellent")
elif score >= 70:
    print("Good")
else:
    print("Needs work")

if 0 <= score <= 100 and score != 50:
    print("Valid")`,
        task: 'Write a program that checks whether the entered number is even.',
        tasks: [
          'Write a program that checks whether the entered number is even.',
          'Enter an age and print "child" (under 12), "teenager" (12–17) or "adult" (18+).',
          'Enter three numbers and print the largest without using max().',
          'Check whether the entered year is a leap year (divisible by 4 but not by 100, or by 400).',
          'Enter a number and print whether it is positive, negative or zero.',
          'Write a mini calculator: the user enters two numbers and a sign (+, -, *, /). Handle division by zero.',
          'Enter a grade 1–5 and print it in words: "bad", "poor", "satisfactory", "good", "excellent".',
          'Enter three side lengths and check whether a triangle exists and what kind it is (equilateral, isosceles, scalene).'
        ]
      },
      {
        title: 'Loops',
        text: `<p><code>for</code> goes through the items of a sequence, <code>while</code> runs as long as the condition is true.</p>
<p><code>range(5)</code> gives the numbers 0, 1, 2, 3, 4. The <code>break</code> and <code>continue</code> statements control the loop.</p>`,
        code: String.raw`for i in range(5):
    print(i)

fruits = ["apple", "banana", "kiwi"]
for f in fruits:
    print(f)

n = 3
while n > 0:
    print("Left:", n)
    n -= 1`,
        task: 'Print the multiplication table for 7 using a for loop.',
        tasks: [
          'Print the multiplication table for 7 using a for loop.',
          'Print the numbers from 10 down to 1.',
          'Calculate the sum of numbers from 1 to N, where N is entered by the user.',
          'Print all even numbers from 1 to 50.',
          'Calculate the factorial of N using a loop.',
          'Guess the number: the computer picks a number from 1 to 20 (random), a while loop hints "higher/lower" until you guess.',
          'Print a "Christmas tree" of height N made of * characters.',
          'Print the first 15 Fibonacci numbers.'
        ]
      },
      {
        title: 'Functions',
        text: `<p>A function is a named block of code that can be called many times. It is declared with <code>def</code> and returns a result with <code>return</code>.</p>
<p>Parameters can have default values.</p>`,
        code: String.raw`def square(x):
    return x * x

def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(square(7))
print(greet("Max"))
print(greet("Lee", greeting="Welcome"))`,
        task: 'Write a function that takes a number and returns True if it is prime.',
        tasks: [
          'Write a function that takes a number and returns True if it is prime.',
          'Write a function square(x) that returns the square of a number and call it for numbers 1 to 5.',
          'Write a function greet(name, greeting="Hello") with a default parameter.',
          'Write a function that takes three numbers and returns the smallest.',
          'Write a function is_palindrome(s) that checks whether a word reads the same both ways.',
          'Write a function that returns the sum of the digits of a number.',
          'Write a recursive function factorial(n).',
          'Write a function that accepts any number of numbers (*args) and returns their average.'
        ]
      },
      {
        title: 'Lists and dictionaries',
        text: `<p>A <b>list</b> stores an ordered collection of values, a <b>dictionary</b> stores "key → value" pairs.</p>
<p>A list comprehension <code>[expression for x in ... if ...]</code> is a short way to create a new list.</p>`,
        code: String.raw`nums = [5, 2, 9, 1]
nums.append(7)
nums.sort()
print(nums, len(nums))
print([n * 2 for n in nums if n > 2])

user = {"name": "Eve", "age": 20}
user["city"] = "Tashkent"
for key, value in user.items():
    print(key, "->", value)`,
        task: 'Given a list of numbers, find the maximum and the average without using max() and sum().',
        tasks: [
          'Given a list of numbers, find the maximum and the average without using max() and sum().',
          'Create a list of 5 favorite movies, add one more, remove the first one and print the result.',
          'Print the numbers 1 to 20 and, separately, only those divisible by 3.',
          'Reverse a list without using reverse() or slices with step -1.',
          'Remove all duplicate elements from a list while keeping the order.',
          'Count how many times each word appears in a sentence (use a dictionary).',
          'Sort a list of words by length, and alphabetically when lengths are equal.',
          'Create a "name — grade" dictionary for 5 students and print the one with the highest grade.'
        ]
      },
      {
        title: 'Classes and OOP',
        text: `<p>A class describes a template for an object: data (fields) and behavior (methods). The <code>__init__</code> method is called when an object is created, <code>self</code> is a reference to the object itself.</p>`,
        code: String.raw`class Dog:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print(f"{self.name} says: woof!")

rex = Dog("Rex")
rex.speak()`,
        task: 'Create a BankAccount class with deposit(), withdraw() and balance.',
        tasks: [
          'Create a BankAccount class with deposit(), withdraw() and balance.',
          'Create a Dog class with name and age fields and a bark() method that prints "Woof!".',
          'Create a Rectangle class with area() and perimeter() methods.',
          'Add a __str__ method to a Person class so print(person) outputs "Name, N years old".',
          'Create a Counter class with increment(), decrement() and value.',
          'Create an Animal class and two subclasses Cat and Dog, each with its own speak() method.',
          'In BankAccount, forbid withdrawing more than the balance (print an error message).',
          'Create a Student class with a list of grades and an average() method. Create three students and print the best one.'
        ]
      },
      {
        title: 'Files and errors',
        text: `<p>To work with files safely use <code>with open(...)</code> — the file closes automatically. Errors are caught with a <code>try / except</code> block.</p>`,
        code: String.raw`try:
    with open("notes.txt", "w", encoding="utf-8") as f:
        f.write("First line\n")
    with open("notes.txt", encoding="utf-8") as f:
        print(f.read())
except FileNotFoundError:
    print("File not found")
finally:
    print("Done")`,
        task: 'Save a list of 5 tasks to a file and read it back line by line.',
        tasks: [
          'Save a list of 5 tasks to a file and read it back line by line.',
          'Write the numbers 1 to 10 to a file, one per line, then read them back and print their sum.',
          'Count the number of lines and words in a text file.',
          'Append a new line to the end of an existing file (mode "a").',
          'Read a file and print its longest line.',
          'Copy the contents of one file into another, replacing every "bad" with "good".',
          'Handle the error: if the file does not exist, print a clear message (try/except FileNotFoundError).',
          'Build a simple diary: the program asks for an entry and appends it to a file with the current date.'
        ]
      }
    ]
  },
  cpp: {
    desc: 'C++ is a fast compiled language. It is used in games, systems, competitions and wherever performance matters.',
    lessons: [
      {
        title: 'First program',
        text: `<p>Every C++ program starts with the <code>main()</code> function. The <code>#include</code> line pulls in libraries, <code>cout</code> prints text, and <code>;</code> ends every statement.</p>
<p>The code has to be <b>compiled</b>: <code>g++ main.cpp -o main</code>, then run with <code>./main</code>.</p>`,
        code: String.raw`#include <iostream>
using namespace std;

int main() {
    cout << "Hello, world!" << endl;
    return 0;
}`,
        task: 'Compile the program and change the text so that it prints your name.',
        tasks: [
          'Compile the program and change the text so that it prints your name.',
          'Print three lines of text using std::cout and the \\n character.',
          'Print a 4-line "business card": name, city, age, hobby.',
          'Add comments (single-line and multi-line) explaining each line of the program.',
          'Print a frame of * characters, 5 rows by 10 columns.',
          'Deliberately delete a semicolon and read the compiler message. Then fix the error.',
          'Print two words on separate lines with a single cout statement using std::endl.',
          'Print the numbers 1, 2, 3 separated by spaces, then their sum on the same line.'
        ]
      },
      {
        title: 'Variables and types',
        text: `<p>In C++ the type of a variable is stated explicitly: <code>int</code> (integer), <code>double</code> (fraction), <code>char</code> (character), <code>bool</code> (logical), <code>string</code> (string).</p>`,
        code: String.raw`#include <iostream>
#include <string>
using namespace std;

int main() {
    int age = 17;
    double height = 1.65;
    char grade = 'A';
    bool isStudent = true;
    string name = "Anna";

    cout << name << " " << age << " " << height << endl;
    return 0;
}`,
        task: 'Declare variables of different types and print their values on one line.',
        tasks: [
          'Declare variables of different types and print their values on one line.',
          'Read two numbers with cin and print their sum, difference and product.',
          'Read an integer and print its square and cube.',
          'Print the result of 7 divided by 2 for both int and double. Explain the difference.',
          'Enter a radius and print the circle area as a double (const double PI = 3.14159).',
          'Enter a number of seconds and print how many hours, minutes and seconds it is (use / and %).',
          'Print the size of int, double, char and bool using sizeof.',
          'Enter a character and print its ASCII code, then the character that follows it.'
        ]
      },
      {
        title: 'Input and conditions',
        text: `<p><code>cin &gt;&gt; x</code> reads a value from the keyboard. Conditions are written with <code>if</code>, <code>else if</code>, <code>else</code>; the condition is always in parentheses and the block in curly braces.</p>`,
        code: String.raw`#include <iostream>
using namespace std;

int main() {
    int score;
    cout << "Score: ";
    cin >> score;

    if (score >= 90) {
        cout << "Excellent" << endl;
    } else if (score >= 70) {
        cout << "Good" << endl;
    } else {
        cout << "Keep going" << endl;
    }
    return 0;
}`,
        task: 'Read a number and print whether it is positive, negative or zero.',
        tasks: [
          'Read a number and print whether it is positive, negative or zero.',
          'Enter a number and print whether it is even or odd.',
          'Enter three numbers and print the largest.',
          'Enter an age and print the category: child, teenager, adult.',
          'Check whether the entered year is a leap year.',
          'Write a switch-based calculator: two numbers and an operation (+, -, *, /) with a division-by-zero check.',
          'Enter a month number and print how many days it has using switch.',
          'Enter a score 0–100 and print a letter grade A, B, C, D or F.'
        ]
      },
      {
        title: 'Loops',
        text: `<p>A <code>for</code> loop has three parts: start, condition and step. A <code>while</code> loop repeats as long as the condition is true.</p>`,
        code: String.raw`#include <iostream>
using namespace std;

int main() {
    for (int i = 0; i < 5; i++) {
        cout << i << " ";
    }
    cout << endl;

    int n = 3;
    while (n > 0) {
        cout << "Left: " << n << endl;
        n--;
    }
    return 0;
}`,
        task: 'Calculate the sum of numbers from 1 to N, where N is entered by the user.',
        tasks: [
          'Calculate the sum of numbers from 1 to N, where N is entered by the user.',
          'Print all numbers from 1 to 30 that are multiples of 3.',
          'Print the multiplication table for a number entered by the user.',
          'Calculate the factorial of N with a for loop (use long long).',
          'Count the digits of the entered number using a while loop.',
          'Print a right triangle of height N made of * characters.',
          'Enter numbers until the user enters 0 and print their sum (do-while loop).',
          'Find and print all prime numbers from 2 to 100.'
        ]
      },
      {
        title: 'Functions',
        text: `<p>A function is declared with a return type and parameter types. <code>void</code> means the function returns nothing.</p>`,
        code: String.raw`#include <iostream>
#include <string>
using namespace std;

int square(int x) {
    return x * x;
}

void greet(string name) {
    cout << "Hello, " << name << "!" << endl;
}

int main() {
    cout << square(7) << endl;
    greet("Max");
    return 0;
}`,
        task: 'Write a function max3(a, b, c) that returns the largest of three numbers.',
        tasks: [
          'Write a function max3(a, b, c) that returns the largest of three numbers.',
          'Write a function square(int x) that returns the square of a number.',
          'Write a function bool isEven(int n) and test it for numbers 1 to 10.',
          'Write a function that returns the sum of the digits of a number.',
          'Write a recursive factorial function.',
          'Write a function void printLine(int n, char c) that prints a line of n characters c.',
          'Write overloaded functions sum(int, int) and sum(double, double).',
          'Write a function bool isPrime(int n) and print all primes up to 50.'
        ]
      },
      {
        title: 'Arrays and vector',
        text: `<p>An ordinary array has a fixed size. The standard library <code>vector</code> can grow: <code>push_back</code> adds an element, <code>size()</code> returns the length, and <code>sort</code> sorts.</p>`,
        code: String.raw`#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    int arr[3] = {4, 8, 15};
    cout << arr[0] << endl;

    vector<int> v = {5, 2, 9, 1};
    v.push_back(7);
    sort(v.begin(), v.end());
    for (int x : v) {
        cout << x << " ";
    }
    cout << endl;
    return 0;
}`,
        task: 'Read N numbers into a vector, sort them in descending order and print them.',
        tasks: [
          'Read N numbers into a vector, sort them in descending order and print them.',
          'Create a vector of 5 numbers, add a number at the end, remove the last one and print the size.',
          'Find the minimum and maximum of a vector without std::min_element.',
          'Calculate the arithmetic mean of the vector elements.',
          'Reverse a vector without using std::reverse.',
          'Print only the positive elements of a vector.',
          'Remove all even numbers from a vector.',
          'Count how many times each number occurs in a vector (use std::map).'
        ]
      },
      {
        title: 'Classes',
        text: `<p>A class combines data and functions. The <code>public</code> modifier opens access from outside, <code>private</code> hides it. The constructor has the name of the class and is called when an object is created.</p>`,
        code: String.raw`#include <iostream>
#include <string>
using namespace std;

class Dog {
public:
    string name;
    Dog(string n) : name(n) {}
    void speak() {
        cout << name << " says: woof!" << endl;
    }
};

int main() {
    Dog rex("Rex");
    rex.speak();
    return 0;
}`,
        task: 'Create a Rectangle class with area() and perimeter() methods.',
        tasks: [
          'Create a Rectangle class with area() and perimeter() methods.',
          'Create a Dog class with name and age fields and a bark() method.',
          'Create a Circle class with a radius and area() and circumference() methods.',
          'Add a constructor that takes the field values and call it for two objects.',
          'Create a BankAccount class with a private balance field and deposit() and withdraw() methods with validation.',
          'Create a Student class with a vector of grades and an average() method.',
          'Create an Animal class and a Cat subclass with an overridden virtual speak() method.',
          'Create a vector of Rectangle objects and print the one with the largest area.'
        ]
      },
      {
        title: 'Pointers and references',
        text: `<p>A <b>pointer</b> stores the address of a variable in memory. <code>&amp;x</code> is the address of x, <code>*p</code> is the value at the address. A <b>reference</b> is a second name for the same variable; through it a function can change the original.</p>`,
        code: String.raw`#include <iostream>
using namespace std;

void addOne(int &value) {
    value++;
}

int main() {
    int x = 10;
    int* p = &x;
    *p = 20;
    cout << x << endl;

    addOne(x);
    cout << x << endl;
    return 0;
}`,
        task: 'Write a function swap(int &a, int &b) that swaps the values.',
        tasks: [
          'Write a function swap(int &a, int &b) that swaps the values.',
          'Create a pointer to a variable and print its value and address through the pointer.',
          'Change a variable\'s value through a pointer and check that it changed.',
          'Write a function void increment(int &x) that adds 1 to the number.',
          'Create a dynamic array with new, fill it with 1..5, print it and free it with delete[].',
          'Write a function that takes a pointer to an array and its size and returns the sum of the elements.',
          'Write a function void minMax(const vector<int>& v, int &mn, int &mx) that returns the minimum and maximum through references.',
          'Create a std::unique_ptr to a class object and call its method.'
        ]
      }
    ]
  }
};

/* ---------- Cheat sheet (same rows as CHEATS in Data.js) ---------- */
EN.CHEATS = [
  ['Output', 'print("Hi")', 'cout << "Hi" << endl;',
    'To show text or a number on screen, Python uses print(), which adds a newline by itself. C++ needs the cout stream from <iostream> and the << operator; endl ends the line.'],
  ['Input', 'x = input()', 'cin >> x;',
    'In Python, input() always returns a string. In C++, cin >> x reads the value straight into a variable of the right type, which must be declared first.'],
  ['Variable', 'x = 5', 'int x = 5;',
    'In Python a variable is created by simple assignment and its type is detected automatically. In C++ you state the type explicitly (int, double, string) and it does not change.'],
  ['Comment', '# comment', '// comment',
    'Comments are not executed and are used for notes. In Python a single-line comment starts with #, in C++ with //; multi-line comments in C++ go between /* and */.'],
  ['Condition', 'if x > 0:', 'if (x > 0) { }',
    'A condition runs a block only if the expression is true. In Python a colon follows the condition and the block is marked by indentation. In C++ the condition is in parentheses and the block in curly braces.'],
  ['for loop', 'for i in range(5):', 'for (int i = 0; i < 5; i++) { }',
    'Repeats code a set number of times. In Python, for walks through a sequence, e.g. range(5) gives 0–4. In C++, for has three parts: start, condition, step.'],
  ['while loop', 'while x > 0:', 'while (x > 0) { }',
    'Repeats a block while the condition is true. Make sure something changes inside the loop, otherwise it never ends. The syntax is nearly the same; only brackets and indentation differ.'],
  ['Function', 'def f(a):\n    return a', 'int f(int a) {\n    return a;\n}',
    'A function is a named piece of code you can call many times. Python uses def and no types. C++ needs the return type and the type of each parameter.'],
  ['List', 'a = [1, 2, 3]', 'vector<int> a = {1, 2, 3};',
    'Stores several values in a row. A Python list can hold mixed types and change size. A C++ vector<int> holds elements of one type; it needs #include <vector>.'],
  ['Add an element', 'a.append(4)', 'a.push_back(4);',
    'Adds a value to the end of the list. In Python it is the append() method, in C++ a vector uses push_back().'],
  ['Length', 'len(a)', 'a.size()',
    'Shows how many items are in a list or characters in a string. In Python it is the len(a) function, in C++ the a.size() method.'],
  ['Dictionary', 'd = {"a": 1}', 'map<string, int> d = {{"a", 1}};',
    'Stores "key — value" pairs. In Python it is a dict in curly braces. The C++ equivalent is map<key, value> from <map>; its keys are kept sorted.'],
  ['String → number', 'int("5")', 'stoi("5")',
    'Turns the string "5" into the number 5. In Python it is int("5"), in C++ stoi("5") (needs <string>). With an invalid string both raise an error.'],
  ['Class', 'class A:\n    pass', 'class A { };',
    'A class describes a new data type: fields and methods. In Python the body is set by indentation (pass is an empty body). In C++ the body is in curly braces and a semicolon is required after the closing brace.'],
  ['Logic', 'and  or  not', '&&  ||  !',
    'Logical operators combine conditions. Python spells them as words: and, or, not. C++ uses symbols: && (and), || (or), ! (not).']
];

/* ---------- Quiz (same order as QUIZ in Data.js) ----------
   Each entry: [question, options | null, explanation]
   null = the options need no translation (code, numbers) and are taken from Data.js */
EN.QUIZ = [
  /* 0 */ ['Which function prints text to the screen in Python?', null, 'In Python, output is done with the print() function.'],
  ['What does the expression 7 // 2 output?', null, 'The // operator is integer division: 7 // 2 = 3.'],
  ['How do you declare a function in Python?', null, 'The def keyword creates a function.'],
  ['Which symbol starts a comment in Python?', null, 'A single-line comment starts with #.'],
  ['What is [1, 2, 3] in Python?', ['Tuple', 'Dictionary', 'List', 'Set'], 'Square brackets create a list.'],
  ['Which numbers does range(3) produce?', null, 'range(3) starts at 0 and does not include 3.'],
  ['Which line includes input and output in C++?', null, 'The <iostream> header provides cin and cout.'],
  ['Which function is required in a C++ program?', null, 'Execution always starts at main().'],
  ['How does a statement end in C++?', ['A period', 'A colon', 'A semicolon', 'Nothing'], 'Every statement ends with the ; symbol.'],
  ['What does &x mean in C++?', ['The value of x', 'The address of variable x', 'The square of x', 'Logical AND'], 'The & operator takes the address of a variable.'],
  ['How do you add an element to the end of a vector?', null, 'The push_back method adds an element to the end.'],
  ['Which type is suitable for integers?', null, 'int stores integers.'],
  ['What is a variable?', ['A name for storing a value', 'A kind of loop', 'The name of a language', 'A type of error'], 'A variable is a named place in memory for a value.'],
  ['What is compilation?', ['Running in a browser', 'Translating code into machine language', 'Removing errors', 'Saving a file'], 'The compiler turns source code into an executable file.'],
  ['How do you turn the string "42" into a number?', null, 'The int() function converts a string to an integer.'],
  ['What does print(len("Python")) output?', null, 'The word Python has six letters, len() returns the length of the string.'],
  ['What does print("abc".upper()) output?', ['ABC', 'abc', 'Abc', 'Error'], 'The upper() method makes all letters uppercase.'],
  ['What does the slice a[1:3] give for a = [10, 20, 30, 40]?', null, 'The slice takes the elements with indices 1 and 2; the right bound is not included.'],
  ['What does print(bool(0)) output?', null, 'The number 0 is considered a false value.'],
  ['What does print(2 + 3 * 4) output?', null, 'Multiplication goes before addition: 3 * 4 = 12, then 2 + 12.'],
  ['How do you get all the keys of dictionary d?', null, 'The keys() method returns the keys of a dictionary.'],
  ['Which word ends a loop early?', null, 'The break statement exits the loop immediately.'],
  ['Which word skips the current iteration of a loop?', null, 'continue moves on to the next step of the loop.'],
  ['What does print(type([])) output?', null, 'Square brackets create a list.'],
  ['How do you create an empty dictionary?', null, 'Empty curly braces create an empty dictionary.'],
  ['What does print(10 / 4) output?', ['2.5', '2', '3', 'Error'], 'Regular division / always returns a fraction.'],
  ['Which method removes and returns the last element of a list?', null, 'The pop() method without arguments takes the last element.'],
  ['What does a function with no return give back?', ['None', '0', 'False', 'An empty string'], 'Without return a function returns the special value None.'],
  ['How do you check whether x is in list a?', null, 'The in operator checks whether an element is present.'],
  ['What does print("a" + "b") output?', ['ab', 'a b', 'a+b', 'Error'], 'The + operator concatenates strings.'],
  ['Which variable name is valid in Python?', null, 'A name cannot start with a digit, contain a hyphen or be a keyword.'],
  ['How do you import the math module?', null, 'Modules in Python are imported with the word import.'],
  ['What does print(round(3.7)) output?', null, 'round() rounds to the nearest integer.'],
  ['How does a tuple differ from a list?', ['It cannot be changed after creation', 'It stores only numbers', 'It is always sorted', 'It can only store strings'], 'A tuple is immutable, while a list can be changed.'],
  ['What does print(list(range(2, 5))) output?', null, 'range(2, 5) starts at 2 and does not include 5.'],
  ['Which method sorts a list in place?', null, 'a.sort() changes the list itself, while sorted(a) creates a new one.'],
  ['What does print("Hello"[1]) output?', null, 'Indices start at 0, so [1] is the second letter.'],
  ['How do you correctly write an f-string with variable x?', null, 'In an f-string, variable values are inserted in curly braces.'],
  ['What does the split() method of a string do?', ['Splits the string into a list of parts', 'Joins a list into a string', 'Removes spaces', 'Reverses the string'], '"a b c".split() gives ["a", "b", "c"].'],
  ['What does print(5 == 5.0) output?', ['True', 'False', 'Error', 'None'], 'Numbers are compared by value, 5 and 5.0 are equal.'],
  ['How do you declare a class Car?', null, 'A class is created with the class keyword.'],
  ['What is self in a class method?', ['A reference to the current object', 'The name of the class', 'A global variable', 'A keyword for importing'], 'self lets a method access the fields and methods of its own object.'],
  ['Which method is called when an object is created?', null, '__init__ is the constructor, it initializes the new object.'],
  ['What does print(not True) output?', null, 'The not operator flips the value to the opposite.'],
  ['What does print(7 % 2 == 1) output?', ['True', 'False', '1', 'Error'], '7 % 2 = 1, and the comparison 1 == 1 is true.'],
  ['What does sum([1, 2, 3]) return?', null, 'sum() adds up all the elements.'],
  ['How do you open the file data.txt for reading?', null, 'The open() function opens a file for reading by default.'],
  ['What does max([3, 9, 2]) return?', null, 'max() returns the largest element.'],
  ['What does print("5" + "5") output?', ['55', '10', '5 5', 'Error'], 'Strings are concatenated, not added like numbers.'],
  ['How do you get a list of squares of numbers from 0 to 4?', null, 'This is a list comprehension.'],
  ['Which error occurs when dividing by zero?', null, 'Dividing by zero raises ZeroDivisionError.'],
  ['What does print(len({"a": 1, "b": 2})) output?', null, 'The len() of a dictionary is the number of pairs.'],
  ['How do you add a pair with the key "k" to dictionary d?', null, 'A new value is added by assigning to a key.'],
  ['What does print("python".capitalize()) output?', null, 'capitalize() makes the first letter uppercase.'],
  ['Which type is best suited for fractional numbers?', null, 'double stores floating-point numbers.'],
  ['What does cout << 10 % 3; output?', null, 'The % operator returns the remainder of a division.'],
  ['How do you declare a constant?', null, 'The const keyword forbids changing the value.'],
  ['Which header file contains sort?', null, 'The functions sort, reverse and max_element are in <algorithm>.'],
  ['Which operator reads a value from the keyboard with cin?', null, 'cin >> x reads a value, while cout << x prints it.'],
  ['How many bytes does an int usually take?', null, 'On most modern platforms an int takes 4 bytes.'],
  ['What does endl do?', ['Moves to a new line and flushes the output buffer', 'Ends the program', 'Clears the screen', 'Reads a line'], 'endl prints a newline character and flushes the buffer.'],
  ['How do you correctly declare a string?', null, 'You need to include <string>; the type is called string.'],
  ['Which loop runs at least once?', null, 'In do-while the condition is checked after the body runs.'],
  ['How do you find the size of vector v?', null, 'The size() method returns the number of elements.'],
  ['What does break do inside a loop?', ['Exits the loop immediately', 'Skips an iteration', 'Ends the program', 'Repeats the loop'], 'break interrupts the nearest loop.'],
  ['What does a function of type void return?', ['Nothing', '0', 'An empty string', 'false'], 'void means the function returns no value.'],
  ['How do you access field x of an object through pointer p?', null, 'The -> operator is used for pointers.'],
  ['How do you declare a pointer to int?', null, 'An asterisk after the type declares a pointer.'],
  ['What is a reference in C++?', ['Another name for an existing variable', 'A copy of a variable', 'An address on the heap', 'A data type for strings'], 'Through a reference you can change the original variable.'],
  ['Which operator allocates memory on the heap?', null, 'new creates an object in dynamic memory.'],
  ['What frees memory allocated with new?', null, 'Memory allocated with new is released with the delete operator.'],
  ['What does cout << (5 > 3); output?', null, 'The boolean value true is printed as 1.'],
  ['What does the && operator mean?', ['Logical AND', 'Logical OR', 'Logical NOT', 'Addition'], 'a && b is true only if both conditions are true.'],
  ['What does the || operator mean?', ['Logical OR', 'Logical AND', 'Logical NOT', 'Remainder of division'], 'a || b is true if at least one condition is true.'],
  ['Which construct chooses a branch by the value of a variable?', null, 'switch compares a value with the case options.'],
  ['What is usually put at the end of a case branch?', null, 'Without break, execution "falls through" to the next branch.'],
  ['Which type stores a single character?', null, "char stores a single character, for example 'A'."],
  ['What is function overloading?', ['Several functions with the same name and different parameters', 'Calling a function from itself', 'A function with a very large body', 'Replacing a function with another one'], 'The compiler picks the right version by the argument types.'],
  ['What does the #include directive do?', ['Includes a header file', 'Creates a variable', 'Runs the program', 'Deletes code'], '#include inserts the contents of a header into the program.'],
  ['How do you find the length of string s?', null, 'A string has the methods size() and length().'],
  ['Which modifier hides class members from outside code?', null, 'private members are accessible only inside the class.'],
  ['How do you write a loop that repeats 10 times?', null, 'The counter goes from 0 to 9 — 10 iterations in total.'],
  ["What does cout << 'A' + 1; output?", ['66', 'B', 'A1', 'Error'], "The code of the character 'A' is 65; adding gives the number 66."],
  ['What is nullptr?', ['A null pointer', 'An empty string', 'The number zero', 'A data type'], 'nullptr means the pointer points to nothing.'],
  ['How do you call the speak() method of object dog?', null, 'A dot is used for objects.'],
  ['Which method removes the last element of a vector?', null, 'pop_back() removes the element from the end.'],
  ['What is the destructor of class Dog called?', null, 'The destructor is named like the class, but with ~ at the start.'],
  ['What is the type of the expression 5 / 2.0?', null, 'If one of the operands is fractional, the result is fractional too.'],
  ['What is x after int x = 5; x += 3;?', null, 'x += 3 is the same as x = x + 3.'],
  ['How do you compile main.cpp with g++?', null, 'The -o flag sets the name of the executable file.'],
  ['What does the auto keyword mean?', ['The compiler determines the type of the variable itself', 'The variable is deleted automatically', 'The variable has type int', 'The function is called automatically'], 'The type is deduced from the value the variable is initialized with.'],
  ['Which container stores "key — value" pairs?', null, 'map stores ordered key — value pairs.'],
  ['What does swap(a, b) do?', ['Swaps the values of a and b', 'Adds a and b', 'Compares a and b', 'Copies a to b'], 'swap exchanges the values of two variables.'],
  ['How do you convert a string to an integer?', null, 'The stoi function (string to int) returns an integer.'],
  ['How do you find the length of list a in Python?', null, 'The len() function returns the length of any sequence.'],
  ['Which operator raises a number to a power in Python?', null, 'The expression 2 ** 3 gives 8. The ^ symbol in Python is bitwise XOR.'],
  ['How is "else if" written in Python?', null, 'Python uses the keyword elif.'],
  ['What does the append() method of a list do?', ['Adds an element to the end', 'Removes the last element', 'Sorts the list', 'Clears the list'], 'a.append(x) adds x to the end of list a.'],
  ['How do you get the last element of list a?', null, 'Negative indices count from the end: a[-1] is the last element.'],
  ['Which data type does the input() function return?', null, 'input() always returns a string, so a number has to be converted with int() or float().'],
  ['What is a dictionary (dict) in Python?', ['A set of "key — value" pairs', 'An ordered set of numbers', 'A kind of loop', 'A function type'], 'A dictionary stores data as key: value pairs, for example {"a": 1}.'],
  ['What does print("Hi" * 3) output?', ['HiHiHi', 'Hi3', 'Hi Hi Hi', 'Error'], 'Multiplying a string by a number repeats it.'],
  ['Which construct catches errors in Python?', null, 'Code that may cause an error goes in try, and the handling goes in except.'],
  ['What does print(10 % 3) output?', null, 'The % operator returns the remainder of a division: 10 % 3 = 1.'],
  ['What does cout << 7 / 2; output in C++?', null, 'Both numbers are integers, so the division is integer: 7 / 2 = 3.'],
  ['Which operator is used for output with cout?', null, 'cout << x prints a value, while cin >> x reads one.'],
  ['How do you declare a vector of integers v?', null, 'The element type is given in angle brackets.'],
  ['Which index does an array start at in C++?', ['0', '1', '-1', 'Any'], 'The first element has index 0, the last one size - 1.'],
  ['What is the line using namespace std; for?', ['Lets you write cout instead of std::cout', 'Includes the iostream file', 'Runs the program', 'Creates a variable'], 'It opens the std namespace, so the std:: prefix can be omitted.'],
  ['What does the operation i++ do?', ['Increases i by 1', 'Multiplies i by 2', 'Decreases i by 1', 'Resets i to 0'], 'i++ increases the value of a variable by one.'],
  ['What is the constructor of class Dog called?', null, 'The constructor has the same name as the class.'],
  ['What does *p mean if p is a pointer?', ['The value at the address in p', 'The address of the pointer', 'The square of p', 'The size of p'], 'The * operator dereferences a pointer and gives the value at the address.'],
  ['Which type stores the values true and false?', null, 'The logical type in C++ is called bool.'],
  ['How do you write a single-line comment in C++?', ['// text', '# text', '-- text', '<!-- text -->'], 'A single-line comment starts with //.'],
  ['What does print(3 * "ab") output?', ['ababab', 'ab3', 'ab ab ab', 'Error'], 'Multiplying a string by a number repeats the string that many times.'],
  ['Which method removes spaces from the edges of a string?', null, 's.strip() removes spaces and newlines at the start and the end.'],
  ['What does print("hello".replace("l", "L")) output?', null, 'replace() replaces all occurrences of a substring.'],
  ['What does print(list("abc")) output?', null, 'list() splits a string into separate characters.'],
  ['What does print("Python"[::-1]) output?', null, 'A slice with step -1 reverses the string.'],
  ['What does print("Python"[:3]) output?', null, 'The slice [:3] takes the first three characters.'],
  ['How do you check that string s starts with "ab"?', null, 'The startswith() method returns True or False.'],
  ['What does print("a" in "banana") output?', ['True', 'False', '1', 'Error'], 'The in operator checks whether a substring is in a string.'],
  ['What does ",".join(["a", "b"]) return?', null, 'join() concatenates the list elements, putting a separator between them.'],
  ['What does "a,b,c".split(",") return?', null, 'split() cuts a string by a separator and returns a list.'],
  ['What does print(type(3.0)) output?', null, 'A number with a dot has the type float in Python.'],
  ['What does print(type("5")) output?', null, 'Anything in quotes is a string.'],
  ['What does print(10 // 3) output?', null, 'The // operator divides evenly and drops the fractional part.'],
  ['What does print(2 ** 10) output?', null, 'The ** operator is exponentiation: 2 to the power of 10 is 1024.'],
  ['What does print(abs(-5)) output?', ['5', '-5', '0', 'Error'], 'abs() returns the absolute value of a number.'],
  ['What does print(min(4, 8, 1)) output?', null, 'min() returns the smallest value.'],
  ['What does print(int(3.9)) output?', null, 'int() drops the fractional part rather than rounding.'],
  ['What does print(float("2.5") * 2) output?', ['5.0', '5', '2.52.5', 'Error'], 'The string becomes the number 2.5, and the result of multiplication is a float.'],
  ['What does print(str(12) + "3") output?', ['123', '15', '12 3', 'Error'], 'Both values are strings, so they are concatenated.'],
  ['What does print(f"{2 + 3}") output?', ['5', '2 + 3', '{5}', 'Error'], 'The expression inside the curly braces of an f-string is evaluated.'],
  ['What does print(bool("")) output?', ['False', 'True', 'None', 'Error'], 'An empty string is considered a false value.'],
  ['What does print(bool([0])) output?', ['True', 'False', '0', 'None'], 'A non-empty list is always true, even if it contains only a zero.'],
  /* 136 */ ['What does print(None == False) output?', ['False', 'True', 'None', 'Error'], 'None and False are different values, they are not equal.'],
  ['What is x after x = 5; x *= 2?', null, 'x *= 2 is the same as x = x * 2.'],
  ['How do you reverse list a in place?', null, 'The reverse() method changes the order of elements in the list itself.'],
  ['What does a.insert(0, x) do?', ['Inserts x at the start of the list', 'Adds x to the end', 'Removes the first element', 'Replaces the last element'], 'insert(index, value) inserts an element at the given position.'],
  ['What does a.remove(x) do?', ['Removes the first found value x', 'Removes the element with index x', 'Removes all values x', 'Returns the index of x'], 'remove() looks for the value and removes its first occurrence.'],
  ['What does print([1, 2] + [3]) output?', ['[1, 2, 3]', '[1, 2, [3]]', '[4]', 'Error'], 'The + operator concatenates lists.'],
  ['What does print([0] * 3) output?', ['[0, 0, 0]', '[3]', '[0, 3]', 'Error'], 'Multiplying a list by a number repeats its contents.'],
  ['What does print(sorted([3, 1, 2], reverse=True)) output?', ['[3, 2, 1]', '[1, 2, 3]', '[2, 1, 3]', 'Error'], 'sorted() creates a new list, reverse=True sorts in descending order.'],
  ['Which error occurs when accessing a non-existent list index?', null, 'An index out of range raises IndexError.'],
  ['Which error occurs when accessing a non-existent dictionary key?', null, 'If the key is missing, d["k"] raises KeyError.'],
  ['How do you safely get a value by key if the key might be missing?', null, 'get() returns None (or a default value) if the key is missing.'],
  ['What does d.items() return?', ['(key, value) pairs', 'Only keys', 'Only values', 'The number of pairs'], 'items() is handy in the loop for key, value in d.items().'],
  ['What does d.values() return?', ['The values of the dictionary', 'The keys of the dictionary', 'Key-value pairs', 'The length of the dictionary'], 'values() gives all the values without the keys.'],
  ['How do you delete the key "k" from dictionary d?', null, 'The del operator removes an element by key.'],
  ['What is a set in Python?', ['A collection of unique elements with no order', 'An ordered list with repeats', 'Key-value pairs', 'An immutable list'], 'A set does not store duplicates, for example set([1, 1, 2]) gives {1, 2}.'],
  ['What does print(len(set([1, 1, 2, 2, 3]))) output?', null, 'Only the unique values remain in a set: 1, 2 and 3.'],
  ['How do you create an empty set?', null, 'Empty curly braces {} create a dictionary, so you need set() for a set.'],
  ['What does the enumerate() function do?', ['Yields (index, element) pairs', 'Counts the elements', 'Sorts a list', 'Numbers the lines in a file'], 'for i, x in enumerate(a) is handy when you need both the index and the value.'],
  ['What does the zip(a, b) function do?', ['Combines the elements of two sequences in pairs', 'Archives a file', 'Joins two lists into one long list', 'Sorts both lists'], 'zip([1, 2], ["a", "b"]) gives the pairs (1, "a") and (2, "b").'],
  ['What does print(list(map(str, [1, 2]))) output?', ["['1', '2']", '[1, 2]', '12', 'Error'], 'map() applies the str function to every element.'],
  ['What does list(filter(lambda x: x > 1, [1, 2, 3])) return?', null, 'filter() keeps only the elements for which the function returned True.'],
  ['What does print(any([0, 0, 1])) output?', null, 'any() returns True if at least one element is true.'],
  ['What does print(all([1, 1, 0])) output?', null, 'all() returns True only if all elements are true.'],
  ['What does for i in range(1, 10, 3): print(i, end=" ") output?', null, 'The third argument of range is the step: 1, 4, 7, and 10 is no longer included.'],
  ['What does the pass statement do?', ['Does nothing, it is a placeholder', 'Ends the program', 'Skips a loop iteration', 'Prints an empty line'], 'pass is needed where the syntax requires a block of code but there is nothing to write yet.'],
  ['What does the lambda keyword do?', ['Creates an anonymous function', 'Imports a module', 'Declares a class', 'Ends a loop'], 'lambda x: x + 1 is a short function without a name.'],
  ['What does print((lambda x: x + 1)(4)) output?', ['5', '4', '41', 'Error'], 'The lambda adds one to the argument 4.'],
  ['What does yield do in a function?', ['Turns the function into a generator, giving values one at a time', 'Ends the program', 'Imports a module', 'Deletes a variable'], 'A generator does not store all the values at once, but yields them as needed.'],
  ['What is recursion?', ['A function calls itself', 'A loop without a condition', 'A function without parameters', 'Calling a function from another file'], 'A recursive function must have a stopping condition.'],
  ['What does the finally block do?', ['Always runs, whether there was an error or not', 'Runs only on an error', 'Runs only when there is no error', 'Ends the program'], 'finally is handy for actions that must be done in any case.'],
  ['What does the raise command do?', ['Raises an exception', 'Catches an exception', 'Increases a value', 'Returns a value from a function'], 'raise ValueError("text") deliberately creates an error.'],
  ['Which error occurs for int("abc")?', null, 'The string has the right type, but its value cannot be turned into a number.'],
  ['When does NameError occur?', ['When an undeclared variable is used', 'When dividing by zero', 'When an index is outside the list', 'When a file is not found'], 'Python does not know a name that has not been created earlier.'],
  ['What does the construct with open("f.txt") as f do?', ['Automatically closes the file after the block', 'Reads the whole file into a variable', 'Deletes the file', 'Creates a copy of the file'], 'The with context manager closes the file itself, even if an error occurred.'],
  ['Which mode in open() opens a file for writing?', null, '"w" is write (old contents are erased), "r" is read, "a" is append.'],
  ['What does mode "a" do in open()?', ['Appends data to the end of the file', 'Erases the file and writes anew', 'Only reads the file', 'Only creates a new file'], '"a" is append — adding to the end.'],
  ['What does f.readlines() return?', ['A list of the lines of the file', 'A single line', 'The number of lines', 'A dictionary of lines'], 'Each line of the file becomes an element of the list.'],
  ['How does class Dog inherit from class Animal?', null, 'The parent class is given in parentheses.'],
  ['What is the super() function for?', ['Accessing the parent class', 'Creating a global variable', 'Running the program', 'Deleting an object'], 'super().__init__() calls the parent constructor.'],
  ['What is inheritance in OOP?', ['A class gets the fields and methods of another class', 'Copying a file', 'Removing extra methods', 'Importing a module'], 'A child class can use and extend the capabilities of its parent.'],
  ['What is a decorator?', ['A function that changes the behavior of another function', 'A kind of comment', 'A data type', 'A loop statement'], 'A decorator is written above a function with the @ sign.'],
  ['How does == differ from is?', ['== compares values, is checks that it is the same object', 'They do not differ', '== is only for numbers, is only for strings', 'is compares values, == compares objects'], 'Two equal lists are different objects, so a == b can be True while a is b is False.'],
  ['What is the standard Python package manager called?', null, 'The command pip install package_name installs libraries.'],
  ['What does random.randint(1, 6) do?', ['Returns a random integer from 1 to 6 inclusive', 'Returns a random fraction from 1 to 6', 'Always returns 6', 'Returns a list of six numbers'], 'Both bounds of randint are included.'],
  ['What does math.sqrt(16) return?', null, 'sqrt() is the square root, and the result is always a float.'],
  ['Which module is needed to work with date and time?', null, 'from datetime import datetime gives the current date and time.'],
  ['What is PEP 8?', ['A style guide for Python code', 'A Python version name', 'A graphics library', 'A package manager'], 'PEP 8 recommends, for example, 4 spaces for indentation and clear names.'],
  ['What does cout << 5 / 2.0; output?', null, 'One of the operands is fractional, so the division is fractional.'],
  ['What does cout << 2 + 3 * 4; output?', null, 'Multiplication has a higher priority than addition.'],
  ['What is 17 % 5?', null, '17 = 5 * 3 + 2, the remainder is 2.'],
  ['What does int x = 5; cout << x++; output?', ['5', '6', '4', 'Error'], 'Postfix x++ first gives the old value, then increases x.'],
  ['What does int x = 5; cout << ++x; output?', null, 'Prefix ++x first increases x, then gives the value.'],
  ['What does cout << (7 > 3 && 2 > 5); output?', ['0', '1', 'true', 'Error'], 'The first condition is true, the second is false, so AND gives false and 0 is printed.'],
  ['What does cout << !true; output?', ['0', '1', 'false', 'true'], 'The ! operator turns true into false, and false is printed as 0.'],
  ['What does cout << 10 / 3 << " " << 10 % 3; output?', null, 'Integer division gives 3, the remainder is 1.'],
  ['What does for (int i = 0; i < 3; i++) cout << i; output?', null, 'The counter takes the values 0, 1, 2 and they are printed one after another.'],
  ['What does string s = "a"; s += "b"; cout << s; output?', ['ab', 'a', 'b', 'Error'], 'The += operator appends a string to the end.'],
  ['What does cout << pow(2, 3); output?', null, 'pow(2, 3) is 2 to the power of 3.'],
  ['Which header file contains sqrt and pow?', null, 'Math functions are included through <cmath>.'],
  ['Which type is best for very large integers?', null, 'long long usually takes 8 bytes and stores numbers up to about 9 * 10^18.'],
  ['How many bytes does char take?', null, 'By the standard, sizeof(char) is always 1.'],
  ['How do you declare an array of 5 integers?', null, 'The array size is given in square brackets after the name.'],
  ['What does continue do in a loop?', ['Moves on to the next iteration', 'Exits the loop', 'Ends the program', 'Repeats the current iteration'], 'continue skips the rest of the loop body on this step.'],
  ['How does C++ treat the condition if (5)?', ['As true', 'As false', 'As a compilation error', 'As a comparison with zero that is always false'], 'Any non-zero number is considered true, zero is false.'],
  ['What does getline(cin, s) do?', ['Reads a whole line including spaces', 'Reads one word', 'Reads a number', 'Clears the input buffer'], 'cin >> s stops at a space, while getline takes the whole line up to Enter.'],
  ['What does cin.ignore() do?', ['Skips a character in the input buffer', 'Closes the input stream', 'Clears the screen', 'Ends the program'], 'It is often used between cin >> x and getline to remove the leftover newline character.'],
  ['What does return 0; at the end of main mean?', ['The program finished successfully', 'The program finished with an error', 'The program did not finish', 'The variable is zeroed'], 'A zero return code tells the system about successful completion.'],
  ['What does the ternary operator a > b ? a : b do?', ['Returns the larger of a and b', 'Returns the smaller of a and b', 'Always returns a', 'Compares strings'], 'If the condition is true, the value after ? is taken, otherwise the one after :.'],
  ['What does the directive #define PI 3.14 do?', ['Replaces PI with 3.14 before compilation', 'Creates a variable in memory', 'Includes a library', 'Runs the program'], '#define creates a macro — a simple text substitution.'],
  ['What does ios::sync_with_stdio(false); do?', ['Speeds up input and output', 'Disables output', 'Closes the program', 'Turns on debugging'], 'This line is often used in competitive programming for fast input and output.'],
  ['Which construct catches an exception in C++?', null, 'Code that may cause an error goes in try, and the handling goes in catch.'],
  ['What does throw do?', ['Throws an exception', 'Catches an exception', 'Ends a loop', 'Deletes a variable'], 'throw passes control to the nearest suitable catch block.'],
  ['What does s.substr(1, 3) do?', ['Takes 3 characters starting at index 1', 'Takes the first 3 characters', 'Removes characters 1 to 3', 'Takes 1 character from index 3'], 'substr(start, length) returns a piece of a string.'],
  ['How do you find the substring "ab" in string s?', null, 'If the substring is not found, find returns string::npos.'],
  ['How do you convert a number x to a string?', null, 'The to_string function is in the standard library.'],
  ['How do you convert string s to a double?', null, 'stod is string to double.'],
  ['How do you pass a parameter to a function by reference?', null, 'The & sign after the type makes the parameter a reference.'],
  ['Why write const string& in a function parameter?', ['To avoid copying the string and to not change it', 'So the string becomes a number', 'So the function is 100% faster', 'So the string can be deleted'], 'A constant reference saves memory and protects the value from changes.'],
  ['What is a function prototype?', ['A declaration of a function before its definition', 'A copy of a function', 'A comment on a function', 'A function with no body and no name'], 'A prototype tells the compiler the name, parameters and result type in advance.'],
  ['What is b when calling f(1) for void f(int a, int b = 5)?', ['5', '0', '1', 'Compilation error'], 'If an argument is not passed, the default value is used.'],
  ['What does the static keyword do for a local variable?', ['Keeps the value between function calls', 'Makes the variable a constant', 'Makes the variable global for all files', 'Deletes the variable after first use'], 'A static variable is created once and lives until the end of the program.'],
  ['How do you declare a two-dimensional vector of integers?', null, 'A two-dimensional vector is a vector of vectors.'],
  ['What does v.clear() do?', ['Removes all elements of the vector', 'Sorts the vector', 'Removes the last element', 'Copies the vector'], 'After clear() the size of the vector is zero.'],
  ['What does v.empty() check?', ['Whether the vector is empty', 'Whether the vector is completely filled', 'Whether the vector is sorted', 'Whether the vector contains zeros'], 'empty() returns true if there are no elements.'],
  ['What does v.back() return?', ['The last element of the vector', 'The first element', 'The size of the vector', 'Removes the last element'], 'back() only reads the last element, while pop_back() removes it.'],
  ['What does v.front() return?', ['The first element of the vector', 'The last element', 'The size of the vector', 'The address of the vector'], 'front() gives access to the first element.'],
  ['How do you sort vector v in descending order?', null, 'The third parameter of sort sets the comparison rule.'],
  ['What does reverse(v.begin(), v.end()) do?', ['Reverses the order of the elements', 'Sorts in descending order', 'Removes duplicates', 'Copies the vector'], 'reverse from <algorithm> reverses the order.'],
  ['What does max_element(v.begin(), v.end()) return?', ['An iterator to the largest element', 'The largest value itself', 'The index of the largest element', 'The number of elements'], 'To get the value, the iterator has to be dereferenced: *max_element(...).'],
  ['What does the set container store?', ['Unique elements in sorted order', 'Key-value pairs', 'Elements in insertion order with repeats', 'Only characters'], 'Duplicate values in a set are discarded automatically.'],
  ['How does unordered_map differ from map?', ['Keys are not ordered, access is faster on average', 'It stores only numbers', 'Values cannot be changed', 'It stores only one key'], 'unordered_map is built on a hash table, map on a tree.'],
  ['What principle does a stack work by?', ['Last in, first out (LIFO)', 'First in, first out (FIFO)', 'Random order', 'By element size'], 'The element added last is always taken from a stack first.'],
  ['What principle does a queue work by?', ['First in, first out (FIFO)', 'Last in, first out (LIFO)', 'Random order', 'Alphabetical order'], 'A queue works like in a shop: whoever got in line first is served first.'],
  ['What does m["a"] = 1; do for map<string, int> m?', ['Adds or updates the pair "a" → 1', 'Deletes the key "a"', 'Checks whether the key "a" exists', 'Always causes an error'], 'The [] operator creates an entry if the key does not exist yet.'],
  ['What frees memory allocated with new int[5]?', null, 'Arrays created with new[] need delete[].'],
  ['What is a memory leak?', ['Memory is allocated but not freed', 'A variable went outside the array bounds', 'The program ended with an error', 'int type overflow'], 'If delete is not called in time, the program takes memory and does not give it back.'],
  ['What is unique_ptr?', ['A smart pointer that frees memory itself', 'A pointer to a unique number', 'A type for unique strings', 'A pointer that cannot be dereferenced'], 'unique_ptr deletes the object automatically when it goes out of scope.'],
  ['What is this inside a class method?', ['A pointer to the current object', 'The name of the class', 'A global variable', 'A reference to the parent class'], 'this->x accesses field x of the current object.'],
  ['How do you write inheritance of class Dog from Animal?', null, 'After the colon go the access modifier and the name of the parent.'],
  ['What does the virtual keyword mean for a method?', ['The method can be overridden in descendants', 'The method cannot be called', 'The method runs faster', 'The method exists only in memory'], 'Virtual functions provide polymorphism.'],
  ['How does struct differ from class by default?', ['Members of a struct are public by default', 'Members of a struct are private by default', 'A struct cannot have methods', 'A struct stores only numbers'], 'In a class members are private by default, in a struct they are public.'],
  ['What is a default constructor?', ['A constructor with no parameters', 'A constructor that creates nothing', 'The constructor of a base class', 'A constructor only for strings'], 'It is called when an object is created without arguments: Dog d;'],
  ['How do you declare a template function?', null, 'A template starts with the word template and a list of parameters in angle brackets.'],
  ['How do you print the character with code 65?', null, "Casting to char turns the number into the character 'A'."],
  ['What happens when accessing a[3] in the array int a[3]?', ['Undefined behavior (out of bounds)', 'It returns 0', 'It returns 3', 'It is always a compilation error'], 'C++ does not check array bounds, so the result is unpredictable.'],
  ['How do you find the smaller of two numbers a and b?', null, 'The functions min and max are in <algorithm>.'],
  ['What is an algorithm?', ['A sequence of steps for solving a problem', 'A programming language', 'A kind of error', 'A part of a computer'], 'An algorithm is a clear order of actions that leads to a result.'],
  ['What is a bug?', ['An error in a program', 'A new feature', 'The name of a language', 'A variable type'], 'A bug is a defect that makes a program work differently from what was intended.'],
  ['What is debugging?', ['Finding and fixing errors', 'Writing comments', 'Speeding up a program', 'Installing a development environment'], 'A debugger helps you step through a program and see the values of variables.'],
  ['What is a syntax error?', ['A violation of the rules of writing the language', 'The program gives a wrong result', 'The program runs too slowly', 'Not enough memory'], 'For example, a missing bracket or semicolon.'],
  ['What is a logic error?', ['The program runs but gives a wrong result', 'The program does not compile', 'A file is not found', 'Memory has run out'], 'Such errors are the hardest to find because the compiler does not notice them.'],
  ['What is a loop?', ['Repeating a block of code many times', 'Running code once', 'A kind of variable', 'The name of a function'], 'Loops save you from copying the same code many times.'],
  ['What is an array?', ['A collection of elements accessed by index', 'A single character', 'The name of a function', 'A kind of comment'], 'An element is accessed by number: a[0], a[1] and so on.'],
  ['What is a function?', ['A named block of code that can be called many times', 'A variable with a number', 'A data type', 'A comment'], 'Functions help you not repeat yourself and split a program into parts.'],
  ['What is a function parameter?', ['A variable in the function declaration that receives a value', 'The result of a function', 'A file name', 'A loop type'], 'On a call, the passed value (argument) goes into the parameter.'],
  ['What is OOP?', ['An approach where a program is built from objects', 'A programming language', 'An operating system', 'A kind of database'], 'Object-oriented programming combines data and behavior in objects.'],
  ['What is a class?', ['A template for creating objects', 'A ready-made object', 'A kind of loop', 'A type of error'], 'Many objects can be created from one class.'],
  ['What is an object?', ['An instance of a class', 'The name of a language', 'A synonym for the word "loop"', 'A file with code'], 'An object is a specific "copy" created from the template of a class.'],
  ['What is encapsulation?', ['Hiding internal data and accessing it through methods', 'Copying an object', 'Deleting a class', 'Speeding up a program'], 'This way an object protects its state from accidental changes.'],
  ['What is polymorphism?', ['The same call behaves differently for different objects', 'Copying code', 'Storing data in a file', 'Converting types'], 'For example, the speak() method makes different sounds for a dog and a cat.'],
  ['What is an IDE?', ['A development environment: editor, running and debugging in one place', 'A programming language', 'A type of computer', 'An antivirus'], 'Examples of IDEs: PyCharm, Visual Studio, CLion.'],
  ['What is Git?', ['A version control system', 'A programming language', 'A browser', 'An operating system'], 'Git stores the history of code changes and helps teams work together.'],
  ['What is overflow?', ['The result does not fit into the chosen data type', 'The disk is out of space', 'A line of code is too long', 'There are too many comments'], 'For example, a number larger than the maximum for int turns into a wrong value.'],
  ['What is the binary number 101 in decimal?', null, '1 * 4 + 0 * 2 + 1 * 1 = 5.'],
  ['What is the binary number 1000 in decimal?', null, 'The one stands in the position of 2 to the power of 3, that is 8.'],
  ['How many bits are in one byte?', null, 'A byte consists of eight bits.'],
  ['What is a comment in code?', ['An explanation for people that is ignored when running', 'A command for the computer', 'A variable name', 'A type of error'], 'Comments help to understand the code but do not affect how the program works.'],
  ['What is a constant?', ['A value that cannot be changed after it is set', 'A variable that changes every second', 'The name of a function', 'A loop type'], 'Constants are handy for storing numbers like PI or a maximum size.'],
  ['What is a boolean (logical) type?', ['A type with two values: true and false', 'A type for fractional numbers', 'A type for strings', 'A type for arrays'], 'In Python they are True and False, in C++ — true and false.'],
  ['What is the complexity of a linear search in an array of n elements?', null, 'In the worst case every element has to be checked.'],
  ['What is needed for binary search?', ['A sorted array', 'An array of only even numbers', 'An array of strings', 'An array of one element'], 'Binary search discards half of the range each time, so the order is required.'],
  ['What is a string?', ['A sequence of characters', 'A single number', 'A list of functions', 'A kind of loop'], 'Strings store text: words, sentences, any characters.'],
  ['What is source code?', ['The text of a program written by a human', 'A ready .exe file', 'A set of zeros and ones in memory', 'A settings file'], 'Source code is then compiled or interpreted.'],
  ['What is an interpreter?', ['A program that runs code directly, without a separate exe file', 'A program that translates code into another human language', 'An editor for typing text', 'An antivirus'], 'Python most often runs through an interpreter.'],
  ['What is an infinite loop?', ['A loop whose exit condition is never met', 'A loop with a very large number of steps', 'A loop with no body', 'A loop that runs exactly once'], 'For example, while True without break never ends.'],
  ['How does bubble sort work?', ['Compares neighboring elements and swaps them', 'Splits the array in half', 'Randomly shuffles the elements', 'Removes duplicate elements'], 'Large elements gradually "bubble up" to the end of the array.'],
  ['What does print(2 ** 5) output?', null, 'The ** operator is exponentiation: 2 to the power of 5 is 32.'],
  ['What does print("ab" * 3) output?', ['ababab', 'ab3', 'aaabbb', 'Error'], 'Multiplying a string by a number repeats it.'],
  ['What does print(10 % 3) output?', null, 'The % operator returns the remainder: 10 = 3 * 3 + 1.'],
  ['How do you get the last element of list a?', null, 'Negative indexes count from the end: -1 is the last element.'],
  ['What does the append method of a list do?', ['Adds an element to the end', 'Removes the last element', 'Sorts the list', 'Reverses the list'], 'append(x) adds x to the end of the list.'],
  ['What does print(type(3.0)) output?', null, 'A number with a dot is a float; Python has no double type.'],
  ['What is bool(0)?', null, 'Zero, an empty string and an empty list are considered false.'],
  ['What does print("Python"[1:4]) output?', null, 'The slice [1:4] takes the characters with indexes 1, 2 and 3.'],
  ['What does print(list(range(2, 8, 2))) output?', null, 'The third argument is the step; the end (8) is not included.'],
  ['How do you find the number of items in dictionary d?', null, 'The len() function works with lists, strings, dictionaries and sets.'],
  ['What does print(not True or True) output?', ['True', 'False', 'None', 'Error'], 'First not True gives False, then False or True gives True.'],
  ['What does the break statement do?', ['Stops the loop', 'Skips one iteration', 'Ends the program', 'Restarts the loop'], 'break leaves the nearest loop immediately.'],
  ['What does the continue statement do?', ['Moves on to the next iteration of the loop', 'Stops the loop', 'Ends the function', 'Repeats the current iteration'], 'continue skips the rest of the loop body and goes on.'],
  ['How do you handle an exception in Python?', null, 'Code that may fail goes into try, and the handler goes into except.'],
  ['What does print(sorted([3, 1, 2])) output?', null, 'sorted() returns a new sorted list.'],
  ['Which keyword creates an anonymous function?', null, 'Example: f = lambda x: x + 1.'],
  ['What does print("a,b,c".split(",")) output?', null, 'split(",") splits the string at commas and returns a list.'],
  ['How does a tuple differ from a list?', ['A tuple cannot be changed after creation', 'A tuple stores only numbers', 'A tuple is always 1000% faster', 'There is no difference'], 'A tuple is immutable, a list is mutable.'],
  ['How do you check that x is in list a?', null, 'The in operator returns True or False.'],
  ['What does print(len({1, 2, 2, 3})) output?', ['3', '4', '2', 'Error'], 'A set stores only unique elements: {1, 2, 3}.'],
  ['What does print(7 / 2) output?', null, 'The / operator always returns a float; integer division is //.'],
  ['How do you open a file for reading?', null, 'The open() function takes a file name and a mode: "r" is read.'],
  ['What does print(int(3.9)) output?', null, 'int() drops the fractional part, it does not round.'],
  ['What does print([x * x for x in range(3)]) output?', null, 'The list comprehension squares the numbers 0, 1 and 2.'],
  ['What does == mean in Python?', ['Comparison for equality', 'Assignment', 'Logical AND', 'Comparison of memory addresses'], 'A single = assigns, a double == compares values.'],
  ['What does cout << 7 / 2; output?', null, 'Both numbers are integers, so the division is integer division.'],
  ['What does cout << 7 % 3; output?', null, 'The % operator gives the remainder: 7 = 2 * 3 + 1.'],
  ['How do you declare an array of 5 integers?', null, 'The array size is written in square brackets after the name.'],
  ['What does the new operator do?', ['Allocates memory on the heap', 'Declares a class', 'Creates a comment', 'Deletes an object'], 'new creates an object in dynamic memory and returns a pointer.'],
  ['What does the delete operator do?', ['Frees memory allocated with new', 'Deletes a file', 'Erases a variable from the code', 'Closes the program'], 'Every new must be matched by delete, otherwise there is a memory leak.'],
  ['What is sizeof(char)?', null, 'By the standard, char takes exactly 1 byte.'],
  ['How do you declare a constant N with the value 5?', null, 'The const keyword forbids changing the value after initialization.'],
  ['What does cout << (5 > 3); output?', null, 'The comparison result is a bool; without boolalpha it prints as 1.'],
  ['What is nullptr?', ['A null pointer', 'The number zero', 'An empty string', 'The end of a file'], 'nullptr means that a pointer points nowhere.'],
  ['How do you read an integer into variable n?', null, 'The >> operator reads a value from the cin stream.'],
  ['Which header is needed for vector?', null, 'The vector container is declared in the <vector> header.'],
  ['How do you get the size of vector v?', null, 'vector has the size() method; length() exists only for strings.'],
  ['What does int x = 5; int* p = &x; cout << *p; output?', ['5', 'The address of x', '0', '&x'], 'The * operator dereferences a pointer, i.e. takes the value at the address.'],
  ['How do you pass a variable to a function by reference?', null, 'The & sign in a parameter makes it a reference: the function changes the original.'],
  ['Which loop runs at least once even if the condition is false?', ['do { } while (condition);', 'while (condition) { }', 'for (; false;) { }', 'if (condition) { }'], 'In do-while the condition is checked after the loop body.'],
  ['What does ios::sync_with_stdio(false) do?', ['Speeds up input and output with cin and cout', 'Disables screen output', 'Closes a file', 'Turns off compiler checks'], 'This line is often added in competitive programming.'],
  ['How do you sort vector v in ascending order?', null, 'The sort function from <algorithm> takes the beginning and the end of the range.'],
  ['What is an enum?', ['A set of named integer constants', 'A kind of loop', 'A pointer type', 'A header file'], 'For example: enum Color { RED, GREEN, BLUE };'],
  ['What is 5 / 2.0?', null, 'If one of the operands is fractional, the division is fractional too.'],
  ['Which operator gives access to a field through a pointer to an object?', null, 'The notation p->x is equal to (*p).x.'],
  ['What does int a[] = {1, 2, 3}; cout << sizeof(a) / sizeof(a[0]); output?', null, 'The size of the whole array is divided by the size of one element.'],
  ['What is recursion?', ['A function calls itself', 'A loop without a condition', 'Copying a variable', 'A kind of sorting'], 'Recursion must have a stopping condition.'],
  ['What is a stack?', ['A data structure "last in, first out"', 'A structure "first in, first out"', 'A kind of loop', 'A type of error'], 'Like a pile of plates: you take the one that was put last.'],
  ['What is a queue?', ['A data structure "first in, first out"', 'A structure "last in, first out"', 'A kind of array without indexes', 'A variable type'], 'Like a queue in a shop: the one who came first is served first.'],
  ['What is a hash table?', ['A structure for fast lookup of a value by key', 'A kind of sorting', 'A file format', 'A loop type'], 'In Python it is dict, in C++ it is unordered_map.'],
  ['What is the complexity of binary search?', null, 'At each step half of the range is discarded.'],
  ['What is HTTP?', ['A protocol for transferring data on the web', 'A programming language', 'A database', 'An operating system'], 'A browser talks to websites using HTTP.'],
  ['What is a database?', ['An organized storage of data', 'A kind of processor', 'A markup language', 'A graphics editor'], 'For example: PostgreSQL, MySQL, SQLite.'],
  ['What is an API?', ['An interface through which programs talk to each other', 'A kind of computer mouse', 'A programming language', 'An antivirus program'], 'An API describes which requests can be sent and what you get in response.'],
  ['What is a branch in Git?', ['An independent line of development', 'A copy of the computer', 'A type of error', 'A folder with pictures'], 'In a branch you can try new things without breaking the main code.'],
  ['What does the git commit command do?', ['Saves the changes in the project history', 'Uploads a site to the internet', 'Deletes the repository', 'Runs the program'], 'A commit is a snapshot of the project state with a description.'],
  ['What is 2 to the power of 10?', null, 'This is a "kilobyte" in binary units.'],
  ['What is the binary number 1111 in decimal?', null, '8 + 4 + 2 + 1 = 15.'],
  ['What is sorting?', ['Putting elements in order by a given rule', 'Removing duplicates', 'Finding errors', 'Copying an array'], 'For example, in ascending order or by string length.'],
  ['What is a unit test?', ['An automatic check of a small part of a program', 'An internet speed test', 'A kind of math exam', 'A check by an antivirus'], 'Usually a single function is checked on several inputs.'],
  ['What is a greedy algorithm?', ['At every step it picks the locally best option', 'It always tries all options', 'It uses a lot of memory', 'It works only with numbers'], 'The greedy approach is fast, but it does not fit all problems.'],
  ['What is dynamic programming?', ['Solving a problem by remembering the answers to subproblems', 'Programming without errors', 'Running programs in real time', 'Creating animations'], 'This avoids computing the same thing again and again.']
];

