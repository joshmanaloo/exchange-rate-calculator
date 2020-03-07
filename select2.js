$(document).ready(function() {
  function formatState(state) { //A function to format our dropdown boxes, this one adds image after the text
    if (!state.id) {
      return state.text;
    }
    var baseUrl = "/img/svg";
    var $state = $(
      '<span> ' + state.text + ' <img src="' + baseUrl + '/' + state.element.value.toLowerCase() + '.svg" class="img-flag" width="25" /></span>'
    );
    return $state;
  };
  $('#currency-one').select2({
    templateResult: formatState
  });
  // $('#currency-one').css('background-color', 'blue');
  // $('.currency-one').on('change', function(e) {console.log("change")});
  //
  $('#currency-two').select2({
    templateResult: formatState
  });

});
