# FormValidator v0.0.1

---

最初版本

---

## Usage

It is very easy to use this module.

````html
<form id="infoverifyForm">
    <div class="control-group">
		<label class="control-label" for="mobile">身份证号码：</label>
		<div class="controls">
             <div class="control">
                 <input type="hidden" name="mobile" value="${mobile}"/>
                 <input type="hidden" name="userName" value="${userName}"/>
                 <input type="text" name="IdentityNumber" id="idNumber"/>
             </div>
            <div class="help-block"><span>${errors!''}</span></div>
		</div>
	</div>
</form>
````

```javascript
var validator = new FormValidator('#infoverifyForm',{
            rules: {
                name: "required",
                IdentityNumber:"required|check18IdCard|checkAge10"
            },
            messages: {
            	IdentityNumber:{
                    required: "请输入您的身份证号",
                    check18IdCard: "请输入正确的18位身份证号",
                    checkAge10: "用户必须是10岁以上"
                }
            },
            success: {
            },
            fail: {
            }
        });
        validator.extendRules({
            check18IdCard: function(fieldName, value){
                var idCard = $.trim(value);
                return idCardValidator.check18IdCard(idCard);
            },
            checkAge10: function(fieldName, value){
                var idCard = $.trim(value);
                return idCardValidator.checkAge(idCard, 10);
            }
        });
        validator.launched();
```
