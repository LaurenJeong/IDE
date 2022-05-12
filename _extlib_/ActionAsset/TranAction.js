//==============================================================================
//	Define the Action.
//==============================================================================
//==============================================================================
// Object : nexacro.TranAction
// Group : Action
//==============================================================================
if (!nexacro.TranAction)
{
	nexacro.TranAction = function(id, parent)
	{
		nexacro.Action.call(this, id, parent);
		this.addEvent("canrun");
	};
	
	nexacro.TranAction.prototype = nexacro._createPrototype(nexacro.Action, nexacro.TranAction);
	nexacro.TranAction.prototype._type_name = "TranAction";
	
	//===============================================================
	// nexacro.TranAction : Create & Destroy
	//===============================================================
	nexacro.TranAction.prototype.destroy = function()
	{
		nexacro.Action.prototype.destroy.call(this);
	};
	
	//===============================================================
	// nexacro.TranAction : Method
	//===============================================================
	nexacro.TranAction.prototype.run = function()
	{
		//TODO
		//canrun 이벤트의 리턴값이 false가 아닐경우
		if(this.on_fire_canrun("userdata")!=false)
		{
			var objForm;
			
			//TargetView로 설정된 오브젝트 가져오기
			var objView = this.getTargetView();
					
			//Transaction에서 사용할 Param정보 가져오기
			var sId = this.serviceid;
			var sUrl = this.serviceurl;
			var sInDs = this.inputdatasets;
			var sOutDs = this.outputdatasets;
			var sArgs = this.args;
			var sAsync = this.async;
			var sCallBack = "fnTranActionCallback";
			
			//TargetView가 Form이 아닌 View로 설정되었을 경우
			if(objView instanceof View)objForm = objView.form;
			else objForm = this.parent;
			
			//Action Scope에 있는 CallBack 함수가 호출되도록 설정
			objForm.fnTranActionCallback = this.fnTranActionCallback;
			objForm.targetTranAction = this;
			
			//Transaction 호출
			objForm.transaction(sId, sUrl, sInDs, sOutDs, sArgs, sCallBack, sAsync);
		}
	};
	
	nexacro.TranAction.prototype.fnTranActionCallback = function(sId, nErrorCd, sErrorMsg)
	{
		//ErrorCode가 -1보다 클 경우 onsuccess 이벤트 호출
		if(nErrorCd>-1)
		{
			this.targetTranAction.on_fire_onsuccess(sId, nErrorCd, sErrorMsg);
		}
		//ErrorCode가 0보다 작을 경우 onerror 이벤트 호출
		else
		{
			this.targetTranAction.on_fire_onerror(sId, nErrorCd, sErrorMsg);
		}
	};
	
	nexacro.TranAction.prototype.serviceid = "";
	nexacro.TranAction.prototype.set_serviceid = function (v)
	{
		// TODO : enter your code here.
		v = nexacro._toString(v);
		if (this.serviceid != v) {
			this.serviceid = v;
		}
	};
	
	nexacro.TranAction.prototype.serviceurl = "";
	nexacro.TranAction.prototype.set_serviceurl = function (v)
	{
		// TODO : enter your code here.
		v = nexacro._toString(v);
		if (this.serviceurl != v) {
			this.serviceurl = v;
		}
	};
	
	nexacro.TranAction.prototype.inputdatasets = "";
	nexacro.TranAction.prototype.set_inputdatasets = function (v)
	{
		// TODO : enter your code here.
		v = nexacro._toString(v);
		if (this.inputdatasets != v) {
			this.inputdatasets = v;
		}
	};
	
	nexacro.TranAction.prototype.outputdatasets = "";
	nexacro.TranAction.prototype.set_outputdatasets = function (v)
	{
		// TODO : enter your code here.
		v = nexacro._toString(v);
		if (this.outputdatasets != v) {
			this.outputdatasets = v;
		}
	};
	
	nexacro.TranAction.prototype.args = "";
	nexacro.TranAction.prototype.set_args = function (v)
	{
		// TODO : enter your code here.
		v = nexacro._toString(v);
		
		if (this.args != v) {
			this.args = v;
		}
	};
	
	nexacro.TranAction.prototype.async = "";
	nexacro.TranAction.prototype.set_async = function (v)
	{
		// TODO : enter your code here.
		v = nexacro._toBoolean(v);
		
		if(this.async != v)
		{
			this.async = v;
		}
	};
	
	nexacro.TranAction.prototype.targetview = "";
	nexacro.TranAction.prototype.set_targetview = function (v)
	{
		// TODO : enter your code here.
		this.targetview = v;
	};	
	
	nexacro.TranAction.prototype.on_fire_canrun = function (userdata)
	{
		var event = this.canrun;
		if (event && event._has_handlers)
		{
			var evt = new nexacro.ActionRunEventInfo(this, "canrun", userdata); //TODO
			return event._fireCheckEvent(this, evt);
		}
		return true;	
	};
	
	nexacro.TranAction.prototype.on_fire_onsuccess = function (sId, nErrorCd, sErrorMsg)
	{
		var event = this.onsuccess;
		if (event && event._has_handlers)
		{
			var evt = new nexacro.TranActionSuccessEventInfo(this, "onsuccess", sId, nErrorCd, sErrorMsg); //TODO
			event._fireEvent(this, evt);
		}
	};
	
	nexacro.TranAction.prototype.on_fire_onerror = function (sId, nErrorCd, nErrorMsg)
	{
		var event = this.onerror;
		if (event && event._has_handlers)
		{
			var evt = new nexacro.TranActionErrorEventInfo(this, "onerror", sId, nErrorCd, sErrorMsg); //TODO
			event._fireEvent(this, evt);
		}
	};
}