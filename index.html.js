$(initPresentation); // Called on jquery dom ready.

function initPresentation() {
  // Front & center coords
  var front = {
    x         : 3000,
    y         : 0,
    z         : 0,
    rotateX   : 0,
    rotateY   : 0,
    rotateZ   : 0,
    scale     : 3
  };

  var higherOrderSteps = $.extend({}, front, {
    x: 2500,
    y: 3000
  });

  var options = {
    steps: [
      { id: 'title', data: $.extend({}, front, { y: -500 }) },
      { id: 'functional-programming-terms', data: $.extend({}, front, { x: -500, y: 1500 }) },
      { id: 'funky-immutability', data: $.extend({}, front, { x: -3000, y: 3075 }) },
      { id: 'funky-immutability-records-intro', data: $.extend({}, front, { x: -3000, y: 4500, rotateX: 45, scale: 2 }) },
      { id: 'funky-immutability-records-vs-objects', data: $.extend({}, front, { x: -3000, y: 6000, rotateX: 45, scale: 2 }) },
      { id: 'funky-pure', data: $.extend({}, front, { x: -200, y: 3000 }) },
      { id: 'funky-higher-order', data: $.extend({}, higherOrderSteps) },
      { id: 'funky-higher-order-define-higher-order', data: $.extend({}, higherOrderSteps, { y: 4500 }) },
      { id: 'funky-higher-order-define-first-class-support', data: $.extend({}, higherOrderSteps, { y: 5500 }) },
      { id: 'funky-higher-order-correction', data: $.extend({}, higherOrderSteps, { y: 7000 }) },
      { id: 'overview', data: $.extend({}, front, { y: 1500, scale: 12 }) }
    ]
  };
  initData(options);
  initEvents();
  impress().init(options);
}

function initData(options) {
  options.steps.forEach(function initStepData(step) {
    var stepData = options.steps[step.id];

    console.log('step', step);
    var element = document.querySelector('#' + step.id);

    if (!element) {
      return console.error(`${step.id} not found. Did you rename it in HTML?`);
    }

    for (var stepElement in step.data) {
      element.dataset[stepElement] = step.data[stepElement];
    }
  });
}

function initEvents() {
  initOverviewOnEsc();
  initRefBranchOnShiftHold();
}

function initOverviewOnEsc() {
  // Press ESC to go to overview
  $('body').keyup(function (e) {
    if (e.keyCode == 27) {
      impress().goto('overview');
    }
  });
}

function initRefBranchOnShiftHold() {
  // Hold shift to show ref branch.
  $('body').keydown(function (e) {
    if (e.keyCode == 16) {
      document.querySelector('.step.active .ref-branch').style.opacity = 1;
    }
  });
  $('body').keyup(function (e) {
    if (e.keyCode == 16) {
      document.querySelector('.step.active .ref-branch').style.opacity = 0;
    }
  });
}
