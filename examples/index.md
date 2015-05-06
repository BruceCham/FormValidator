# Demo

---

## Normal usage
````style
.control-group {
    padding: .75rem;
    font-size: .875rem;
    border-bottom: 1px solid #C8C8C8;
    background: #fff
}

.control-group .controls input {
    margin-top: .3125rem;
    width: 94%;
    border: 1px solid #C8C8C8;
    padding: .625rem 3%;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    font-size: .875rem
}

.control-group .controls .help-block {
    color: #F74D4F;
    font-size: .75rem;
    margin-top: .3125rem
}
````html
    <form id="infoverifyForm" action="ui-form_submit" method="get">
        <div class="control-group">
            <label class="control-label">转出金额</label>
            <div class="controls">
                <span>
                    <input name="numberCount" id="numberText" type="number" placeholder="≥500元">    
                </span>
                <div class="help-block"></div>
            </div>
        </div>

        <div class="control-group">
            <label class="control-label">姓名</label>
            <div class="controls">
                <span>
                    <input name="username" type="text" placeholder="请输入姓名">    
                </span>
                <div class="help-block"></div>
            </div>
        </div>

        <div class="control-group">
            <label class="control-label">购买产品：</label>
            <span class="controls">
                基金一号
            </span>
        </div>

        <div class="control-group">
            <label class="control-label">付出钱数：</label>
            <div class="controls fr">
                <span class="red padSpan">1234.00</span>元
            </div>
        </div>

        <div class="ui-btn">
            <button type="submit" class="btn">点击提交</button>
        </div>
    </form>

````javascript
seajs.use('FormValidator', function(FormValidator) {
	    var validator = new FormValidator('#infoverifyForm',{
            rules: {
                username: "required|maxlength:3",
                numberCount:"required|digit|maxvalue:9999.99|minvalue:100"
            },
            messages: {
                username:{
                    required: "名字不能为空",
                    maxlength : "字符最长为3位"
                },
                numberCount:{
                    required: "请输入正确的数字",
                    digit:"只能输入数字",
                    numeric: "请输入数字(小数点后最多两位)",
                    maxvalue: "转出金额不能超过9999.99",
                    minvalue: "转出金额不能小于100"
                }
            },
            success: {
            },
            fail: {
            }
        });

        validator.launched();
});
````
