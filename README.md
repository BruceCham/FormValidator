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
	var validator = new FormValidator('#orderForm',{
		inputs:["transactionPassword"],
		rules: {
			transactionPassword: "required|maxlength:6|digit"
		},
		messages: {
			transactionPassword:{
				required: "交易密码不能为空",
				maxlength : "交易密码为6位数字密码",
				digit:"交易密码只能是数字"
			}
		}
	});
	//表单验证 初始化
	validator.launched();
});
```

## Api

Here is some details.
