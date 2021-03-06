import Vue from 'vue'
import MessageBox from './messageBox'


export var messageBox = (function(){
    var defaults = {  //默认值
        title:'',
        content:'',
        cancel:'',
        ok:'',
        handleCancel:null,
        handleOk:null
    };
    
    return function(opts){
        for(var attr in opts){
            defaults[attr] = opts[attr]
        }
        var Mycomponent = Vue.extend(MessageBox)
        var vm = new Mycomponent({
            el:document.createElement('div'),
            data:{
                title:defaults.title,
                content:defaults.content,
                cancel:defaults.cancel,
                ok:defaults.ok
            },
            methods:{
                handleCancel(){
                    defaults.handleCancel && defaults.handleCancel.call(this)
                    document.body.removeChild(vm.$el)
                },
                handleOk(){
                    defaults.handleOk && defaults.handleOk.call(this)
                    document.body.removeChild(vm.$el)

                }
            }
        })
        document.body.appendChild(vm.$el)

    };
    
})();