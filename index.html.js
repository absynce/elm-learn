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
    steps: {
      'title': $.extend({}, front, { x: 1500, y: -500 }),//{ x: front.x, y: -1200, z: front.z, rotateX: front.rotate.x, rotateY: front.rotate.y, rotateZ: front.rotate.z, scale: front.scale },
      'principles-of-functional-programming': $.extend({}, front, { x: -500, y: 1500 }),
      'overview':            $.extend({}, front, { y: 1500, scale: 10 })
    }
  }
  initData(options);
  initEvents();
  impress().init(options);
}

function initData(options) {
  for (var step in options.steps) {
    var stepData = options.steps[step];

    console.log('step', step);
    var element = document.querySelector('#' + step);

    for (var stepElement in stepData) {
      element.dataset[stepElement] = stepData[stepElement];
    }
  }
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
