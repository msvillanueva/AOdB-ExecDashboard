

(function($){

//
//	--------------------------------------------------------------------------
//	---------  						TOOL TIP						 ---------
//	--------------------------------------------------------------------------	
//	USAGE:
//	
//		$(<element>).toolTip(tooltip);
//

	$.fn.toolTip = function(msg) {
		var helpID;
		$(this).mouseenter(function () {
			var _left = $(this).position().left + 20;
			var _top = $(this).position().top + 20;
			helpID = $(this).attr('id') + '_hlp';
			$(this).css('cursor','inherit');
			$('body').append("<div id='" + helpID + "' class='tooltip_generated' style='top:" + _top + "px; left:" + _left + "px; position:absolute !important;'>" + msg + "</div>");
			$('#' + helpID).fadeIn('slow');
			$(this).mousemove(function(e) {
				$('.tooltip_generated').css({
					'top':(e.pageY + 10) + 'px',
					'left':(e.pageX + 20) + 'px'
				});
			});
		}).mouseleave(function () {
			$('#' + helpID).remove()
		});	
	};


//
//	--------------------------------------------------------------------------
//	---------  					HOVER ANIMATE						 ---------
//	--------------------------------------------------------------------------	
//	USAGE:
//	
//		$(<element>).hoverAnimate(tooltip,[{settings*}]);
//		* settings:{
//			bgColor,
//			color,
//			hBgColor,		-- set bg color when hovered
//			hColor,			-- set text color when hovered
//			duration,		-- animation duration
//			theme			-- [blue, red, green, black] / when set to default: custom settings will be applied
//		}

	$.fn.hoverAnimate = function(o) {
		
		var defaults = {
			bgColor:'#E8E8E8',
			color:'#333',
			hBgColor:'#BFBFBF',
			hColor:'#FFF',
			duration:300,
			theme:'default'
		};
		
		var bgColor = defaults.bgColor;
		var color = defaults.color;
		var hBgColor = defaults.hBgColor;
		var hColor = defaults.hColor;
		var duration = defaults.duration;
		var theme = defaults.theme;
		
		var settings = $.extend({}, defaults, o);
		
		if (o != null) {
			if (o.settings != null) {
				if (o.settings.bgColor != null) { bgColor = o.settings.bgColor; }
				if (o.settings.color != null) { color = o.settings.color; }
				if (o.settings.hBgColor != null) { hBgColor = o.settings.hBgColor; }
				if (o.settings.hColor != null) { hColor = o.settings.hColor; }
				if (o.settings.duration != null) { duration = o.settings.duration; }
				if (o.settings.theme != null) { theme = o.settings.theme; }				
			}
		}
		
		switch(theme) {
			case 'blue':
				bgColor = '#87b5d6';
				color = '#333';
				hBgColor = '#5894BF';
				hColor = '#FFF';
			break;
			case 'red':
				bgColor = '#D68787';
				color = '#333';
				hBgColor = '#BF5858';
				hColor = '#FFF';			
			break;
			case 'green':
				bgColor = '#87D695';
				color = '#333';
				hBgColor = '#58BF6B';
				hColor = '#FFF';			
			break;
			case 'black':
				bgColor = '#616161';
				color = '#FFF';
				hBgColor = '#1F1F1F';
				hColor = '#FFF';			
			break;
			default:break;
		}
		
		$(this).css({
			'background-color':bgColor,
			'color':color
		});
		
	    $(this).hover(function () {
            $(this).animate({ backgroundColor: hBgColor, color: hColor }, duration);
        },
        function () {
            $(this).animate({ backgroundColor: bgColor, color: color }, 0);
        });
	};


//
//	--------------------------------------------------------------------------
//	---------					LOADING PANEL						 ---------
//	--------------------------------------------------------------------------
//	USAGE:
//	
//		var loads;									-- VARIABLE TO STORE THE LOADING ELEMENT
//		
//		loads = $(<element>).loading([{settings*}]);
//		* settings:{
//			text,				-- text to display while loading
//		}
//		
//		loads.hideLoading();						-- CLEAR LOADING PANEL
//		

	$.fn.loading = function(id, text){
		this.hideLoading = function() {
			$(this).children('.loader_screen_generated').remove();
		};		
		
		if ($(this).children('.loader_screen_generated').css('display') == 'block') {return this;}
		

		//var defaults = {
		//	text:''
		//};
		//var text = defaults.text;
		
		//var settings = $.extend({}, defaults, o);
		//if (o != null) {
		//	if (o.settings != null) {
		//		if (o.settings.text != null) { text = o.settings.text; }
		//	}
		//}

		var _height = $(this).outerHeight();
		var _width = $(this).outerWidth();
		var _left = $(this).position().left;
		var _top = $(this).position().top;
		var _textPos = (_height / 2) - 36.5;
		var textDisplay = text != null ? text : '';

		var loadingscreen = '<div class="loader_screen_generated" style="width:' + _width + 'px; height:' + _height + 'px; top: ' + _top + 'px; left: ' + _left +
            'px; ' + '"><div id="loader_screen_generated_inner_' + id + '" style="position: absolute;width: 100%;height: 73px;top: 50%;margin-top: -36.5px;">' +
            '<div>' + textDisplay + '</div>' +
            '</div>' +
			'</div>';
		
		$(this).append(loadingscreen);
		
		var cl = new CanvasLoader('loader_screen_generated_inner_' + id);
		//cl.setColor('#00540a'); // default is '#000000'
		cl.setColor(rgb2hex($('.loader_screen_generated').css('color'))); // default is '#000000'
		//cl.setShape('roundRect'); // default is 'oval'
		cl.setDiameter(40); // default is 40
		cl.setDensity(50); // default is 40
		cl.setRange(1.16); // default is 1.3
		cl.setSpeed(1); // default is 2
		cl.setFPS(46); // default is 24
		cl.show(); // Hidden by default
		$('.loader_screen_generated').click();
		return this;
	};
	

//
//	--------------------------------------------------------------------------
//	---------					MESSAGE BOX							 ---------
//	--------------------------------------------------------------------------
//	USAGE:
//	
//		jAlertBox(message,[title],[callback**]);
//		
//		jConfirmBox(message,[title],[callback**]);
//		
//		** function() { [javascript code] }
//

	$.jAlerts = {

	    boxInnitialTop: 0,

	    alertBox: function (message, title, callback) {
	        if (title == null) title = 'Alert';
	        if (($.trim(message)).length == 0) message = "&nbsp;";
	        $.jAlerts._show(title, message, 'alert', function (result) {
	            if (callback) callback(result);
	        });
	    },

	    confirmBox: function (message, title, callback) {
	        if (title == null) title = 'Confirm';
	        if (($.trim(message)).length == 0) message = "&nbsp;";
	        $.jAlerts._show(title, message, 'confirm', function (result) {
	            if (callback) callback(result);
	        });
	    },

	    _show: function (title, msg, type, callback) {

	        $.jAlerts._hide();

	        var _body = $('html', window.parent.document);
	        var _docBody = $('body', window.parent.document);
	        var _height = _docBody.height() > _body.height() ? _docBody.height() : _body.height();
	        var _width = _docBody.width() > _body.width() ? _docBody.width() : _body.width();

	        $('body', window.parent.document).append('<div id="bg_box_generated"></div>');
	        $('#bg_box_generated', window.parent.document).css({
	            'height': _height + 'px',
	            'width': _width + 'px'
	        });

	        $('body', window.parent.document).append(
				'<div id="msg_box_container_generated">' +
					'<div id="msg_box_title_generated"></div>' +
					'<div id="msg_box_content_generated">' +
						'<div id="msg_panel_generated"></div>' +
					'</div>' +
					'<div id="button_container_generated"></div>' +
				'</div>');

	        switch (type) {
	            case 'alert':
	                $('#button_container_generated', window.parent.document).append('<input type="button" class="box_button_generated" id="btnOk_generated" value="OK" />');
	                $('#btnOk_generated', window.parent.document).click(function () {
	                    $.jAlerts._hide();
	                    callback(true);
	                });
	                break;
	            case 'confirm':
	                $('#button_container_generated', window.parent.document).append(
						'<input type="button" class="box_button_generated" id="btnYes_generated" value="YES" />' +
						'&nbsp;&nbsp;' +
						'<input type="button" class="box_button_generated" id="btnNo_generated" value="NO" />'
					);
	                $('#btnYes_generated', window.parent.document).click(function () {
	                    $.jAlerts._hide();
	                    callback(true);
	                });
	                $('#btnNo_generated', window.parent.document).click(function () {
	                    $.jAlerts._hide();
	                    callback(false);
	                });
	                break;
	        }

	        $('#msg_box_title_generated', window.parent.document).append('<div>' + title + '<div>');
	        $('#msg_panel_generated', window.parent.document).append(msg);


	        try {
	            $('#msg_box_container_generated', window.parent.document).draggable({ handle: $('#msg_box_title_generated') });
	            $('#msg_box_title_generated', window.parent.document).css('cursor', 'move');
	        }
	        catch (e) { }


	        $.jAlerts._positionBox();

	        $(window).scroll(function () {
	            $('#msg_box_container_generated', window.parent.document).animate(
						{ top: ($(window, window.parent.document).scrollTop() + $.jAlerts.boxInnitialTop) + "px" },
						{ queue: false, duration: 500 }
				);
	        });

	        $('input').blur();
	        $('button').blur();
	        $('#btnOk_generated', window.parent.document).focus();
	    },

	    _positionBox: function () {
	        var _body = $(window);
	        var _html = $('html', window.parent.document);
	        var box = $('#msg_box_container_generated', window.parent.document);
	        var _top = (_body.height() / 2) - (box.height() / 2) + $(window, window.parent.document).scrollTop();
	        _top = _top > 0 ? _top : 100;
	        var _left = (_html.width() / 2) - (box.width() / 2);
	        $('#msg_box_container_generated', window.parent.document).css({
	            'top': _top + 'px',
	            'left': _left + 'px'
	        })
	        $.jAlerts.boxInnitialTop = _top;
	    },

	    _hide: function () {
	        $('#bg_box_generated', window.parent.document).remove();
	        $('#msg_box_container_generated', window.parent.document).remove();
	    }

	}

	// SHORT-CUT FUNCTIONS
	
	jAlertBox = function(message, title, callback) {
		$.jAlerts.alertBox(message, title, callback);
	}

	jConfirmBox = function(message, title, callback) {
		return $.jAlerts.confirmBox(message, title, callback);
	}
	
    //
    //	--------------------------------------------------------------------------
    //	---------  						VALIDATION						 ---------
    //	--------------------------------------------------------------------------	
    //	USAGE:
    //	
    //		$(<element>).validateRequiredField();
    //

	$.fn.validateRequiredField = function () {
	    var isEmpty = false;
	    var fields = $(this).find('input.required-field');
	    var fieldLabels = '';
	    fields.each(function (index) {
	        var dom = $(this);
	        var dataRole = $(this).data('role');
          
	        if (dataRole != null && dataRole == 'dropdownlist') {
	            dom = $($(this).parent('.required-field')[0]);
	        }

	        if ($.trim($(this).val()) == '') {
	            dom.css('background-color', '#FFE5E5');
	            isEmpty = true;
	            fieldLabels += '<li>' + ($(this).data('label') != null ? $(this).data('label') : $(this).attr('name')) + '</li>';
	        }
	        else {
	            if (dom.css('background-color') == 'rgb(255, 229, 229)')
	                dom.css('background-color', '#FFFFFF');
	        }
	    });
	    if (isEmpty) {
	        jAlertBox('Please fill up the following fields:<br/><br/><ul>' + fieldLabels + '</ul>', 'Validation Failed');
	    }
	    return !isEmpty;
	};
	

    //
    //	--------------------------------------------------------------------------
    //	---------  		        	NORMALIZE BOX				         ---------
    //	--------------------------------------------------------------------------	
    //	USAGE:
    //	
    //		$(<elements>).normalizeSize();
    //

	$.fn.normalizeSize = function () {
	    var maxHeight = 0;
	    var maxWidth = 0;
	    $(this).each(function () {
	        maxHeight = $(this).height() > maxHeight ? $(this).height() : maxHeight;
	        maxWidth = $(this).width() > maxWidth ? $(this).width() : maxWidth;
	    });
	    $(this).height(maxHeight);
	    $(this).width(maxWidth);
	};

    //
    //	--------------------------------------------------------------------------
    //	---------  		  	NORMALIZE HEIGHT BOX				         ---------
    //	--------------------------------------------------------------------------	
    //	USAGE:
    //	
    //		$(<elements>).normalizeSize();
    //

	$.fn.normalizeHeight = function () {
	    var maxHeight = 0;
	    $(this).each(function () {
	        maxHeight = $(this).height() > maxHeight ? $(this).height() : maxHeight;
	    });
	    $(this).height(maxHeight);
	};

    //
    //	--------------------------------------------------------------------------
    //	---------  		        	RFRESH IMAGE				         ---------
    //	--------------------------------------------------------------------------	
    //	USAGE:
    //	
    //		$(<elements>).refreshImage();
    //

	$.fn.refreshImage = function () {
	    $(this).each(function () {
	        var _src = $(this).attr('src');
	        var _tail = "?" + new Date().getTime();
	        if (_src != null) {
	            $(this).attr('src', _src + _tail);
	        }
	        else {
	            var _url = $(this).css('background-image');
	            var newUrl = _url.replace(')', _tail + ')');
	            $(this).css('background-image', newUrl)
	        }
	    });
	};


    //
    //	--------------------------------------------------------------------------
    //	---------  		        	CALENDAR SLIDER				         ---------
    //	--------------------------------------------------------------------------	
    //	USAGE:
    //	
    //		$(<elements>).calendarSlider({days:0,data:[json],select:[date],[callback]});
    //
    //  data = {
    //	ID, 
    //    Date = 'MM/dd/yyyy', 
    //    Header = 'text', 
    //    DateString = 'text ex. ddd MMM dd', 
    //    Info = 'text', 
    //    Focus = 'true/false'
    //  };
    // 

	var _selectCalendarDate;
	var _setCalendarDates;
	$.fn.calendarSlider = function (obj) {

	    this.setDate = function (_date) {
	        return _selectCalendarDate(_date);
	    };

	    var defaults = {
	        days: 6,
	        data: [],
	        select: ''
	    };

	    var days = defaults.days;
	    var calendarData = defaults.data;
	    var selectedDate = defaults.select;
	    var calendarOnClick;

	    if (obj != null) {
	        if (obj.data != null) {
	            if (obj.days != null) { days = obj.days; }
	            if (obj.data != null) { calendarData = obj.data; }
	            if (obj.select != null) { selectedDate = obj.select; }
	            if (obj.onclick != null) { calendarOnClick = obj.onclick; }
	        }
	        else {
	            calendarData = obj;
	        }
	    }

	    days = calendarData.length >= days ? days : calendarData.length;

	    _selectCalendarDate = function (_date) {
	        var _index = 0;
	        var targetIndex = 0;
	        var _data = {};
	        $.each(calendarData, function (key, value) {
	            if (value.Date == _date) {
	                targetIndex = _index;
	                _data.id = value.ID;
	                _data.date = value.Date;
	                _data.header = value.Header;
	                _data.info = value.Info;
	                _data.dateDisplay = value.DateString;
	                return false;
	            }
	            _index++;
	        });
	        _setCalendarDates(targetIndex);
	        return _data;
	    };

	    _setCalendarDates = function (index) {
	        curIndex = (index - 1 + days) > maxIndex ? maxIndex - days + 1 : index;
	        var movingIndex = curIndex;
	        for (i = 0; i < days; i++) {
	            var selectedCalData = calendarData[movingIndex];
	            var calBody = $('#calBody' + i);
	            var calHeader = calBody.find('.cal-header');
	            var calContent = calBody.find('.cal-content');
	            var calDate = calContent.find('.cal-date');
	            var calInfo = calContent.find('.cal-info');

	            var isEmptyHeader =  (selectedCalData.Header == "" || selectedCalData.Header == null);
	            var _calendarHeader = isEmptyHeader ? '&nbsp;' : selectedCalData.Header;

	            if (selectedCalData.Focus.toString().toLowerCase() == 'true')
	                calContent.addClass('cal-focus');
	            else
	                calContent.removeClass('cal-focus');

	            if (!isEmptyHeader)
	                calHeader.addClass('cal-header-not-empty');
	            else
	                calHeader.removeClass('cal-header-not-empty');

	            calBody.attr('data-id', selectedCalData.ID);
	            calBody.attr('data-date', selectedCalData.Date);
	            calHeader.html(_calendarHeader);
	            calDate.html(selectedCalData.DateString);
	            calInfo.html(selectedCalData.Info);

	            calBody.unbind('click');
	            calBody.bind('click', {
	                id: selectedCalData.ID,
	                date: selectedCalData.Date,
	                header: _calendarHeader,
	                info: selectedCalData.Info,
	                dateDisplay: selectedCalData.DateString
	            }, calendarOnClick);

                movingIndex++;
	        }

	    };



	    var container = $(this);
	    var minIndex = 0;
	    var maxIndex = calendarData.length - 1;
	    var curIndex = 0;
	    var colBodyWidth = (100 / days) + '%';

	    container.addClass('cal-container-gen');
	    //var calPanelWidth = container.width() - 80;
	    container.html('');

	    if (calendarData.length == 0) {
	        container.append('<div>No data</div>');
	        return;
	    }

	    var leftButton = '<div class="cal-btn-container cal-btn-left"><a class="cal-left-button">&nbsp;</a></div>';
	    var rightButton = '<div class="cal-btn-container cal-btn-right"><a class="cal-right-button">&nbsp;</a></div>';
	    //var calendarPanel = '<div class="cal-panel" style="width:' + calPanelWidth + 'px;"></div>';
	    var calendarPanel = '<div class="cal-panel"></div>';
	    container.append(leftButton);
	    container.append(calendarPanel);
	    container.append(rightButton);

	    for (i = 0; i < days; i++) {
	        $('.cal-panel').append('<a id="calBody' + i + '" class="cal-button" data-index="' + i + '" data-id="x" data-date="x">' +
                '<div class="cal-body">' +
                '<div class="cal-header">H</div>' +
                '<div class="cal-content">' +
                '<div class="cal-date">D</div>' +
                '<div class="cal-info">I</div>' +
                '</div>' +
                '</div></a>');
	    }
            
	    $('.cal-body').css('width', colBodyWidth);
	    $('.cal-body').css('float', 'left');
	    //$('.cal-btn-container').css('width', '40px');

	    if (selectedDate != '') {
	        _selectCalendarDate(selectedDate);
	    }
	    else {
	        _setCalendarDates(0);
	    }

	    $('.cal-left-button').click(function () {
	        if (curIndex - 1 < 0) return;
	        curIndex = curIndex - 1;
	        _setCalendarDates(curIndex);
	    });

	    $('.cal-right-button').click(function () {
	        if (curIndex + 1 > maxIndex - (days - 1)) return false;
	        curIndex = curIndex + 1;
	        _setCalendarDates(curIndex);
	    });

	    return this;
	};

    //
    //	--------------------------------------------------------------------------
    //	---------			    PROGRESS LOADING PANEL					 ---------
    //	--------------------------------------------------------------------------
    //	USAGE:
    //	
    //		var loads;									-- VARIABLE TO STORE THE LOADING ELEMENT
    //		
    //		loads = $(<element>).progressLoading({
    //          text: [text],
    //          max: [max],
    //          min: [min],
    //          value: [value],
    //          autoDestroy: true/false
    //      });
    //		
    //      loads.setProgress([value],[text]);          -- SET PROGRESS VALUE
    //		loads.hideLoading();						-- CLEAR LOADING PANEL
    //		


	$.fn.progressLoading = function (obj) {

	    this.hideLoading = function () {
	        $(this).children('#progress-loader-screen-generated').remove();
	        $(this).children('#progress-loader-screen-generated-inner').remove();
	    };

	    this.setProgress = function (__value, __text) {
	        var dom = $(this);
	        var progressBar = dom.children('#progress-loader-screen-generated-inner').children('#progress-loader-screen-generated-bar').children('#progress-loader-screen-generated-progress');
	        var progressText = dom.children('#progress-loader-screen-generated-inner').children('#progress-loader-screen-generated-text');
	        var progressValue = dom.children('#progress-loader-screen-generated-inner').children('#progress-loader-screen-generated-value');
	        _value = __value;
	        var barProgress = parseInt(((_min + _value) / _max) * 100);
	        progressBar.css('width', barProgress + '%');
	        progressValue.html(barProgress + ' %');
	        progressText.html(__text);
	        if (_autoDestroy && _max <= (_min + _value)) {
	            setTimeout(function () {
	                dom.children('#progress-loader-screen-generated').remove();
	                dom.children('#progress-loader-screen-generated-inner').remove();
	            }, 300);
	        }
	    };

	    var defaults = {
	        text: '',
	        max: 10,
	        min: 0,
	        value: 0,
	        autoDestroy: true
	    };

	    var _text = defaults.text;
	    var _max = defaults.max;
	    var _min = defaults.min;
	    var _value = defaults.value;
	    var _autoDestroy = defaults.autoDestroy;

	    if (obj != null) {
	        if (obj.text != null) { _text = obj.text; }
	        if (obj.max != null) { _max = obj.max; }
	        if (obj.min != null) { _min = obj.min; }
	        if (obj.value != null) { _value = obj.value; }
	        if (obj.autoDestroy != null) { _autoDestroy = obj.autoDestroy; }
	    }

	    if ($(this).children('#progress-loader-screen-generated').css('display') == 'block') { return this; }

	    var percentValue = parseInt((_value / _max) * 100);
	    var _height = $(this).height();
	    var _width = $(this).width();
	    var _left = $(this).position().left;
	    var _top = $(this).position().top;
	    var _textPos = (_height / 2) - 36.5;

	    var loadingscreen = '<div id="progress-loader-screen-generated" style="width:' + _width + 'px; height:' + _height + 'px; top: ' + _top +
            'px; ' + '"></div>' +
            '<div id="progress-loader-screen-generated-inner" style="position: absolute;width: 100%;height: 73px;top: 50%;margin-top: -36.5px;">' +
            '<div id="progress-loader-screen-generated-text">' + _text + '</div>' +
            '<div id="progress-loader-screen-generated-bar"><div id="progress-loader-screen-generated-progress" style="width:' + percentValue + 'px;"></div></div>' +
            '<div id="progress-loader-screen-generated-value">' + percentValue + '%</div>' +
            '</div>';

	    $(this).append(loadingscreen);

	    $('#loader_screen_generated').click();
	    $('input').blur();
	    $('button').blur();
	    return this;
	};


    //
    //	--------------------------------------------------------------------------
    //	---------  		        	CURRENCY FORMAT				         ---------
    //	--------------------------------------------------------------------------	
    //	USAGE:
    //	
    //		$(<elements>).currencyInput([decimal place]);
    //

	$.fn.currencyInput = function (decimal) {
	    decimal = decimal ? decimal : 0;
	    this.each(function () {
	        $(this).blur(function () {
	            var num = $(this).val();
	            num = num.toString().replace(/\$|\,/g, '');
	            if (isNaN(num))
	                num = "0";
	            sign = (num == (num = Math.abs(num)));
	            num = Math.floor(num * 100 + 0.50000000001);
	            cents = num % 100;
	            num = Math.floor(num / 100).toString();
	            if (cents < 10)
	                cents = "0" + cents;
	            for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
	                num = num.substring(0, num.length - (4 * i + 3)) + ',' +
                    num.substring(num.length - (4 * i + 3));
	            $(this).val(((sign) ? '' : '-') + '$' + num + (decimal > 0 ? ('.' + cents) : ''));
	        });

	    });
	};

    //
    //	--------------------------------------------------------------------------
    //	---------  		        	NUMERIC INPUT				         ---------
    //	--------------------------------------------------------------------------	
    //	USAGE:
    //	
    //		$(<elements>).numericInput();
    //

	$.fn.numericInput = function () {
	    this.each(function () {
	        $(this).keydown(function () {
	            // Allow only backspace and delete
	            if (event.keyCode == 46 || event.keyCode == 8 || (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
	                // let it happen, don't do anything
	            }
	            else {
	                // Ensure that it is a number and stop the keypress
	                if (event.keyCode < 48 || event.keyCode > 57) {
	                    event.preventDefault();
	                }
	            }
	        });
	    });
	};

    //
    //	--------------------------------------------------------------------------
    //	---------  		        	DATE INPUT		    		         ---------
    //	--------------------------------------------------------------------------	
    //	USAGE:
    //	
    //		$(<elements>).dateInput();
    //

	$.fn.dateInput = function () {
	    this.each(function () {
	        $(this).keydown(function () {
	            console.log(event.keyCode);
	            // Allow numbers only backspace, delete and slash (/)
	            if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 191 || event.keyCode == 111
                    || (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
	                // let it happen, don't do anything
	            }
	            else {
	                // Ensure that it is a number and stop the keypress
	                if (event.keyCode < 48 || event.keyCode > 57) {
	                    event.preventDefault();
	                }
	            }
	        });
	    });
	};

    //
    //	--------------------------------------------------------------------------
    //	---------  		        	MODAL WINDOW				         ---------
    //	--------------------------------------------------------------------------	
    //	USAGE:
    //	
    //		$(<elements>).modalWindow({
    //          height: [int],
    //          width: [int],
    //          content: 'html'/[url],
    //          header: [text],
    //          scroll: true/false
    //      });
    //

	$.fn.modalWindow = function (option) {

	    this.closeWindow = function () {
	        $('#bg_box_generated', window.parent.document).remove();
	        $('#window_box_container_generated', window.parent.document).remove();
	        $('body').css('overflow', bodyOverflow);
	        $('body').off('scroll touchmove mousewheel', noScroll);
	    };

	    $('#bg_box_generated', window.parent.document).remove();
	    $('#window_box_container_generated', window.parent.document).remove();

	    var _wH = $(window).height();
	    var _wW = $(window).width();

	    var defaults = {
	        height: _wH / 2,
	        width: _wW / 2,
	        content: 'html',
	        title: '',
	        scroll: false,
            showControls: true
	    };

	    var _height = defaults.height;
	    var _width = defaults.width;
	    var _content = defaults.content;
	    var _title = defaults.title;
	    var _scroll = defaults.scroll;
	    var _showControls = defaults.showControls;

	    var target = $(this)[0];

	    if (option != null) {
	        if (option.height != null) { _height = option.height; }
	        if (option.width != null) { _width = option.width; }
	        if (option.content != null) { _content = option.content; }
	        if (option.title != null) { _title = option.title; }
	        if (option.scroll != null) { _scroll = option.scroll; }
	        if (option.showControls != null) { _showControls = option.showControls; }
	    }

	    var bodyOverflow = $('body').css('overflow');
	    var noScroll = function (e) {
	        e.preventDefault();
	        e.stopPropagation();
	        return false;
	    };

	    $('body').css('overflow', 'hidden');
	    $('body').on('scroll touchmove mousewheel', noScroll);

	    var hasTitle = _title != '';
	    var htmlContent = $(this).html();

	    var _top = (_wH / 2) - (_height / 2);
	    var _left = (_wW / 2) - (_width / 2);

	    var _body = $('html', window.parent.document);
	    var _docBody = $('body', window.parent.document);
	    var _dHeight = _docBody.height() > _body.height() ? _docBody.height() : _body.height();
	    var _dWidth = _docBody.width() > _body.width() ? _docBody.width() : _body.width();

	    parent.window.scrollTo(0, 0);
	    $('body', window.parent.document).append('<div id="bg_box_generated" style="height:' + _dHeight + 'px;width:' + _dWidth + 'px;"></div>');
	    $('body', window.parent.document).append(
            '<div id="window_box_container_generated" style="height:' + _height + 'px;width:' + _width + 'px; position:absolute; top:' + _top + 'px; left:' + _left + 'px;">' +
                (hasTitle ? '<div id="window_box_title_generated"></div>' : '') +
                '<div id="window_box_content_generated">' +
                    '<div id="window_box_content_panel_generated">' +
                    '</div>' +
                '</div>' +
                '<div id="window_button_container_generated"></div>' +
            '</div>');

	    if (_showControls) {
	        $('#window_button_container_generated').append('<a class="window_controls_generated" id="generated_close_button">x</a>');
	    }

	    var contentHeight = _height;

	    if (hasTitle) {
	        $('#window_box_title_generated').html(_title);
	        contentHeight -= $('#window_box_title_generated').height();
	    }

	    $('#window_box_content_generated').height(contentHeight);

	    var contentHeightMargin = parseInt($('#window_box_content_panel_generated').css('margin-top').replace('px', '')) + parseInt($('#window_box_content_panel_generated').css('margin-bottom').replace('px', ''));
	    var contentHeightPadding = parseInt($('#window_box_content_panel_generated').css('padding-top').replace('px', '')) + parseInt($('#window_box_content_panel_generated').css('padding-bottom').replace('px', ''));
	    console.log(contentHeight, contentHeightMargin, contentHeightPadding);
	    $('#window_box_content_panel_generated').height(contentHeight - contentHeightMargin - contentHeightPadding)

	    if (_content == 'html') {
	        $(target).html('');
	        $('#window_box_content_panel_generated').html(htmlContent);
	    }
	    else {
	        if (checkURL(_content) || _content.substr(0,1) == '/') {
	            var iframeStringObject = '<iframe style="width:100%;height:100%;" frameborder="0" scrolling="' + (_scroll ? 'yes' : 'no') + '" src="' + _content + '"></iframe>';
	            $('#window_box_content_panel_generated').append(iframeStringObject);
	        }
	        else {
	            $('#window_box_content_panel_generated').html('Invalid URL: ' + _content);
	        }
	    }

	    $('#generated_close_button', window.parent.document).click(function () {
	        if (_content == 'html') {
	            $(target).html(htmlContent);
	        }
	        $('#bg_box_generated', window.parent.document).remove();
	        $('#window_box_container_generated', window.parent.document).remove();
	        $('body').css('overflow', bodyOverflow);
	        $('body').off('scroll touchmove mousewheel', noScroll);
	    });

	    $('input').blur();
	    $('button').blur();

	    return this;
	};

})($);

function ajaxData(url, data) {
    return $.ajax({
        type: 'POST',
        url: url,
        contentType: 'application/json; charset=utf-8',
        data: data,
        dataType: 'json'
    });
}

function parseJsonDate(jsonDate) {
    var _date = new Date(parseInt(jsonDate.substr(6)));
    return dateFormat(_date, "fullDate");
}

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 

function rgb2hex(rgb) {
     if (  rgb.search("rgb") == -1 ) {
          return rgb;
     } else {
          rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
          function hex(x) {
               return ("0" + parseInt(x).toString(16)).slice(-2);
          }
          return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]); 
     }
}

