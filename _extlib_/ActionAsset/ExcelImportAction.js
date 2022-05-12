//==============================================================================
//	Define the Action.
//==============================================================================
//==============================================================================		
// Object : nexacro.ExcelImportAction		
// Group : Action		
//==============================================================================		
if (!nexacro.ExcelImportAction)		
{		
    nexacro.ExcelImportAction = function(id, parent)		
    {		
        nexacro.Action.call(this, id, parent);
		this.addEvent("canrun");
    };		
        		
    nexacro.ExcelImportAction.prototype = nexacro._createPrototype(nexacro.Action, nexacro.ExcelImportAction);		
    nexacro.ExcelImportAction.prototype._type_name = "ExcelImportAction";	
	
	//===============================================================		
    // nexacro.ExcelImportAction : 변수선언 부분
    //===============================================================
	nexacro.ExcelImportAction.prototype.COM_EXCEL_URL = "svc::XExportImport";				//"svc::XExportImport.do";
	
	//===============================================================		
    // nexacro.ExcelImportAction : Create & Destroy		
    //===============================================================		
    nexacro.ExcelImportAction.prototype.destroy = function()		
	{	
		nexacro.Action.prototype.destroy.call(this);
	};	
		
    //===============================================================		
    // nexacro.ExcelImportAction : Method		
    //===============================================================		
    nexacro.ExcelImportAction.prototype.run = function()		
	{	
        //TODO
		var objForm;			
					
		//Import the object set as TargetView			
		var objView = this.getTargetView();	
		
		var sTarget = this.targetdataset;
			
		var sSheetName = this.sheetname;			
		var sStartCell = this.startcell;			
		var sImportType = this.importtype;
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
				objDs = new nexacro.NormalDataset("importdataset", objForm);
				trace("Create Dataset : " + objDs.name);
			}
			
 			// Call Import
 			this.gfnExcelImport(objForm, objDs, sSheetName, sStartCell, sImportType);
		}		
	};	
	
	nexacro.ExcelImportAction.prototype._targetdataset = "";
	nexacro.ExcelImportAction.prototype.set_targetdataset = function (v)				
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
				
	nexacro.ExcelImportAction.prototype.set_sheetname = function (v)				
	{				
		// TODO : enter your code here.			
		v = nexacro._toString(v);			
		if (this.sheetname != v) {			
			this.sheetname = v;		
		}			
	};
				
	nexacro.ExcelImportAction.prototype.set_startcell = function (v)				
	{				
		// TODO : enter your code here.			
		v = nexacro._toString(v);			
		if (this.startcell != v) {			
			this.startcell = v;		
		}			
	};
				
	nexacro.ExcelImportAction.prototype.set_importtype = function (v)				
	{
		var importtype_enum = ["excel", "excel2007", "hancell2014", "csv"];
		if (v && importtype_enum.indexOf(v) == -1) {
			return;
		}
		
		// TODO : enter your code here.			
		v = nexacro._toString(v);			
		if (this.importtype != v) {			
			this.importtype = v;		
		}			
	};
	
	//===============================================================		
    // nexacro.ExcelImportAction : Event		
    //===============================================================
	nexacro.ExcelImportAction.prototype.on_fire_canrun = function (userdata)
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
	
	nexacro.ExcelImportAction.prototype.on_fire_onsuccess = function (userdata)
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
	  
	nexacro.ExcelImportAction.prototype.on_fire_onerror = function (userdata)
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
    // nexacro.ExcelImportAction : 공통함수(Util)
    //===============================================================
	nexacro.ExcelImportAction.prototype.gfnIsNull = function (Val)				
	{				
		if (new String(Val).valueOf() == "undefined") return true;			
		if (Val == null) return true;			
		if (("x" + Val == "xNaN") && (new String(Val.length).valueOf() == "undefined")) return true;			
		if (Val.length == 0) return true;			
					
		return false;			
	};
	//===============================================================		
    // nexacro.ExcelImportAction : 공통함수 전환부분
    //===============================================================
	/**
	 * @class  excel import( 데이터 헤더제외 ) <br>
	 * @param {String} sDataset - dataset	
	 * @param {String} [sSheet]	- sheet name
	 * @param {String} [sBody] - body 영역지정	
	 * @return N/A
	 * @example
	 * this.gfnExcelImport("dsList","SheetName","A2");
	 */
	nexacro.ExcelImportAction.prototype.gfnExcelImport = function(objForm, objDataset, sSheet, sBody, sImportType)
	{
		//this.setWaitCursor(true);    	
		if(this.gfnIsNull(objForm))			return;
		if(this.gfnIsNull(objDataset))		return;
		if(this.gfnIsNull(sSheet))			sSheet = "Sheet1";
		if(this.gfnIsNull(sBody))			sBody = "A2";
		if(this.gfnIsNull(sImportType))		sImportType = "EXCEL2007";
		
		var sFilefilter = this.gfnGetFileFilter(sImportType);
		var sDataset = objDataset.name;
		
		
		
		var objImport;	
		objImport = new nexacro.ExcelImportObject(sDataset + "_ExcelImport", objForm);				
		objImport.set_importurl(this.COM_EXCEL_URL);						
		objImport.set_importtype(eval("nexacro.ExportTypes." + sImportType.toUpperCase()));	
		objImport.set_filefilter(sFilefilter);
		
		//out dataset 생성(차후 onsucess 함수에서 헤더생성하기 위한)
		var sOutDsName = sDataset + "_outds";	
		if (objForm.isValidObject(sOutDsName)) {
			objForm.removeChild(sOutDsName);			
		}
		
		var objOutDs = new Dataset();
		objOutDs.name = sOutDsName;
		objForm.addChild(objOutDs.name, objOutDs);
		
		objImport.outds = objDataset;
		objImport.outdstemp = objOutDs;
		
		objImport.addEventHandler("onsuccess", this.gfnImportOnsuccess, this);
		objImport.addEventHandler("onerror", this.gfnImportAllOnerror, this);
		
		var sParam = "[command=getsheetdata;output=outDs;body=" + sSheet + "!" + sBody +";]";
		var sParam2 = "[" + sOutDsName + "=outDs]";
		
		objImport.importData("", sParam, sParam2);						
		objImport = null;	
		
		//this.setWaitCursor(false);
	};

	/**
	 * @class excel import on success <br>
	 * @param {Object} obj	
	 * @param {Event} e		
	 * @return N/A
	 * @example
	 */
	nexacro.ExcelImportAction.prototype.gfnImportOnsuccess = function(obj,  e)
	{
		var objOutDs = obj.outdstemp;
		var objOrgDs = obj.outds;
		var sColumnId;

		//기존 데이터셋의 내용으로 헤더복사
		for (var i = 0, s = objOrgDs.getColCount(); i < s; i++) {
			sColumnId = "Column" + i;
			if (sColumnId != objOrgDs.getColID(i)) {
				objOutDs.updateColID(sColumnId, objOrgDs.getColID(i))
			}
		}
		
		objOrgDs.clearData();
		objOrgDs.copyData(objOutDs);
		
		var objForm = objOutDs.parent;
		objForm.removeChild(objOutDs.name);
		objOutDs.destroy();
		objOutDs = null;

		// onsuccess 이벤트 호출
		this.on_fire_onsuccess();
	};

	/**
	 * @class  excel import on error <br>
	 * @param {Object} obj	
	 * @param {Event} e		
	 * @return N/A
	 * @example
	 */
	nexacro.ExcelImportAction.prototype.gfnImportAllOnerror = function(obj,  e)
	{
		trace("Excel Import Error!! : " + e.errormsg);
		this.on_fire_onerror();	
	};
	
	nexacro.ExcelImportAction.prototype.gfnGetFileFilter = function(sImportType)
	{
		var strFilefilter = "";
		
		switch(sImportType)
		{
			case "EXCEL":
				strFilefilter = "Worksheet 97 - 2003 Files (*.xls)|*.xls|";
				break;
			case "EXCEL2007":
				strFilefilter = "Worksheet Files (*.xlsx)|*.xlsx|";
				break;
			case "HANCELL2014":
				strFilefilter = "Hancell Files (*.cell)|*.cell|";
				break;
			case "CSV":
				strFilefilter = "CSV (*.csv)|*.csv|";
				break;
			default : break;
		}
		
		strFilefilter += "All (*.xls;*.xlsx;*.cell;*.csv)|*.xls;*.xlsx;*.cell;*.csv|";
		
		return strFilefilter;
	};
}
