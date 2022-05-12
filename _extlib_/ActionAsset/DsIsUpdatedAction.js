//==============================================================================
//	Define the Action.
//==============================================================================
//==============================================================================		
// Object : nexacro.DsIsUpdatedAction		
// Group : Action		
//==============================================================================		
if (!nexacro.DsIsUpdatedAction)		
{		
    nexacro.DsIsUpdatedAction = function(id, parent)		
    {		
        nexacro.Action.call(this, id, parent);
		this.addEvent("canrun");
    };		
        		
    nexacro.DsIsUpdatedAction.prototype = nexacro._createPrototype(nexacro.Action, nexacro.DsIsUpdatedAction);		
    nexacro.DsIsUpdatedAction.prototype._type_name = "DsIsUpdatedAction";		
	
	//===============================================================		
    // nexacro.DsIsUpdatedAction : Create & Destroy		
    //===============================================================		
    nexacro.DsIsUpdatedAction.prototype.destroy = function()		
	{	
		nexacro.Action.prototype.destroy.call(this);
	};	
		
    //===============================================================		
    // nexacro.DsIsUpdatedAction : Method		
    //===============================================================		
    nexacro.DsIsUpdatedAction.prototype.run = function()		
	{	
		var objForm;			
					
		//Import the object set as TargetView			
		var objView = this.getTargetView();	
		
		var sTarget = this.targetdataset;
		var bCheckFilter = this.checkfilter
			
		var objDataset;
		var objComp;

		//If the canrun event return value is not false			
		if(this.on_fire_canrun()!=false)			
		{			
			//If the TargetView is set as View, not Form		
			if(objView)objForm = objView.form;		
			else objForm = this.parent;
			
			var objDs;
			
			// Dataset 객체 찾기
			if (sTarget) {				// targetgrid 설정시 해당 그리드
				sTarget = sTarget.replace("@", "");
				objDs = objForm._findDataset(sTarget);
			} else {						// targetgrid 미설정시 View에 있는 Grid
				objDs = objView.getViewDataset();
			}
			
			if (objDs == undefined)
			{
				trace("[Info] Dataset does not found.");
				this.on_fire_onerror("error");
				return;
			}
			
 			// Call Function
 			var rtn = this.gfnDsIsUpdated(objDs, bCheckFilter);
			
			if(rtn==true)
			{
				this.on_fire_onsuccess(true);
			}else
			{
				this.on_fire_onerror(false);
			}
		}	
	};	
	
	nexacro.DsIsUpdatedAction.prototype._targetdataset = "";
	nexacro.DsIsUpdatedAction.prototype.set_targetdataset = function (v)				
	{				
		// TODO : enter your code here.
		if (v instanceof nexacro.NormalDataset) {
			if (this.targetdataset != v) {			
				this.targetdataset = v;
				this._targetdataset = v.name;
			}		
		} else {
			v = nexacro._toString(v);
			
			var objForm = this.parent;
			var objDs = objForm._findDataset(v);
			if (this._targetdataset != v && objDs != undefined) {
				this._targetdataset = v;
				this.targetdataset = objDs;
			}
		}
	};
	
	nexacro.DsIsUpdatedAction.prototype.set_checkfilter = function (v)
	{
		// TODO : enter your code here.
		v = nexacro._toBoolean(v);
		
		if(this.checkfilter != v)
		{
			this.checkfilter = v;
		}
	};
	
	//===============================================================		
    // nexacro.DsIsUpdatedAction : Event		
    //===============================================================
	nexacro.DsIsUpdatedAction.prototype.on_fire_canrun = function (userdata)
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
	
	nexacro.DsIsUpdatedAction.prototype.on_fire_onsuccess = function (userdata)
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
	  
	nexacro.DsIsUpdatedAction.prototype.on_fire_onerror = function (userdata)
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
    // nexacro.DsIsUpdatedAction : 공통함수(Util)
    //===============================================================
	nexacro.DsIsUpdatedAction.prototype.gfnIsNull = function (Val)				
	{				
		if (new String(Val).valueOf() == "undefined") return true;			
		if (Val == null) return true;			
		if (("x" + Val == "xNaN") && (new String(Val.length).valueOf() == "undefined")) return true;			
		if (Val.length == 0) return true;			
					
		return false;			
	};
	
	//===============================================================		
    // nexacro.DsIsUpdatedAction : 공통함수 전환부분
    //===============================================================
	 /**
	 * @class dataSet의 Row 중에서 변경된 내용이 있는지 여부
	 * @param {Object} objDs - 확인 대상 Dataset
	 * @param {boolean} bFilterCheck - 필터된 데이터 체크여부(기본값:false)
	 * @return {boolean} 변경여부
	 */   
	nexacro.DsIsUpdatedAction.prototype.gfnDsIsUpdated = function (objDs, bFilterCheck)
	{
		if (this.gfnIsNull(bFilterCheck))		bFilterCheck = false;
		
		if (objDs.getDeletedRowCount() > 0) {
			return true;
		}
		
		var nRowType;
		var nRowCnt = objDs.getRowCount();
		if (bFilterCheck)	nRowCnt = objDs.getRowCountNF();
		
		for (var i = 0 ; i < nRowCnt ; i++) {
			nRowType = this.gfnGetRowType(objDs, i, bFilterCheck);
			
			if (nRowType == Dataset.ROWTYPE_INSERT || nRowType == Dataset.ROWTYPE_UPDATE || nRowType == Dataset.ROWTYPE_DELETE) {
				return true;
			}
		}

		return false;
	};
	
	 /**
	 * @class 해당 Row의 RowType을 반환
	 * @param {Object} objDs - 확인 대상 Dataset
	 * @param {Number} nRow - row값
	 * @param {boolean} bFilterCheck - 필터된 데이터 체크여부(기본값:false)
	 * @return {Number} RowType
	 */  
	nexacro.DsIsUpdatedAction.prototype.gfnGetRowType = function (objDs, nRow, bFilterCheck)
	{
		var nRowType;
		var sStatus;
		
		if (bFilterCheck) {
			nRowType = objDs.getRowTypeNF(nRow);
		} else {
			nRowType = objDs.getRowType(nRow);
		}
		
		return nRowType;
	};
}
