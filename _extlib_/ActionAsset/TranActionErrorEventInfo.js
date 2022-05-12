//==============================================================================	
//	Define the EventInfo.
//==============================================================================	
//==============================================================================	
// Object : nexacro.TranActionErrorEventInfo	
// Group : Object	
//==============================================================================	
if (!nexacro.TranActionErrorEventInfo)	
{	
    nexacro.TranActionErrorEventInfo = function(obj, id, serviceid, errorcd, errormsg)	
    {	
        nexacro.ActionEventInfo.call(this, obj, id);
		this.set_serviceid(serviceid);
		this.set_errorcode(errorcode);
		this.set_errormsg(errormsg);
    };	
        	
    nexacro.TranActionErrorEventInfo.prototype = nexacro._createPrototype(nexacro.ActionEventInfo, nexacro.TranActionErrorEventInfo);	
    nexacro.TranActionErrorEventInfo.prototype._type_name = "TranActionErrorEventInfo";	
	
	nexacro.TranActionErrorEventInfo.prototype.serviceid = "";
	nexacro.TranActionErrorEventInfo.prototype.set_serviceid = function (v)
	{
		// TODO : enter your code here.
		v = nexacro._toString(v);
		if (this.serviceid != v) {
			this.serviceid = v;
		}
	};	
	
	nexacro.TranActionErrorEventInfo.prototype.errorcode = "";
	nexacro.TranActionErrorEventInfo.prototype.set_errorcode = function (v)
	{
		// TODO : enter your code here.
		v = nexacro._parseInt(v);
		if (this.errorcode != v) {
			this.errorcode = v;
		}
	};	
	
	nexacro.TranActionErrorEventInfo.prototype.errormsg = "";
	nexacro.TranActionErrorEventInfo.prototype.set_errormsg = function (v)
	{
		// TODO : enter your code here.
		v = nexacro._toString(v);
		if (this.errormsg != v) {
			this.errormsg = v;
		}
	};	

}	
