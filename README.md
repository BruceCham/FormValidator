# FormValidator

---

A nice CMD module.

---

## Usage

It is very easy to use this module.

````html
<div class="-FormValidator">
</div>
````

```javascript
seajs.use('FormValidator', function(FormValidator) {
	var validator = new FormValidator('#cashInForm',{
		onSubmit: false,
		inputs:["amount","password"],
		rules: {
			amount:"required|numeric:2|checkMinValue|checkMaxValue|maxvalue:99,999,999",
			password:"required|minlength:6|maxlength:6"
		},
		messages: {
			amount:{
				required: "请输入正确的数字",
				numeric: "小数点最多保留两位",
				checkMinValue: "转出金额不能超过"+usableValue,
				checkMaxValue: "转出金额不能小于500",
				maxvalue: "最大转出金额不能超过99,999,999"
			},
			password:{
				required: "请输入6位数字交易密码",
				minlength: "请输入大于6位数字交易密码",
				maxlength: "请输入小于6位数字交易密码"
			}
		},
		extendValidator: function(){
			var protoLine=$("#protoLine").attr('value');
			if(protoLine!='1'){
				$.alert("请先阅读并同意相关协议内容！");
				return false;
			}else{
				return true;
			}
		}
	});
	validator.extendRules({
		checkMinValue: function(fieldName, value){
			var idCard = $.trim(value);
			return idCardValidator.check18IdCard(idCard);
		},
		checkMaxValue: function(fieldName, value){
			var idCard = $.trim(value);
			return idCardValidator.checkAge(idCard, 10);
		}
	});
	//表单验证 初始化
	validator.launched();
});
```

## Api

Here is some details.
