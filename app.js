// Storage Controller

// Item Controller
const ItemCtrl = (function () {
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structure / state
  const data = {
    items: [
      { id: 0, name: "Dinner", calories: 1505 },
      { id: 1, name: "Sak-Pata", calories: 100 },
      { id: 2, name: "Fruits", calories: 200 },
    ],
    currentItem: null,
    totalCalories: 0,
  };

  // Public Method
  return {
    getItem: function () {
      return data.items;
    },

    addItem: function(name, calories) {
         
    let ID;
    if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
        console.log(ID);
    } else {
        ID = 0;
    }
    calories = parseInt(calories)

    newItem = new Item(ID, name, calories);
    
    // push newItem to data structure
    data.items.push(newItem);
    },

    logData: function () {
        return data;
    }


  };
})();




// UI Controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: document.querySelector("#item-list"),
    addBtn: document.querySelector(".add-btn"),
    itemName: document.querySelector("#item-meal"),
    itemCalories: document.querySelector("#item-calories"),
    
  };

  // Public Method
  return {
    populateItemList: function (item) {
      let html = "";

      item.forEach((el) => {
        html += `
                <li class="collection-item" id="item-${el.id}">
                <strong>${el.name}: </strong><em>${el.calories} calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>                
                </li>`;
      });
      // Insert the html to ul
      UISelectors.itemList.innerHTML = html;
    },

    getFromInput: function() {
        return {
            name: UISelectors.itemName.value,
            calories: UISelectors.itemCalories.value
        }
    },

    getUISelector: function () {
      return UISelectors;
    },
  };
})();




// App Controller
const App = (function (ItemCtrl, UICtrl) {
  // Load event listner
  const loadEventListner = function () {
    // Get UI selectors
    const UISelector = UICtrl.getUISelector();

    // Add event Listner
    UISelector.addBtn.addEventListener("click", addItemSubmit);
  };

  const addItemSubmit = function (e) {
    // Get form input from UIController
    const input = UICtrl.getFromInput();
    
    if (input.name !== "" && input.calories !== "") {
        // Add item 
        const newItem = ItemCtrl.addItem(input.name, input.calories);
       
    }
    e.preventDefault();
  };

  // Public Method
  return {
    init: function () {
      const item = ItemCtrl.getItem();
      UICtrl.populateItemList(item);

      // Load event listner
      loadEventListner();
    },
  };
})(ItemCtrl, UICtrl);

// Initializing App
App.init();
