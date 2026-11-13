'use strict';

/* ============ АРХИВ ЗАДАЧ ============
   Условия, примеры и теги. Примеры вывода получены эталонными решениями. */
const ARCHIVE_TAGS = {
 "math": {
  "ru": "математика",
  "en": "math",
  "tg": "риёзиёт"
 },
 "impl": {
  "ru": "реализация",
  "en": "implementation",
  "tg": "татбиқ"
 },
 "strings": {
  "ru": "строки",
  "en": "strings",
  "tg": "сатрҳо"
 },
 "arrays": {
  "ru": "массивы",
  "en": "arrays",
  "tg": "массивҳо"
 },
 "sorting": {
  "ru": "сортировка",
  "en": "sorting",
  "tg": "мураттабсозӣ"
 },
 "brute": {
  "ru": "перебор",
  "en": "brute force",
  "tg": "ҷустуҷӯи пурра"
 },
 "nt": {
  "ru": "теория чисел",
  "en": "number theory",
  "tg": "назарияи рақамҳо"
 },
 "greedy": {
  "ru": "жадные алгоритмы",
  "en": "greedy",
  "tg": "алгоритмҳои тамаъкор"
 },
 "rec": {
  "ru": "рекурсия",
  "en": "recursion",
  "tg": "рекурсия"
 },
 "dp": {
  "ru": "динамическое программирование",
  "en": "dynamic programming",
  "tg": "барномасозии динамикӣ"
 },
 "tp": {
  "ru": "два указателя",
  "en": "two pointers",
  "tg": "ду нишондиҳанда"
 },
 "maps": {
  "ru": "словари",
  "en": "maps",
  "tg": "луғатҳо"
 },
 "bs": {
  "ru": "бинарный поиск",
  "en": "binary search",
  "tg": "ҷустуҷӯи дуҷониба"
 },
 "mat": {
  "ru": "матрицы",
  "en": "matrices",
  "tg": "матритсаҳо"
 },
 "big": {
  "ru": "длинная арифметика",
  "en": "bignum",
  "tg": "рақамҳои калон"
 },
 "geo": {
  "ru": "геометрия",
  "en": "geometry",
  "tg": "геометрия"
 },
 "graphs": {
  "ru": "графы",
  "en": "graphs",
  "tg": "графҳо"
 }
};

