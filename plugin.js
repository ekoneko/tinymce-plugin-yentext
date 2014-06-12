/*global tinymce:true */
/*global $:true */
// require yen/style.css

(function () {
    'use strict';

    var YenTexts = [
        ' \\(￣ˇ￣)> ', ' \\(>。<)> ', ' ∑(っ °Д °;)っ ',
        ' ˋ( ° ▽、°）', ' <(￣3￣)> ', ' ╰(￣▽￣)╮ ',
        ' ╮(╯▽╰)╭ ', ' (づ￣▽￣)づ ', ' \\>。</ ', ' (||| ￣,_ゝ￣) ',
        ' V(￣ ▽ ￣)V ', ' ( ˉ▽ˉ；) ', ' =___,=y~~ ',
        ' \\("▔□▔)/ ', ' (～￣▽￣)～ ', '（＾Ｏ＾）',
        ' 罒▽罒 ', ' ╭(╯^╰)╮ ', ' \\(≥▽≤)/ ',
        ' ~(～ o ～)~zZ~~ ', ' /(ㄒoㄒ)/~ ', ' (¬_¬) ',
        ' \\(ㄒ_ㄒ)> ', ' (*´∇‘*) ', ' \\(＾Ｏ＾)> ',
        ' \\(°▽、°)> ', ' \\(￣▽￣)> ', ' \\(≥▽≤)> ',
        ' \\(╯^╰)> ', ' \\(ˉ▽ˉ；)> ', ' (#‘′)凸 ',
        ' ╮(罒w罒)╭ ', ' =。= ', ' (O_O)？'
    ];

    tinymce.PluginManager.add('yen', function (editor) {
        var showDialog, createDialog, createItem, choseYen;

        createDialog = function (x, y) {
            var dialog, i;
            dialog = $('<div class="tinymce-yen-box mce-menu"><div>').css({
                left: x + 'px',
                top: y + 'px'
            });
            $('body').append(dialog);

            for (i in YenTexts) {
                dialog.append(createItem(YenTexts[i]));
            }
            setTimeout(function () {
                $(document).on('click.yentext', function () {
                    $(document).off('click.yentext');
                    dialog.remove();
                });
            }, 1);
        };

        createItem = function (text) {
            var item;
            item = $('<div class="tinymce-yen-item">' + text + '</div>');
            item.on('click', function () {
                choseYen(this.innerText);
            });
            return item;
        };

        choseYen = function (text) {
            editor.insertContent(text);
        };

        showDialog = function (event) {
            createDialog(event.pageX, event.pageY);
        };

        editor.addButton('yen', {
            icon: 'yen',
            tooltip: 'Yen text',
            onclick: showDialog
        });
   });
}());