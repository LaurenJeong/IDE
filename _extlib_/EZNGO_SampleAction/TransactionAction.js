//==============================================================================
//	Define the Action.
//==============================================================================
//==============================================================================
// Object : nexacro.TransactionAction
// Group : Action
//==============================================================================
if (!nexacro.TransactionAction)
{
	nexacro.TransactionAction = function(id, parent)
	{
		nexacro.Action.call(this, id, parent);
		this.addEvent("canrun");
	};
	
	nexacro.TransactionAction.prototype = nexacro._createPrototype(nexacro.Action, nexacro.TransactionAction);
	nexacro.TransactionAction.prototype._type_name = "TransactionAction";
	
	//===============================================================
	// nexacro.TransactionAction : Create & Destroy
	//===============================================================
	nexacro.TransactionAction.prototype.destroy = function()
	{
		nexacro.Action.prototype.destroy.call(this);
	};
	
	//===============================================================
	// nexacro.TransactionAction : Method
	//===============================================================
	nexacro.TransactionAction.prototype.run = function()
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
			var sCallBack = "fnTransactionActionCallback";
			
			//TargetView가 Form이 아닌 View로 설정되었을 경우
			if(objView instanceof View)objForm = objView.form;
			else objForm = this.parent;
			
			//Action Scope에 있는 CallBack 함수가 호출되도록 설정
			objForm.fnTransactionActionCallback = this.fnTransactionActionCallback;
			objForm.targetTransactionAction = this;
			
			//Transaction 호출
			objForm.transaction(sId, sUrl, sInDs, sOutDs, sArgs, sCallBack, sAsync);
		}
	};
	
	nexacro.TransactionAction.prototype.fnTransactionActionCallback = function(sId, nErrorCd, sErrorMsg)
	{
		//ErrorCode가 -1보다 클 경우 onsuccess 이벤트 호출
		if(nErrorCd>-1)
		{
			this.targetTransactionAction.on_fire_onsuccess(sId, nErrorCd, sErrorMsg);
		}
		//ErrorCode가 0보다 작을 경우 onerror 이벤트 호출
		else
		{
			this.targetTransactionAction.on_fire_onerror(sId, nErrorCd, sErrorMsg);
		}
	};
	
	nexacro.TransactionAction.prototype.serviceid = "";
	nexacro.TransactionAction.prototype.set_serviceid = function (v)
	{
		// TODO : enter your code here.
		v = nexacro._toString(v);
		if (this.serviceid != v) {
			this.serviceid = v;
		}
	};
	
	nexacro.TransactionAction.prototype.serviceurl = "";
	nexacro.TransactionAction.prototype.set_serviceurl = function (v)
	{
		// TODO : enter your code here.
		v = nexacro._toString(v);
		if (this.serviceurl != v) {
			this.serviceurl = v;
		}
	};
	
	nexacro.TransactionAction.prototype.inputdatasets = "";
	nexacro.TransactionAction.prototype.set_inputdatasets = function (v)
	{
		// TODO : enter your code here.
		v = nexacro._toString(v);
		if (this.inputdatasets != v) {
			this.inputdatasets = v;
		}
	};
	
	nexacro.TransactionAction.prototype.outputdatasets = "";
	nexacro.TransactionAction.prototype.set_outputdatasets = function (v)
	{
		// TODO : enter your code here.
		v = nexacro._toString(v);
		if (this.outputdatasets != v) {
			this.outputdatasets = v;
		}
	};
	
	nexacro.TransactionAction.prototype.args = "";
	nexacro.TransactionAction.prototype.set_args = function (v)
	{
		// TODO : enter your code here.
		v = nexacro._toString(v);
		
		if (this.args != v) {
			this.args = v;
		}
	};
	
	nexacro.TransactionAction.prototype.async = "";
	nexacro.TransactionAction.prototype.set_async = function (v)
	{
		// TODO : enter your code here.
		v = nexacro._toBoolean(v);
		
		if(this.async != v)
		{
			this.async = v;
		}
	};
	
	nexacro.TransactionAction.prototype.targetview = "";
	nexacro.TransactionAction.prototype.set_targetview = function (v)
	{
		// TODO : enter your code here.
		this.targetview = v;
	};	
	
	nexacro.TransactionAction.prototype.on_fire_canrun = function (userdata)
	{
		var event = this.canrun;
		if (event && event._has_handlers)
		{
			var evt = new nexacro.ActionRunEventInfo(this, "canrun", userdata); //TODO
			return event._fireCheckEvent(this, evt);
		}
		return true;	
	};
	
	nexacro.TransactionAction.prototype.on_fire_onsuccess = function (sId, nErrorCd, sErrorMsg)
	{
		var event = this.onsuccess;
		if (event && event._has_handlers)
		{
			var evt = new nexacro.TransactionActionSuccessEventInfo(this, "onsuccess", sId, nErrorCd, sErrorMsg); //TODO
			event._fireEvent(this, evt);
		}
	};
	
	nexacro.TransactionAction.prototype.on_fire_onerror = function (sId, nErrorCd, nErrorMsg)
	{
		var event = this.onerror;
		if (event && event._has_handlers)
		{
			var evt = new nexacro.TransactionActionErrorEventInfo(this, "onerror", sId, nErrorCd, sErrorMsg); //TODO
			event._fireEvent(this, evt);
		}
	};
}
