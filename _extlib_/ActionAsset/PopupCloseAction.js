//==============================================================================
//	Define the Action.
//==============================================================================
//==============================================================================		
// Object : nexacro.PopupCloseAction		
// Group : Action		
//==============================================================================		
if (!nexacro.PopupCloseAction)		
{		
    nexacro.PopupCloseAction = function(id, parent)		
    {		
        nexacro.Action.call(this, id, parent);
		this.addEvent("canrun");
    };
        		
    nexacro.PopupCloseAction.prototype = nexacro._createPrototype(nexacro.Action, nexacro.PopupCloseAction);		
    nexacro.PopupCloseAction.prototype._type_name = "PopupCloseAction";
	
	//===============================================================		
    // nexacro.DsSetFirstCdAction : 변수선언 부분
    //===============================================================
	nexacro.PopupCloseAction.prototype._LOG_LEVEL		= -1;					// 디버깅 레벨. 설정된 레벨보다 낮은 디버깅 로그는 출력안됨.(-1 : 체크안함) [0:"debug", 1:"info", 2:"warn", 3:"error"]
	
	//===============================================================		
    // nexacro.PopupCloseAction : Create & Destroy		
    //===============================================================		
    nexacro.PopupCloseAction.prototype.destroy = function()		
	{	
		nexacro.Action.prototype.destroy.call(this);
	};	
		
    //===============================================================		
    // nexacro.PopupCloseAction : Method		
    //===============================================================		
    nexacro.PopupCloseAction.prototype.run = function()		
	{	
        var objForm;			
					
		//Import the object set as TargetView			
		var objView = this.getTargetView();	
		
		var sTarget = this.targetcomp;
		var sReturnType = this.returntype;
			
		var objDataset;
		var objComp;
		var oRet;
		var sRet = "";

		//If the canrun event return value is not false			
		if(this.on_fire_canrun()!=false)			
		{			
			//If the TargetView is set as View, not Form		
			if(objView)objForm = objView.form;		
			else objForm = this.parent;
			
			var sXML = "";
			
			if (sReturnType != "none")
			{
				var objDs;
				
				// Dataset 객체 찾기
				if (sTarget) {				// targetgrid 설정시 해당 그리드
					sTarget = sTarget.replace("@", "");
					objDs = objForm._findDataset(sTarget);
				} else {						// targetgrid 미설정시 View에 있는 Grid
					objDs = objView.getViewDataset();
				}
				
				if (this.gfnIsNull(objDs))
				{
					this.gfnLog("Dataset does not found.", "info");
					this.on_fire_onerror("error");
					return;
				}
				
				// 데이터 정보
				if (sReturnType == "currow")		// currow : 현재 위치한 행 반환
				{
					if (objDs.rowposition < 0) {
						this.gfnLog("No data is selected.", "info");
						this.on_fire_onerror(-100);
						return;
					}
					
					var objChkDs = objDs.createDataset("dataset", this.gfnGetDatasetCols(objDs),"currow==" + objDs.rowposition);
					
					if (!this.gfnIsNull(objChkDs))		sXML = objChkDs.saveXML();
					
					this.gfnLog(sXML);

					oRet = {
						  dataset	: sXML
					};
				}
				else if (sReturnType == "alldata")		// alldata : 데이터셋 전체 데이터
				{
					oRet = {
						  dataset	: objDs.saveXML("dataset","U")
					};
				}
				
				sRet = JSON.stringify(oRet);
			}
			
			
			// 팝업창 닫기
 			var objChildForm = objForm.getOwnerFrame().form;
			objChildForm.close(sRet);
		}		
	};
	
	nexacro.PopupCloseAction.prototype._targetcomp = null;				// 객체
	nexacro.PopupCloseAction.prototype.set_targetcomp = function (v)				
	{				
		// TODO : enter your code here.
		if (v instanceof nexacro.NormalDataset
			|| v instanceof nexacro.Grid) {
			if (this.targetcomp != v.name) {			
				this.targetcomp = v.name;
				this._targetcomp = v;
			}		
		} else {
			v = nexacro._toString(v);
			
			if (this.targetcomp != v) {			
				this.targetcomp = v;
				this._targetcomp = null;
			}
		}
	};
	
	nexacro.PopupCloseAction.prototype.set_returntype = function (v)				
	{
		var returntype_enum = ["none", "currow", "selectmulti", "alldata"];
		if (v && returntype_enum.indexOf(v) == -1) {
			return;
		}
		
		// TODO : enter your code here.			
		v = nexacro._toString(v);			
		if (this.returntype != v) {			
			this.returntype = v;		
		}			
	};
	
	//===============================================================		
    // nexacro.PopupCloseAction : Event		
    //===============================================================
	nexacro.PopupCloseAction.prototype.on_fire_canrun = function (userdata)
	{
		var event = this.canrun;
		
		//이벤트가 존재하고 사용자가 정의한 이벤트 핸들러 함수가 있을 경우
		if (event && event._has_handlers)
		{
		  //ActionRunEventInfo 생성
		  var evt = new nexacro.ActionRunEventInfo(this, "canrun", userdata); //TODO
		  
		  //true/false 리턴값을 받기 위해 _fireCheckEvent 함수 실행
		  return this.canrun._fireCheckEvent(this, evt);
		}
		return true;
	};
	
	nexacro.PopupCloseAction.prototype.on_fire_onsuccess = function (userdata)
	{
		var event = this.onsuccess;
		
		//이벤트가 존재하고 사용자가 정의한 이벤트 핸들러 함수가 있을 경우
		if (event && event._has_handlers)
		{
		  //ActionSuccessEventInfo 생성
		  var evt = new nexacro.ActionSuccessEventInfo(this, "onsuccess", userdata); //TODO
		  
		  //리턴값이 필요 없으므로 _fireEvent 함수 실행
		  event._fireEvent(this, evt);
		}
	};
	  
	nexacro.PopupCloseAction.prototype.on_fire_onerror = function (userdata)
	{
		var event = this.onerror;
		
		//이벤트가 존재하고 사용자가 정의한 이벤트 핸들러 함수가 있을 경우
		if (event && event._has_handlers)
		{
		  //ActionErrorEventInfo 생성
		  var evt = new nexacro.ActionErrorEventInfo(this, "onerror", userdata); //TODO
		  
		  //리턴값이 필요 없으므로 _fireEvent 함수 실행
		  event._fireEvent(this, evt);
		}
	};
	
	//===============================================================		
    // nexacro.PopupCloseAction : 공통함수(Util)
    //===============================================================
	nexacro.PopupCloseAction.prototype.gfnIsNull = function (Val)				
	{				
		if (new String(Val).valueOf() == "undefined") return true;			
		if (Val == null) return true;			
		if (("x" + Val == "xNaN") && (new String(Val.length).valueOf() == "undefined")) return true;			
		if (Val.length == 0) return true;			
					
		return false;			
	};
	
	nexacro.PopupCloseAction.prototype.gfnLog = function(sMsg, sType)
	{
		var arrLogLevel = ["debug","info","warn","error"];
	
		if(sType == undefined)	sType = "debug";
		var nLvl = arrLogLevel.indexOf(sType);
		
		if (nLvl < this._LOG_LEVEL)		return;
		
		if (system.navigatorname == "nexacro DesignMode"
			|| system.navigatorname == "nexacro") {
			if (sMsg instanceof Object) {
				for(var x in sMsg){
					trace("[" + sType + "] " + this.name + " > " + x + " : " + sMsg[x]);
				}
			} else {
				trace("[" + sType + "] " + this.name + " > " + sMsg);
			}
		} else {
			console.log("[" + sType + "] " + this.name + " > " + sMsg);
		}
	};
	
	//===============================================================		
    // nexacro.PopupCloseAction : 공통함수 전환부분
    //===============================================================
	/**
	 * dataset의 Column명을 배열로 반환
	 * @param {dataset} 대상 Dataset
	 * @return {Array} 컬럼명 배열
	 */
	nexacro.PopupCloseAction.prototype.gfnGetDatasetCols = function(ds)
	{
		var arrCol = new Array();
		var name;
		
		for(i = 0, len = ds.getColCount(); i < len; i++)
		{
			name = ds.getColID(i);
			
			arrCol.push(name);
		}
		
		return arrCol;
	};
}
