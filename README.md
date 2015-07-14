# FormValidator v0.0.1

---

A nice CMD module.

---

## Usage

It is very easy to use this module.

````html
<form id="">
    <input id="wtjeTxt" name="wtjeTxts" type="tel" placeholder="请输入认购金额" value="50000">
</form>
````

```javascript
seajs.use(["FormValidator"],function(FormValidator){
    "use strict";
    var objJJ = {
        init: function(){
            this.checkForm();
        },
        checkForm: function(){
            var minV = parseInt($("#minV").val()),
                maxV = parseInt($("#maxV").val());
            var validator = new FormValidator('#infoverifyForm',{
                inputs:["wtjeTxts"],
                rules: {
                    wtjeTxts: 'required|digit|maxvalue:'+maxV+'|minvalue:'+minV+'|currentyW'
                },
                messages: {
                    wtjeTxts:{
                        required:"【请输入认购金额】",
                        digit:"【有效金额为10000元的整数倍】",
                        maxvalue:"【最高认购金额为：" + maxV+"元】",
                        minvalue:"【最低认购金额为：" + minV+"元】",
                        currentyW:'【有效金额为10000元的整数倍】'
                    }
                },
                success: {
                    "wtjeTxts": function(){//此项验证通过后 do callback
                        $("#convertV").html(convertCurrency( parseInt($("#wtjeTxt").val()) ));
                    }
                },
                extendValidator: function(){//增加其它验证项
                    var flag = true;
                    if( $("#protoBox span").hasClass("hidden") ){
                        $.alert("请勾选并同意协议");
                        flag = false;
                        return flag;
                    }
                    var usableValue = Number($("#usableValue").val()),
                        wtje = parseInt($("#wtjeTxt").val());
                    if( $("#res1").val() != "4" && usableValue < wtje){
                        $.alert("可用余额不足，请先从银行转入！");
                        flag = false;
                        return flag;
                    }
                    if( $("#res1").val() === "4" && $("#bankCardAmount").val()==0){
                        $.alert("请先完成支付银行卡的绑定！");
                        flag = false;
                        return flag;
                    }
                    return flag;
                }
            });
            validator.extendRules({
                currentyW: function(fieldName, value){
                    var inputV = $.trim(value);
                    return inputV/10000 == parseInt(inputV/10000);
                }
            });
            validator.launched();
            $("#submit").on('click', function(ev){
                if( validator.result() ){
                    //验证通过 do codes
                }
            });
        }
    }
    objJJ.init();
});
```

## Api

####Here is some details.
* onSubmit为false时，表单type=submit无效
* 表单提交时，把按钮改为submit；如果需要用ajax提交，同时按钮非submit，绑定事件即可
* inputs 填写要验证的input框name值，优先了代码的遍历性能，更有针对性（必填）
* 参数extendValidator用于表单验证之外，其它场景的验证，运用于特殊场景，也是true or false，一般场景extendRules可以满足
* validator.result() 返回整体的验证结果,如果true，可以直接进行ajax或其它操作
