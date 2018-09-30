class LanguageManagement {
    static formatState(state) {
        if (!state.id) {
            return state.text;
        }
        return $('<span><img src="' + $('#language_flag_path').val() + state.element.value.toLowerCase() + '.png" class="img-flag" /> ' + state.text + '</span>');
    }
    bindEventToElement() {
        if (jQuery().select2) {

            $('.select-search-language').select2({
                width: '100%',
                templateResult: LanguageManagement.formatState,
                templateSelection: LanguageManagement.formatState
            });
        }

        let table_language = $('.table-language');

        $(document).on('change', '#language_id', (event) => {
            let language = $(event.currentTarget).find('option:selected').data('language');
            if (typeof language != 'undefined' && language.length > 0) {
                $('#lang_name').val(language[2]);
                $('#lang_locale').val(language[0]);
                $('#lang_code').val(language[1]);
                $('#flag_list').val(language[4]).trigger('change');
                $('.lang_is_' + language[3]).prop('checked', true);
                $('#btn-language-submit-edit').prop('id', 'btn-language-submit').text('Add new language');
            }
        });

        $(document).on('click', '#btn-language-submit', (event) => {
            event.preventDefault();
            let name = $('#lang_name').val();
            let locale = $('#lang_locale').val();
            let code = $('#lang_code').val();
            let flag = $('#flag_list').val();
            let order = $('#lang_order').val();
            let is_rtl = $('.lang_is_rtl').prop('checked') ? 1 : 0;
            LanguageManagement.createOrUpdateLanguage(0, name, locale, code, flag, order, is_rtl, 0);
        });

        $(document).on('click', '#btn-language-submit-edit', (event) => {
            event.preventDefault();
            let id = $('#lang_id').val();
            let name = $('#lang_name').val();
            let locale = $('#lang_locale').val();
            let code = $('#lang_code').val();
            let flag = $('#flag_list').val();
            let order = $('#lang_order').val();
            let is_rtl = $('.lang_is_rtl').prop('checked') ? 1 : 0;
            LanguageManagement.createOrUpdateLanguage(id, name, locale, code, flag, order, is_rtl, 1);
        });

        table_language.on('click', '.deleteDialog', (event) => {
            event.preventDefault();

            $('.delete-crud-entry').data('section', $(event.currentTarget).data('section'));
            $('.modal-confirm-delete').modal('show');
        });

        $('.delete-crud-entry').on('click', (event) => {
            event.preventDefault();
            $('.modal-confirm-delete').modal('hide');

            let deleteURL = $(event.currentTarget).data('section');

            $.ajax({
                url: deleteURL,
                type: 'GET',
                success: (data) => {
                    if (data.error) {
                        Botble.showNotice('error', data.message);
                    } else {
                        if (data.data) {
                            table_language.find('i[data-id=' + data.data + ']').unwrap();
                            $('.tooltip').remove();
                        }
                        table_language.find('a[data-section="' + deleteURL + '"]').closest('tr').remove();
                        Botble.showNotice('success', data.message);
                    }
                },
                error: (data) => {
                    Botble.handleError(data);
                }
            });
        });

        table_language.on('click', '.set-language-default', (event) => {
            event.preventDefault();
            let _self = $(event.currentTarget);

            $.ajax({
                url: _self.data('section'),
                type: 'GET',
                success: (data) => {
                    if (data.error) {
                        Botble.showNotice('error', data.message);
                    } else {
                        let star = table_language.find('td > i');
                        star.replaceWith('<a data-section="' + route('languages.set.default') + '?lang_id=' + star.data('id') + '" class="set-language-default tip" data-original-title="Choose ' + star.data('name') + ' as default language">' + star.closest('td').html() + '</a>');
                        _self.find('i').unwrap();
                        $('.tooltip').remove();
                        Botble.showNotice('success', data.message);
                    }
                },
                error: (data) => {
                    Botble.handleError(data);
                }
            });
        });

        table_language.on('click', '.edit-language-button', (event) => {
            event.preventDefault();
            let _self = $(event.currentTarget);

            $.ajax({
                url: route('languages.get') + '?lang_id=' + _self.data('id'),
                type: 'GET',
                success: (data) => {
                    if (data.error) {
                        Botble.showNotice('error', data.message);
                    } else {
                        let language = data.data;
                        $('#lang_id').val(language.lang_id);
                        $('#lang_name').val(language.lang_name);
                        $('#lang_locale').val(language.lang_locale);
                        $('#lang_code').val(language.lang_code);
                        $('#flag_list').val(language.lang_flag).trigger('change');
                        if (language.lang_rtl) {
                            $('.lang_is_rtl').prop('checked', true);
                        }
                        $('#lang_order').val(language.lang_order);

                        $('#btn-language-submit').prop('id', 'btn-language-submit-edit').text('Update');
                    }
                },
                error: (data) => {
                    Botble.handleError(data);
                }
            });
        });
    }
    static createOrUpdateLanguage (id, name, locale, code, flag, order, is_rtl, edit) {
        let url = route('languages.store');
        if (edit) {
            url = route('languages.edit') + '?lang_code=' + code;
        }
        $('#btn-language-submit').addClass('button-loading');
        $.ajax({
            url: url,
            type: 'POST',
            data: {
                lang_id: id,
                lang_name: name,
                lang_locale: locale,
                lang_code: code,
                lang_flag: flag,
                lang_order: order,
                lang_is_rtl: is_rtl
            },
            success: (data) => {
                if (data.error) {
                    Botble.showNotice('error', data.message);
                } else {
                    if (edit) {
                        $('.table-language').find('tr[data-id=' + id + ']').replaceWith(data.data);
                    } else {
                        $('.table-language').append(data.data);
                    }
                    Botble.showNotice('success', data.message);
                }

                $('#language_id').val('').trigger('change');
                $('#lang_name').val('');
                $('#lang_locale').val('');
                $('#lang_code').val('');
                $('#flag_list').val('').trigger('change');
                $('.lang_is_ltr').prop('checked', true);

                $('#btn-language-submit-edit').prop('id', 'btn-language-submit').text('Add new language');
                $('#btn-language-submit').removeClass('button-loading');
            },
            error: (data) => {
                Botble.handleError(data);
            }
        });
    };   
}

$(document).ready(() => {
    new LanguageManagement().bindEventToElement();
});