function checkURL(value) {
    var urlregex = new RegExp("^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
    if (urlregex.test(value)) {
        return (true);
    }
    return (false);
}



/* HEART CODE CANVAS LOADER */

(function(w){var k=function(b,c){typeof c=="undefined"&&(c={});this.init(b,c)},a=k.prototype,o,p=["canvas","vml"],f=["oval","spiral","square","rect","roundRect"],x=/^\#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,v=navigator.appVersion.indexOf("MSIE")!==-1&&parseFloat(navigator.appVersion.split("MSIE")[1])===8?true:false,y=!!document.createElement("canvas").getContext,q=true,n=function(b,c,a){var b=document.createElement(b),d;for(d in a)b[d]=a[d];typeof c!=="undefined"&&c.appendChild(b);return b},m=function(b,
c){for(var a in c)b.style[a]=c[a];return b},t=function(b,c){for(var a in c)b.setAttribute(a,c[a]);return b},u=function(b,c,a,d){b.save();b.translate(c,a);b.rotate(d);b.translate(-c,-a);b.beginPath()};a.init=function(b,c){if(typeof c.safeVML==="boolean")q=c.safeVML;try{this.mum=document.getElementById(b)!==void 0?document.getElementById(b):document.body}catch(a){this.mum=document.body}c.id=typeof c.id!=="undefined"?c.id:"canvasLoader";this.cont=n("div",this.mum,{id:c.id});if(y)o=p[0],this.can=n("canvas",
this.cont),this.con=this.can.getContext("2d"),this.cCan=m(n("canvas",this.cont),{display:"none"}),this.cCon=this.cCan.getContext("2d");else{o=p[1];if(typeof k.vmlSheet==="undefined"){document.getElementsByTagName("head")[0].appendChild(n("style"));k.vmlSheet=document.styleSheets[document.styleSheets.length-1];var d=["group","oval","roundrect","fill"],e;for(e in d)k.vmlSheet.addRule(d[e],"behavior:url(#default#VML); position:absolute;")}this.vml=n("group",this.cont)}this.setColor(this.color);this.draw();
m(this.cont,{display:"none"})};a.cont={};a.can={};a.con={};a.cCan={};a.cCon={};a.timer={};a.activeId=0;a.diameter=40;a.setDiameter=function(b){this.diameter=Math.round(Math.abs(b));this.redraw()};a.getDiameter=function(){return this.diameter};a.cRGB={};a.color="#000000";a.setColor=function(b){this.color=x.test(b)?b:"#000000";this.cRGB=this.getRGB(this.color);this.redraw()};a.getColor=function(){return this.color};a.shape=f[0];a.setShape=function(b){for(var c in f)if(b===f[c]){this.shape=b;this.redraw();
break}};a.getShape=function(){return this.shape};a.density=40;a.setDensity=function(b){this.density=q&&o===p[1]?Math.round(Math.abs(b))<=40?Math.round(Math.abs(b)):40:Math.round(Math.abs(b));if(this.density>360)this.density=360;this.activeId=0;this.redraw()};a.getDensity=function(){return this.density};a.range=1.3;a.setRange=function(b){this.range=Math.abs(b);this.redraw()};a.getRange=function(){return this.range};a.speed=2;a.setSpeed=function(b){this.speed=Math.round(Math.abs(b))};a.getSpeed=function(){return this.speed};
a.fps=24;a.setFPS=function(b){this.fps=Math.round(Math.abs(b));this.reset()};a.getFPS=function(){return this.fps};a.getRGB=function(b){b=b.charAt(0)==="#"?b.substring(1,7):b;return{r:parseInt(b.substring(0,2),16),g:parseInt(b.substring(2,4),16),b:parseInt(b.substring(4,6),16)}};a.draw=function(){var b=0,c,a,d,e,h,k,j,r=this.density,s=Math.round(r*this.range),l,i,q=0;i=this.cCon;var g=this.diameter;if(o===p[0]){i.clearRect(0,0,1E3,1E3);t(this.can,{width:g,height:g});for(t(this.cCan,{width:g,height:g});b<
r;){l=b<=s?1-1/s*b:l=0;k=270-360/r*b;j=k/180*Math.PI;i.fillStyle="rgba("+this.cRGB.r+","+this.cRGB.g+","+this.cRGB.b+","+l.toString()+")";switch(this.shape){case f[0]:case f[1]:c=g*0.07;e=g*0.47+Math.cos(j)*(g*0.47-c)-g*0.47;h=g*0.47+Math.sin(j)*(g*0.47-c)-g*0.47;i.beginPath();this.shape===f[1]?i.arc(g*0.5+e,g*0.5+h,c*l,0,Math.PI*2,false):i.arc(g*0.5+e,g*0.5+h,c,0,Math.PI*2,false);break;case f[2]:c=g*0.12;e=Math.cos(j)*(g*0.47-c)+g*0.5;h=Math.sin(j)*(g*0.47-c)+g*0.5;u(i,e,h,j);i.fillRect(e,h-c*0.5,
c,c);break;case f[3]:case f[4]:a=g*0.3,d=a*0.27,e=Math.cos(j)*(d+(g-d)*0.13)+g*0.5,h=Math.sin(j)*(d+(g-d)*0.13)+g*0.5,u(i,e,h,j),this.shape===f[3]?i.fillRect(e,h-d*0.5,a,d):(c=d*0.55,i.moveTo(e+c,h-d*0.5),i.lineTo(e+a-c,h-d*0.5),i.quadraticCurveTo(e+a,h-d*0.5,e+a,h-d*0.5+c),i.lineTo(e+a,h-d*0.5+d-c),i.quadraticCurveTo(e+a,h-d*0.5+d,e+a-c,h-d*0.5+d),i.lineTo(e+c,h-d*0.5+d),i.quadraticCurveTo(e,h-d*0.5+d,e,h-d*0.5+d-c),i.lineTo(e,h-d*0.5+c),i.quadraticCurveTo(e,h-d*0.5,e+c,h-d*0.5))}i.closePath();i.fill();
i.restore();++b}}else{m(this.cont,{width:g,height:g});m(this.vml,{width:g,height:g});switch(this.shape){case f[0]:case f[1]:j="oval";c=140;break;case f[2]:j="roundrect";c=120;break;case f[3]:case f[4]:j="roundrect",c=300}a=d=c;e=500-d;for(h=-d*0.5;b<r;){l=b<=s?1-1/s*b:l=0;k=270-360/r*b;switch(this.shape){case f[1]:a=d=c*l;e=500-c*0.5-c*l*0.5;h=(c-c*l)*0.5;break;case f[0]:case f[2]:v&&(h=0,this.shape===f[2]&&(e=500-d*0.5));break;case f[3]:case f[4]:a=c*0.95,d=a*0.28,v?(e=0,h=500-d*0.5):(e=500-a,h=
-d*0.5),q=this.shape===f[4]?0.6:0}i=t(m(n("group",this.vml),{width:1E3,height:1E3,rotation:k}),{coordsize:"1000,1000",coordorigin:"-500,-500"});i=m(n(j,i,{stroked:false,arcSize:q}),{width:a,height:d,top:h,left:e});n("fill",i,{color:this.color,opacity:l});++b}}this.tick(true)};a.clean=function(){if(o===p[0])this.con.clearRect(0,0,1E3,1E3);else{var b=this.vml;if(b.hasChildNodes())for(;b.childNodes.length>=1;)b.removeChild(b.firstChild)}};a.redraw=function(){this.clean();this.draw()};a.reset=function(){typeof this.timer===
"number"&&(this.hide(),this.show())};a.tick=function(b){var a=this.con,f=this.diameter;b||(this.activeId+=360/this.density*this.speed);o===p[0]?(a.clearRect(0,0,f,f),u(a,f*0.5,f*0.5,this.activeId/180*Math.PI),a.drawImage(this.cCan,0,0,f,f),a.restore()):(this.activeId>=360&&(this.activeId-=360),m(this.vml,{rotation:this.activeId}))};a.show=function(){if(typeof this.timer!=="number"){var a=this;this.timer=self.setInterval(function(){a.tick()},Math.round(1E3/this.fps));m(this.cont,{display:"block"})}};
a.hide=function(){typeof this.timer==="number"&&(clearInterval(this.timer),delete this.timer,m(this.cont,{display:"none"}))};a.kill=function(){var a=this.cont;typeof this.timer==="number"&&this.hide();o===p[0]?(a.removeChild(this.can),a.removeChild(this.cCan)):a.removeChild(this.vml);for(var c in this)delete this[c]};w.CanvasLoader=k})(window);