const ARCHIVE = [
 {
  "id": 1,
  "pct": 10,
  "rating": 800,
  "tags": [
   "math"
  ],
  "ru": {
   "title": "Сумма двух чисел",
   "legend": "Даны два целых числа a и b. Выведите их сумму.",
   "input": "В одной строке два целых числа a и b (−10^9 ≤ a, b ≤ 10^9).",
   "output": "Одно число — a + b."
  },
  "en": {
   "title": "Sum of two numbers",
   "legend": "You are given two integers a and b. Print their sum.",
   "input": "One line with two integers a and b (−10^9 ≤ a, b ≤ 10^9).",
   "output": "One number — a + b."
  },
  "ex": [
   [
    "2 3",
    "5"
   ],
   [
    "-5 10",
    "5"
   ],
   [
    "1000000000 1000000000",
    "2000000000"
   ]
  ]
 },
 {
  "id": 2,
  "pct": 10,
  "rating": 800,
  "tags": [
   "math",
   "impl"
  ],
  "ru": {
   "title": "Чётное число",
   "legend": "Определите, является ли число чётным.",
   "input": "Одно целое число n (−10^9 ≤ n ≤ 10^9).",
   "output": "YES, если n чётное, иначе NO."
  },
  "en": {
   "title": "Even number",
   "legend": "Determine whether the number is even.",
   "input": "One integer n (−10^9 ≤ n ≤ 10^9).",
   "output": "YES if n is even, otherwise NO."
  },
  "ex": [
   [
    "4",
    "YES"
   ],
   [
    "7",
    "NO"
   ],
   [
    "-2",
    "YES"
   ]
  ]
 },
 {
  "id": 3,
  "pct": 11,
  "rating": 800,
  "tags": [
   "impl"
  ],
  "ru": {
   "title": "Максимум из трёх",
   "legend": "Даны три целых числа. Выведите наибольшее из них.",
   "input": "Три целых числа в одной строке, по модулю не больше 10^9.",
   "output": "Наибольшее из трёх чисел."
  },
  "en": {
   "title": "Maximum of three",
   "legend": "You are given three integers. Print the largest one.",
   "input": "Three integers on one line, each at most 10^9 in absolute value.",
   "output": "The largest of the three numbers."
  },
  "ex": [
   [
    "1 5 3",
    "5"
   ],
   [
    "-4 -9 -1",
    "-1"
   ],
   [
    "7 7 7",
    "7"
   ]
  ]
 },
 {
  "id": 4,
  "pct": 12,
  "rating": 800,
  "tags": [
   "math"
  ],
  "ru": {
   "title": "Площадь и периметр",
   "legend": "Даны стороны прямоугольника. Найдите его площадь и периметр.",
   "input": "Два натуральных числа w и h (1 ≤ w, h ≤ 10^9).",
   "output": "Два числа через пробел: площадь и периметр."
  },
  "en": {
   "title": "Area and perimeter",
   "legend": "You are given the sides of a rectangle. Find its area and perimeter.",
   "input": "Two positive integers w and h (1 ≤ w, h ≤ 10^9).",
   "output": "Two numbers separated by a space: the area and the perimeter."
  },
  "ex": [
   [
    "3 5",
    "15 16"
   ],
   [
    "1 1",
    "1 4"
   ],
   [
    "1000000000 1000000000",
    "1000000000000000000 4000000000"
   ]
  ]
 },
 {
  "id": 5,
  "pct": 13,
  "rating": 800,
  "tags": [
   "strings",
   "impl"
  ],
  "ru": {
   "title": "Приветствие",
   "legend": "Поприветствуйте человека по имени.",
   "input": "Одна строка — имя (латиница, длина от 1 до 50).",
   "output": "Строка Hello, <имя>! (именно на английском, как в примере)."
  },
  "en": {
   "title": "Greeting",
   "legend": "Greet a person by name.",
   "input": "One line — the name (Latin letters, length 1 to 50).",
   "output": "The line Hello, <name>! exactly as in the example."
  },
  "ex": [
   [
    "Anna",
    "Hello, Anna!"
   ],
   [
    "Ibrohim",
    "Hello, Ibrohim!"
   ]
  ]
 },
 {
  "id": 6,
  "pct": 14,
  "rating": 800,
  "tags": [
   "math",
   "impl"
  ],
  "ru": {
   "title": "Сумма цифр",
   "legend": "Найдите сумму цифр числа.",
   "input": "Одно целое число n (0 ≤ n ≤ 10^18).",
   "output": "Сумма цифр n."
  },
  "en": {
   "title": "Digit sum",
   "legend": "Find the sum of the digits of a number.",
   "input": "One integer n (0 ≤ n ≤ 10^18).",
   "output": "The sum of the digits of n."
  },
  "ex": [
   [
    "123",
    "6"
   ],
   [
    "0",
    "0"
   ],
   [
    "999999999999999999",
    "162"
   ]
  ]
 },
 {
  "id": 7,
  "pct": 15,
  "rating": 800,
  "tags": [
   "impl"
  ],
  "ru": {
   "title": "Таблица умножения",
   "legend": "Выведите таблицу умножения на n от 1 до 10.",
   "input": "Одно целое число n (1 ≤ n ≤ 100).",
   "output": "10 строк вида n * i = результат, где i от 1 до 10."
  },
  "en": {
   "title": "Multiplication table",
   "legend": "Print the multiplication table of n from 1 to 10.",
   "input": "One integer n (1 ≤ n ≤ 100).",
   "output": "10 lines of the form n * i = result, where i goes from 1 to 10."
  },
  "ex": [
   [
    "3",
    "3 * 1 = 3\n3 * 2 = 6\n3 * 3 = 9\n3 * 4 = 12\n3 * 5 = 15\n3 * 6 = 18\n3 * 7 = 21\n3 * 8 = 24\n3 * 9 = 27\n3 * 10 = 30"
   ],
   [
    "12",
    "12 * 1 = 12\n12 * 2 = 24\n12 * 3 = 36\n12 * 4 = 48\n12 * 5 = 60\n12 * 6 = 72\n12 * 7 = 84\n12 * 8 = 96\n12 * 9 = 108\n12 * 10 = 120"
   ]
  ]
 },
 {
  "id": 8,
  "pct": 15,
  "rating": 800,
  "tags": [
   "impl",
   "math"
  ],
  "ru": {
   "title": "Високосный год",
   "legend": "Год високосный, если он делится на 4, но не делится на 100, либо делится на 400. Проверьте заданный год.",
   "input": "Одно целое число y (1 ≤ y ≤ 9999).",
   "output": "YES, если год високосный, иначе NO."
  },
  "en": {
   "title": "Leap year",
   "legend": "A year is a leap year if it is divisible by 4 but not by 100, or divisible by 400. Check the given year.",
   "input": "One integer y (1 ≤ y ≤ 9999).",
   "output": "YES if the year is a leap year, otherwise NO."
  },
  "ex": [
   [
    "2024",
    "YES"
   ],
   [
    "1900",
    "NO"
   ],
   [
    "2000",
    "YES"
   ],
   [
    "2023",
    "NO"
   ]
  ]
 },
 {
  "id": 9,
  "pct": 16,
  "rating": 800,
  "tags": [
   "impl"
  ],
  "ru": {
   "title": "Счастливый билет",
   "legend": "Билет с шестизначным номером счастливый, если сумма первых трёх цифр равна сумме последних трёх.",
   "input": "Одна строка из ровно 6 цифр (возможны ведущие нули).",
   "output": "YES, если билет счастливый, иначе NO."
  },
  "en": {
   "title": "Lucky ticket",
   "legend": "A ticket with a six-digit number is lucky if the sum of the first three digits equals the sum of the last three.",
   "input": "One line of exactly 6 digits (leading zeros are possible).",
   "output": "YES if the ticket is lucky, otherwise NO."
  },
  "ex": [
   [
    "123006",
    "YES"
   ],
   [
    "000000",
    "YES"
   ],
   [
    "123456",
    "NO"
   ]
  ]
 },
 {
  "id": 10,
  "pct": 17,
  "rating": 800,
  "tags": [
   "math"
  ],
  "ru": {
   "title": "Сумма от 1 до n",
   "legend": "Найдите 1 + 2 + … + n. Подумайте: цикл на 10^9 шагов будет слишком медленным — есть формула.",
   "input": "Одно целое число n (1 ≤ n ≤ 10^9).",
   "output": "Сумма чисел от 1 до n."
  },
  "en": {
   "title": "Sum from 1 to n",
   "legend": "Find 1 + 2 + … + n. Think: a loop of 10^9 steps is too slow — there is a formula.",
   "input": "One integer n (1 ≤ n ≤ 10^9).",
   "output": "The sum of the numbers from 1 to n."
  },
  "ex": [
   [
    "5",
    "15"
   ],
   [
    "100",
    "5050"
   ],
   [
    "1000000000",
    "500000000500000000"
   ]
  ]
 },
 {
  "id": 11,
  "pct": 18,
  "rating": 800,
  "tags": [
   "arrays"
  ],
  "ru": {
   "title": "Минимум в массиве",
   "legend": "Найдите наименьший элемент массива.",
   "input": "Первая строка — n (1 ≤ n ≤ 1000). Вторая — n целых чисел, по модулю не больше 10^9.",
   "output": "Наименьшее число."
  },
  "en": {
   "title": "Minimum in array",
   "legend": "Find the smallest element of an array.",
   "input": "First line — n (1 ≤ n ≤ 1000). Second — n integers, each at most 10^9 in absolute value.",
   "output": "The smallest number."
  },
  "ex": [
   [
    "5\n4 2 9 -1 7",
    "-1"
   ],
   [
    "1\n10",
    "10"
   ]
  ]
 },
 {
  "id": 12,
  "pct": 19,
  "rating": 800,
  "tags": [
   "arrays",
   "impl"
  ],
  "ru": {
   "title": "Чётные в массиве",
   "legend": "Посчитайте, сколько в массиве чётных чисел.",
   "input": "Первая строка — n (1 ≤ n ≤ 1000). Вторая — n целых чисел.",
   "output": "Количество чётных чисел."
  },
  "en": {
   "title": "Evens in array",
   "legend": "Count how many even numbers the array contains.",
   "input": "First line — n (1 ≤ n ≤ 1000). Second — n integers.",
   "output": "The number of even elements."
  },
  "ex": [
   [
    "5\n1 2 3 4 6",
    "3"
   ],
   [
    "3\n1 3 5",
    "0"
   ]
  ]
 },
 {
  "id": 13,
  "pct": 20,
  "rating": 900,
  "tags": [
   "strings",
   "impl"
  ],
  "ru": {
   "title": "Гласные",
   "legend": "Посчитайте количество гласных букв a, e, i, o, u в строке (регистр не важен).",
   "input": "Одна строка из латинских букв и пробелов, длина до 1000.",
   "output": "Количество гласных."
  },
  "en": {
   "title": "Vowels",
   "legend": "Count the vowels a, e, i, o, u in a string (case does not matter).",
   "input": "One line of Latin letters and spaces, length up to 1000.",
   "output": "The number of vowels."
  },
  "ex": [
   [
    "Hello World",
    "3"
   ],
   [
    "rhythm",
    "0"
   ],
   [
    "AEIOU aeiou",
    "10"
   ]
  ]
 },
 {
  "id": 14,
  "pct": 21,
  "rating": 900,
  "tags": [
   "strings"
  ],
  "ru": {
   "title": "Переверни строку",
   "legend": "Выведите строку задом наперёд.",
   "input": "Одна строка длиной от 1 до 1000 символов (может содержать пробелы).",
   "output": "Перевёрнутая строка."
  },
  "en": {
   "title": "Reverse a string",
   "legend": "Print the string backwards.",
   "input": "One line of 1 to 1000 characters (may contain spaces).",
   "output": "The reversed string."
  },
  "ex": [
   [
    "hello",
    "olleh"
   ],
   [
    "a b c",
    "c b a"
   ]
  ]
 },
 {
  "id": 15,
  "pct": 22,
  "rating": 900,
  "tags": [
   "impl",
   "math"
  ],
  "ru": {
   "title": "Секунды в часы",
   "legend": "Переведите количество секунд в формат HH:MM:SS (двузначные числа с ведущими нулями).",
   "input": "Одно целое число s (0 ≤ s ≤ 359999).",
   "output": "Время в формате HH:MM:SS."
  },
  "en": {
   "title": "Seconds to time",
   "legend": "Convert a number of seconds to the format HH:MM:SS (two-digit numbers with leading zeros).",
   "input": "One integer s (0 ≤ s ≤ 359999).",
   "output": "The time in the format HH:MM:SS."
  },
  "ex": [
   [
    "3661",
    "01:01:01"
   ],
   [
    "0",
    "00:00:00"
   ],
   [
    "359999",
    "99:59:59"
   ]
  ]
 },
 {
  "id": 16,
  "pct": 23,
  "rating": 900,
  "tags": [
   "strings"
  ],
  "ru": {
   "title": "Палиндром",
   "legend": "Слово — палиндром, если оно читается одинаково слева направо и справа налево.",
   "input": "Одно слово из строчных латинских букв, длина до 1000.",
   "output": "YES, если слово — палиндром, иначе NO."
  },
  "en": {
   "title": "Palindrome",
   "legend": "A word is a palindrome if it reads the same left to right and right to left.",
   "input": "One word of lowercase Latin letters, length up to 1000.",
   "output": "YES if the word is a palindrome, otherwise NO."
  },
  "ex": [
   [
    "level",
    "YES"
   ],
   [
    "code",
    "NO"
   ],
   [
    "a",
    "YES"
   ]
  ]
 },
 {
  "id": 17,
  "pct": 24,
  "rating": 900,
  "tags": [
   "impl"
  ],
  "ru": {
   "title": "FizzBuzz",
   "legend": "Для каждого числа от 1 до n выведите: Fizz, если оно делится на 3; Buzz, если на 5; FizzBuzz, если на оба; иначе само число.",
   "input": "Одно целое число n (1 ≤ n ≤ 100).",
   "output": "n строк по правилам выше."
  },
  "en": {
   "title": "FizzBuzz",
   "legend": "For each number from 1 to n print: Fizz if it is divisible by 3; Buzz if by 5; FizzBuzz if by both; otherwise the number itself.",
   "input": "One integer n (1 ≤ n ≤ 100).",
   "output": "n lines following the rules above."
  },
  "ex": [
   [
    "5",
    "1\n2\nFizz\n4\nBuzz"
   ],
   [
    "15",
    "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz"
   ]
  ]
 },
 {
  "id": 18,
  "pct": 25,
  "rating": 900,
  "tags": [
   "math"
  ],
  "ru": {
   "title": "Факториал",
   "legend": "Найдите n! = 1 · 2 · … · n (0! = 1).",
   "input": "Одно целое число n (0 ≤ n ≤ 20).",
   "output": "Значение n!."
  },
  "en": {
   "title": "Factorial",
   "legend": "Find n! = 1 · 2 · … · n (0! = 1).",
   "input": "One integer n (0 ≤ n ≤ 20).",
   "output": "The value of n!."
  },
  "ex": [
   [
    "5",
    "120"
   ],
   [
    "0",
    "1"
   ],
   [
    "20",
    "2432902008176640000"
   ]
  ]
 },
 {
  "id": 19,
  "pct": 26,
  "rating": 900,
  "tags": [
   "strings",
   "impl"
  ],
  "ru": {
   "title": "Количество слов",
   "legend": "Посчитайте количество слов в строке. Слова разделены одним или несколькими пробелами.",
   "input": "Одна строка длиной до 1000 символов.",
   "output": "Количество слов."
  },
  "en": {
   "title": "Word count",
   "legend": "Count the words in a line. Words are separated by one or more spaces.",
   "input": "One line of up to 1000 characters.",
   "output": "The number of words."
  },
  "ex": [
   [
    "hello big   world",
    "3"
   ],
   [
    "one",
    "1"
   ]
  ]
 },
 {
  "id": 20,
  "pct": 27,
  "rating": 900,
  "tags": [
   "arrays",
   "math"
  ],
  "ru": {
   "title": "Среднее арифметическое",
   "legend": "Найдите среднее арифметическое элементов массива.",
   "input": "Первая строка — n (1 ≤ n ≤ 1000). Вторая — n целых чисел.",
   "output": "Среднее с двумя знаками после запятой."
  },
  "en": {
   "title": "Average",
   "legend": "Find the arithmetic mean of the array elements.",
   "input": "First line — n (1 ≤ n ≤ 1000). Second — n integers.",
   "output": "The mean with two digits after the decimal point."
  },
  "ex": [
   [
    "4\n1 2 3 4",
    "2.50"
   ],
   [
    "3\n10 20 25",
    "18.33"
   ]
  ]
 },
 {
  "id": 21,
  "pct": 28,
  "rating": 900,
  "tags": [
   "arrays"
  ],
  "ru": {
   "title": "Второй максимум",
   "legend": "Найдите второе по величине значение среди различных значений массива.",
   "input": "Первая строка — n (2 ≤ n ≤ 1000). Вторая — n целых чисел. Гарантируется, что есть хотя бы два различных значения.",
   "output": "Второе по величине различное значение."
  },
  "en": {
   "title": "Second maximum",
   "legend": "Find the second largest value among the distinct values of the array.",
   "input": "First line — n (2 ≤ n ≤ 1000). Second — n integers. At least two distinct values are guaranteed.",
   "output": "The second largest distinct value."
  },
  "ex": [
   [
    "5\n3 9 9 1 7",
    "7"
   ],
   [
    "2\n-5 -8",
    "-8"
   ]
  ]
 },
 {
  "id": 22,
  "pct": 29,
  "rating": 900,
  "tags": [
   "impl"
  ],
  "ru": {
   "title": "Треугольник из звёздочек",
   "legend": "Выведите прямоугольный треугольник из символов *, прижатый к правому краю.",
   "input": "Одно целое число n (1 ≤ n ≤ 50).",
   "output": "n строк, в i-й строке i символов *, дополненных слева пробелами до ширины n. Пробелов в конце строк нет."
  },
  "en": {
   "title": "Star triangle",
   "legend": "Print a right triangle of * characters aligned to the right edge.",
   "input": "One integer n (1 ≤ n ≤ 50).",
   "output": "n lines; line i has i characters *, padded on the left with spaces to width n. No trailing spaces."
  },
  "ex": [
   [
    "3",
    "  *\n **\n***"
   ],
   [
    "5",
    "    *\n   **\n  ***\n ****\n*****"
   ]
  ]
 },
 {
  "id": 23,
  "pct": 30,
  "rating": 1000,
  "tags": [
   "math",
   "brute"
  ],
  "ru": {
   "title": "Делители",
   "legend": "Посчитайте, сколько у числа n натуральных делителей.",
   "input": "Одно целое число n (1 ≤ n ≤ 10^6).",
   "output": "Количество делителей n."
  },
  "en": {
   "title": "Divisors",
   "legend": "Count the natural divisors of the number n.",
   "input": "One integer n (1 ≤ n ≤ 10^6).",
   "output": "The number of divisors of n."
  },
  "ex": [
   [
    "12",
    "6"
   ],
   [
    "1",
    "1"
   ],
   [
    "997920",
    "240"
   ]
  ]
 },
 {
  "id": 24,
  "pct": 30,
  "rating": 1000,
  "tags": [
   "nt"
  ],
  "ru": {
   "title": "Простое число",
   "legend": "Проверьте, является ли число простым.",
   "input": "Одно целое число n (1 ≤ n ≤ 10^9).",
   "output": "YES, если n простое, иначе NO.",
   "note": "Достаточно проверять делители до √n."
  },
  "en": {
   "title": "Prime number",
   "legend": "Check whether the number is prime.",
   "input": "One integer n (1 ≤ n ≤ 10^9).",
   "output": "YES if n is prime, otherwise NO.",
   "note": "It is enough to test divisors up to √n."
  },
  "ex": [
   [
    "17",
    "YES"
   ],
   [
    "1",
    "NO"
   ],
   [
    "1000000007",
    "YES"
   ],
   [
    "91",
    "NO"
   ]
  ]
 },
 {
  "id": 25,
  "pct": 31,
  "rating": 1000,
  "tags": [
   "nt"
  ],
  "ru": {
   "title": "НОД",
   "legend": "Найдите наибольший общий делитель двух чисел.",
   "input": "Два натуральных числа a и b (1 ≤ a, b ≤ 10^18).",
   "output": "НОД(a, b).",
   "note": "Алгоритм Евклида: НОД(a, b) = НОД(b, a mod b)."
  },
  "en": {
   "title": "GCD",
   "legend": "Find the greatest common divisor of two numbers.",
   "input": "Two positive integers a and b (1 ≤ a, b ≤ 10^18).",
   "output": "GCD(a, b).",
   "note": "Euclid's algorithm: GCD(a, b) = GCD(b, a mod b)."
  },
  "ex": [
   [
    "12 18",
    "6"
   ],
   [
    "17 5",
    "1"
   ],
   [
    "1000000000000000000 250000000000000000",
    "250000000000000000"
   ]
  ]
 },
 {
  "id": 26,
  "pct": 32,
  "rating": 1000,
  "tags": [
   "nt"
  ],
  "ru": {
   "title": "НОК",
   "legend": "Найдите наименьшее общее кратное двух чисел.",
   "input": "Два натуральных числа a и b (1 ≤ a, b ≤ 10^9).",
   "output": "НОК(a, b)."
  },
  "en": {
   "title": "LCM",
   "legend": "Find the least common multiple of two numbers.",
   "input": "Two positive integers a and b (1 ≤ a, b ≤ 10^9).",
   "output": "LCM(a, b)."
  },
  "ex": [
   [
    "4 6",
    "12"
   ],
   [
    "7 13",
    "91"
   ],
   [
    "1000000000 999999999",
    "999999999000000000"
   ]
  ]
 },
 {
  "id": 27,
  "pct": 33,
  "rating": 1000,
  "tags": [
   "math",
   "rec"
  ],
  "ru": {
   "title": "Число Фибоначчи",
   "legend": "F1 = F2 = 1, Fn = F(n−1) + F(n−2). Найдите Fn.",
   "input": "Одно целое число n (1 ≤ n ≤ 90).",
   "output": "Значение Fn."
  },
  "en": {
   "title": "Fibonacci number",
   "legend": "F1 = F2 = 1, Fn = F(n−1) + F(n−2). Find Fn.",
   "input": "One integer n (1 ≤ n ≤ 90).",
   "output": "The value of Fn."
  },
  "ex": [
   [
    "1",
    "1"
   ],
   [
    "10",
    "55"
   ],
   [
    "90",
    "2880067194370816120"
   ]
  ]
 },
 {
  "id": 28,
  "pct": 34,
  "rating": 1000,
  "tags": [
   "strings",
   "impl"
  ],
  "ru": {
   "title": "Самое длинное слово",
   "legend": "Найдите самое длинное слово в строке. Если таких несколько, выведите первое.",
   "input": "Одна строка из слов, разделённых пробелами. Слов не больше 100.",
   "output": "Самое длинное слово."
  },
  "en": {
   "title": "Longest word",
   "legend": "Find the longest word in a line. If there are several, print the first one.",
   "input": "One line of words separated by spaces. At most 100 words.",
   "output": "The longest word."
  },
  "ex": [
   [
    "I love programming a lot",
    "programming"
   ],
   [
    "cat dog",
    "cat"
   ]
  ]
 },
 {
  "id": 29,
  "pct": 35,
  "rating": 1000,
  "tags": [
   "strings",
   "maps"
  ],
  "ru": {
   "title": "Анаграммы",
   "legend": "Две строки — анаграммы, если одну можно получить перестановкой букв другой.",
   "input": "Две строки из строчных латинских букв, каждая на своей строке (длина до 1000).",
   "output": "YES, если строки — анаграммы, иначе NO."
  },
  "en": {
   "title": "Anagrams",
   "legend": "Two strings are anagrams if one can be obtained by rearranging the letters of the other.",
   "input": "Two strings of lowercase Latin letters, each on its own line (length up to 1000).",
   "output": "YES if the strings are anagrams, otherwise NO."
  },
  "ex": [
   [
    "listen\nsilent",
    "YES"
   ],
   [
    "abc\nabd",
    "NO"
   ]
  ]
 },
 {
  "id": 30,
  "pct": 35,
  "rating": 1000,
  "tags": [
   "math",
   "impl"
  ],
  "ru": {
   "title": "Двоичная запись",
   "legend": "Переведите неотрицательное число в двоичную систему.",
   "input": "Одно целое число n (0 ≤ n ≤ 10^18).",
   "output": "Двоичная запись n без ведущих нулей."
  },
  "en": {
   "title": "Binary representation",
   "legend": "Convert a non-negative number to binary.",
   "input": "One integer n (0 ≤ n ≤ 10^18).",
   "output": "The binary representation of n without leading zeros."
  },
  "ex": [
   [
    "10",
    "1010"
   ],
   [
    "0",
    "0"
   ],
   [
    "1000000000000000000",
    "110111100000101101101011001110100111011001000000000000000000"
   ]
  ]
 },
 {
  "id": 31,
  "pct": 36,
  "rating": 1000,
  "tags": [
   "math",
   "impl"
  ],
  "ru": {
   "title": "Из двоичной в десятичную",
   "legend": "Переведите число из двоичной системы в десятичную.",
   "input": "Одна строка из символов 0 и 1, длина от 1 до 60.",
   "output": "Десятичное значение."
  },
  "en": {
   "title": "Binary to decimal",
   "legend": "Convert a number from binary to decimal.",
   "input": "One line of characters 0 and 1, length 1 to 60.",
   "output": "The decimal value."
  },
  "ex": [
   [
    "1010",
    "10"
   ],
   [
    "1",
    "1"
   ],
   [
    "111111111111111111111111111111111111111111111111111111111111",
    "1152921504606846975"
   ]
  ]
 },
 {
  "id": 32,
  "pct": 37,
  "rating": 1000,
  "tags": [
   "math",
   "impl"
  ],
  "ru": {
   "title": "Разворот числа",
   "legend": "Запишите цифры числа в обратном порядке. Ведущие нули результата отбросьте.",
   "input": "Одно целое число n (0 ≤ n ≤ 10^18).",
   "output": "Число с цифрами в обратном порядке."
  },
  "en": {
   "title": "Reverse a number",
   "legend": "Write the digits of the number in reverse order. Drop leading zeros of the result.",
   "input": "One integer n (0 ≤ n ≤ 10^18).",
   "output": "The number with its digits reversed."
  },
  "ex": [
   [
    "123",
    "321"
   ],
   [
    "1200",
    "21"
   ],
   [
    "0",
    "0"
   ]
  ]
 },
 {
  "id": 33,
  "pct": 38,
  "rating": 1000,
  "tags": [
   "impl",
   "math"
  ],
  "ru": {
   "title": "Угол между стрелками",
   "legend": "По времени H часов M минут найдите меньший угол между часовой и минутной стрелками (в градусах).",
   "input": "Два целых числа H (0 ≤ H ≤ 23) и M (0 ≤ M ≤ 59).",
   "output": "Угол с одним знаком после запятой."
  },
  "en": {
   "title": "Clock angle",
   "legend": "Given the time H hours M minutes, find the smaller angle between the hour and minute hands (in degrees).",
   "input": "Two integers H (0 ≤ H ≤ 23) and M (0 ≤ M ≤ 59).",
   "output": "The angle with one digit after the decimal point."
  },
  "ex": [
   [
    "3 0",
    "90.0"
   ],
   [
    "12 30",
    "165.0"
   ],
   [
    "9 45",
    "22.5"
   ]
  ]
 },
 {
  "id": 34,
  "pct": 39,
  "rating": 1000,
  "tags": [
   "strings",
   "brute"
  ],
  "ru": {
   "title": "Вхождения подстроки",
   "legend": "Посчитайте, сколько раз строка t встречается в строке s. Вхождения могут пересекаться.",
   "input": "Две строки: s и t, каждая на своей строке (длина от 1 до 1000).",
   "output": "Количество вхождений."
  },
  "en": {
   "title": "Substring occurrences",
   "legend": "Count how many times string t occurs in string s. Occurrences may overlap.",
   "input": "Two lines: s and t (length 1 to 1000 each).",
   "output": "The number of occurrences."
  },
  "ex": [
   [
    "aaaa\naa",
    "3"
   ],
   [
    "abcabc\nbc",
    "2"
   ]
  ]
 },
 {
  "id": 35,
  "pct": 40,
  "rating": 1100,
  "tags": [
   "arrays",
   "sorting"
  ],
  "ru": {
   "title": "Сортировка",
   "legend": "Отсортируйте массив по возрастанию.",
   "input": "Первая строка — n (1 ≤ n ≤ 10^5). Вторая — n целых чисел.",
   "output": "Отсортированные числа через пробел."
  },
  "en": {
   "title": "Sorting",
   "legend": "Sort the array in ascending order.",
   "input": "First line — n (1 ≤ n ≤ 10^5). Second — n integers.",
   "output": "The sorted numbers separated by spaces."
  },
  "ex": [
   [
    "5\n5 2 9 1 5",
    "1 2 5 5 9"
   ],
   [
    "3\n-1 -3 -2",
    "-3 -2 -1"
   ]
  ]
 },
 {
  "id": 36,
  "pct": 41,
  "rating": 1100,
  "tags": [
   "arrays",
   "maps"
  ],
  "ru": {
   "title": "Различные числа",
   "legend": "Посчитайте количество различных чисел в массиве.",
   "input": "Первая строка — n (1 ≤ n ≤ 10^5). Вторая — n целых чисел.",
   "output": "Количество различных значений."
  },
  "en": {
   "title": "Distinct numbers",
   "legend": "Count the distinct numbers in the array.",
   "input": "First line — n (1 ≤ n ≤ 10^5). Second — n integers.",
   "output": "The number of distinct values."
  },
  "ex": [
   [
    "6\n1 2 2 3 3 3",
    "3"
   ],
   [
    "3\n7 7 7",
    "1"
   ]
  ]
 },
 {
  "id": 37,
  "pct": 42,
  "rating": 1100,
  "tags": [
   "math",
   "maps"
  ],
  "ru": {
   "title": "Самая частая цифра",
   "legend": "Определите, какая цифра чаще всего встречается в числе. При равенстве выведите меньшую.",
   "input": "Одно целое число n (1 ≤ n ≤ 10^18).",
   "output": "Самая частая цифра."
  },
  "en": {
   "title": "Most frequent digit",
   "legend": "Determine which digit occurs most often in the number. In case of a tie, print the smaller one.",
   "input": "One integer n (1 ≤ n ≤ 10^18).",
   "output": "The most frequent digit."
  },
  "ex": [
   [
    "112233",
    "1"
   ],
   [
    "9",
    "9"
   ],
   [
    "1000",
    "0"
   ]
  ]
 },
 {
  "id": 38,
  "pct": 43,
  "rating": 1100,
  "tags": [
   "strings",
   "impl"
  ],
  "ru": {
   "title": "Сжатие строки",
   "legend": "Сожмите строку: каждую группу одинаковых подряд идущих символов замените на символ и длину группы (даже если она равна 1).",
   "input": "Одна строка из строчных латинских букв, длина до 1000.",
   "output": "Сжатая строка."
  },
  "en": {
   "title": "String compression",
   "legend": "Compress the string: replace every group of identical consecutive characters by the character and the group length (even if it is 1).",
   "input": "One line of lowercase Latin letters, length up to 1000.",
   "output": "The compressed string."
  },
  "ex": [
   [
    "aaabbc",
    "a3b2c1"
   ],
   [
    "z",
    "z1"
   ],
   [
    "aabbaa",
    "a2b2a2"
   ]
  ]
 },
 {
  "id": 39,
  "pct": 44,
  "rating": 1100,
  "tags": [
   "strings",
   "impl"
  ],
  "ru": {
   "title": "Шифр Цезаря",
   "legend": "Сдвиньте каждую строчную латинскую букву на k позиций вперёд по алфавиту (после z идёт a). Пробелы не меняются.",
   "input": "Первая строка — k (0 ≤ k ≤ 1000). Вторая — текст из строчных букв и пробелов, длина до 1000.",
   "output": "Зашифрованный текст."
  },
  "en": {
   "title": "Caesar cipher",
   "legend": "Shift every lowercase Latin letter k positions forward in the alphabet (z is followed by a). Spaces stay unchanged.",
   "input": "First line — k (0 ≤ k ≤ 1000). Second — text of lowercase letters and spaces, length up to 1000.",
   "output": "The encrypted text."
  },
  "ex": [
   [
    "3\nhello world",
    "khoor zruog"
   ],
   [
    "27\nabc xyz",
    "bcd yza"
   ]
  ]
 },
 {
  "id": 40,
  "pct": 45,
  "rating": 1100,
  "tags": [
   "strings",
   "impl"
  ],
  "ru": {
   "title": "Правильные скобки",
   "legend": "Проверьте, что в строке из скобок ( и ) расстановка правильная: каждая закрывающая скобка имеет пару и в конце не остаётся незакрытых.",
   "input": "Одна строка из символов ( и ), длина от 1 до 10^5.",
   "output": "YES, если расстановка правильная, иначе NO."
  },
  "en": {
   "title": "Balanced brackets",
   "legend": "Check that the bracket sequence made of ( and ) is balanced: every closing bracket has a pair and nothing is left open at the end.",
   "input": "One line of characters ( and ), length 1 to 10^5.",
   "output": "YES if the sequence is balanced, otherwise NO."
  },
  "ex": [
   [
    "(())()",
    "YES"
   ],
   [
    "())(",
    "NO"
   ],
   [
    "(((",
    "NO"
   ]
  ]
 },
 {
  "id": 41,
  "pct": 46,
  "rating": 1100,
  "tags": [
   "dp"
  ],
  "ru": {
   "title": "Лесенка",
   "legend": "Ступенька n. За ход можно подняться на 1 или 2 ступеньки. Сколькими способами можно подняться на n-ю ступеньку, начиная с нулевой? Ответ по модулю 10^9 + 7.",
   "input": "Одно целое число n (1 ≤ n ≤ 10^5).",
   "output": "Количество способов по модулю 10^9 + 7."
  },
  "en": {
   "title": "Staircase",
   "legend": "There are n steps. In one move you can climb 1 or 2 steps. In how many ways can you reach step n starting from step 0? Print the answer modulo 10^9 + 7.",
   "input": "One integer n (1 ≤ n ≤ 10^5).",
   "output": "The number of ways modulo 10^9 + 7."
  },
  "ex": [
   [
    "1",
    "1"
   ],
   [
    "4",
    "5"
   ],
   [
    "100000",
    "967618232"
   ]
  ]
 },
 {
  "id": 42,
  "pct": 47,
  "rating": 1100,
  "tags": [
   "math",
   "strings"
  ],
  "ru": {
   "title": "Римские числа",
   "legend": "Переведите римское число в обычное. Используются символы I, V, X, L, C, D, M, число от 1 до 3999.",
   "input": "Одна строка — корректное римское число.",
   "output": "Десятичное значение."
  },
  "en": {
   "title": "Roman numerals",
   "legend": "Convert a Roman numeral to an ordinary number. The symbols I, V, X, L, C, D, M are used; the value is from 1 to 3999.",
   "input": "One line — a valid Roman numeral.",
   "output": "The decimal value."
  },
  "ex": [
   [
    "XIV",
    "14"
   ],
   [
    "MCMXCIV",
    "1994"
   ],
   [
    "III",
    "3"
   ]
  ]
 },
 {
  "id": 43,
  "pct": 48,
  "rating": 1100,
  "tags": [
   "math",
   "strings"
  ],
  "ru": {
   "title": "Число в римские",
   "legend": "Переведите число от 1 до 3999 в римскую запись.",
   "input": "Одно целое число n (1 ≤ n ≤ 3999).",
   "output": "Римская запись числа n."
  },
  "en": {
   "title": "Number to Roman",
   "legend": "Convert a number from 1 to 3999 to Roman numerals.",
   "input": "One integer n (1 ≤ n ≤ 3999).",
   "output": "The Roman numeral for n."
  },
  "ex": [
   [
    "14",
    "XIV"
   ],
   [
    "1994",
    "MCMXCIV"
   ],
   [
    "3999",
    "MMMCMXCIX"
   ]
  ]
 },
 {
  "id": 44,
  "pct": 49,
  "rating": 1100,
  "tags": [
   "big",
   "strings"
  ],
  "ru": {
   "title": "Сумма больших чисел",
   "legend": "Сложите два неотрицательных числа, каждое из которых может содержать до 1000 цифр. Стандартные 64-битные типы не подойдут (в C++ складывайте как строки).",
   "input": "Два неотрицательных целых числа, каждое на своей строке, без ведущих нулей.",
   "output": "Их сумма."
  },
  "en": {
   "title": "Sum of big numbers",
   "legend": "Add two non-negative numbers, each with up to 1000 digits. Standard 64-bit types will not work (in C++ add them as strings).",
   "input": "Two non-negative integers, each on its own line, without leading zeros.",
   "output": "Their sum."
  },
  "ex": [
   [
    "123456789012345678901234567890\n987654321098765432109876543210",
    "1111111110111111111011111111100"
   ],
   [
    "0\n0",
    "0"
   ],
   [
    "999999999999999999999\n1",
    "1000000000000000000000"
   ]
  ]
 },
 {
  "id": 45,
  "pct": 50,
  "rating": 1200,
  "tags": [
   "math",
   "impl",
   "mat"
  ],
  "ru": {
   "title": "Транспонирование",
   "legend": "Транспонируйте матрицу: строки станут столбцами.",
   "input": "Первая строка — n и m (1 ≤ n, m ≤ 100). Далее n строк по m целых чисел.",
   "output": "m строк по n чисел через пробел."
  },
  "en": {
   "title": "Transpose",
   "legend": "Transpose the matrix: rows become columns.",
   "input": "First line — n and m (1 ≤ n, m ≤ 100). Then n lines of m integers.",
   "output": "m lines of n numbers separated by spaces."
  },
  "ex": [
   [
    "2 3\n1 2 3\n4 5 6",
    "1 4\n2 5\n3 6"
   ],
   [
    "1 1\n7",
    "7"
   ]
  ]
 },
 {
  "id": 46,
  "pct": 51,
  "rating": 1200,
  "tags": [
   "mat",
   "impl"
  ],
  "ru": {
   "title": "Диагонали",
   "legend": "Найдите сумму элементов главной и побочной диагоналей квадратной матрицы.",
   "input": "Первая строка — n (1 ≤ n ≤ 100). Далее n строк по n целых чисел.",
   "output": "Два числа через пробел: сумма главной и сумма побочной диагонали."
  },
  "en": {
   "title": "Diagonals",
   "legend": "Find the sum of the main diagonal and the anti-diagonal of a square matrix.",
   "input": "First line — n (1 ≤ n ≤ 100). Then n lines of n integers.",
   "output": "Two numbers separated by a space: the main diagonal sum and the anti-diagonal sum."
  },
  "ex": [
   [
    "3\n1 2 3\n4 5 6\n7 8 9",
    "15 15"
   ],
   [
    "1\n5",
    "5 5"
   ]
  ]
 },
 {
  "id": 47,
  "pct": 52,
  "rating": 1200,
  "tags": [
   "impl",
   "mat"
  ],
  "ru": {
   "title": "Спираль",
   "legend": "Заполните квадрат n × n числами от 1 до n² по спирали: по часовой стрелке, начиная с левого верхнего угла.",
   "input": "Одно целое число n (1 ≤ n ≤ 20).",
   "output": "n строк по n чисел через пробел."
  },
  "en": {
   "title": "Spiral",
   "legend": "Fill an n × n square with the numbers 1 to n² in a spiral: clockwise, starting from the top-left corner.",
   "input": "One integer n (1 ≤ n ≤ 20).",
   "output": "n lines of n numbers separated by spaces."
  },
  "ex": [
   [
    "3",
    "1 2 3\n8 9 4\n7 6 5"
   ],
   [
    "4",
    "1 2 3 4\n12 13 14 5\n11 16 15 6\n10 9 8 7"
   ]
  ]
 },
 {
  "id": 48,
  "pct": 53,
  "rating": 1200,
  "tags": [
   "arrays",
   "brute"
  ],
  "ru": {
   "title": "Инверсии",
   "legend": "Инверсия — пара индексов i < j, для которой a[i] > a[j]. Посчитайте количество инверсий.",
   "input": "Первая строка — n (1 ≤ n ≤ 2000). Вторая — n целых чисел.",
   "output": "Количество инверсий."
  },
  "en": {
   "title": "Inversions",
   "legend": "An inversion is a pair of indices i < j with a[i] > a[j]. Count the inversions.",
   "input": "First line — n (1 ≤ n ≤ 2000). Second — n integers.",
   "output": "The number of inversions."
  },
  "ex": [
   [
    "5\n3 1 2 5 4",
    "3"
   ],
   [
    "3\n1 2 3",
    "0"
   ],
   [
    "4\n4 3 2 1",
    "6"
   ]
  ]
 },
 {
  "id": 49,
  "pct": 55,
  "rating": 1200,
  "tags": [
   "arrays",
   "tp",
   "brute"
  ],
  "ru": {
   "title": "Два числа с суммой x",
   "legend": "Есть ли в массиве два элемента (с разными индексами) с суммой, равной x?",
   "input": "Первая строка — n и x (2 ≤ n ≤ 10^5). Вторая — n целых чисел.",
   "output": "YES или NO."
  },
  "en": {
   "title": "Two numbers with sum x",
   "legend": "Does the array contain two elements (with different indices) whose sum equals x?",
   "input": "First line — n and x (2 ≤ n ≤ 10^5). Second — n integers.",
   "output": "YES or NO."
  },
  "ex": [
   [
    "5 9\n2 7 11 15 1",
    "YES"
   ],
   [
    "3 6\n3 1 5",
    "YES"
   ],
   [
    "2 8\n4 4",
    "YES"
   ]
  ]
 },
 {
  "id": 50,
  "pct": 56,
  "rating": 1200,
  "tags": [
   "arrays",
   "sorting",
   "maps"
  ],
  "ru": {
   "title": "Пересечение массивов",
   "legend": "Найдите числа, которые есть в обоих массивах.",
   "input": "Первая строка — n и m (1 ≤ n, m ≤ 1000). Вторая — n чисел. Третья — m чисел.",
   "output": "Общие числа без повторов по возрастанию через пробел, либо NONE, если общих нет."
  },
  "en": {
   "title": "Array intersection",
   "legend": "Find the numbers that appear in both arrays.",
   "input": "First line — n and m (1 ≤ n, m ≤ 1000). Second — n numbers. Third — m numbers.",
   "output": "The common numbers without repeats in ascending order separated by spaces, or NONE if there are none."
  },
  "ex": [
   [
    "4 5\n1 2 2 3\n2 3 3 4 5",
    "2 3"
   ],
   [
    "2 2\n1 2\n3 4",
    "NONE"
   ]
  ]
 },
 {
  "id": 51,
  "pct": 57,
  "rating": 1200,
  "tags": [
   "bs",
   "arrays"
  ],
  "ru": {
   "title": "Бинарный поиск",
   "legend": "Дан отсортированный массив и несколько запросов. Для каждого запроса определите, есть ли число в массиве.",
   "input": "Первая строка — n (1 ≤ n ≤ 10^5). Вторая — n чисел по возрастанию. Третья — q (1 ≤ q ≤ 10^5). Четвёртая — q запрашиваемых чисел.",
   "output": "q строк: YES или NO для каждого запроса."
  },
  "en": {
   "title": "Binary search",
   "legend": "You are given a sorted array and several queries. For each query determine whether the number is present.",
   "input": "First line — n (1 ≤ n ≤ 10^5). Second — n numbers in ascending order. Third — q (1 ≤ q ≤ 10^5). Fourth — q queried numbers.",
   "output": "q lines: YES or NO for each query."
  },
  "ex": [
   [
    "5\n1 3 5 7 9\n3\n3 4 9",
    "YES\nNO\nYES"
   ],
   [
    "1\n2\n2\n2 3",
    "YES\nNO"
   ]
  ]
 },
 {
  "id": 52,
  "pct": 58,
  "rating": 1200,
  "tags": [
   "rec",
   "impl"
  ],
  "ru": {
   "title": "Ханойские башни",
   "legend": "Переместите n дисков со стержня 1 на стержень 3, используя стержень 2, за минимальное число ходов. За ход переносится один диск; большой диск нельзя класть на меньший.",
   "input": "Одно целое число n (1 ≤ n ≤ 5).",
   "output": "Первая строка — число ходов. Далее по ходу на строку: «a b» — перенести верхний диск со стержня a на стержень b."
  },
  "en": {
   "title": "Tower of Hanoi",
   "legend": "Move n disks from peg 1 to peg 3 using peg 2 in the minimum number of moves. One disk is moved at a time; a larger disk may not be placed on a smaller one.",
   "input": "One integer n (1 ≤ n ≤ 5).",
   "output": "First line — the number of moves. Then one move per line: \"a b\" — move the top disk from peg a to peg b."
  },
  "ex": [
   [
    "1",
    "1\n1 3"
   ],
   [
    "2",
    "3\n1 2\n1 3\n2 3"
   ],
   [
    "3",
    "7\n1 3\n1 2\n3 2\n1 3\n2 1\n2 3\n1 3"
   ]
  ]
 },
 {
  "id": 53,
  "pct": 60,
  "rating": 1300,
  "tags": [
   "arrays",
   "dp",
   "greedy"
  ],
  "ru": {
   "title": "Максимальная сумма подотрезка",
   "legend": "Найдите наибольшую сумму непустого подотрезка массива (идущих подряд элементов).",
   "input": "Первая строка — n (1 ≤ n ≤ 10^5). Вторая — n целых чисел, по модулю не больше 10^4.",
   "output": "Наибольшая сумма."
  },
  "en": {
   "title": "Maximum subarray sum",
   "legend": "Find the largest sum of a non-empty subarray (consecutive elements).",
   "input": "First line — n (1 ≤ n ≤ 10^5). Second — n integers, each at most 10^4 in absolute value.",
   "output": "The largest sum."
  },
  "ex": [
   [
    "8\n-2 1 -3 4 -1 2 1 -5",
    "6"
   ],
   [
    "3\n-3 -1 -2",
    "-1"
   ],
   [
    "5\n1 2 3 4 5",
    "15"
   ]
  ]
 },
 {
  "id": 54,
  "pct": 62,
  "rating": 1300,
  "tags": [
   "nt",
   "math"
  ],
  "ru": {
   "title": "Разложение на простые",
   "legend": "Разложите число на простые множители.",
   "input": "Одно целое число n (2 ≤ n ≤ 10^12).",
   "output": "Для каждого простого делителя p по возрастанию — строка «p k», где k — его степень в n."
  },
  "en": {
   "title": "Prime factorization",
   "legend": "Factor the number into primes.",
   "input": "One integer n (2 ≤ n ≤ 10^12).",
   "output": "For every prime divisor p in ascending order — a line \"p k\", where k is its exponent in n."
  },
  "ex": [
   [
    "12",
    "2 2\n3 1"
   ],
   [
    "97",
    "97 1"
   ],
   [
    "360360",
    "2 3\n3 2\n5 1\n7 1\n11 1\n13 1"
   ]
  ]
 },
 {
  "id": 55,
  "pct": 64,
  "rating": 1300,
  "tags": [
   "nt",
   "math"
  ],
  "ru": {
   "title": "Простые до n",
   "legend": "Посчитайте, сколько простых чисел не превосходит n. Используйте решето Эратосфена.",
   "input": "Одно целое число n (1 ≤ n ≤ 10^6).",
   "output": "Количество простых чисел от 2 до n."
  },
  "en": {
   "title": "Primes up to n",
   "legend": "Count the primes not exceeding n. Use the sieve of Eratosthenes.",
   "input": "One integer n (1 ≤ n ≤ 10^6).",
   "output": "The number of primes from 2 to n."
  },
  "ex": [
   [
    "10",
    "4"
   ],
   [
    "1",
    "0"
   ],
   [
    "1000000",
    "78498"
   ]
  ]
 },
 {
  "id": 56,
  "pct": 66,
  "rating": 1300,
  "tags": [
   "strings",
   "tp",
   "maps"
  ],
  "ru": {
   "title": "Подстрока без повторов",
   "legend": "Найдите длину самой длинной подстроки, в которой все символы различны.",
   "input": "Одна строка из строчных латинских букв, длина от 1 до 10^5.",
   "output": "Длина самой длинной такой подстроки."
  },
  "en": {
   "title": "Substring without repeats",
   "legend": "Find the length of the longest substring in which all characters are distinct.",
   "input": "One line of lowercase Latin letters, length 1 to 10^5.",
   "output": "The length of the longest such substring."
  },
  "ex": [
   [
    "abcabcbb",
    "3"
   ],
   [
    "bbbb",
    "1"
   ],
   [
    "pwwkew",
    "3"
   ]
  ]
 },
 {
  "id": 57,
  "pct": 68,
  "rating": 1300,
  "tags": [
   "dp"
  ],
  "ru": {
   "title": "Монеты",
   "legend": "Даны номиналы монет (каждый можно использовать сколько угодно раз). Найдите наименьшее число монет для суммы S.",
   "input": "Первая строка — n (1 ≤ n ≤ 100) и S (1 ≤ S ≤ 10^4). Вторая — n номиналов (1 ≤ c ≤ 10^4).",
   "output": "Наименьшее число монет или −1, если собрать сумму нельзя."
  },
  "en": {
   "title": "Coins",
   "legend": "Coin denominations are given (each can be used any number of times). Find the minimum number of coins for the sum S.",
   "input": "First line — n (1 ≤ n ≤ 100) and S (1 ≤ S ≤ 10^4). Second — n denominations (1 ≤ c ≤ 10^4).",
   "output": "The minimum number of coins, or −1 if the sum cannot be made."
  },
  "ex": [
   [
    "3 11\n1 2 5",
    "3"
   ],
   [
    "1 3\n2",
    "-1"
   ],
   [
    "3 6\n1 3 4",
    "2"
   ]
  ]
 },
 {
  "id": 58,
  "pct": 70,
  "rating": 1400,
  "tags": [
   "dp"
  ],
  "ru": {
   "title": "Дорожки по сетке",
   "legend": "В сетке n × m клетки либо свободны (.), либо заняты (#). Из левого верхнего угла нужно попасть в правый нижний, двигаясь только вправо или вниз по свободным клеткам. Сколько существует путей? Ответ по модулю 10^9 + 7.",
   "input": "Первая строка — n и m (1 ≤ n, m ≤ 1000). Далее n строк по m символов . или #. Начальная и конечная клетки свободны.",
   "output": "Количество путей по модулю 10^9 + 7."
  },
  "en": {
   "title": "Grid paths",
   "legend": "In an n × m grid, cells are free (.) or blocked (#). You must go from the top-left corner to the bottom-right corner moving only right or down through free cells. How many paths exist? Print the answer modulo 10^9 + 7.",
   "input": "First line — n and m (1 ≤ n, m ≤ 1000). Then n lines of m characters . or #. The start and end cells are free.",
   "output": "The number of paths modulo 10^9 + 7."
  },
  "ex": [
   [
    "3 3\n...\n.#.\n...",
    "2"
   ],
   [
    "2 2\n..\n..",
    "2"
   ],
   [
    "2 2\n.#\n#.",
    "0"
   ]
  ]
 },
 {
  "id": 59,
  "pct": 75,
  "rating": 1400,
  "tags": [
   "sorting",
   "greedy"
  ],
  "ru": {
   "title": "Объединение отрезков",
   "legend": "Объедините пересекающиеся и соприкасающиеся отрезки (например, [1, 3] и [3, 5] объединяются, а [1, 2] и [3, 4] — нет).",
   "input": "Первая строка — n (1 ≤ n ≤ 10^5). Далее n строк с двумя целыми числами l и r (0 ≤ l ≤ r ≤ 10^9).",
   "output": "Объединённые отрезки по возрастанию, по одному «l r» в строке."
  },
  "en": {
   "title": "Merge intervals",
   "legend": "Merge overlapping and touching segments (for example [1, 3] and [3, 5] merge, while [1, 2] and [3, 4] do not).",
   "input": "First line — n (1 ≤ n ≤ 10^5). Then n lines with two integers l and r (0 ≤ l ≤ r ≤ 10^9).",
   "output": "The merged segments in ascending order, one \"l r\" per line."
  },
  "ex": [
   [
    "3\n1 3\n2 6\n8 10",
    "1 6\n8 10"
   ],
   [
    "2\n1 2\n3 4",
    "1 2\n3 4"
   ],
   [
    "3\n1 4\n4 5\n0 0",
    "0 0\n1 5"
   ]
  ]
 },
 {
  "id": 60,
  "pct": 80,
  "rating": 1500,
  "tags": [
   "dp",
   "strings"
  ],
  "ru": {
   "title": "Наибольшая общая подпоследовательность",
   "legend": "Найдите длину наибольшей общей подпоследовательности двух строк (символы берутся по порядку, но не обязательно подряд).",
   "input": "Две строки из строчных латинских букв, каждая на своей строке, длиной от 1 до 1000.",
   "output": "Длина НОП."
  },
  "en": {
   "title": "Longest common subsequence",
   "legend": "Find the length of the longest common subsequence of two strings (characters are taken in order but not necessarily consecutively).",
   "input": "Two lines of lowercase Latin letters, each 1 to 1000 characters long.",
   "output": "The LCS length."
  },
  "ex": [
   [
    "abcde\nace",
    "3"
   ],
   [
    "abc\ndef",
    "0"
   ],
   [
    "agcat\ngac",
    "2"
   ]
  ]
 },
 {
  "id": 61,
  "pct": 83,
  "rating": 1500,
  "tags": [
   "dp"
  ],
  "ru": {
   "title": "Рюкзак",
   "legend": "Есть n предметов с весами и ценностями и рюкзак вместимости W. Каждый предмет можно взять не более одного раза. Найдите максимальную суммарную ценность.",
   "input": "Первая строка — n (1 ≤ n ≤ 100) и W (1 ≤ W ≤ 1000). Далее n строк: вес и ценность предмета (1 ≤ вес ≤ 1000, 1 ≤ ценность ≤ 10^6).",
   "output": "Максимальная суммарная ценность."
  },
  "en": {
   "title": "Knapsack",
   "legend": "There are n items with weights and values and a knapsack of capacity W. Each item can be taken at most once. Find the maximum total value.",
   "input": "First line — n (1 ≤ n ≤ 100) and W (1 ≤ W ≤ 1000). Then n lines: weight and value of an item (1 ≤ weight ≤ 1000, 1 ≤ value ≤ 10^6).",
   "output": "The maximum total value."
  },
  "ex": [
   [
    "3 50\n10 60\n20 100\n30 120",
    "220"
   ],
   [
    "2 5\n6 10\n7 20",
    "0"
   ]
  ]
 },
 {
  "id": 62,
  "pct": 86,
  "rating": 1500,
  "tags": [
   "rec",
   "math",
   "brute"
  ],
  "ru": {
   "title": "Следующая перестановка",
   "legend": "Дана перестановка чисел. Найдите следующую за ней в лексикографическом порядке.",
   "input": "Первая строка — n (1 ≤ n ≤ 1000). Вторая — перестановка чисел от 1 до n.",
   "output": "Следующая перестановка через пробел или NO, если данная перестановка — последняя."
  },
  "en": {
   "title": "Next permutation",
   "legend": "You are given a permutation of numbers. Find the next one in lexicographic order.",
   "input": "First line — n (1 ≤ n ≤ 1000). Second — a permutation of the numbers 1 to n.",
   "output": "The next permutation separated by spaces, or NO if the given permutation is the last one."
  },
  "ex": [
   [
    "3\n1 2 3",
    "1 3 2"
   ],
   [
    "4\n1 3 4 2",
    "1 4 2 3"
   ],
   [
    "3\n3 2 1",
    "NO"
   ]
  ]
 },
 {
  "id": 63,
  "pct": 11,
  "rating": 800,
  "tags": [
   "impl"
  ],
  "ru": {
   "title": "Знак числа",
   "legend": "Определите, положительное число, отрицательное или равно нулю.",
   "input": "Одно целое число n (−10^9 ≤ n ≤ 10^9).",
   "output": "POSITIVE, NEGATIVE или ZERO."
  },
  "en": {
   "title": "Sign of a number",
   "legend": "Determine whether the number is positive, negative or zero.",
   "input": "One integer n (−10^9 ≤ n ≤ 10^9).",
   "output": "POSITIVE, NEGATIVE or ZERO."
  },
  "ex": [
   [
    "5",
    "POSITIVE"
   ],
   [
    "-3",
    "NEGATIVE"
   ],
   [
    "0",
    "ZERO"
   ]
  ]
 },
 {
  "id": 64,
  "pct": 12,
  "rating": 800,
  "tags": [
   "math",
   "impl"
  ],
  "ru": {
   "title": "Сколько цифр",
   "legend": "Определите, сколько цифр в записи натурального числа.",
   "input": "Одно натуральное число n (1 ≤ n ≤ 10^18).",
   "output": "Количество цифр числа n."
  },
  "en": {
   "title": "How many digits",
   "legend": "Find how many digits a positive integer has.",
   "input": "One positive integer n (1 ≤ n ≤ 10^18).",
   "output": "The number of digits of n."
  },
  "ex": [
   [
    "7",
    "1"
   ],
   [
    "12345",
    "5"
   ],
   [
    "1000000000000000000",
    "19"
   ]
  ]
 },
 {
  "id": 65,
  "pct": 13,
  "rating": 800,
  "tags": [
   "impl"
  ],
  "ru": {
   "title": "Среднее по величине",
   "legend": "Даны три различных целых числа. Выведите то, которое лежит между двумя другими по величине (медиану).",
   "input": "Три различных целых числа в одной строке, по модулю не больше 10^9.",
   "output": "Среднее по величине число."
  },
  "en": {
   "title": "The middle one",
   "legend": "You are given three distinct integers. Print the one that lies between the other two (the median).",
   "input": "Three distinct integers on one line, each at most 10^9 in absolute value.",
   "output": "The median of the three numbers."
  },
  "ex": [
   [
    "3 1 2",
    "2"
   ],
   [
    "-5 10 0",
    "0"
   ],
   [
    "100 99 101",
    "100"
   ]
  ]
 },
 {
  "id": 66,
  "pct": 14,
  "rating": 800,
  "tags": [
   "impl",
   "math"
  ],
  "ru": {
   "title": "Дней в месяце",
   "legend": "Даны номер месяца и год. Выведите, сколько дней в этом месяце (учтите високосные годы).",
   "input": "Два целых числа: месяц m (1 ≤ m ≤ 12) и год y (1 ≤ y ≤ 9999).",
   "output": "Количество дней в месяце."
  },
  "en": {
   "title": "Days in a month",
   "legend": "Given a month number and a year, print how many days that month has (mind leap years).",
   "input": "Two integers: month m (1 ≤ m ≤ 12) and year y (1 ≤ y ≤ 9999).",
   "output": "The number of days in the month."
  },
  "ex": [
   [
    "1 2023",
    "31"
   ],
   [
    "2 2024",
    "29"
   ],
   [
    "2 1900",
    "28"
   ],
   [
    "4 2000",
    "30"
   ]
  ]
 },
 {
  "id": 67,
  "pct": 20,
  "rating": 900,
  "tags": [
   "strings"
  ],
  "ru": {
   "title": "Подсчёт символа",
   "legend": "Дана строка и символ. Выведите, сколько раз символ встречается в строке (регистр важен).",
   "input": "Первая строка — строка s (1 ≤ |s| ≤ 1000, может содержать пробелы). Вторая строка — один символ c.",
   "output": "Количество вхождений c в s."
  },
  "en": {
   "title": "Count a character",
   "legend": "Given a string and a character, print how many times the character occurs in the string (case matters).",
   "input": "First line — string s (1 ≤ |s| ≤ 1000, may contain spaces). Second line — one character c.",
   "output": "The number of occurrences of c in s."
  },
  "ex": [
   [
    "banana\na",
    "3"
   ],
   [
    "Hello World\no",
    "2"
   ],
   [
    "Aa Aa\nA",
    "2"
   ]
  ]
 },
 {
  "id": 68,
  "pct": 22,
  "rating": 900,
  "tags": [
   "strings",
   "impl"
  ],
  "ru": {
   "title": "Заглавные буквы",
   "legend": "Сделайте первую букву каждого слова заглавной, а остальные — строчными.",
   "input": "Одна строка из латинских букв и пробелов (слова разделены ровно одним пробелом), длина не более 1000.",
   "output": "Преобразованная строка."
  },
  "en": {
   "title": "Capitalize words",
   "legend": "Make the first letter of every word uppercase and the rest lowercase.",
   "input": "One line of Latin letters and spaces (words are separated by exactly one space), length at most 1000.",
   "output": "The transformed string."
  },
  "ex": [
   [
    "hello world",
    "Hello World"
   ],
   [
    "pYTHON iS fUN",
    "Python Is Fun"
   ],
   [
    "a bc DEF",
    "A Bc Def"
   ]
  ]
 },
 {
  "id": 69,
  "pct": 23,
  "rating": 900,
  "tags": [
   "arrays",
   "impl"
  ],
  "ru": {
   "title": "Сумма чётных",
   "legend": "Найдите сумму всех чётных чисел массива.",
   "input": "Первая строка — n (1 ≤ n ≤ 1000). Вторая — n целых чисел, по модулю не больше 10^6.",
   "output": "Сумма чётных элементов (0, если их нет)."
  },
  "en": {
   "title": "Sum of evens",
   "legend": "Find the sum of all even numbers in the array.",
   "input": "First line — n (1 ≤ n ≤ 1000). Second — n integers, each at most 10^6 in absolute value.",
   "output": "The sum of the even elements (0 if there are none)."
  },
  "ex": [
   [
    "5\n1 2 3 4 5",
    "6"
   ],
   [
    "3\n1 3 5",
    "0"
   ],
   [
    "4\n-2 -4 6 7",
    "0"
   ]
  ]
 },
 {
  "id": 70,
  "pct": 25,
  "rating": 900,
  "tags": [
   "strings",
   "impl"
  ],
  "ru": {
   "title": "Слова наоборот",
   "legend": "Выведите слова строки в обратном порядке.",
   "input": "Одна строка: слова из латинских букв, разделённые одним пробелом (не более 100 слов).",
   "output": "Те же слова в обратном порядке через пробел."
  },
  "en": {
   "title": "Words backwards",
   "legend": "Print the words of the line in reverse order.",
   "input": "One line: words of Latin letters separated by one space (at most 100 words).",
   "output": "The same words in reverse order separated by spaces."
  },
  "ex": [
   [
    "one two three",
    "three two one"
   ],
   [
    "hello",
    "hello"
   ],
   [
    "a b c d e",
    "e d c b a"
   ]
  ]
 },
 {
  "id": 71,
  "pct": 27,
  "rating": 900,
  "tags": [
   "impl",
   "math"
  ],
  "ru": {
   "title": "Квадраты до n",
   "legend": "Выведите все полные квадраты, не превосходящие n.",
   "input": "Одно натуральное число n (1 ≤ n ≤ 10^6).",
   "output": "Все квадраты 1, 4, 9, … не больше n через пробел."
  },
  "en": {
   "title": "Squares up to n",
   "legend": "Print all perfect squares not exceeding n.",
   "input": "One positive integer n (1 ≤ n ≤ 10^6).",
   "output": "All squares 1, 4, 9, … up to n separated by spaces."
  },
  "ex": [
   [
    "10",
    "1 4 9"
   ],
   [
    "1",
    "1"
   ],
   [
    "50",
    "1 4 9 16 25 36 49"
   ]
  ]
 },
 {
  "id": 72,
  "pct": 30,
  "rating": 1000,
  "tags": [
   "math",
   "brute"
  ],
  "ru": {
   "title": "Совершенное число",
   "legend": "Число называется совершенным, если оно равно сумме своих делителей, меньших его самого (например, 6 = 1 + 2 + 3). Проверьте, совершенно ли число.",
   "input": "Одно натуральное число n (1 ≤ n ≤ 10^5).",
   "output": "YES, если число совершенное, иначе NO."
  },
  "en": {
   "title": "Perfect number",
   "legend": "A number is perfect if it equals the sum of its divisors smaller than itself (e.g. 6 = 1 + 2 + 3). Check whether the number is perfect.",
   "input": "One positive integer n (1 ≤ n ≤ 10^5).",
   "output": "YES if the number is perfect, otherwise NO."
  },
  "ex": [
   [
    "6",
    "YES"
   ],
   [
    "12",
    "NO"
   ],
   [
    "28",
    "YES"
   ],
   [
    "1",
    "NO"
   ]
  ]
 },
 {
  "id": 73,
  "pct": 32,
  "rating": 1000,
  "tags": [
   "math",
   "impl"
  ],
  "ru": {
   "title": "Цифровой корень",
   "legend": "Складывайте цифры числа, пока не останется одна цифра. Выведите её.",
   "input": "Одно натуральное число n (1 ≤ n ≤ 10^18).",
   "output": "Одна цифра — цифровой корень n."
  },
  "en": {
   "title": "Digital root",
   "legend": "Keep summing the digits of the number until a single digit remains. Print it.",
   "input": "One positive integer n (1 ≤ n ≤ 10^18).",
   "output": "One digit — the digital root of n."
  },
  "ex": [
   [
    "38",
    "2"
   ],
   [
    "9",
    "9"
   ],
   [
    "999999999999",
    "9"
   ]
  ]
 },
 {
  "id": 74,
  "pct": 33,
  "rating": 1000,
  "tags": [
   "arrays",
   "maps"
  ],
  "ru": {
   "title": "Без повторов",
   "legend": "Удалите из массива повторяющиеся элементы, оставив только первое вхождение каждого. Порядок сохраните.",
   "input": "Первая строка — n (1 ≤ n ≤ 10^5). Вторая — n целых чисел.",
   "output": "Элементы без повторов через пробел."
  },
  "en": {
   "title": "Remove duplicates",
   "legend": "Remove repeated elements from the array, keeping only the first occurrence of each. Keep the order.",
   "input": "First line — n (1 ≤ n ≤ 10^5). Second — n integers.",
   "output": "The elements without repeats separated by spaces."
  },
  "ex": [
   [
    "6\n1 2 1 3 2 4",
    "1 2 3 4"
   ],
   [
    "3\n5 5 5",
    "5"
   ],
   [
    "4\n4 3 2 1",
    "4 3 2 1"
   ]
  ]
 },
 {
  "id": 75,
  "pct": 34,
  "rating": 1000,
  "tags": [
   "arrays",
   "impl"
  ],
  "ru": {
   "title": "Циклический сдвиг",
   "legend": "Сдвиньте массив циклически вправо на k позиций.",
   "input": "Первая строка — n и k (1 ≤ n ≤ 10^5, 0 ≤ k ≤ 10^9). Вторая — n целых чисел.",
   "output": "Массив после сдвига через пробел."
  },
  "en": {
   "title": "Cyclic shift",
   "legend": "Shift the array cyclically to the right by k positions.",
   "input": "First line — n and k (1 ≤ n ≤ 10^5, 0 ≤ k ≤ 10^9). Second — n integers.",
   "output": "The array after the shift separated by spaces."
  },
  "ex": [
   [
    "5 2\n1 2 3 4 5",
    "4 5 1 2 3"
   ],
   [
    "3 3\n7 8 9",
    "7 8 9"
   ],
   [
    "4 5\n1 2 3 4",
    "4 1 2 3"
   ]
  ]
 },
 {
  "id": 76,
  "pct": 35,
  "rating": 1000,
  "tags": [
   "strings",
   "maps",
   "sorting"
  ],
  "ru": {
   "title": "Частота слов",
   "legend": "Подсчитайте, сколько раз встречается каждое слово. Выведите слова по убыванию частоты, а при равной частоте — в алфавитном порядке.",
   "input": "Одна строка из строчных латинских слов, разделённых пробелами (до 1000 слов).",
   "output": "Для каждого различного слова строка «слово количество»."
  },
  "en": {
   "title": "Word frequency",
   "legend": "Count how many times each word occurs. Print the words by decreasing frequency, and alphabetically when frequencies are equal.",
   "input": "One line of lowercase Latin words separated by spaces (up to 1000 words).",
   "output": "For every distinct word a line \"word count\"."
  },
  "ex": [
   [
    "a b a c b a",
    "a 3\nb 2\nc 1"
   ],
   [
    "to be or not to be",
    "be 2\nto 2\nnot 1\nor 1"
   ],
   [
    "x",
    "x 1"
   ]
  ]
 },
 {
  "id": 77,
  "pct": 40,
  "rating": 1100,
  "tags": [
   "strings",
   "sorting"
  ],
  "ru": {
   "title": "Сортировка по длине",
   "legend": "Отсортируйте слова по возрастанию длины. Слова одинаковой длины оставьте в исходном порядке.",
   "input": "Первая строка — n (1 ≤ n ≤ 1000). Вторая — n слов из латинских букв.",
   "output": "Слова в новом порядке через пробел."
  },
  "en": {
   "title": "Sort by length",
   "legend": "Sort the words by increasing length. Words of equal length keep their original order.",
   "input": "First line — n (1 ≤ n ≤ 1000). Second — n words of Latin letters.",
   "output": "The words in the new order separated by spaces."
  },
  "ex": [
   [
    "5\nbanana kiwi apple fig plum",
    "fig kiwi plum apple banana"
   ],
   [
    "3\nccc bb a",
    "a bb ccc"
   ],
   [
    "2\nab cd",
    "ab cd"
   ]
  ]
 },
 {
  "id": 78,
  "pct": 42,
  "rating": 1100,
  "tags": [
   "arrays",
   "impl"
  ],
  "ru": {
   "title": "Суммы на отрезках",
   "legend": "Дан массив и несколько запросов. Для каждого запроса найдите сумму элементов с номерами от l до r (нумерация с единицы).",
   "input": "Первая строка — n и q (1 ≤ n, q ≤ 10^5). Вторая — n целых чисел, по модулю не больше 10^9. Далее q строк с числами l и r (1 ≤ l ≤ r ≤ n).",
   "output": "q чисел — ответы на запросы, каждое в отдельной строке.",
   "note": "Для быстрого решения используйте префиксные суммы: p[i] = a[1] + … + a[i], тогда ответ — p[r] − p[l−1]."
  },
  "en": {
   "title": "Range sums",
   "legend": "Given an array and several queries, for each query find the sum of the elements with indices from l to r (1-indexed).",
   "input": "First line — n and q (1 ≤ n, q ≤ 10^5). Second — n integers, each at most 10^9 in absolute value. Then q lines with l and r (1 ≤ l ≤ r ≤ n).",
   "output": "q numbers — the answers, each on its own line.",
   "note": "For a fast solution use prefix sums: p[i] = a[1] + … + a[i], then the answer is p[r] − p[l−1]."
  },
  "ex": [
   [
    "5 3\n1 2 3 4 5\n1 5\n2 3\n4 4",
    "15\n5\n4"
   ],
   [
    "3 2\n-1 -2 10\n1 3\n2 2",
    "7\n-2"
   ]
  ]
 },
 {
  "id": 79,
  "pct": 43,
  "rating": 1100,
  "tags": [
   "nt",
   "brute"
  ],
  "ru": {
   "title": "Следующее простое",
   "legend": "Найдите наименьшее простое число, которое не меньше n.",
   "input": "Одно натуральное число n (1 ≤ n ≤ 10^6).",
   "output": "Наименьшее простое p ≥ n."
  },
  "en": {
   "title": "Next prime",
   "legend": "Find the smallest prime number that is not less than n.",
   "input": "One positive integer n (1 ≤ n ≤ 10^6).",
   "output": "The smallest prime p ≥ n."
  },
  "ex": [
   [
    "14",
    "17"
   ],
   [
    "13",
    "13"
   ],
   [
    "1",
    "2"
   ],
   [
    "90",
    "97"
   ]
  ]
 },
 {
  "id": 80,
  "pct": 45,
  "rating": 1100,
  "tags": [
   "arrays",
   "maps"
  ],
  "ru": {
   "title": "Пары с разностью",
   "legend": "Посчитайте количество пар индексов i < j, для которых a[j] − a[i] = d.",
   "input": "Первая строка — n и d (1 ≤ n ≤ 10^5, |d| ≤ 10^9). Вторая — n целых чисел, по модулю не больше 10^9.",
   "output": "Количество подходящих пар."
  },
  "en": {
   "title": "Pairs with a difference",
   "legend": "Count the pairs of indices i < j with a[j] − a[i] = d.",
   "input": "First line — n and d (1 ≤ n ≤ 10^5, |d| ≤ 10^9). Second — n integers, each at most 10^9 in absolute value.",
   "output": "The number of such pairs."
  },
  "ex": [
   [
    "5 2\n1 3 5 3 5",
    "5"
   ],
   [
    "4 0\n7 7 7 7",
    "6"
   ],
   [
    "3 1\n3 2 1",
    "0"
   ]
  ]
 },
 {
  "id": 81,
  "pct": 52,
  "rating": 1200,
  "tags": [
   "arrays",
   "tp"
  ],
  "ru": {
   "title": "Максимум в окне",
   "legend": "Для каждого окна из k подряд идущих элементов массива найдите максимум.",
   "input": "Первая строка — n и k (1 ≤ k ≤ n ≤ 1000). Вторая — n целых чисел, по модулю не больше 10^9.",
   "output": "n − k + 1 чисел через пробел: максимумы окон слева направо."
  },
  "en": {
   "title": "Sliding window maximum",
   "legend": "For every window of k consecutive elements of the array find the maximum.",
   "input": "First line — n and k (1 ≤ k ≤ n ≤ 1000). Second — n integers, each at most 10^9 in absolute value.",
   "output": "n − k + 1 numbers separated by spaces: the window maximums from left to right."
  },
  "ex": [
   [
    "8 3\n1 3 -1 -3 5 3 6 7",
    "3 3 5 5 6 7"
   ],
   [
    "3 3\n4 2 9",
    "9"
   ],
   [
    "4 1\n5 1 4 2",
    "5 1 4 2"
   ]
  ]
 },
 {
  "id": 82,
  "pct": 54,
  "rating": 1200,
  "tags": [
   "mat",
   "impl"
  ],
  "ru": {
   "title": "Поворот матрицы",
   "legend": "Поверните матрицу на 90° по часовой стрелке.",
   "input": "Первая строка — n и m (1 ≤ n, m ≤ 100). Далее n строк по m целых чисел.",
   "output": "m строк по n чисел через пробел — повёрнутая матрица."
  },
  "en": {
   "title": "Rotate a matrix",
   "legend": "Rotate the matrix by 90° clockwise.",
   "input": "First line — n and m (1 ≤ n, m ≤ 100). Then n lines of m integers.",
   "output": "m lines of n numbers separated by spaces — the rotated matrix."
  },
  "ex": [
   [
    "2 3\n1 2 3\n4 5 6",
    "4 1\n5 2\n6 3"
   ],
   [
    "1 1\n9",
    "9"
   ],
   [
    "3 3\n1 2 3\n4 5 6\n7 8 9",
    "7 4 1\n8 5 2\n9 6 3"
   ]
  ]
 },
 {
  "id": 83,
  "pct": 56,
  "rating": 1200,
  "tags": [
   "mat",
   "impl"
  ],
  "ru": {
   "title": "Магический квадрат",
   "legend": "Квадрат называется магическим, если суммы по всем строкам, всем столбцам и обеим диагоналям одинаковы. Проверьте матрицу.",
   "input": "Первая строка — n (1 ≤ n ≤ 100). Далее n строк по n целых чисел, по модулю не больше 10^6.",
   "output": "YES, если квадрат магический, иначе NO."
  },
  "en": {
   "title": "Magic square",
   "legend": "A square is magic if the sums of all rows, all columns and both diagonals are equal. Check the matrix.",
   "input": "First line — n (1 ≤ n ≤ 100). Then n lines of n integers, each at most 10^6 in absolute value.",
   "output": "YES if the square is magic, otherwise NO."
  },
  "ex": [
   [
    "3\n2 7 6\n9 5 1\n4 3 8",
    "YES"
   ],
   [
    "2\n1 2\n3 4",
    "NO"
   ],
   [
    "1\n5",
    "YES"
   ]
  ]
 },
 {
  "id": 84,
  "pct": 58,
  "rating": 1200,
  "tags": [
   "mat",
   "rec",
   "impl"
  ],
  "ru": {
   "title": "Острова",
   "legend": "Карта — это сетка из символов «1» (суша) и «0» (вода). Остров — группа клеток суши, соседних по стороне. Посчитайте количество островов.",
   "input": "Первая строка — n и m (1 ≤ n, m ≤ 100). Далее n строк по m символов 0 или 1 без пробелов.",
   "output": "Количество островов."
  },
  "en": {
   "title": "Islands",
   "legend": "The map is a grid of \"1\" (land) and \"0\" (water) characters. An island is a group of land cells adjacent by a side. Count the islands.",
   "input": "First line — n and m (1 ≤ n, m ≤ 100). Then n lines of m characters 0 or 1 without spaces.",
   "output": "The number of islands."
  },
  "ex": [
   [
    "4 5\n11000\n11000\n00100\n00011",
    "3"
   ],
   [
    "1 3\n101",
    "2"
   ],
   [
    "2 2\n00\n00",
    "0"
   ]
  ]
 },
 {
  "id": 85,
  "pct": 62,
  "rating": 1300,
  "tags": [
   "graphs",
   "mat"
  ],
  "ru": {
   "title": "Кратчайший путь в лабиринте",
   "legend": "Лабиринт — сетка из «.» (проход) и «#» (стена). Из клетки можно шагнуть в соседнюю по стороне. Найдите наименьшее число шагов из левой верхней клетки в правую нижнюю.",
   "input": "Первая строка — n и m (1 ≤ n, m ≤ 100). Далее n строк по m символов «.» или «#».",
   "output": "Наименьшее число шагов или −1, если пути нет.",
   "note": "Используйте поиск в ширину (BFS): он находит кратчайший путь, когда все шаги стоят одинаково."
  },
  "en": {
   "title": "Shortest path in a maze",
   "legend": "The maze is a grid of \".\" (floor) and \"#\" (wall). From a cell you can step into an adjacent cell by a side. Find the minimum number of steps from the top-left cell to the bottom-right cell.",
   "input": "First line — n and m (1 ≤ n, m ≤ 100). Then n lines of m characters \".\" or \"#\".",
   "output": "The minimum number of steps, or −1 if there is no path.",
   "note": "Use breadth-first search (BFS): it finds the shortest path when every step costs the same."
  },
  "ex": [
   [
    "3 3\n...\n.#.\n...",
    "4"
   ],
   [
    "3 3\n.#.\n###\n...",
    "-1"
   ],
   [
    "1 1\n.",
    "0"
   ]
  ]
 },
 {
  "id": 86,
  "pct": 65,
  "rating": 1300,
  "tags": [
   "dp"
  ],
  "ru": {
   "title": "Способы набрать сумму",
   "legend": "Есть монеты n номиналов (каждого номинала сколько угодно). Сколькими способами можно набрать сумму S? Наборы, различающиеся только порядком монет, считаются одинаковыми.",
   "input": "Первая строка — n и S (1 ≤ n ≤ 20, 1 ≤ S ≤ 1000). Вторая — n различных номиналов (1 ≤ c ≤ 1000).",
   "output": "Количество способов."
  },
  "en": {
   "title": "Ways to make a sum",
   "legend": "There are n coin denominations (any number of coins of each). In how many ways can the sum S be made? Sets that differ only by the order of coins are the same.",
   "input": "First line — n and S (1 ≤ n ≤ 20, 1 ≤ S ≤ 1000). Second — n distinct denominations (1 ≤ c ≤ 1000).",
   "output": "The number of ways."
  },
  "ex": [
   [
    "3 4\n1 2 3",
    "4"
   ],
   [
    "1 5\n2",
    "0"
   ],
   [
    "2 10\n5 10",
    "2"
   ]
  ]
 },
 {
  "id": 87,
  "pct": 72,
  "rating": 1400,
  "tags": [
   "dp"
  ],
  "ru": {
   "title": "Возрастающая подпоследовательность",
   "legend": "Найдите длину наибольшей строго возрастающей подпоследовательности массива (элементы берутся в исходном порядке, не обязательно подряд).",
   "input": "Первая строка — n (1 ≤ n ≤ 1000). Вторая — n целых чисел, по модулю не больше 10^9.",
   "output": "Длина наибольшей возрастающей подпоследовательности."
  },
  "en": {
   "title": "Increasing subsequence",
   "legend": "Find the length of the longest strictly increasing subsequence of the array (elements are taken in the original order, not necessarily consecutive).",
   "input": "First line — n (1 ≤ n ≤ 1000). Second — n integers, each at most 10^9 in absolute value.",
   "output": "The length of the longest increasing subsequence."
  },
  "ex": [
   [
    "8\n10 9 2 5 3 7 101 18",
    "4"
   ],
   [
    "5\n5 4 3 2 1",
    "1"
   ],
   [
    "4\n1 2 3 4",
    "4"
   ]
  ]
 },
 {
  "id": 88,
  "pct": 76,
  "rating": 1400,
  "tags": [
   "dp",
   "strings"
  ],
  "ru": {
   "title": "Расстояние Левенштейна",
   "legend": "За одну операцию можно вставить символ, удалить символ или заменить символ. Найдите наименьшее число операций, которое превращает строку a в строку b.",
   "input": "Две строки a и b из строчных латинских букв, длина каждой от 1 до 1000 (по одной в строке).",
   "output": "Наименьшее число операций."
  },
  "en": {
   "title": "Edit distance",
   "legend": "In one operation you can insert a character, delete a character or replace a character. Find the minimum number of operations that turn string a into string b.",
   "input": "Two strings a and b of lowercase Latin letters, each of length from 1 to 1000 (one per line).",
   "output": "The minimum number of operations."
  },
  "ex": [
   [
    "kitten\nsitting",
    "3"
   ],
   [
    "abc\nabc",
    "0"
   ],
   [
    "a\nxyz",
    "3"
   ]
  ]
 },
 {
  "id": 89,
  "pct": 82,
  "rating": 1500,
  "tags": [
   "rec",
   "brute"
  ],
  "ru": {
   "title": "N ферзей",
   "legend": "Сколькими способами можно расставить n ферзей на доске n×n так, чтобы они не били друг друга (ферзь бьёт по горизонтали, вертикали и диагоналям)?",
   "input": "Одно целое число n (1 ≤ n ≤ 9).",
   "output": "Количество расстановок."
  },
  "en": {
   "title": "N queens",
   "legend": "In how many ways can n queens be placed on an n×n board so that they do not attack each other (a queen attacks along rows, columns and diagonals)?",
   "input": "One integer n (1 ≤ n ≤ 9).",
   "output": "The number of placements."
  },
  "ex": [
   [
    "4",
    "2"
   ],
   [
    "1",
    "1"
   ],
   [
    "6",
    "4"
   ],
   [
    "8",
    "92"
   ]
  ]
 },
 {
  "id": 90,
  "pct": 85,
  "rating": 1500,
  "tags": [
   "dp"
  ],
  "ru": {
   "title": "Разбиение на две равные части",
   "legend": "Можно ли разбить числа на две группы с одинаковой суммой? Каждое число должно попасть ровно в одну группу.",
   "input": "Первая строка — n (1 ≤ n ≤ 100). Вторая — n натуральных чисел, каждое не больше 100.",
   "output": "YES, если разбиение возможно, иначе NO."
  },
  "en": {
   "title": "Split into two equal parts",
   "legend": "Can the numbers be split into two groups with equal sums? Every number must go to exactly one group.",
   "input": "First line — n (1 ≤ n ≤ 100). Second — n positive integers, each at most 100.",
   "output": "YES if the split is possible, otherwise NO."
  },
  "ex": [
   [
    "4\n1 5 11 5",
    "YES"
   ],
   [
    "3\n1 2 5",
    "NO"
   ],
   [
    "2\n3 3",
    "YES"
   ]
  ]
 }
];
