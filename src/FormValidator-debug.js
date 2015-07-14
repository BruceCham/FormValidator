define("pafweblib/FormValidator/0.2.1/FormValidator-debug", [ "$-debug" ], function(require, exports, module) {
    "use strict";
    //使用严格模式
    var $ = require("$-debug"), namespace = "pafweblib.FormValidator";
    var type = [ 'input:not([type]),input[type="color"],input[type="date"],input[type="datetime"],input[type="datetime-local"],input[type="email"],input[type="file"],input[type="hidden"],input[type="month"],input[type="number"],input[type="password"],input[type="range"],input[type="search"],input[type="tel"],input[type="text"],input[type="time"],input[type="url"],input[type="week"],textarea', "select", 'input[type="checkbox"],input[type="radio"]' ], allTypes = type.join(",");
    var defaults = {
        //预留功能,是否ajax方式提交表单(未实现)
        isAjax: false,
        //默认提交是否验证
        onSubmit: true,
        //全局默认onblur时是否验证
        onBlur: true,
        onChange: false,
        onKeyup: false,
        //默认渲染成功和错误样式的dom
        wrapper: "div.control-group",
        success: {},
        fail: {},
        rules: {}
    };
    var methods = {
        required: function(field, value) {
            return value !== null && $.trim(value).length > 0;
        },
        minlength: function(field, value, min_len, all_rules) {
            var length = $.trim(value).length, result = length >= min_len;
            if (!all_rules["required"]) {
                result = result && length !== 0;
            }
            return result;
        },
        maxlength: function(field, value, max_len) {
            return $.trim(value).length <= max_len;
        },
        regex: function(field, value, regexp) {
            return regexp.test(value);
        },
        email: function(field, value) {
            var regex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
            return regex.test($.trim(value));
        },
        url: function(field, value) {
            var regex = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
            return regex.test(value);
        },
        equals: function(field, value, target) {
            return value === target;
        },
        ip: function(field, value) {
            var regex = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i;
            return regex.test($.trim(value));
        },
        phone: function(field, value) {
            // 调整 注册支持号段：除 100、110、120外都可支持
            var regex = /^(1[^012][0-9]{9})$/i;
            return regex.test($.trim(value));
        },
        alpha: function(field, value) {
            var regex = /^[a-z]*$/i;
            return regex.test(value);
        },
        alpha_numeric: function(field, value) {
            var regex = /^[a-z0-9]*$/i;
            return regex.test(value);
        },
        alpha_dash: function(field, value) {
            var regex = /^[a-z0-9_\-]*$/i;
            return regex.test(value);
        },
        digit: function(field, value) {
            var regex = /^\d*$/;
            return regex.test(value);
        },
        numeric: function(field, value) {
            var regex = /^([\+\-]?[0-9]+(\.[0-9]+)?)?$/;
            return regex.test(value);
        },
        matches: function(field, value, param, all_rules) {
            var length = $.trim(value).length, result = value === this.fields.filter('[data-id="' + param + '"]').val();
            if (!all_rules["required"]) {
                result = result && length !== 0;
            }
            return result;
        }
    };
    var messages = {
        required: "输入值不能为空",
        minlength: "输入值不能少于 :value 个字符",
        maxlength: "输入值不能超过 :value 个字符",
        regex: "请输入正确的值",
        email: "请输入正确的邮箱格式,如:pafweblib@pingan.com.cn",
        url: "请输入正确的url地址,如:http://www.1qianbao.com",
        equals: "输入值必须等于 :value",
        ip: "请输入正确的ip地址格式,如:10.1.1.1",
        phone: "请输入正确的电话号码,如:18688888888",
        alpha: "输入值只能是a-z之间的小写字母",
        alpha_numeric: "输入值只能是a-z或0-9",
        alpha_dash: "输入值只能是a-z,0-9或下划线(_)和(-)",
        digit: "该项只能输入整数",
        numeric: "该项只能输入数字",
        matches: "请再次输入相同的值"
    };
    function Validator($form, options) {
        var validator = this;
        //public
        this.form = $form;
        this.options = $.extend({}, defaults, options);
        this.methods = $.extend({}, methods);
        this.fields = $form.find(allTypes);
        this.allowed_rules = [];
        this.errors = {};
        // 记录 form 原来的 novalidate 的值，因为初始化时需要设置 novalidate 的值，destroy 的时候需要恢复。
        validator._novalidate_old = validator.form.attr("novalidate");
        //禁用html5默认表单验证
        try {
            validator.form.attr("novalidate", "novalidate");
        } catch (e) {}
    }
    $.extend(Validator.prototype, {
        validate: function() {
            var validator = this;
            validator.fields.filter(type[0]).each(function() {
                var $field = $(this);
                $field.trigger([ namespace, "validate" ].join("."), [ validator ]);
                if (validator.errors[$field.data("id")]) {
                    validator.renderError.call(validator, $(this));
                } else {
                    validator.clearError.call(validator, $(this));
                }
            });
        },
        //scope:$field
        validateField: function(e, validator) {
            var $field = $(this), normalized_rules = {}, field_name = $field.data("id"), value = null;
            // 过滤disabled状态field的逻辑验证
            if ($field.is(":disabled")) {
                return;
            }
            //清除控件错误提示
            delete validator.errors[field_name];
            if ($field.is('[type="checkbox"], [type="radio"]')) {
                value = $field.is(":checked") ? $field.val() : null;
            } else {
                value = $field.val();
            }
            var rules = validator.options.rules[field_name], rulesResult = true;
            if (rules) {
                rules = rules.split("|");
                $.each(rules, function(rule_idx, rule_value) {
                    if ($.inArray(rule_value, validator.allowed_rules) !== -1) {
                        normalized_rules[rule_value] = null;
                    } else {
                        var rule = rule_value.split(":");
                        if (rule.length === 2) {
                            if ($.inArray(rule[0], validator.allowed_rules) !== -1) {
                                normalized_rules[rule[0]] = rule[1];
                            }
                        }
                    }
                });
                $.each(normalized_rules, function(fn_name, fn_args) {
                    if (validator.methods[fn_name].call(validator, field_name, value, fn_args, normalized_rules) !== true) {
                        validator.errors[field_name] = validator.format.call(validator, field_name, fn_name, fn_args);
                        rulesResult = false;
                        return false;
                    } else {
                        //清除控件错误提示
                        delete validator.errors[field_name];
                    }
                });
                if (rulesResult) {
                    var fieldSuccessFn = validator.options.success[field_name];
                    if (fieldSuccessFn) {
                        fieldSuccessFn.call(validator, $field);
                    }
                } else {
                    var fieldErrorFn = validator.options.fail[field_name];
                    if (fieldErrorFn) {
                        fieldErrorFn.call(validator, $field);
                    }
                }
            }
            $(validator).trigger([ namespace, "validate" ].join("."), [ $field, function(error) {
                validator.errors[$field.data("id")] = error;
            } ]);
        },
        format: function(field_name, rule, params) {
            var message;
            if (typeof this.options.messages[field_name] !== "undefined" && typeof this.options.messages[field_name][rule] !== "undefined") {
                message = this.options.messages[field_name][rule];
            } else {
                message = messages[rule];
            }
            if ($.type(params) !== "undefined" && params !== null) {
                if ($.type(params) === "boolean" || $.type(params) === "string" || $.type(params) === "number") {
                    params = {
                        value: params
                    };
                }
                $.each(params, function(k, v) {
                    message = message.replace(new RegExp(":" + k, "ig"), v);
                });
            }
            return message;
        },
        clearError: function($field) {
            $field = $($field);
            var $div = $field.closest("div.controls").children("div.help-block");
            if (this.options.wrapper !== null) {
                $field.closest(this.options.wrapper).removeClass("control-group-error");
            }
            $div.html("");
        },
        renderError: function($field) {
            $field = $($field);
            var $div = $field.closest("div.controls").children("div.help-block");
            if (this.options.wrapper !== null) {
                $field.closest(this.options.wrapper).addClass("control-group-error");
            }
            if ($div.length === 0) {
                $div = $("<div/>", {
                    "class": "help-block"
                });
                $field.closest("div.controls").children(":last").after($div);
            }
            $div.html(this.errors[$field.data("id")]);
        },
        clearErrors: function() {},
        renderErrors: function() {},
        extendRules: function(newMethods) {
            $.extend(this.methods, newMethods);
        },
        parseDom: function() {
            var validator = this;
            validator.fields.each(function() {
                var $field = $(this), id = "";
                if (!$field.data("id")) {
                    if ($field.attr("name")) id = $field.attr("name"); else id = $field.attr("id");
                    $field.attr("data-id", id);
                    $field.data("id", id);
                }
            });
        },
        launched: function() {
            var validator = this, checkOnSubmit = validator.options.onSubmit, checkOnBlur = validator.options.onBlur, checkOnChange = validator.options.onChange, checkOnKeyup = validator.options.onKeyup;
            validator.parseDom();
            $.each(validator.methods, function(k, v) {
                validator.allowed_rules.push(k);
            });
            validator.fields.each(function() {
                $(this).on([ namespace, "validate" ].join("."), validator.validateField);
            });
            if (checkOnBlur || checkOnChange || checkOnKeyup) {
                var events = [];
                if (checkOnBlur) events.push("blur");
                if (checkOnChange) events.push("change");
                if (checkOnKeyup) events.push("keyup");
                validator.fields.filter(type[0]).each(function() {
                    var $field = $(this);
                    $field.on([ events.join(" ") ].join("."), function() {
                        $field.trigger([ namespace, "validate" ].join("."), [ validator ]);
                        if (validator.errors[$field.data("id")]) {
                            validator.renderError.call(validator, this);
                        } else {
                            validator.clearError.call(validator, this);
                        }
                    });
                });
            }
            if (checkOnSubmit) {
                validator.on("afterValidate", function(e, $form) {
                    $form.find('button[type="submit"]').addClass("disabled");
                    $form.find('button[type="submit"]').attr("disabled", true);
                    $form.find('button[type="submit"]').text("正在提交，请稍候");
                });
                validator.form.on([ "submit" ].join("."), function(e) {
                    if (!$.isEmptyObject(validator.errors)) {
                        return false;
                    }
                    validator.validate();
                    if (!$.isEmptyObject(validator.errors)) {
                        return false;
                    } else {
                        $(validator).trigger([ namespace, "afterValidate" ].join("."), [ validator.form ]);
                    }
                });
            }
        },
        destory: function() {},
        on: function(eventName, callback) {
            var validator = this;
            switch (eventName) {
              case "validate":
                $(validator).on([ namespace, eventName ].join("."), function(e, $field, errors) {
                    if (!validator.errors[$field.data("id")]) {
                        var result = callback(e, $field, errors);
                        if (result) {
                            delete validator.errors[$field.data("id")];
                        }
                    }
                });
                break;

              case "afterValidate":
                $(validator).on([ namespace, eventName ].join("."), function(e, $form) {
                    callback(e, $form);
                });
                break;
            }
        }
    });
    module.exports = function(form, options) {
        if (typeof form === "string") {
            form = $(form);
        }
        return new Validator(form, options);
    };
    // 暴露出已有的验证方法和提示信息
    module.exports.methods = methods;
    module.exports.messages = messages;
});