/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

var dateFormat = function () {
    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
		    val = String(val);
		    len = len || 2;
		    while (val.length < len) val = "0" + val;
		    return val;
		};

    // Regexes and supporting functions are cached through closure
    return function (date, mask, utc) {
        var dF = dateFormat;

        // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
        if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
            mask = date;
            date = undefined;
        }

        // Passing date through Date applies Date.parse, if necessary
        date = date ? new Date(date) : new Date;
        if (isNaN(date)) throw SyntaxError("invalid date");

        mask = String(dF.masks[mask] || mask || dF.masks["default"]);

        // Allow setting the utc argument via the mask
        if (mask.slice(0, 4) == "UTC:") {
            mask = mask.slice(4);
            utc = true;
        }

        var _ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
			    d: d,
			    dd: pad(d),
			    ddd: dF.i18n.dayNames[D],
			    dddd: dF.i18n.dayNames[D + 7],
			    m: m + 1,
			    mm: pad(m + 1),
			    mmm: dF.i18n.monthNames[m],
			    mmmm: dF.i18n.monthNames[m + 12],
			    yy: String(y).slice(2),
			    yyyy: y,
			    h: H % 12 || 12,
			    hh: pad(H % 12 || 12),
			    H: H,
			    HH: pad(H),
			    M: M,
			    MM: pad(M),
			    s: s,
			    ss: pad(s),
			    l: pad(L, 3),
			    L: pad(L > 99 ? Math.round(L / 10) : L),
			    t: H < 12 ? "a" : "p",
			    tt: H < 12 ? "am" : "pm",
			    T: H < 12 ? "A" : "P",
			    TT: H < 12 ? "AM" : "PM",
			    Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
			    o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
			    S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

        return mask.replace(token, function ($0) {
            return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
        });
    };
}();

// Some common format strings
dateFormat.masks = {
    "default": "ddd mmm dd yyyy HH:MM:ss",
    shortDate: "m/d/yy",
    mediumDate: "mmm d, yyyy",
    longDate: "mmmm d, yyyy",
    fullDate: "dddd, mmmm d, yyyy",
    shortTime: "h:MM TT",
    mediumTime: "h:MM:ss TT",
    longTime: "h:MM:ss TT Z",
    isoDate: "yyyy-mm-dd",
    isoTime: "HH:MM:ss",
    isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
    isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
    dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ],
    monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]
};

// For convenience...
Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};

//serialize form data to json
$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] === undefined) {
            o[this.name] = this.value || '';
        }
    });
    return o;
};