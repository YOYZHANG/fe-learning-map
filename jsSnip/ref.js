let targetMap = new WeakMap();
let affect = null;
function track(target, value) {
  if (affect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = new Map());
    }

    let deps = depsMap.get(value);
    if (!deps) {
      depsMap.set(value, (deps = new Set()));
    }
    deps.add(affect);
  }
}

function trigger(target, value) {
  let depsMap = targetMap.get(target);
  if (!depsMap){
    return;
  }
  
  let dep = depsMap.get(value);
  if (dep) {
       dep.forEach(effect => {
         effect();
       })
  }
}

function effect(eff) {
  affect = eff;
  affect();
  affect = null;
}


function reactive(target) {
  
  const handler = {
    get(target, value, receiver) {
      track(target, value);
      return Reflect.get(target, value, receiver);
      
    },
    set(target, value, receiver) {
      let oldvalue = target[value];
      let reflect = Reflect.set(target, value, receiver);
      if (value != oldvalue && reflect) {
        trigger(target, value);
      }
    }
  }
  
  
  
  return new Proxy(target, handler);
}

function ref(raw) {
    const r = {
       get value() {
           track(r, 'value')
           return raw;
       },
       set value(newVal) {
            raw = newVal;
            trigger(r, 'value');
       }
    }

    return r;
}

let product = reactive({price: 1, quantity: 3});
let total = 0;
let salePrice = ref(0);

effect(() => {salePrice.value = 0.9 * product.price;});
effect(() => {total = salePrice.value * product.quantity;});


// console.log(total);

product.quantity = 5;


// console.log(total);

product.price = 4;

console.log(total, 'total');
