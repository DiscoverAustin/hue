
const welcome = (email, username, endpoint) =>  (`
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
	<span style="font-size:25px; font-family:Trebuchet MS, Verdana, Arial; color:#2e8a3b;">Success!</span>
	</td>

	<!--GREEN TEXT AREA-->
	<td background="images/greenback.gif" bgcolor="#45a853" style="border-top:1px solid #FFF; border-bottom:1px solid #FFF; padding-left:15px;" height="113">
	<span style="color:#FFFFFF; font-size:18px; font-family:Trebuchet MS, Verdana, Arial;">Congrats on joining the BetterHue community!</span>
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
<h3>
Click below to finish sigining up!
</h3>
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
  Complete Registration
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
	<table cellpadding="0" cellspacing="0">
	<tr>
	<td width="15"><div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>
</td>
	<td width="325" style="padding-right:10px; font-family:Trebuchet MS, Verdana, Arial; font-size:12px;" valign="top">
	<span style="font-family:Trebuchet MS, Verdana, Arial; font-size:17px; font-weight:bold;">Welcome ${username}!</span>
	<br />
	<p>Thanks for joining the BetterHue community! You can look forward to receiving:</p>
	<div style="padding-left:20px; padding-bottom:10px;"><img src="images/spade.gif" alt=""/>&nbsp;&nbsp;&nbsp;&#8226; Scintillating, thought-provoking discussion</div>

	<div style="padding-left:20px; padding-bottom:10px;"><img src="images/spade.gif" alt=""/>&nbsp;&nbsp;&nbsp;&#8226; Ocassional spam email(#2)</div>
	<div style="padding-left:20px; padding-bottom:10px;"><img src="images/spade.gif" alt=""/>&nbsp;&nbsp;&nbsp;&#8226; Large quantities of wasted time (#3)</div>

	<br />

   This welcome email was sent to ${email} because you recently signed up to join BetterHue. If you received this email in error, please email us at support@betterhue.com.

	</td>
	<td style="border-left:1px solid #e4e4e4; padding-left:15px;" valign="top">

	<!--RIGHT COLUMN FIRST BOX-->
	<table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #e4e4e4; font-family:Trebuchet MS, Verdana, Arial; font-size:12px;">
	<tr>
	<td>
	<div style="font-family:Trebuchet MS, Verdana, Arial; font-size:17px; font-weight:bold; padding-bottom:10px;">Add Us To Your Address Book</div>
	<img src="images/addressbook.gif" align="right" style="padding-left:10px; padding-top:10px; padding-bottom:10px;" alt=""/>
	<p>To help ensure that you receive all email messages consistently in your inbox with images displayed, please add this address to your address book or contacts list: <strong>
theworldsgreatesthue@gmail.com</strong>.</p>
	<br />
	</td>
	</tr>
	</table>

	<!--RIGHT COLUMN SECOND BOX-->
	<br />
	<table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #e4e4e4; font-family:Trebuchet MS, Verdana, Arial; font-size:12px;">
	<tr>
	<td>
	<div style="font-family:Trebuchet MS, Verdana, Arial; font-size:17px; font-weight:bold; padding-bottom:10px;">Have Any Questions?</div>
	<img src="images/penpaper.gif" align="right" style="padding-left:10px; padding-top:10px; padding-bottom:10px;" alt=""/>
	<p>Don't hesitate to hit the reply button to any of the messages you receive.</p>
	<br />
	</td>
	</tr>
	</table>

	<!--RIGHT COLUMN THIRD BOX-->
	<br />
	<table cellpadding="0" width="100%" cellspacing="0" style="font-family:Trebuchet MS, Verdana, Arial; font-size:12px;">
	<tr>
	<td>
	<div style="font-family:Trebuchet MS, Verdana, Arial; font-size:17px; font-weight:bold; padding-bottom:10px;">Have A Topic Idea?</div>
	<img src="images/lightbulb.gif" align="right" style="padding-left:10px; padding-top:10px; padding-bottom:10px;" alt=""/>
	<p>We'd love to to hear your thoughts about it! Log on .</p>

	<br />
	</td>
	</tr>
	</table>

	</td>
	</tr>
	</table>
	</td>
</tr>
</table>
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
</center>
</body>
</html>
`);

module.exports = welcome;
