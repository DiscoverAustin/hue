
const reset = (email, username, endpoint) =>  (`
	<html>
	<body><center><table width="600" background="#FFFFFF" style="text-align:left;" cellpadding="0" cellspacing="0">
	<tr>
		<td height="18" width="31" style="border-bottom:1px solid #e4e4e4;">
		<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>
		</td>
		<td height="18" width="131">
		<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>
		</td>
		<td height="18" width="466" style="border-bottom:1px solid #e4e4e4;">
		<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>
		</td>
	</tr>
	<tr>
		<td height="2" width="31" style="border-bottom:1px solid #e4e4e4;">
		<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>
		</td>
		<td height="2" width="131">
		<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>
		</td>
		<td height="2" width="466" style="border-bottom:1px solid #e4e4e4;">
		<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>
		</td>
	</tr>
	<!--GREEN STRIPE-->
	<tr>
		<td background="images/greenback.gif" width="31" bgcolor="#45a853" style="border-top:1px solid #FFF; border-bottom:1px solid #FFF;" height="113">
		<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>
		</td>

		<!--WHITE TEXT AREA-->
		<td width="131" bgcolor="#FFFFFF" style="border-top:1px solid #FFF; text-align:center;" height="113" valign="middle">
		<span style="font-size:25px; font-family:Trebuchet MS, Verdana, Arial; color:#2e8a3b;">BetterHue</span>
		</td>

		<!--GREEN TEXT AREA-->
		<td background="images/greenback.gif" bgcolor="#45a853" style="border-top:1px solid #FFF; border-bottom:1px solid #FFF; padding-left:15px;" height="113">
		<span style="color:#FFFFFF; font-size:18px; font-family:Trebuchet MS, Verdana, Arial;">Password Reset Request</span>
		</td>
	</tr>

	<!--DOUBLE BORDERS BOTTOM-->
	<tr>
		<td height="3" width="31" style="border-top:1px solid #e4e4e4; border-bottom:1px solid #e4e4e4;">
		<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>
		</td>
		<td height="3" width="131">
		<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>
		</td>
		<td height="3" style="border-top:1px solid #e4e4e4; border-bottom:1px solid #e4e4e4;">
		<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>
		</td>
	</tr>
	<tr align="center">
	<td colspan="12">
	<h4>
		Hi ${username}! We recently received a request to reset your password.
	</h4>
	<p>If you sent this request, please click below to continue with the reset.</p>

	<p>If you did not send this request, please disregard this email.</p>
	<br/>
	<br/>
	  <a
			href="${endpoint}"
	    style="  background: #1e2387;
	  background-image: -webkit-linear-gradient(top, #1e2387, #848ed1);
	  background-image: -moz-linear-gradient(top, #1e2387, #848ed1);
	  background-image: -ms-linear-gradient(top, #1e2387, #848ed1);
	  background-image: -o-linear-gradient(top, #1e2387, #848ed1);
	  background-image: linear-gradient(to bottom, #1e2387, #848ed1);
	  -webkit-border-radius: 18;
	  -moz-border-radius: 18;
	  border-radius: 18px;
	  font-family: Arial;
	  color: #ffffff;
	  font-size: 20px;
	  padding: 10px 20px 10px 20px;
	  text-decoration: none;"
	  >
	  Reset Password
	</a>
	  </td>
	  </tr>
	<tr>
		<td colspan="3">
		<!--CONTENT STARTS HERE-->

		<br />
		<br />
	  <table cellpadding="0" style="border-top:1px solid #e4e4e4; text-align:center; font-family:Trebuchet MS, Verdana, Arial; font-size:12px;" cellspacing="0" width="600">
	<tr>
		<td height="2" style="border-bottom:1px solid #e4e4e4;">
		<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>
		</td>
	</tr>
		<td style="font-family:Trebuchet MS, Verdana, Arial; font-size:12px;">
		<br />
		<br />
		</td>
	</tr>
	</table>

		<br />

	</center>
	</body>
	</html>
`);

module.exports = reset;
