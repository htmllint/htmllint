var proc = require('./processOption');

module.exports = [
    {
        name: 'attr-bans',
        desc: 'The value of this option is a list of strings, each of which is an attribute name. Attributes with any of the given names are disallowed.',
        process: proc.arrayOfStr
    },
    {
        name: 'attr-name-ignore-regex',
        desc: 'The value is either a string giving a regular expression or `false`. If set, `attr`s with names matching the given regular expression are ignored for the `attr-name-style` rule. For example, excluding `{{...}}` names used by Angular and other templating methods can be done with the regex `{{.*?}}`.',
        process: proc.regex,
        rules: [] // 'attr-name-style'
    },
    {
        name: 'attr-name-style',
        desc: 'A format specifier, or `false`. If set, attribute names must conform to the given format.',
        process: proc.format
    },
    {
        name: 'attr-new-line',
        desc: '', // TODO
        process: function (o) {
            return o === '+0' ? o : proc.posInt(o);
        }
    },
    {
        name: 'attr-no-dup',
        desc: 'If set, the same attribute name cannot be repeated within a single tag.',
        process: proc.bool
    },
    {
        name: 'attr-no-unsafe-char',
        desc: 'If set, unsafe characters may not be used in attribute values. The unsafe characters are those whose unicode values lie in the ranges 0000-001f, 007f-009f, 00ad, 0600-0604, 070f, 17b4, 17b5, 200c-200f, 2028-202f, 2060-206f, feff, fff0-ffff.',
        process: proc.bool
    },
    {
        name: 'attr-order',
        desc: 'A list of attribute names, or `false`. If set, any attributes present in the list must be ordered as they are in the list.',
        process: proc.arrayOfStr
    },
    {
        name: 'class-no-dup',
        desc: 'If set, the same class name cannot be repeated within a `class` attribute.',
        process: proc.bool,
        rules: ['class']
    },
    {
        name: 'class-style',
        desc: 'A format specifier, or `false`. If set, `class`es must fit the given format. If `false`, the value for `id-class-style` is used instead (use `\'none\'` to avoid matching anything).',
        process: proc.format,
        rules: ['class']
    },
    {
        name: 'doctype-first',
        desc: '* `true`: The doctype (`<!DOCTYPE ... >`) must be the first element in the file, excluding comments and whitespace.\n* "smart": If a `head` tag is present in the document, then the doctype must come first.\n* `false`: No restriction.',
        process: proc.boolPlus('smart')
    },
    {
        name: 'focusable-tabindex-style',
        desc: 'If set, all focusable elements (`a`, `area`, `button`, `input`, `img`, `select`, `textarea`) must have a positive `tabindex` attribute, if any.',
        process: proc.bool
    },
    {
        name: 'head-req-title',
        desc: 'If set, any `head` tag in the page must contain a non-empty `title` tag.',
        process: proc.bool,
        rules: ['page-title']
    },
    {
        name: 'href-style',
        desc: '* "absolute": All `href` tags must use absolute URLs.\n* "relative": All `href` tags must use relative URLs.\n* `false`: No restriction.',
        process: proc.boolPlus('absolute')
    },
    {
        name: 'html-req-lang',
        desc: 'If set, each `html` tag must have a `lang` attribute.',
        process: proc.bool,
        rules: ['lang']
    },
    {
        name: 'id-class-ignore-regex',
        desc: 'The value is either a string giving a regular expression or `false`. If set, `id`s and `class`es matching the given regular expression are ignored for the `id-class-style` rule. For example, excluding `{{...}}` classes used by Angular and other templating methods can be done with the regex `{{.*?}}`.',
        process: function (ignore) {
            return new RegExp('(' + ignore + ')|\\s*$|\\s+', 'g');
        },
        rules: [] // 'class', 'id-style'
    },
    {
        name: 'id-class-no-ad',
        desc: 'If set, the values for the `id` and `class` attributes may not use the word "ad". This rule only restricts cases of the substring "ad" surrounded by non-alphanumeric characters.',
        process: proc.bool
    },
    {
        name: 'id-class-style',
        desc: 'A format specifier, or `false`. If set, `id`s and `class`es must fit the given format. May be overridden by `class-style` for `class`es.',
        process: proc.format,
        rules: ['class', 'id-style']
    },
    {
        name: 'id-no-dup',
        desc: 'If set, values for the `id` attribute may not be duplicated across elements.',
        process: proc.bool
    },
    {
        name: 'img-req-alt',
        desc: '* `true`: Each `img` tag must have a non-empty `alt` property.\n* "allownull": Each `img` tag must have an `alt` property with a value, but value may be null (equal to `""`).\n* `false`: No restriction.',
        process: proc.boolPlus('allownull')
    },
    {
        name: 'indent-style',
        desc: '* "tabs": Only tabs may be used for indentation.\n* "spaces": Only spaces may be used for indentation.\n* "nonmixed": Either tabs or spaces may be used, but not both in the same file.\n* `false`: No restriction.',
        process: proc.options(['tabs', 'spaces', 'nonmixed'])
    },
    {
        name: 'indent-width',
        desc: 'The value of this option is either `false` or a positive integer. If it is a number and spaces are used for indentation, then spaces used to indent must come in multiples of that number.',
        process: proc.posInt,
        rules: ['indent-style']
    },
    {
        name: 'indent-width-cont',
        desc: 'If set, ignore `indent-width` for lines whose first non-whitespace character is not `<`. This is known as continuation indent because it enables the user to continue tags onto multiple lines while aligning the attribute names.',
        process: proc.bool,
        rules: ['indent-style']
    },
    {
        name: 'label-req-for',
        desc: 'If set, each `label` tab must have a `for` attribute. This practice helps screen readers, and improves form element selection by allowing the user to focus an input by clicking on the label.',
        process: proc.boolPlus('strict')
    },
    {
        name: 'lang-style',
        desc: 'If set, the lang tag must have a valid form (`xx-YY`, where `xx` is a valid language code and `YY` is a valid country code). If the value is equal to "case", the tag must be capitalized conventionally (with the language code lowercase and the country code uppercase).',
        process: proc.boolPlus('case'),
        rules: ['lang']
    },
    {
        name: 'line-max-len',
        desc: 'The value of this option is either `false` or a positive integer. If it is a number, the length of each line must not exceed that number.',
        process: proc.posInt
    },
    {
        name: 'line-max-len-ignore-regex',
        desc: 'The value is either a string giving a regular expression or `false`. If set, lines with names matching the given regular expression are ignored for the `line-length` rule. For example, lines with long `href` attributes can be excluded with regex `href`.',
        process: proc.regex,
        rules: [] // 'line-max-len'
    },
    {
        name: 'tag-bans',
        desc: 'The value of this option is a list of strings, each of which is a tag name. Tags with any of the given names are disallowed.',
        process: proc.arrayOfStr
    },
    {
        name: 'tag-close',
        desc: 'If set, tags must be closed. Because htmlparser2 does not match tags case-insensitively, tags whose closing tag has a different case than the opening tag may be detected by this option rather than `tag-name-match`.',
        process: proc.bool
    },
    {
        name: 'tag-name-match',
        desc: 'If set, tag names must match (including case).',
        process: proc.bool,
        rules: ['tag-close']
    },
    {
        name: 'tag-self-close',
        desc: '* "always": Void elements must be self-closed with `/` (html4 style).\n* "never": Void elements must not be self-closed with `/` (html5 style).\n* `false`: No restriction.',
        process: proc.options(['always', 'never']),
        rules: ['tag-close']
    },
    {
        name: 'title-max-len',
        desc: 'The value is either `false` or a nonnegative integer. If nonzero, the length of the text in the `<title>` tag must not exceed the given value.',
        process: proc.posInt,
        rules: ['page-title']
    },
    {
        name: 'title-no-dup',
        desc: 'If set, the `<title>` tag must not appear twice in the head.',
        process: proc.bool,
        rules: ['page-title']
    }
];
