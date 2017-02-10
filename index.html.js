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

  var options = {
    steps: [
      { id: 'title', data: $.extend({}, front, { y: -500 }) },
      { id: 'functional-programming-terms', data: $.extend({}, front, { x: -500, y: 1500 }) },
      { id: 'funky-immutability', data: $.extend({}, front, { x: -2500, y: 3000 }) },
      { id: 'funky-immutability-records-intro', data: $.extend({}, front, { x: -2500, y: 4500, rotateX: 45, scale: 2 }) },
      { id: 'funky-immutability-records-vs-objects', data: $.extend({}, front, { x: -2500, y: 6000, rotateX: 45, scale: 2 }) },
      { id: 'overview', data: $.extend({}, front, { y: 1500, scale: 12 }) }
    ]
  }
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
