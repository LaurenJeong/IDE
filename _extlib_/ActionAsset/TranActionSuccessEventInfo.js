//==============================================================================	
//	Define the EventInfo.
//==============================================================================	
//==============================================================================	
// Object : nexacro.TranActionSuccessEventInfo	
// Group : Object	
//==============================================================================	
if (!nexacro.TranActionSuccessEventInfo)	
{	
    nexacro.TranActionSuccessEventInfo = function(obj, id, serviceid, errorcd, errormsg)	
    {	
        nexacro.ActionEventInfo.call(this, obj, id);	
		this.set_serviceid(serviceid);
		this.set_errorcode(errorcode);
		this.set_errormsg(errormsg);
    };	
        	
    nexacro.TranActionSuccessEventInfo.prototype = nexacro._createPrototype(nexacro.ActionEventInfo, nexacro.TranActionSuccessEventInfo);	
    nexacro.TranActionSuccessEventInfo.prototype._type_name = "TranActionSuccessEventInfo";	
	
	nexacro.TranActionSuccessEventInfo.prototype.serviceid = "";
	nexacro.TranActionSuccessEventInfo.prototype.set_serviceid = function (v)
	{
		// TODO : enter your code here.
		v = nexacro._toString(v);
		if (this.serviceid != v) {
			this.serviceid = v;
		}
	};	
	
	nexacro.TranActionSuccessEventInfo.prototype.errorcode = 0;
	nexacro.TranActionSuccessEventInfo.prototype.set_errorcode = function (v)
	{
		// TODO : enter your code here.
		v = nexacro._parseInt(v);
		if (this.errorcode != v) {
			this.errorcode = v;
		}
	};	
	
	nexacro.TranActionSuccessEventInfo.prototype.errormsg = "";
	nexacro.TranActionSuccessEventInfo.prototype.set_errormsg = function (v)
	{
		// TODO : enter your code here.
		v = nexacro._toString(v);
		if (this.errormsg != v) {
			this.errormsg = v;
		}
	};	

}	
