
(function($){window.onLoadFLReCaptcha=function(){var reCaptchaFields=$('.fl-grecaptcha'),widgetID;if(reCaptchaFields.length>0){reCaptchaFields.each(function(i){var self=$(this),attrWidget=self.attr('data-widgetid'),newID=$(this).attr('id')+'-'+i;if((typeof attrWidget!==typeof undefined&&attrWidget!==false)){return;}
else{self.attr('id',newID);widgetID=grecaptcha.render(newID,{sitekey:self.data('sitekey'),theme:self.data('theme'),size:self.data('validate'),callback:function(response){if(response!=''){self.attr('data-fl-grecaptcha-response',response);if('invisible'==self.data('validate')){self.closest('.fl-contact-form').find('a.fl-button').trigger('click');}}}});self.attr('data-widgetid',widgetID);}});}};FLBuilderContactForm=function(settings)
{this.settings=settings;this.nodeClass='.fl-node-'+settings.id;this._init();};FLBuilderContactForm.prototype={settings:{},nodeClass:'',_init:function()
{$(this.nodeClass+' .fl-button').click($.proxy(this._submit,this));},_submit:function(e)
{var theForm=$(this.nodeClass+' .fl-contact-form'),submit=$(this.nodeClass+' .fl-button'),name=$(this.nodeClass+' .fl-name input'),email=$(this.nodeClass+' .fl-email input'),phone=$(this.nodeClass+' .fl-phone input'),subject=$(this.nodeClass+' .fl-subject input'),message=$(this.nodeClass+' .fl-message textarea'),termsCheckbox=$(this.nodeClass+' .fl-terms-checkbox input'),reCaptchaField=$(this.nodeClass+' .fl-grecaptcha'),reCaptchaValue=reCaptchaField.data('fl-grecaptcha-response'),ajaxData=null,ajaxurl=FLBuilderLayoutConfig.paths.wpAjaxUrl,email_regex=/\S+@\S+\.\S+/,isValid=true,postId=theForm.closest('.fl-builder-content').data('post-id'),layoutId=theForm.find('input[name=fl-layout-id]').val(),templateId=theForm.data('template-id'),templateNodeId=theForm.data('template-node-id'),nodeId=theForm.closest('.fl-module').data('node');e.preventDefault();if(submit.hasClass('fl-disabled')){return;}
if(name.length){if(name.val()===''){isValid=false;name.parent().addClass('fl-error');}
else if(name.parent().hasClass('fl-error')){name.parent().removeClass('fl-error');}}
if(email.length){if(email.val()===''||!email_regex.test(email.val())){isValid=false;email.parent().addClass('fl-error');}
else if(email.parent().hasClass('fl-error')){email.parent().removeClass('fl-error');}}
if(subject.length){if(subject.val()===''){isValid=false;subject.parent().addClass('fl-error');}
else if(subject.parent().hasClass('fl-error')){subject.parent().removeClass('fl-error');}}
if(phone.length){if(phone.val()===''){isValid=false;phone.parent().addClass('fl-error');}
else if(phone.parent().hasClass('fl-error')){phone.parent().removeClass('fl-error');}}
if(message.val()===''){isValid=false;message.parent().addClass('fl-error');}
else if(message.parent().hasClass('fl-error')){message.parent().removeClass('fl-error');}
if(termsCheckbox.length){if(!termsCheckbox.is(':checked')){isValid=false;termsCheckbox.closest('.fl-terms-checkbox').addClass('fl-error');}
else if(termsCheckbox.parent().hasClass('fl-error')){termsCheckbox.parent().removeClass('fl-error');}}
if(reCaptchaField.length>0&&isValid){if('undefined'===typeof reCaptchaValue||reCaptchaValue===false){if('normal'==reCaptchaField.data('validate')){reCaptchaField.parent().addClass('fl-error');}else if('invisible'==reCaptchaField.data('validate')){grecaptcha.execute(reCaptchaField.data('widgetid'));}
isValid=false;}else{reCaptchaField.parent().removeClass('fl-error');}}
if(!isValid){return false;}
else{submit.addClass('fl-disabled');ajaxData={action:'fl_builder_email',name:name.val(),subject:subject.val(),email:email.val(),phone:phone.val(),message:message.val(),terms_checked:termsCheckbox.is(':checked')?'1':'0',post_id:postId,layout_id:layoutId,template_id:templateId,template_node_id:templateNodeId,node_id:nodeId}
if(reCaptchaValue){ajaxData.recaptcha_response=reCaptchaValue;}
$.post(ajaxurl,ajaxData,$.proxy(this._submitComplete,this));}},_submitComplete:function(response)
{var urlField=$(this.nodeClass+' .fl-success-url'),noMessage=$(this.nodeClass+' .fl-success-none');if(typeof response.error!=='undefined'&&response.error===false){$(this.nodeClass+' .fl-send-error').fadeOut();if(urlField.length>0){window.location.href=urlField.val();}
else if(noMessage.length>0){noMessage.fadeIn();}
else{$(this.nodeClass+' .fl-contact-form').hide();$(this.nodeClass+' .fl-success-msg').fadeIn();}}
else{$(this.nodeClass+' .fl-button').removeClass('fl-disabled');if(typeof response.message!=='undefined'){$(this.nodeClass+' .fl-send-error').html(response.message);}
$(this.nodeClass+' .fl-send-error').fadeIn();return false;}}};})(jQuery);(function($){$(function(){new FLBuilderContactForm({id:'5f3b35e01c771'});});})(jQuery);