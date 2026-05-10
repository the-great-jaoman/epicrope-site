document.addEventListener('DOMContentLoaded', function () {
  const uomSelect = document.getElementById('uom');
  const lengthSelect = document.getElementById('length');
  const quantitySelect = document.getElementById('quantity');
  const customPrice = document.getElementById('custom_price');
  const customWeight = document.getElementById('custom_weight');
  const customName = document.getElementById('custom_name');

  if (!uomSelect || !lengthSelect || !customPrice || !customWeight || !customName) return;

  function changeCustomLengthOptions(uom) {
    var optionIncrement = uom === 'ft' ? 5 : 1;
    var options = lengthSelect.options;
    for (var i = 0; i < options.length; i++) {
      var val = (i + 1) * optionIncrement;
      options[i].value = val;
      options[i].textContent = val;
    }
  }

  function changeCustomInput(length, uom) {
    var pricePerFoot = parseFloat(customPrice.getAttribute('price_per_foot'));
    var weightPerFoot = parseFloat(customWeight.getAttribute('weight_per_foot'));

    if (uom === 'm') {
      pricePerFoot *= 3.28;
      weightPerFoot *= 3.28;
    }

    var totalPrice = length * pricePerFoot;
    var totalWeight = length * weightPerFoot;

    customPrice.value = totalPrice.toFixed(2);
    customWeight.value = totalWeight.toFixed(4);
    customName.value = length + ' ' + uom;
  }

  uomSelect.addEventListener('change', function () {
    var uom = uomSelect.value;
    var currentIndex = lengthSelect.selectedIndex;
    changeCustomLengthOptions(uom);
    if (currentIndex < lengthSelect.options.length) {
      lengthSelect.selectedIndex = currentIndex;
    }
    var len = parseInt(lengthSelect.value);
    changeCustomInput(len, uom);
  });

  lengthSelect.addEventListener('change', function () {
    var len = parseInt(lengthSelect.value);
    var uom = uomSelect.value;
    changeCustomInput(len, uom);
  });

  quantitySelect.addEventListener('change', function () {
    var len = parseInt(lengthSelect.value);
    var uom = uomSelect.value;
    changeCustomInput(len, uom);
  });

  var initialUom = uomSelect.value;
  changeCustomLengthOptions(initialUom);
  var initialLen = parseInt(lengthSelect.value);
  changeCustomInput(initialLen, initialUom);
});
