if($){
    $(function () {
        $('body').on('click', '.modal [data-close]', function () {
            $(this).parents('.modal').fadeOut();
        });
        $('body').on('click', '.modal .modal-wrapper', function () {
            $(this).parents('.modal').fadeOut();
        });
        $('body').on('click', '.modal .modal-wrapper>div', function (e) {
            e.stopPropagation();
        });
        $('body').on('click', '[data-modal]', function () {
            var name = $(this).attr('data-modal');
            $(name).fadeIn();
        });
    });
}
