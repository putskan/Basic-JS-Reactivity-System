class Dep {
  // dep for each var that should be observed
  constructor() {
    this.observers = [];
  }
  notify() {
    this.observers.forEach(func => func());
  }
  depend() {
    if (target && !this.observers.includes(target)) {
      this.observers.push(target);
    }
  }
}

const data = { pricePerItem: 10, items: 3 };

Object.keys(data).forEach(key => {
  let internalValue = data[key];
  const dep = new Dep();
  Object.defineProperty(data, key, {
    get() {
      // add dep on access
      dep.depend();
      return internalValue;
    },
    set(newValue) {
      // run the observers again, with the updated value
      console.log(data[key])
      internalValue = newValue;
      console.log(data[key])
      dep.notify();
    }
  })
})

function watcher(func) {
  // call function and add to observers list if needed (i.e., add the function as watcher/observer)
  // "target" is used as a reference to add to observers
  target = func;
  target();
  target = null;
}

let target = null;
totalPrice = 0;
watcher(() => { totalPrice = data.pricePerItem * data.items });

console.log(totalPrice);