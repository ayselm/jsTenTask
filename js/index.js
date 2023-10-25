// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
const minweight__input = document.querySelector('.minweight__input');
const maxweight__input = document.querySelector('.maxweight__input');


// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// <!-- <li class="fruit__item fruit_violet">
// <div class="fruit__info">
//   <div>index: 0</div>
//   <div>kind: Мангустин</div>
//   <div>color: фиолетовый</div>
//   <div>weight (кг): 13</div>
// </div>
// </li>

// отрисовка карточек
const display = (fruits) => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits

  fruitsList.querySelectorAll('li').forEach((item)=>{item.remove()});
  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    let li = document.createElement('li') ;
    let classColor;
    switch (fruits[i]['color']) {
      case 'фиолетовый': classColor = 'fruit_violet'; break;
      case 'зеленый': classColor = 'fruit_green'; break;
      case 'розово-красный': classColor = 'fruit_carmazin'; break;
      case 'желтый': classColor = 'fruit_yellow'; break;
      case 'светло-коричневый': classColor = 'fruit_lightbrown'; break;
      default: classColor='fruit_green';
    }
    
    fruitsList.append(li);
    li.classList.add('fruit__item', classColor)
    let finalDiv = document.createElement('div');
    finalDiv.classList.add('fruit__info');
    li.append(finalDiv);

    let div1 =document.createElement('div') ;
    div1.innerText = 'index:' + i;
    finalDiv.append(div1);

    for (key in fruits[i]) {
      let div = document.createElement('div') ;
      div.innerText = key + ': ' + fruits[i][key];
      finalDiv.append(div);
    }
   }
};

// первая отрисовка карточек
display(fruits);

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
 let result = [];

  // ATTENTION: сейчас при клике вы запустите бесконечный цикл и браузер зависнет
  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
    let numb = getRandomInt(0, fruits.length-1);
    result.push(fruits[numb]);
    fruits.splice(numb, 1)
   
  }

  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display(fruits);
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива



filterButton.addEventListener('click', () => {
  console.log(minweight__input.value)
  console.log(maxweight__input.value)

  const filterFruits = 
  fruits.filter((item) => {
    '// TODO: допишите функцию'
    console.log(item['weight'], minweight__input.value, maxweight__input.value)
    return ((item['weight'] <= maxweight__input.value) && (item['weight'] >= minweight__input.value))
  });
    console.log(filterFruits)
  display(filterFruits);
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки





const comparationColor = (color1, color2) => {
  return   color1 > color2 ? true : false;
};

const sortAPI = {
  bubbleSort(arr, comparation) {
        console.log('fgfgfg')
        // TODO: допишите функцию сортировки пузырьком
        const n = arr.length;
       // внешняя итерация по элементам
       for (let i = 0; i < n-1; i++) { 
           // внутренняя итерация для перестановки элемента в конец массива
           for (let j = 0; j < n-1-i; j++) { 
               // сравниваем элементы
               if (comparation(arr[j]['color'], arr[j+1]['color'])) { 
                   // делаем обмен элементов
                   let temp = arr[j+1]; 
                   arr[j+1] = arr[j]; 
                   arr[j] = temp; 
               }
           }
       } 
        
  },
  
  // функция разделитель
partition: (items, left, right) => {
  var pivot = items[Math.floor((right + left) / 2)]['color'],
      i = left,
      j = right;
      console.log(pivot);
  while (i <= j) {
      while (items[i]['color'] < pivot) {
          i++;
          console.log(items[i]['color']);
      }
      while (items[j]['color'] > pivot) {
          j--;
          console.log(items[i]['color']);
      }
      if (i <= j) {
          sortAPI.swap(items, i, j);
          i++;
          j--;
      }
  }
  return i;
},
// функция обмена элементов
swap: (items, firstIndex, secondIndex) => {
  const temp = items[firstIndex];
  items[firstIndex] = items[secondIndex];
  items[secondIndex] = temp;
},
  quickSort(arr, comparation) {
       // TODO: допишите функцию быстрой сортировки
    var index;
    if (arr.length > 1) {
      console.log(arr.length)
        left = typeof left != "string" ? 0 : left;
        right = typeof right != "string" ? arr.length - 1 : right;
        index = sortAPI.partition(arr, left, right);
        if (left < index - 1) {
          sortAPI.quickSort(arr, left, index - 1);
        }
        if (index < right) {
          sortAPI.quickSort(arr, index, right);
        }
    }
    return arr;
  },
  startSort(sort, arr, comparation) {
        const start = new Date().getTime();
        sort(arr, comparation);
        setTimeout(200)
        const end = new Date().getTime();
        sortTime = `${end - start} ms`;
  },

}

// const sortAPI = {
//   bubbleSort(arr, comparation) {
//     console.log('fgfgfg')
//     // TODO: допишите функцию сортировки пузырьком
//     const n = arr.length;
//    // внешняя итерация по элементам
//    for (let i = 0; i < n-1; i++) { 
//        // внутренняя итерация для перестановки элемента в конец массива
//        for (let j = 0; j < n-1-i; j++) { 
//            // сравниваем элементы
//            if (comparation(arr[j]['color'], arr[j+1]['color'])) { 
//                // делаем обмен элементов
//                let temp = arr[j+1]; 
//                arr[j+1] = arr[j]; 
//                arr[j] = temp; 
//            }
//        }
//    } 
    
//   },

//   quickSort(arr, comparation) {
//     // TODO: допишите функцию быстрой сортировки
//     var index;
//     if (arr.length > 1) {
//         left = typeof left != "number" ? 0 : left;
//         right = typeof right != "number" ? arr.length - 1 : right;
//         index = partition(arr, left, right);
//         if (left < index - 1) {
//            sortAPI.startSort(quickSort, arr, comparation);
//             //quickSort(arr, left, index - 1);
//         }
//         if (index < right) {
//             quickSort(arr, index, right);
//         }
//     }
//     return arr;
//   },

//   // выполняет сортировку и производит замер времени
//   startSort(sort, arr, comparation) {
//     const start = new Date().getTime();
//     sort(arr, comparation);
//     setTimeout(200)
//     const end = new Date().getTime();
//     sortTime = `${end - start} ms`;
//   },
// };

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
  // sortKind = 
  if (sortKind == 'bubbleSort'){
    sortKind = 'quickSort';
  } else{
    sortKind = 'bubbleSort';
  }
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  console.log(sortKind);
  sortAPI.startSort(sort, fruits, comparationColor);
  sortTimeLabel.textContent = sortTime;
  display(fruits);
  console.log(sort, sortKind)
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  fruits.push({"kind": kindInput.value, "color": colorInput.value, "weight": weightInput.value})
  display(fruits);
});


