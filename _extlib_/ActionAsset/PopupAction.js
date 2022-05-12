//==============================================================================
//	Define the Action.
//==============================================================================
//==============================================================================
// Object : nexacro.PopupAction
// Group : Action
//==============================================================================
if (!nexacro.PopupAction)
{
	nexacro.PopupAction = function(id, parent)
	{
		nexacro.Action.call(this, id, parent);
		this.addEvent("canrun");
	};
	
	nexacro.PopupAction.prototype = nexacro._createPrototype(nexacro.Action, nexacro.PopupAction);
	nexacro.PopupAction.prototype._type_name = "PopupAction";
	
	//===============================================================		
    // nexacro.DsSetFirstCdAction : 변수선언 부분
    //===============================================================
	nexacro.PopupAction.prototype._POPUP_CALLBACK = "fnPopupActionCallback";		// callback함수명
	
	//===============================================================
	// nexacro.PopupAction : Create & Destroy
	//===============================================================
	nexacro.PopupAction.prototype.destroy = function()
	{
		nexacro.Action.prototype.destroy.call(this);
	};
	
	//===============================================================
	// nexacro.PopupAction : Method
	//===============================================================
	nexacro.PopupAction.prototype.run = function()
	{
		//TODO
		var objForm;
		
		//TargetView로 설정된 오브젝트 가져오기
		var objView = this.getTargetView();
		
		//팝업 호출시 사용할 Param정보 가져오기
		var sPopupId = this.popupid;
		var sFormUrl = this.formurl;
		var sTitle = this.title;
		var sPopupStyle = this.popupstyle;
		var nLeft = this.popupleft;
		var nTop = this.popuptop;
		var nWidth = this.popupwidth;
		var nHeight = this.popupheight;
		var objArgs = this._args;
		
		//canrun 이벤트의 리턴값이 false가 아닐경우
		if(this.on_fire_canrun("userdata")!=false)
		{
			//TargetView가 Form이 아닌 View로 설정되었을 경우
			if(objView)objForm = objView.form;
			else objForm = this.parent;
			
			//Action Scope에 있는 CallBack 함수가 호출되도록 설정
			objForm.fnPopupActionCallback = this.fnPopupActionCallback;
			objForm.targetPopupAction = this;
			
			//Modeless 팝업 호출
			if(sPopupStyle=="modeless")
			{
				this.gfnModeless(sPopupId, sTitle, sFormUrl, nLeft, nTop, nWidth, nHeight, objArgs, objForm, this._POPUP_CALLBACK);
			}
			//Modal 팝업 호출
			else
			{
				this.gfnShowModal(sPopupId, sTitle, sFormUrl, nLeft, nTop, nWidth, nHeight, objArgs, objForm, this._POPUP_CALLBACK);
			}
		}
	};
	
	nexacro.PopupAction.prototype.formurl = "";
	nexacro.PopupAction.prototype.set_formurl = function (v)
	{
		// TODO : enter your code here.
		v = nexacro._toString(v);
		if (this.formurl != v) {
			this.formurl = v;
		}
	};
	
	nexacro.PopupAction.prototype.popupid = "";
	nexacro.PopupAction.prototype.set_popupid = function (v)
	{
		// TODO : enter your code here.
		v = nexacro._toString(v);
		if (this.popupid != v) {
			this.popupid = v;
		}
	};
	
	nexacro.PopupAction.prototype.title = "";
	nexacro.PopupAction.prototype.set_title = function (v)
	{
		// TODO : enter your code here.
		v = nexacro._toString(v);
		if (this.title != v) {
			this.title = v;
		}
	};
	
	nexacro.PopupAction.prototype.popupstyle = "";
	nexacro.PopupAction.prototype.set_popupstyle = function (v)
	{
		// TODO : enter your code here.
		v = nexacro._toString(v);
		if (this.popupstyle != v) {
			this.popupstyle = v;
		}
	};
	
	nexacro.PopupAction.prototype.popupleft = "";
	nexacro.PopupAction.prototype.set_popupleft = function (v)
	{
		// TODO : enter your code here.
		v = nexacro._parseInt(v);
		if (this.popupleft != v) {
			this.popupleft = v;
		}
	};
	
	nexacro.PopupAction.prototype.popuptop = "";
	nexacro.PopupAction.prototype.set_popuptop = function (v)
	{
		// TODO : enter your code here.
		v = nexacro._parseInt(v);
		if (this.popuptop != v) {
			this.popuptop = v;
		}
	};
	
	nexacro.PopupAction.prototype.popupwidth = "";
	nexacro.PopupAction.prototype.set_popupwidth = function (v)
	{
		// TODO : enter your code here.
		v = nexacro._parseInt(v);
		if (this.popupwidth != v) {
			this.popupwidth = v;
		}
	};
	
	nexacro.PopupAction.prototype.popupheight = "";
	nexacro.PopupAction.prototype.set_popupheight = function (v)
	{
		// TODO : enter your code here.
		v = nexacro._parseInt(v);
		if (this.popupheight != v) {
			this.popupheight = v;
		}
	};
		
	nexacro.PopupAction.prototype.args = "";
	nexacro.PopupAction.prototype._args;
	nexacro.PopupAction.prototype.set_args = function (v)
	{
		// TODO : enter your code here.
		v = nexacro._toString(v);
		if (this.args != v) {
			this.args = v;
			
			if(this.gfnIsNull(this.args)==false)
			{
				this._args = JSON.parse(this.args);
			}else
			{
				this._args = null;
			}
		}
	};
	
	//===============================================================		
    // nexacro.PopupAction : Event		
    //===============================================================
	nexacro.PopupAction.prototype.on_fire_canrun = function (userdata)
	{
		if (this.canrun && this.canrun._has_handlers)
		{
			var evt = new nexacro.ActionRunEventInfo(this, "canrun", userdata); //TODO
			return this.canrun._fireCheckEvent(this, evt);
		}
		return true;
		
	};
	
	nexacro.PopupAction.prototype.on_fire_onsuccess = function (userdata)
	{
		var event = this.onsuccess;
		if (event && event._has_handlers)
		{
			var evt = new nexacro.ActionSuccessEventInfo(this, "onsuccess", userdata); //TODO
			event._fireEvent(this, evt);
		}
	};
	
	nexacro.PopupAction.prototype.on_fire_onerror = function (userdata)
	{
		var event = this.onerror;
		if (event && event._has_handlers)
		{
			var evt = new nexacro.ActionErrorEventInfo(this, "onerror", userdata); //TODO
			event._fireEvent(this, evt);
		}
	};
	
	//===============================================================		
    // nexacro.PopupAction : 공통함수(Util)
    //===============================================================
	nexacro.PopupAction.prototype.gfnIsNull = function (Val)
	{
		if (new String(Val).valueOf() == "undefined") return true;
		if (Val == null) return true;
		if (("x" + Val == "xNaN") && (new String(Val.length).valueOf() == "undefined")) return true;
		if (Val.length == 0) return true;
		
		return false;
	};
	
	//===============================================================		
    // nexacro.PopupAction : 공통함수 전환부분
    //===============================================================
	nexacro.PopupAction.prototype.gfnShowModal = function (sPopupId, sTitle, sFormUrl, nLeft, nTop, nWidth, nHeight, objArgs, objForm, sCallback)
	{
		//Modal 팝업으로 사용할 ChildFrame 생성
		var objChildFrame = new ChildFrame();
		
		//부모 Frame 정보 가져오기
		var objOwnerFrame = objForm.getOwnerFrame();
		
		var sOpenAlignType = "";
		
		//
		if (this.gfnIsNull(nLeft))nLeft = 0;
		
		if (this.gfnIsNull(nTop))nTop = 0;
		
		if (this.gfnIsNull(nWidth)) nWidth = 400;
		
		if (this.gfnIsNull(nHeight)) nHeight = 300;
		
		if(nLeft==-1)sOpenAlignType = "center ";
		
		if(nTop==-1)sOpenAlignType += "middle";
		
		objChildFrame.init(sPopupId, nLeft, nTop, nWidth, nHeight, null, null, sFormUrl);
		objChildFrame.set_openalign(sOpenAlignType);
				
		objChildFrame.showModal(objOwnerFrame, objArgs, objForm, sCallback, true);
	};
	
	nexacro.PopupAction.prototype.gfnModeless = function(sPopupId, sTitle, sFormUrl, nLeft, nTop, nWidth, nHeight, objArgs, objForm, sCallback)
	{
		var objOwnerFrame = objForm.getOwnerFrame();
		
		if (this.gfnIsNull(nLeft))nLeft = 0;
		
		if (this.gfnIsNull(nTop))nTop = 0;
		
		if (this.gfnIsNull(nWidth)||nWidth==-1) nWidth = 400;
		
		if (this.gfnIsNull(nHeight)||nHeight==-1) nHeight = 300;
		
		if(nLeft==-1)nLeft = system.clientToScreenX(objForm, 0) + (objForm.getOffsetWidth() / 2) - (nWidth/2);
		
		if(nTop==-1)nTop = system.clientToScreenY(objForm, 0) + (objForm.getOffsetHeight() / 2) - (nHeight/2);
		
		var sOpt = "showtitlebar=true";
		
		nexacro.open(sPopupId, sFormUrl, objOwnerFrame, objArgs, sOpt, nLeft, nTop, nWidth, nHeight, objForm);
	};
	
	nexacro.PopupAction.prototype.fnPopupActionCallback = function(sId, sParam)
	{
		this.targetPopupAction.on_fire_onsuccess(sParam);
	};
}