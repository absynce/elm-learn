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
    scale     : 2
  };

  var immutabilitySteps = $.extend({}, front, {
    x: -3000,
    rotateX: 45,
    scale: 1
  });

  var higherOrderSteps = $.extend({}, front, {
    x: 1500,
    y: 3125
  });

  var funkyBenefits = $.extend({}, front, {
    x: 4000,
    y: 1500
  });

  var additionalFeatures = $.extend({}, front, {
    x: 6500,
    y: 1500
  });

  var options = {
    steps: [
      { id: 'title', data: $.extend({}, front, { y: -500, scale: 3 }) },
      { id: 'functional-programming-terms', data: $.extend({}, front, { x: -500, y: 1500 }) },
      { id: 'funky-immutability', data: $.extend({}, immutabilitySteps, { y: 3075, rotateX: 0, scale: 2 }) },
      { id: 'funky-immutability-records-intro', data: $.extend({}, immutabilitySteps, { y: 4500 }) },
      { id: 'funky-immutability-records-vs-objects', data: $.extend({}, immutabilitySteps, { y: 6000 }) },
      { id: 'funky-pure', data: $.extend({}, front, { x: -750, y: 2975 }) },
      { id: 'funky-higher-order', data: $.extend({}, higherOrderSteps) },
      { id: 'funky-higher-order-define-higher-order', data: $.extend({}, higherOrderSteps, { y: 4500 }) },
      { id: 'funky-higher-order-define-first-class-support', data: $.extend({}, higherOrderSteps, { y: 5500 }) },
      { id: 'funky-higher-order-correction', data: $.extend({}, higherOrderSteps, { y: 7000 }) },
      { id: 'funky-benefits', data: $.extend({}, funkyBenefits, { }) },
      { id: 'funky-benefits-hot-swappable', data: $.extend({}, funkyBenefits, { y: 3000 }) },
      { id: 'funky-benefits-debugging', data: $.extend({}, funkyBenefits, { y: 4000 }) },
      { id: 'funky-benefits-auto-semver', data: $.extend({}, funkyBenefits, { y: 5000 }) },
      { id: 'additional-elm-features', data: $.extend({}, additionalFeatures, { }) },
      { id: 'additional-elm-features-function-applicators', data: $.extend({}, additionalFeatures, { y: 3100 }) },
      { id: 'additional-elm-features-embedded-js', data: $.extend({}, additionalFeatures, { y: 5100 }) },
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
