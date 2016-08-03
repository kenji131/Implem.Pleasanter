﻿$(function () {
    $(document).on('change', '[class^="control-"]', function (e) {
        if ($(this).hasClass('control-spinner')) {
            if ($(this).val() === '' && $(this).hasClass('allow-blank')) {
                $(this).val('');
            } else if ($(this).val() === '' ||
                $(this).val().match(/[^0-9\.]/g) ||
                parseInt($(this).val()) < parseInt($(this).attr('data-min'))) {
                $(this).val($(this).attr('data-min'));
            } else if (parseInt($(this).val()) > parseInt($(this).attr('data-max'))) {
                $(this).val($(this).attr('data-max'));
            }
        }
        $p.setData($(this));
        e.preventDefault();
    });
    $(document).on('spin', '.control-spinner', function (event, ui) {
        $p.getDataByInnerElement($(this))[this.id] = ui.value;
    });
    $(document).on('change', '.control-checkbox.visible', function () {
        show(this.id.substring(7, this.id.length), $(this).prop('checked'));

        function show(selector, value) {
            if (value) {
                $(selector).show();
            }
            else {
                $(selector).hide();
            }
        }
    });
    $(document).on('change', '.auto-postback:not([type="text"])', function () {
        $p.send($(this), $p.getIdByInnerElement($(this)));
        if (!$(this).hasClass('keep-form-data')) {
            delete $p.getDataByInnerElement($(this))[this.id];
        }
    });
    $(document).on('keyup', '.auto-postback[type="text"]', function (e) {
        $p.setData($(this));
        if (e.keyCode === 13) {
            $p.send($(this), $p.getIdByInnerElement($(this)));
            delete $p.getDataByInnerElement($(this))[this.id];
        } else {
            var timer = setTimeout(function ($control) {
                $p.setData($control);
                $p.send($control, $p.getIdByInnerElement($control));
                delete $p.getDataByInnerElement($control)[$control.attr('id')];
            }, 700, $(this));
            $(document).on('keydown', '.auto-postback', function () {
                clearTimeout(timer);
            });
        }
    });
    $(document).on('submit', function () {
        return false;
    });
    $(document).on('click', 'a', function (e) {
        e.stopPropagation();
    });
    $(window).on('load scroll resize', function () {
        if ($('#Grid').length) {
            if ($(window).scrollTop() + $(window).height() >= $('#Grid').offset().top + $('#Grid').height()) {
                if ($('#GridOffset').val() !== '-1') {
                    $p.setData($('#GridOffset'));
                    $('#GridOffset').val(-1);
                    $p.send($('#Grid'));
                }
            }
        }
    });
});